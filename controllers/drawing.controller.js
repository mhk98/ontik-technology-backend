const Drawing = require("../models/drawing");




module.exports.createDrawing = async (req, res) => {
  try {
    const drawing = new Drawing(req.body);
    await drawing.save();
    res.status(200).send({
      status: 'Success',
      message: 'Successfully inserted drawing data',
      data: drawing
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};



module.exports.getAllDrawing = async(req, res) => {
  try {
    const drawings = await Drawing.find();
    res.status(200).send({
      status: "Success",
      message: "You got all drawing",
      data: drawings,
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
module.exports.getSingleDrawing = async(req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    if(!id){
      return res.status(404).send('Id not found')
    }
    const drawing = await Drawing.findById(id);
    if (!drawing) {
      return res.status(404).send('Data not found');
  }
  
    res.status(200).send({
      status: "Success",
      message: "You got single drawing data",
      data: drawing,
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.updateDrawing = async(req, res) => {
  try {
    const { id } = req.params;
    const data = req.body

    if(!id){
      return res.status(404).send('Id not found')
    }

    if(!data){
      return res.status(404).send('Data is empty')
    }

    const drawing = await Drawing.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    res.status(200).send({
      status: "Success",
      message: "You successfully update data",
     
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports.deleteDrawing = async(req, res) => {
  try {
    const { id } = req.params;
    const drawing = await Drawing.findByIdAndDelete(id);

    if (!drawing) {
      return res.status(404).send();
  }
    res.status(200).send({
      status: "Success",
      message: "Successfully delete drawing",
     
    });
  } catch (error) {
    res.status(500).send({
      status: "faild",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
