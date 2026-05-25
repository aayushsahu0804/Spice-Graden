/**
 * Seed script — run with: npm run seed
 * Inserts all menu items from the frontend foodData into MongoDB
 * with orderCount = 0 initially
 */

require("dotenv").config();
const mongoose = require("mongoose");
const MenuItem = require("./src/models/MenuItem");

const menuItems = [
  {
    name: "Burger",
    price: 150,
    category: "Starters",
    image: "/burger.jpg",
    description:
      "Juicy homemade burger with fresh veggies and special sauce. A taste sensation with bold flavours — crispy on the outside, juicy on the inside.",
    ingredients: ["Paneer", "Flour", "Salsa", "Cheddar", "Parsley"],
    rating: 4.7,
    orderCount: 0,
  },
  {
    name: "Pasta",
    price: 200,
    category: "Main Course",
    image: "/pasta.jpg",
    description: "Creamy pasta made with fresh herbs and rich tomato sauce.",
    ingredients: ["Pasta", "Tomato", "Basil", "Garlic", "Cheese"],
    rating: 4.7,
    orderCount: 0,
  },
  {
    name: "Salad",
    price: 120,
    category: "Salad",
    image: "/salad.jpg",
    description: "Fresh garden salad with crispy greens and tangy dressing.",
    ingredients: ["Lettuce", "Tomato", "Cucumber", "Olive Oil", "Lemon"],
    rating: 4.7,
    orderCount: 0,
  },
  {
    name: "Juice",
    price: 90,
    category: "Drinks",
    image: "/juice.jpg",
    description: "Freshly squeezed seasonal fruit juice, chilled and refreshing.",
    ingredients: ["Orange", "Mango", "Pineapple", "Mint"],
    rating: 4.7,
    orderCount: 0,
  },
  {
    name: "Pizza",
    price: 250,
    category: "Main Course",
    image: "/salad.jpg",
    description: "Stone-baked pizza with premium toppings and mozzarella.",
    ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Bell Pepper", "Olives"],
    rating: 4.7,
    orderCount: 0,
  },
  {
    name: "Ice Cream",
    price: 80,
    category: "Desserts",
    image: "/burger.jpg",
    description: "Hand-churned ice cream in assorted flavours.",
    ingredients: ["Milk", "Cream", "Sugar", "Vanilla", "Cocoa"],
    rating: 4.7,
    orderCount: 0,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log("🗑️  Cleared existing menu items");

    // Insert fresh items
    const inserted = await MenuItem.insertMany(menuItems);
    console.log(`🌱 Seeded ${inserted.length} menu items:`);
    inserted.forEach((item) =>
      console.log(`   • ${item.name} (₹${item.price}) — _id: ${item._id}`)
    );

    console.log("\n✅ Seeding complete! Copy these _ids to test POST /api/orders");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
}

seed();
