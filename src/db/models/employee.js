/**
 * @file employee.js
 * @summary Defines employee schema
 * */

const mongoose = require("mongoose");
const { EMPLOYEE_KEYS, COMMON_KEYS } = require(__basesrcdir + "/constants/models");
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    [EMPLOYEE_KEYS.FIRST_NAME]: {
        type: String,
        trim: true,
    },
    [EMPLOYEE_KEYS.LAST_NAME]: {
        type: String,
        trim: true,
    },
    [EMPLOYEE_KEYS.EMAIL]: {
        type: String,
        trim: true,
        required: true,
    },
    [EMPLOYEE_KEYS.PASSWORD]: {
        type: String,
        trim: true,
    },
    [EMPLOYEE_KEYS.DATE_OF_BIRTH]: {
        type: Date,
        required: true,
    },
    [EMPLOYEE_KEYS.GENDER]: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },
    [COMMON_KEYS.IS_ACTIVE]: {
        type: Boolean,
        default: true
    },
    [COMMON_KEYS.IS_DELETED]: {
        type: Boolean,
        default: false
    },
    [COMMON_KEYS.DELETED_AT]: {
        type: Date,
        default: null
    },

}, { timestamps: true });

module.exports = {
    Employee: mongoose.model("Employees", employeeSchema)
};
