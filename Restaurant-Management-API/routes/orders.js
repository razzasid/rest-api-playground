const express = require("express");
const router = express.Router();
const authorizeRoles = require("../middleware/authorizeRoles");
const {
  handleGetAllTheOrders,
  handleGetOrderById,
  handleCreateNewOrder,
  handleUpdateOrderById,
  handleDeleteOrderById,
} = require("../controllers/orderController");

router
  .route("/")
  .get(authorizeRoles("admin", "staff"), handleGetAllTheOrders)
  .post(authorizeRoles("admin", "staff", "customer"), handleCreateNewOrder);

router
  .route("/:id")
  .get(authorizeRoles("admin", "staff"), handleGetOrderById)
  .patch(authorizeRoles("admin", "staff"), handleUpdateOrderById)
  .delete(authorizeRoles("admin"), handleDeleteOrderById);

module.exports = router;
