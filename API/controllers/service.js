const ServiceModel = require("../model/services.model");

exports.getAllServices = async (req, res, next) => {
  try {
    let services = await ServiceModel.find({});
    res.send({
      count: services.length,
      services,
    });
  } catch (err) {
    next(err);
  }
};

exports.getServices = async (req, res, next) => {
  try {
    let servicename = req.params.name;
    let service = await UserModel.findOne({ servicename });
    if (!service) {
      return res.status(404).send({
        message: "Service not found",
      });
    }
    res.send({ service });
  } catch (err) {
    next(err);
  }
};

exports.createServices = async (req, res, next) => {
  try {
    //TODO: Requiere validation
    let { name, description, location, phone, email } = req.body;
    let newService = await ServiceModel.create({
      name,
      description,
      location,
      phone,
      email
    });
    res.send({ newService });
  } catch (err) {
    next(err);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    let servicename = req.params.name;
    let { deletedCount } = await ServiceModel.deleteOne({ servicename });
    if (deletedCount == 1) {
      return res.send({
        message: "successfully deleted",
      });
    }
    return res.status(400).send({
      message: "cannot delete the service, maybe it's been deleted before",
    });
  } catch (err) {
    next(err);
  }
};