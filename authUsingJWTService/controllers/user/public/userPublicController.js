import User from '#models/UserModel.js';
import { Admin, Customer } from '#models/ModelTypes.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generatePasswordId, generateToken } from '#utils/authUtils.js';
import EventBus from '../../../../shared/eventBus/EventBus.js';
import EventTypes from '../../../../shared/events/EventTypes.js';
const { USER_EVENTS } = EventTypes;

const publishEventSafely = async (eventType, data) => {
  try {
    await EventBus.publish(eventType, data);
  } catch (error) {
    console.error(`Failed to publish ${eventType} event:`, error);
    // Don't throw error, just log it
  }
};

const signUp = async (request, response) => {
  const { name, userName, termsAndConditions, email, password } = request.body;
  const user = await User.findOne({
    $or: [{ userName }, { email: userName }, { email: email }],
  });
  if (user) {
    return response.status(409).json({ message: 'Email or username already taken' });
  }
  try {
    const role = request.originalUrl.split('/')[2];
    if (!['admin', 'customer'].includes(role)) {
      return response.status(400).json({ message: 'Invalid role specified' });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const password_id = generatePasswordId();
    const newUser = new User({
      name,
      userName,
      email,
      password: hashedPassword,
      termsAndConditions,
      password_id,
      role,
    });

    let saved_user = await newUser.save();

    saved_user = saved_user.toObject();
    delete saved_user.password;
    const token = generateToken({ ...saved_user, password_id });

    if (role === 'admin') {
      try {
        const newAdmin = new Admin({ userId: saved_user._id });
        const adminDetails = await newAdmin.save();
        await User.findByIdAndUpdate(saved_user._id, { role: adminDetails._id });
        
        // Publish admin created event safely
        await publishEventSafely(USER_EVENTS.ADMIN_CREATED, {
          adminId: adminDetails._id,
          userId: saved_user._id,
          userData: saved_user
        });
      } catch (error) {
        return response.status(500).send({ message: 'Creation of admin failed', error });
      }
    } else {
      try {
        const newCustomer = new Customer({ userId: saved_user._id });
        const customerDetails = await newCustomer.save();
        await User.findByIdAndUpdate(saved_user._id, { role: customerDetails._id });
        
        // Publish customer created event safely
        await publishEventSafely(USER_EVENTS.CUSTOMER_CREATED, {
          customerId: customerDetails._id,
          userId: saved_user._id,
          userData: saved_user
        });
      } catch (error) {
        return response.status(500).send({ message: 'Creation of customer failed', error });
      }
    }

    // Publish user created event safely
    await publishEventSafely(USER_EVENTS.USER_CREATED, {
      userId: saved_user._id,
      userData: saved_user,
      role
    });

    response
      .status(201)
      .send({ message: 'User created successfully', data: saved_user, token });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'User creation failed', error });
  }
};

const login = async (request, response) => {
  try {
    const { userName, password } = request.body;
    let user = await User.findOne({
      $or: [{ userName }, { email: userName }],
    });

    const isPassowrdCorrect = user && (await bcrypt.compare(password, user?.password));
    if (user && isPassowrdCorrect) {
      const password_id = user.password_id;
      const token = generateToken({ ...user, password_id });
      user = user.toObject();
      delete user.password;
      delete user.password_id;
      delete user.termsAndConditions;
      delete user.address;
      response.status(200).send({ data: user, token });
    } else {
      response.status(401).send({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: 'Something went wrong' });
  }
};

const forgotPassword = async (request, response) => {
  const { email } = request.body;
  const user = await User.findOne({ email });
  if (user) {
    const secret = user._id + process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '15min' });
    const link = `${process.env.BASE_URL}:${process.env.FE_PORT}/reset/${user._id}/${token}`;
    console.log(link);
    response.status(200).send({ link });
  } else {
    response.status(200).send({});
  }
};

const resetPassword = async (request, response) => {
  const { password } = request.body;
  const { id, token } = request.params;
  const user = await User.findById(id);
  const new_secret = user._id + process.env.JWT_SECRET_KEY;
  try {
    jwt.verify(token, new_secret);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const password_id = generatePasswordId();
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: { password: hashedPassword, password_id },
      },
      { new: true },
    ).lean();

    const new_token = generateToken({ ...updatedUser, password_id });
    delete updatedUser.password;

    return response.status(200).send({
      message: 'Password reset Successfully',
      user: { ...updatedUser },
      token: new_token,
    });
  } catch (err) {
    response.status(400).send({ ...err, message: 'Invalid token' });
  }
};

const checkAdmin = async (request, response) => {
  const accountid = request.body.accountid;
  try {
    const admin = (await Admin.findOne({ userId: accountid })).toObject();

    if (admin) {
      return response
        .status(200)
        .send({ message: 'User is Admin', isAdmin: true, adminId: admin._id });
    } else {
      return response.status(401).send({ message: 'Unauthorized' });
    }
  } catch (error) {
    return response
      .status(500)
      .send({ message: 'Something went wrong while checking admin' });
  }
};

const UserPublicController = { signUp, login, forgotPassword, resetPassword, checkAdmin };
export default UserPublicController;
