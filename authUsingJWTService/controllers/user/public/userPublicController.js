import User from '#models/UserModel.js';
import { Admin, Customer } from '#models/ModelTypes.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generatePassowrdId, generateToken } from '#utils/authUtils.js';

const signUp = async (request, response) => {
  const { name, userName, termsAndConditions, email, password, address } = request.body;
  const user = await User.findOne({
    $or: [{ userName }, { email: userName }, { email: email }],
  });
  if (user) {
    return response.status(409).json({ message: 'Email or username already taken' });
  } else {
    try {
      const role = request.originalUrl.split('/')[2];
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const password_id = generatePassowrdId();
      const newUser = new User({
        name,
        userName,
        email,
        password: hashedPassword,
        termsAndConditions,
        password_id,
        address,
      });

      let saved_user = await newUser.save();

      saved_user = saved_user.toObject();
      delete saved_user.password;
      const token = generateToken({ ...saved_user, password_id, role });

      if (role === 'admin') {
        try {
          const newAdmin = new Admin({ userId: saved_user._id });
          const adminDetails = await newAdmin.save();
          await User.findByIdAndUpdate(saved_user._id, { role: adminDetails._id });
        } catch (error) {
          return response
            .status(500)
            .send({ message: 'Creation of admin failed', error });
        }
      } else {
        try {
          const newCustomer = new Customer({ userId: saved_user._id });
          const customerDetails = await newCustomer.save();
          await User.findByIdAndUpdate(saved_user._id, { role: customerDetails._id });
        } catch (error) {
          return response
            .status(500)
            .send({ message: 'Creation of admin failed', error });
        }
      }
      response
        .status(201)
        .send({ message: 'User created successfully', data: saved_user, token });
    } catch (error) {
      console.log(error);
    }
  }
};

const login = async (request, response) => {
  try {
    const { userName, password } = request.body;
    let user = await User.findOne({
      $or: [{ userName }, { email: userName }],
    }).lean();

    const isPassowrdCorrect = user && (await bcrypt.compare(password, user?.password));
    if (user && isPassowrdCorrect) {
      const password_id = user.password_id;
      const token = generateToken({ ...user, password_id });

      delete user.password;

      response.status(200).send({ data: user, token });
    } else {
      response.status(404).send({ message: 'Invalid username or password' });
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
    const link = `http://localhost:4000/api/user/reset/${user._id}/${token}`;
    console.log(link);
    response.status(200).send({
      message: `If a matching account was found, an email was sent to ${
        email || `email you entered`
      } to allow you to reset your password.`,
      link,
    });
  } else {
    response.status(200).send({
      message: `If a matching account was found, an email was sent to ${
        email || `email you entered`
      } to allow you to reset your password.`,
    });
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
    const password_id = generatePassowrdId();
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
        .send({ message: 'User is Admin', isAdmin: true, adminId: admin.userId });
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
