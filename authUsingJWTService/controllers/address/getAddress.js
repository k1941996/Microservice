import AddressesModel from '#models/AddressModel.js';

const getAddress = async (req, res) => {
  const { addressId } = req.params;

  const acc_id = req.headers.accountid;
  try {
    if (!addressId) {
      const addresses = await AddressesModel.find({ userId: acc_id });
      return res
        .status(200)
        .send({ message: 'Addresses fetched successfully', addresses });
    }
    let address = await AddressesModel.findOne(
      { userId: acc_id },
      {
        addresses: { $elemMatch: { _id: addressId } },
      },
    ).lean();

    const formattedAddress = { ...address, ...address.addresses[0] };
    delete formattedAddress.addresses;

    return res
      .status(200)
      .send({ message: 'Address fetched successfully', address: formattedAddress });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};
export default getAddress;
