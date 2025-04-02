/**
 * @file index.js
 * @summary Employee routes
 * @description This file contains routes for emplyoee entity
 * */
const { createEmployee, getEmployeeById, updateEmployeeById, deleteEmployeeById } = require("./controller");

module.exports = router => {
    router.post("/employee", createEmployee);
    router.get("/employee/:id", getEmployeeById);
    router.put("/employee/:id", updateEmployeeById);
    router.delete("/employee/:id", deleteEmployeeById);
};
