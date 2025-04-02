/**
 * @file index.js
 * @summary Initiate and expose routes
 * */
const employee = require("./employee");


const initiateRoutes = router => {
    employee(router);
};

module.exports = initiateRoutes;