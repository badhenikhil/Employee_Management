const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
const employee = new Schema(
  {
    id: { type: Number, index: { unique: true } },
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

const model = mongoose.model("employee", employee);
employee.pre("save", async function (next) {
  // Only increment for new
  if (this.isNew) {
    model.count().then((res) => {
      this.id = res + 1; // Increment count
      next();
    });
  } else {
    next();
  }
});

module.exports = model;
