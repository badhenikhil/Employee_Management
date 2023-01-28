const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
const employee = new Schema(
  {
    id: { type: Number },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    job_title: { type: String },
    department: { type: String },
    company_name: { type: String },
    language: { type: String },
    gender: { type: String },
    preferred_color: { type: String },
  },
  {
    collection: "employees",
  }
);

module.exports = mongoose.model("employee", employee);
