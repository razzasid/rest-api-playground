const express = require("express");
const router = express.Router();
const {
  handleGetAllTheMenu,
  handleGetMenuItemById,
  handleCreateNewMenuItem,
  handleUpdateMenuItemById,
  handleDeleteMenuItemById,
} = require("../controllers/menusController");

router.route("/").get(handleGetAllTheMenu).post(handleCreateNewMenuItem);

router
  .route("/:id")
  .get(handleGetMenuItemById)
  .patch(handleUpdateMenuItemById)
  .delete(handleDeleteMenuItemById);

module.exports = router;
