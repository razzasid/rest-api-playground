const Customer = require("../models/customer");

async function handleGetAllCustomers(req, res) {
  try {
    const allCustomers = await Customer.find({});
    return res.json(allCustomers);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
}

async function handleGetCustomersById(req, res) {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "user not found" });
    return res.json(customer);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleCreateNewCustomer(req, res) {
  try {
    const body = req.body;

    if (!body || !body.name || !body.email || !body.phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const customer = await Customer.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
    });
    return res.status(201).json({ success: true, data: customer });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleUpdateCustomerById(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
      { _id: id },
      { name: body.name, email: body.email, phone: body.phone },
      { new: true }
    );
    if (!updatedCustomer)
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    return res.json({ success: true, data: updatedCustomer });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function handleDeleteCustomerById(req, res) {
  try {
    const id = req.params.id;
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer)
      return res.status(404).json({ error: "user not found" });
    return res.json({ success: true, data: deletedCustomer });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  handleGetAllCustomers,
  handleGetCustomersById,
  handleCreateNewCustomer,
  handleUpdateCustomerById,
  handleDeleteCustomerById,
};
