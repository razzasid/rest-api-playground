const express = require("express");
const router = express.Router();

const {
  handleGetAllCustomers,
  handleGetCustomersById,
  handleCreateNewCustomer,
  handleUpdateCustomerById,
  handleDeleteCustomerById,
} = require("../controllers/customerController");

router.route("/").get(handleGetAllCustomers).post(handleCreateNewCustomer);

router
  .route("/:id")
  .get(handleGetCustomersById)
  .patch(handleUpdateCustomerById)
  .delete(handleDeleteCustomerById);

module.exports = router;
