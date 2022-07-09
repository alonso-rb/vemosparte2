const Moongose = require('mongoose');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');

const ServiceSchema = new Moongose.Schema({
        name: {type: String, required: true, unique: true},
        description: {type: String, required: true},
        location: {type: String, required: true, unique: true},
        phone: {type: String, required: true},
        email: {type: String, required: true}
});

const ServicesModel = mongoose.model("services", ServiceSchema);

module.exports = ServicesModel;