const Order = require("../models/order");

async function handleGetAllTheOrders(req, res) {
  try {
    const orders = await Order.find({})
      .populate("customer", "name")
      .populate("items", "name");

    return res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customer")
      .populate("items");

    if (!order)
      return res.status(404).json({ success: false, error: "order not found" });
    return res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleCreateNewOrder(req, res) {
  try {
    const { customer, items, status } = req.body;

    if (!customer)
      return res.status(400).json({ message: "Customer is required" });
    if (!Array.isArray(items) || items.length === 0)
      return res
        .status(400)
        .json({ message: "At least one menu item is required" });

    const order = await Order.create({
      customer,
      items,
      status,
    });

    return res.status(201).json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function handleUpdateOrderById(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateData = {};
    if (body.items) updateData.items = body.items;
    if (body.status) updateData.status = body.status;

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedOrder)
      return res
        .status(404)
        .json({ success: false, message: "order item not found" });
    return res.json({ success: true, data: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleDeleteOrderById(req, res) {
  try {
    const id = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder)
      return res.status(404).json({ error: "order not found" });
    return res.json({ success: true, data: deletedOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  handleGetAllTheOrders,
  handleGetOrderById,
  handleCreateNewOrder,
  handleUpdateOrderById,
  handleDeleteOrderById,
};
