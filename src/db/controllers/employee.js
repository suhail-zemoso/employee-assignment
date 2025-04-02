/**
 * @file employee.js
 * @summary Defines and exposes methods for employee entity
 * */
const { Employee } = require(__basesrcdir + "/db/models");
const { COMMON_KEYS, EMPLOYEE_KEYS } = require(__basesrcdir + "/constants/models");

/**
 * Method to get employee by id from DB
 * @param {string} employeeId employee id
 * @param {object} [selection] Object with DB projection
 * */
const getEmployeeById = (employeeId, selection = {}) => Employee.findOne({
    _id: employeeId
}, );

/**
 * Method to get employee info from DB
 * @param {string} condition Condition by which employee will be fetched
 * @param {object} [selection] Object with DB projection
 * */
// eslint-disable-next-line array-bracket-spacing
const getEmployee = (condition = {}, selection = {}) => Employee.findOne(condition, { ...selection, [EMPLOYEE_KEYS.PASSWORD]: 0 }).lean();

/**
 * Method to get employees according info to some conditions from DB
 * @param {string} condition Condition by which employee will be fetched
 * @param {object} [selection] Object with DB projection
 * */
const getEmployees = (condition = {}, selection = {}) => Employee.find(condition, selection).lean();

/**
 * Method to create employee in DB
 * @param {object} employeeObj employee info to save
 * */
const createEmployee = (employeeObj) => {
    const employee = new Employee(employeeObj);

    return employee.save();
};

/**
 * Method to get employee by id from DB
 * @param {string} employeeId employee id
 * @param {object} updates Data to update
 * */
const updateEmployeeById = (employeeId, updates) => Employee.updateOne({
    _id: employeeId
}, {
    $set: updates
});

/**
 * Method to delete employee by employeeId from DB
 * @param {string} employeeId employee id
 * @param {object} [selection] Object with DB projection
 * */
const deleteEmployeeById = (employeeId) => Employee.deleteOne({
    [COMMON_KEYS.OBJECT_ID]: employeeId
});

/**
 * Method to get all employee listing
 */
const employeeListing = (condition = {}, limit, skip) => Employee.find(condition).limit(limit).skip(skip).sort({ createdAt: -1 }).lean();

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployeeById,
    getEmployee,
    employeeListing,
    deleteEmployeeById
};
