/** Base service class*/
class EmployeeService {
  constructor(model) {
    this.model = model;
  }
  /**Get all employees */
  async getAll() {
    try {
      const result = await this.model.find({});
      return result;
    } catch (ex) {
      throw ex;
    }
  }
  /** Get Employee details
   *
   * @param {number} id
   * @returns employee record
   */
  async get(id) {
    try {
      let query = { id };
      const result = await this.model.findOne(query);
      return result;
    } catch (ex) {
      throw ex;
    }
  }
  /** Get last employee unique id to auto increment while creating
   *
   * @returns id of last employee record
   */
  async getLastId() {
    try {
      return await this.model.count();
    } catch (ex) {
      throw ex;
    }
  }
  /** Create employee record
   *
   * @param {object} data
   * @returns created emplyee record
   */
  async create(data) {
    try {
      const id = await this.getLastId();
      data.id = id + 1;
      const saved = await this.model.create(data);
      return saved;
    } catch (ex) {
      throw ex;
    }
  }
  /**Update employee record by id
   *
   * @param {number} id
   * @param {object} data
   * @returns  updated employee record
   */
  async update(id, data) {
    try {
      const item = await this.model.findOneAndUpdate({ id }, data);
      return item;
    } catch (ex) {
      throw ex;
    }
  }
  /**Filter employees by searchtext
   *
   * @param {string} filter
   * @returns filtered list
   */
  async search(filter) {
    try {
      const filterReg = new RegExp(`(${filter})`, "i");
      const result = await this.model.find({
        $or: [
          { first_name: /(tt)/i },
          { last_name: /dear/i },
          { email: filterReg },
        ],
      });
      return result;
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = EmployeeService;
