import AddressesModel from '#models/AddressModel.js';

const getAddress = async (req, res) => {
  const { addressId } = req.params;

  const acc_id = req.headers.accountid;
  console.log(acc_id);
  try {
    if (!addressId) {
      const addresses = await AddressesModel.find({ userId: acc_id });
      return res
        .status(200)
        .send({ message: 'Addresses fetched successfully', addresses });
    }
    const address = await AddressesModel.findOne(
      { userId: acc_id },
      {
        addresses: { $elemMatch: { _id: addressId } },
      },
    );

    return res.status(200).send({ message: 'Address fetched successfully', address });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
};
export default getAddress;
