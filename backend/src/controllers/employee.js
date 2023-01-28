const EmployeeService = require("../services/employee");
const employeeModel = require("../models/employee");

const employeeService = new EmployeeService(employeeModel);

class EmployeeController {
  async getAll(req, res, next) {
    try {
      const result = await employeeService.getAll();
      res.status(200).json(result);
    } catch (ex) {
      next(ex);
    }
  }
  async get(req, res, next) {
    try {
      const result = await employeeService.get(req.params.id);
      res.status(200).json(result);
    } catch (ex) {
      next(ex);
    }
  }
  async create(req, res, next) {
    try {
      const result = await employeeService.create(req.body);
      res.status(201).json(result);
    } catch (ex) {
      next(ex);
    }
  }
  async update(req, res, next) {
    try {
      const result = await employeeService.update(req.params.id, req.body);
      res.status(200).json(result);
    } catch (ex) {
      next(ex);
    }
  }
  search(req, res) {
    res.end();
  }
}

module.exports = new EmployeeController(employeeService);
