/** Base service class*/
class EmployeeService {
  constructor(model) {
    this.model = model;
  }
  async getAll() {
    try {
      const result = await this.model.find({});
      return result;
    } catch (ex) {
      throw ex;
    }
  }
  async get(id) {
    try {
      let query = { id };
      const result = await this.model.find(query);
      return result;
    } catch (ex) {
      throw ex;
    }
  }
  create(data) {}
  update(id, data) {}
}

module.exports = EmployeeService;
