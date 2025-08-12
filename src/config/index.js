export const registerFormControls = [
  {
    name: "userName",
    label: "Full Name",
    placeholder: "Enter your full name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email address",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Create a password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email address",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Product Name",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter grocery item name",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product details (e.g., freshness, source)",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "fruits", label: "Fruits" },
      { id: "vegetables", label: "Vegetables" },
      { id: "dairy", label: "Dairy Products" },
      { id: "bakery", label: "Bakery & Snacks" },
      { id: "beverages", label: "Beverages" },
      { id: "packaged", label: "Packaged Foods" },
    ],
  },
  {
    label: "Brand / Supplier",
    name: "brand",
    componentType: "select",
    options: [
      { id: "amul", label: "Amul" },
      { id: "nestle", label: "Nestlé" },
      { id: "parle", label: "Parle" },
      { id: "britannia", label: "Britannia" },
      { id: "pepsico", label: "PepsiCo" },
      { id: "localfarm", label: "Local Farm" },
    ],
  },
  {
    label: "Price (₹)",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price (₹)",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter discount price (optional)",
  },
  {
    label: "Stock Quantity",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter available quantity",
  },
];

export const shoppingViewHeaderMenuItems = [
  { id: "home", label: "Home", path: "/shop/home" },
  { id: "products", label: "All Items", path: "/shop/listing" },
  { id: "fruits", label: "Fruits", path: "/shop/listing" },
  { id: "vegetables", label: "Vegetables", path: "/shop/listing" },
  { id: "dairy", label: "Dairy", path: "/shop/listing" },
  { id: "bakery", label: "Bakery", path: "/shop/listing" },
  { id: "beverages", label: "Beverages", path: "/shop/listing" },
  { id: "search", label: "Search", path: "/shop/search" },
];

export const categoryOptionsMap = {
  fruits: "Fruits",
  vegetables: "Vegetables",
  dairy: "Dairy Products",
  bakery: "Bakery & Snacks",
  beverages: "Beverages",
  packaged: "Packaged Foods",
};

export const brandOptionsMap = {
  amul: "Amul",
  nestle: "Nestlé",
  parle: "Parle",
  britannia: "Britannia",
  pepsico: "PepsiCo",
  localfarm: "Local Farm",
};

export const filterOptions = {
  category: [
    { id: "fruits", label: "Fruits" },
    { id: "vegetables", label: "Vegetables" },
    { id: "dairy", label: "Dairy Products" },
    { id: "bakery", label: "Bakery & Snacks" },
    { id: "beverages", label: "Beverages" },
    { id: "packaged", label: "Packaged Foods" },
  ],
  brand: [
    { id: "amul", label: "Amul" },
    { id: "nestle", label: "Nestlé" },
    { id: "parle", label: "Parle" },
    { id: "britannia", label: "Britannia" },
    { id: "pepsico", label: "PepsiCo" },
    { id: "localfarm", label: "Local Farm" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Name: A to Z" },
  { id: "title-ztoa", label: "Name: Z to A" },
];

export const addressFormControls = [
  {
    label: "Delivery Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your delivery address",
  },
  {
    label: "City / Town",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Delivery Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Add delivery instructions (optional)",
  },
];
