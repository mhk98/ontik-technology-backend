const Bookings = require("../models/bookings");


module.exports.createBookings = async (req, res) => {
  try {
    const bookings = new Bookings(req.body);
    await bookings.save();
    res.status(200).send({
      status: 'Success',
      message: 'Successfully inserted bookings data',
      data: bookings
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};



module.exports.getAllBookings = async(req, res) => {
  try {
    const bookings = await Bookings.find();
    res.status(200).send({
      status: "Success",
      message: "You got all bookings",
      data: bookings,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//Single data using get method
module.exports.getSingleBookings = async(req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    if(!id){
      return res.status(404).send('Id not found')
    }
    const bookings = await Bookings.findById(id);
    if (!bookings) {
      return res.status(404).send('Data not found');
  }
  
    res.status(200).send({
      status: "Success",
      message: "You got single bookings data",
      data: bookings,
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.updateBookings= async(req, res) => {
  try {
    const { id } = req.params;
    const data = req.body

    if(!id){
      return res.status(404).send('Id not found')
    }

    if(!data){
      return res.status(404).send('Data is empty')
    }

    const bookings = await Bookings.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    res.status(200).send({
      status: "Success",
      message: "You successfully update data",
      data: bookings
     
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.deleteBookings= async(req, res) => {
  try {
    const { id } = req.params;
    const bookings = await Bookings.findByIdAndDelete(id);

    if (!bookings) {
      return res.status(404).send();
  }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete bookings",
     
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
 