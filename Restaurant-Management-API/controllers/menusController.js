const Menu = require("../models/menu");

async function handleGetAllTheMenu(req, res) {
  try {
    const category = req.query.category;

    const menus = category
      ? await Menu.find({ category })
      : await Menu.find({});

    return res.json({ success: true, data: menus });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}


async function handleGetMenuItemById(req, res) {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ error: "user not found" });
    return res.json(menu);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleCreateNewMenuItem(req, res) {
  try {
    const body = req.body;

    if (
      !body ||
      !body.name ||
      !body.category ||
      !body.price ||
      !body.description
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const menu = await Menu.create({
      name: body.name,
      category: body.category,
      price: body.price,
      description: body.description,
    });
    return res.status(201).json({ success: true, data: menu });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleUpdateMenuItemById(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedMenu = await Menu.findByIdAndUpdate(
      { _id: id },
      {
        name: body.name,
        category: body.category,
        price: body.price,
        description: body.description,
      },
      { new: true }
    );
    if (!updatedMenu)
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    return res.json({ success: true, data: updatedMenu });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleDeleteMenuItemById(req, res) {
  try {
    const id = req.params.id;
    const deletedMenu = await Menu.findByIdAndDelete(id);
    if (!deletedMenu) return res.status(404).json({ error: "Menu item not found" });
    return res.json({ success: true, data: deletedMenu });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  handleGetAllTheMenu,
  handleGetMenuItemById,
  handleCreateNewMenuItem,
  handleUpdateMenuItemById,
  handleDeleteMenuItemById,
};
