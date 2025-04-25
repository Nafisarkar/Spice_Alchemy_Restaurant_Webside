import breakfast1Img from "../assets/breakfast1.jpg";
import lunch1Img from "../assets/lunch1.jpg";
import dinner1Img from "../assets/dinner1.jpg";
import drink1Img from "../assets/drink1.jpg";

const foods = [
  {
    id: 1,
    name: "Breakfast",
    image: breakfast1Img,
    title: "Classic Breakfast Sandwich",
    subtitle:
      "Fluffy eggs, melted cheese, crispy bacon, stacked between toasted sourdough.",
    pairitems: [
      "Mini hash browns",
      "Fresh fruit cup",
      "Cappuccino latte",
      "Greek yogurt with honey",
    ],
    price: "500",
  },
  {
    id: 2,
    name: "Lunch",
    image: lunch1Img,
    title: "Golden Mughali Delight",
    subtitle:
      "Fragrant long-grain rice slow-cooked with marinated meat, saffron, and regional spices.",
    pairitems: [
      "Raita (spiced yogurt)",
      "Sliced cucumber",
      "Green chili ",
      "Roasted egg or aloo",
    ],
    price: "899",
  },
  {
    id: 3,
    name: "Dinner",
    image: dinner1Img,
    title: "Royal Butter Chicken",
    subtitle:
      "North Indian classic—charred tandoori chicken slow-cooked in buttery tomato magic.",
    pairitems: ["Garlic naan", "Plain basmati", "Green chutney", "Masala soda"],
    price: "699",
  },
  {
    id: 4,
    name: "Drinks",
    image: drink1Img,
    title: "Citrus Mint Iced Tea",
    subtitle:
      "Chilled black tea infused with fresh lime and mint—served over ice for the ultimate cool-down.",
    pairitems: [
      "Grilled sandwiches ",
      "Light biriyani ",
      "Chicken tikka skewers",
      "Summer desserts",
    ],
    price: "399",
  },
];

export default foods;
