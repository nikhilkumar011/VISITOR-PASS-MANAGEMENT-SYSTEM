const mongoose = require('mongoose');

const schema = mongoose.Schema;

const visitorSchema = new schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    approvedStatus: {
        type: String,
        required: false
    },
    reason: {
        type: String,
        required: true
    },
    visitingEmployee: {
        type: String,
        required: true
    },
    passId: {
        type: String
    },
    qrCode: {
        type: String
    },
    checkedIn: {
        type: Boolean,
        default: false
    },
    emailSent: {
  type: Boolean,
  default: false
}


})


module.exports = mongoose.model("visitor", visitorSchema)