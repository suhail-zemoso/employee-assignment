const { employeepository } = require(__basesrcdir + "/db/controllers");
const { EMPLOYEE_KEYS, COMMON_KEYS } = require(__basesrcdir + "/constants/models");
const { throwBadRequestError, throwNotFoundError } = require(__basesrcdir + "/errors");
const { messages, userTypeValue } = require(__basesrcdir + "/messages");
const { hash } = require("bcrypt");
const { commonConstants } = require(__basesrcdir + "/constants");
const { BCRYPT_SALT_ROUNDS } = commonConstants;

/**
 * Method for creating an employee
 * @param {object} employeeObj Employee object.
 */
const createEmployee = async (employeeObj) => {
    const { email, password } = employeeObj;

    // Check if the employee already exists
    const existingEmployee = await employeepository.getEmployee({
        [EMPLOYEE_KEYS.EMAIL]: email,
        [COMMON_KEYS.IS_DELETED]: false
    });
    if (existingEmployee) {
        throwBadRequestError(messages.EMPLOYEE_ALREADY_EXISTS);
    }

    // Hash password before storing it
    if (password) {
        employeeObj[EMPLOYEE_KEYS.PASSWORD] = await hash(password, Number(BCRYPT_SALT_ROUNDS));
    }

    await employeepository.createEmployee(employeeObj);
};

/**
 * Method to get employee info by ID
 * @param {string} employeeId Employee ID
 */
const getEmployeeById = async (employeeId) => {
    const employee = await employeepository.getEmployee({
        [COMMON_KEYS.OBJECT_ID]: employeeId,
        [COMMON_KEYS.IS_DELETED]: false
    });
    if (!employee) {
        throwNotFoundError(`${messages.NOT_FOUND}: Employee with ID ${employeeId} not found.`);
    }
    return employee;
};

/**
 * Method to update employee info by ID
 * @param {string} employeeId Employee ID
 * @param {object} employeeObj Updated employee data
 */
const updateEmployeeById = async (employeeId, employeeObj) => {
    const employee = await employeepository.getEmployee({
        [COMMON_KEYS.OBJECT_ID]: employeeId,
        [COMMON_KEYS.IS_DELETED]: false
    });
    if (!employee) {
        throwNotFoundError(`${messages.NOT_FOUND}: Employee with ID ${employeeId} not found.`);
    }

    if (Object.keys(employeeObj).length === 0) {
        throwBadRequestError("No valid fields provided for update.");
    }

    await employeepository.updateEmployeeById(employeeId, employeeObj);
};

/**
 * Method to soft delete employee info by ID
 * @param {string} employeeId Employee ID
 */
const deleteEmployeeById = async (employeeId) => {
    const employee = await employeepository.getEmployee({
        [COMMON_KEYS.OBJECT_ID]: employeeId,
        [COMMON_KEYS.IS_DELETED]: false
    });
    if (!employee) {
        throwNotFoundError(`${messages.NOT_FOUND}: Employee with ID ${employeeId} not found.`);
    }

    // Soft delete by updating status fields
    await employeepository.updateEmployeeById(employeeId, {
        [COMMON_KEYS.IS_ACTIVE]: false,
        [COMMON_KEYS.IS_DELETED]: true,
        [COMMON_KEYS.DELETED_AT]: new Date(),
    });
};

module.exports = {
    createEmployee,
    getEmployeeById,
    updateEmployeeById,
    deleteEmployeeById,
};
