const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  zipcode: { type: String, required: true },
  document: {
    name: { type: String },
    path: { type: String },
    mimetype: {type: String }
  }
}, { timestamps: true });

/**
 * Method
 */
applicationSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'email', 'phone', 'address', 'zipcode', 'document'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
})

module.exports = mongoose.model('Application', applicationSchema);
