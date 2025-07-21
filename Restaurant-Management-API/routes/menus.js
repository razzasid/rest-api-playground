const express = require("express");
const router = express.Router();
const authorizeRoles = require("../middleware/authorizeRoles");

const {
  handleGetAllTheMenu,
  handleGetMenuItemById,
  handleCreateNewMenuItem,
  handleUpdateMenuItemById,
  handleDeleteMenuItemById,
} = require("../controllers/menusController");

router
  .route("/")
  .get(
    authorizeRoles("admin", "staff", "customer"),
    handleGetAllTheMenu
  )
  .post(authorizeRoles("admin", "staff"), handleCreateNewMenuItem);

router
  .route("/:id")
  .get(authorizeRoles("admin", "staff"), handleGetMenuItemById)
  .patch(authorizeRoles("admin", "staff"), handleUpdateMenuItemById)
  .delete(authorizeRoles("admin"), handleDeleteMenuItemById);

module.exports = router;
