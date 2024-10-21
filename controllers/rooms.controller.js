const Rooms = require("../models/rooms");


module.exports.createRooms = async (req, res) => {
  try {
    const rooms = new Rooms(req.body);
    await rooms.save();
    res.status(200).send({
      status: 'Success',
      message: 'Successfully inserted rooms data',
      data: rooms
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};



module.exports.getAllRooms = async(req, res) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).send({
      status: "Success",
      message: "You got all rooms",
      data: rooms,
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
module.exports.getSingleRooms = async(req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    if(!id){
      return res.status(404).send('Id not found')
    }
    const rooms = await Rooms.findById(id);
    if (!rooms) {
      return res.status(404).send('Data not found');
  }
  
    res.status(200).send({
      status: "Success",
      message: "You got single rooms data",
      data: rooms,
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.updateRooms= async(req, res) => {
  try {
    const { id } = req.params;
    const data = req.body

    if(!id){
      return res.status(404).send('Id not found')
    }

    if(!data){
      return res.status(404).send('Data is empty')
    }

    const rooms = await Rooms.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    res.status(200).send({
      status: "Success",
      message: "You successfully update data",
      data: rooms
     
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.deleteRooms= async(req, res) => {
  try {
    const { id } = req.params;
    const rooms = await Rooms.findByIdAndDelete(id);

    if (!rooms) {
      return res.status(404).send();
  }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete rooms",
     
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
