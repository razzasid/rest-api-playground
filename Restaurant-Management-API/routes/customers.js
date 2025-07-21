const express = require("express");
const router = express.Router();
const authorizeRoles = require("../middleware/authorizeRoles");

const {
  handleGetAllCustomers,
  handleGetCustomersById,
  handleCreateNewCustomer,
  handleUpdateCustomerById,
  handleDeleteCustomerById,
} = require("../controllers/customerController");

router
  .route("/")
  .get( authorizeRoles("admin"), handleGetAllCustomers)
  .post( authorizeRoles("admin", "staff"), handleCreateNewCustomer);

router
  .route("/:id")
  .get( authorizeRoles("admin", "staff"), handleGetCustomersById)
  .patch( authorizeRoles("admin", "staff"), handleUpdateCustomerById)
  .delete( authorizeRoles("admin"), handleDeleteCustomerById);

module.exports = router;
