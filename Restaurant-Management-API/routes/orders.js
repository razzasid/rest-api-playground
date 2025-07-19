const express = require("express");
const router = express.Router();
const {
  handleGetAllTheOrders,
  handleGetOrderById,
  handleCreateNewOrder,
  handleUpdateOrderById,
  handleDeleteOrderById,
} = require("../controllers/orderController");

router.route("/").get(handleGetAllTheOrders).post(handleCreateNewOrder);

router
  .route("/:id")
  .get(handleGetOrderById)
  .patch(handleUpdateOrderById)
  .delete(handleDeleteOrderById);

module.exports = router;
