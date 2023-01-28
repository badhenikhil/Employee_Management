const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee");

/* GET_ALL employees */
router.get("/", employeeController.getAll);
/**Fetch employee details */
router.get("/:id", employeeController.get);
/**Create employee record */
router.post("/", employeeController.create);
/**Update employee record */
router.put("/:id", employeeController.update);

module.exports = router;
