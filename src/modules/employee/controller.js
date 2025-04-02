/* eslint-disable max-lines */
/**
 * @file controller.js
 * @summary Employee controllers
 * @description This file contains controller definition for employee entity.
 * Each method is responsible for extracting data, passing to corresponding action and
 * send response back to client.
 * */

const { apiResponse, errorApiResponse } = require(__basesrcdir + "/config");
const { messages } = require(__basesrcdir + "/messages");
const { commonConstants } = require(__basesrcdir + "/constants");
const { SUCCESS } = commonConstants;
const { createEmployeeSchema, updateEmployeeSchema } = require("./validation");
const { validateSchema } = require(__basesrcdir + "/middlewares");
const employeeService = require("./service");
const { throwBadRequestError } = require(__basesrcdir + "/errors");

/**
 * Controller to create the employee 
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const createEmployee = async (req, res) => {
    try {
        const employeeObj = req.body;

        validateSchema(createEmployeeSchema, employeeObj);

        const data = await employeeService.createEmployee(employeeObj);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.EMPLOYEE_CREATED_SUCCESSFULLY, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

/**
 * Controller to get employee info by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;

        if (!employeeId) {
            throwBadRequestError(messages.EMPLOYEE_ID_REQUIRED);
        }
        const data = await employeeService.getEmployeeById(employeeId);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.SUCCESS_MESSAGE, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

/**
 * Controller to update employee info by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const updateEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employeeObj = req.body;

        if (!employeeId) {
            throwBadRequestError(messages.EMPLOYEE_ID_REQUIRED);
        }

        validateSchema(updateEmployeeSchema, employeeObj);
        const data = await employeeService.updateEmployeeById(employeeId, employeeObj);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.EMPLOYEE_UPDATED_SUCCESSFULLY, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

/**
 * Controller to delete employee info by id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * */
const deleteEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;

        if (!employeeId) {
            throwBadRequestError(messages.EMPLOYEE_ID_REQUIRED);
        }
        const data = await employeeService.deleteEmployeeById(employeeId);

        return apiResponse({ res, code: SUCCESS.CODE, message: messages.EMPLOYEE_DELETED_SUCCESSFULLY, status: true, data });
    } catch (error) {
        return errorApiResponse(res, error);
    }
};

module.exports = {
    createEmployee,
    getEmployeeById,
    updateEmployeeById,
    deleteEmployeeById
};