import AddressesModel from '#models/AddressModel.js';

const appendAddress = async (id, newAddressInfo) => {
  const newAddressList = await AddressesModel.findByIdAndUpdate(
    id,
    {
      $push: {
        addresses: newAddressInfo,
      },
    },
    { new: true },
  );
  return newAddressList;
};
const createNewAddressList = async (userId, newAddressInfo) => {
  const newAddress = new AddressesModel({
    userId,
    addresses: [newAddressInfo],
  });

  return await newAddress.save();
};
const createAddress = async (req, res) => {
  const {
    name,
    streetAddress,
    city,
    state,
    pinCode,
    country,
    mobile_no,
    specialInstructions,
  } = req.body;
  const userId = req.user._id;
  try {
    const userAddressList = await AddressesModel.findOne({ userId });

    if (userAddressList?.addresses?.length >= 10) {
      return res
        .status(400)
        .send({ message: 'Too many addresses, please delete some addresses.' });
    }
    const newAddressInfo = {
      name,
      streetAddress,
      city,
      state,
      pinCode,
      country,
      mobile_no,
      specialInstructions,
    };
    let newAddressList;
    if (!userAddressList) {
      newAddressList = await createNewAddressList(userId, newAddressInfo);
    } else {
      newAddressList = await appendAddress(userAddressList._id, newAddressInfo);
    }
    return res.status(200).send({
      message: 'Address added successfully',
      addresses: newAddressList,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal server error' });
  }
};
export default createAddress;
