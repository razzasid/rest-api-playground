const mongoose = require("mongoose");
const Customer = require("./models/customer");
const Menu = require("./models/menu");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

async function seedData() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected ✅");

    // Clear previous data
    await Customer.deleteMany({});
    await Menu.deleteMany({});

    // Create dynamic customers
    const customers = Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number("##########"),
    }));

    // Create dynamic menu items
    const categories = ["Main Course", "Beverage", "Dessert"];
    const menus = Array.from({ length: 8 }).map(() => ({
      name: faker.commerce.productName(),
      category: faker.helpers.arrayElement(categories),
      price: faker.commerce.price({ min: 100, max: 500 }),
      description: faker.commerce.productDescription(),
    }));

    await Customer.insertMany(customers);
    await Menu.insertMany(menus);

    console.log("Dynamic sample data inserted 🎉");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed ❌", err);
    process.exit(1);
  }
}

seedData();
