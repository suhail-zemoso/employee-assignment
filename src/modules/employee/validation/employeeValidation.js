const joi = require("joi");

joi.objectId = require("joi-objectid")(joi);
const { EMPLOYEE_KEYS, COMMON_KEYS } = require(__basesrcdir + "/constants/models");

// Reusable Nested Schemas
const addressSchema = joi.object({
    [COMMON_KEYS.STREET]: joi.string().trim(true).optional(),
    [COMMON_KEYS.CITY]: joi.string().trim(true).optional(),
    [COMMON_KEYS.STATE]: joi.string().trim(true).optional(),
    [COMMON_KEYS.ZIP_CODE]: joi.string().trim(true).optional(),
    [COMMON_KEYS.COUNTRY]: joi.string().trim(true).optional(),
});


// Create Employee Schema
const createEmployeeSchema = joi.object({
    [EMPLOYEE_KEYS.FIRST_NAME]: joi.string()
        .min(3)
        .max(25)
        .trim(true)
        .required()
        .messages({
            "string.empty": "First name is required",
            "string.min": "First name should have at least 3 characters",
            "string.max": "First name should not exceed 25 characters",
        }),
    [EMPLOYEE_KEYS.LAST_NAME]: joi.string()
        .min(3)
        .max(25)
        .trim(true)
        .required()
        .messages({
            "string.empty": "Last name is required",
            "string.min": "Last name should have at least 3 characters",
            "string.max": "Last name should not exceed 25 characters",
        }),
    [EMPLOYEE_KEYS.EMAIL]: joi.string()
        .trim(true)
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
        }),
    [EMPLOYEE_KEYS.PASSWORD]: joi.string()
        .min(8)
        .max(50)
        .trim(true)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password should not exceed 50 characters",
        }),
    [EMPLOYEE_KEYS.DATE_OF_BIRTH]: joi.date()
        .iso()
        .required()
        .messages({
            "date.base": "Date of birth must be a valid date",
            "any.required": "Date of birth is required",
        }),
    [EMPLOYEE_KEYS.GENDER]: joi.string()
        .valid("Male", "Female", "Other")
        .required()
        .messages({
            "any.only": "Gender must be Male, Female, or Other",
            "any.required": "Gender is required",
        }),
    [EMPLOYEE_KEYS.CONTACT_NUMBER]: joi.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .required()
        .messages({
            "string.empty": "Contact number is required",
            "string.pattern.base": "Contact number must only contain digits",
            "string.min": "Contact number must have at least 10 digits",
            "string.max": "Contact number must not exceed 15 digits",
        }),
    [EMPLOYEE_KEYS.ADDRESS]: addressSchema.optional(),
});

// Update Employee Schema
const updateEmployeeSchema = joi.object({
    [EMPLOYEE_KEYS.FIRST_NAME]: joi.string()
        .min(3)
        .max(25)
        .trim(true)
        .optional()
        .messages({
            "string.empty": "First name cannot be empty",
            "string.min": "First name should have at least 3 characters",
            "string.max": "First name should not exceed 25 characters",
        }),
    [EMPLOYEE_KEYS.LAST_NAME]: joi.string()
        .min(3)
        .max(25)
        .trim(true)
        .optional()
        .messages({
            "string.empty": "Last name cannot be empty",
            "string.min": "Last name should have at least 3 characters",
            "string.max": "Last name should not exceed 25 characters",
        }),
    [EMPLOYEE_KEYS.DATE_OF_BIRTH]: joi.date()
        .iso()
        .optional()
        .messages({
            "date.base": "Date of birth must be a valid date",
        }),
    [EMPLOYEE_KEYS.GENDER]: joi.string()
        .valid("Male", "Female", "Other")
        .optional()
        .messages({
            "any.only": "Gender must be Male, Female, or Other",
        }),
    [EMPLOYEE_KEYS.CONTACT_NUMBER]: joi.string()
        .pattern(/^[0-9]+$/)
        .min(10)
        .max(15)
        .optional()
        .messages({
            "string.empty": "Contact number cannot be empty",
            "string.pattern.base": "Contact number must only contain digits",
            "string.min": "Contact number must have at least 10 digits",
            "string.max": "Contact number must not exceed 15 digits",
        }),
    [EMPLOYEE_KEYS.ADDRESS]: addressSchema.optional(),
});

module.exports = {
    createEmployeeSchema,
    updateEmployeeSchema
};