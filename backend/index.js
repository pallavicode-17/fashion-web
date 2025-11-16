
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

import os from 'os';

const port = process.env.PORT || 4000;
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// DB connection (consider moving connection string to .env as MONGO_URI)
const mongoUri = process.env.MONGO_URI || "mongodb+srv://pal_123:12345@cluster0.yx3ael2.mongodb.net/fashion";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const Order = mongoose.model("Order", {
  id: { type: String, required: true, unique: true }, // string id like "ord_123"
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "Order Packed" },
  // add to Order schema definition
userId: { type: String, required: false }, // required: true if you always require login

  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  summary: {
    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number,
  },
  paymentMethod: String,
  meta: Object,
});


// quick debug route
app.get('/products-debug', (req, res) => {
  console.log('DEBUG /products-debug hit — query:', req.query);
  res.json([{ id: 1, name: 'debug sample', category: 'men', image: '/img/placeholder.png' }]);
});

app.get("/", (req,res) => res.send("Express App is Running"));

// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req,file,cb) => cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// static images
app.use('/images', express.static('upload/images'));

// upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: 0, message: 'No file uploaded' });

  // prefer env var if present
  const hostFromEnv = process.env.API_URL;
  const host = hostFromEnv || `${req.protocol}://${req.get('host')}`;

  const imageUrl = `${host.replace(/\/$/, "")}/images/${encodeURIComponent(req.file.filename)}`;

  res.json({ success: 1, image_url: imageUrl });
});

// Schemas (you can move these to separate files later)
const Product = mongoose.model("Product",{
  id:{type: Number, required: true},
  name:{type: String, required: true},
  image:{type: String, required: true},
  category:{type: String, required: true},
  new_price:{type: Number, required: true},
  old_price:{type: Number, required: true},
  date:{type: Date, default: Date.now},
  available:{type: Boolean, default: true},
});

const User = mongoose.model("User", {
  name:{type: String},
  email:{type: String, unique: true},
  password:{type: String},
  cartData:{type: Object},
  date:{type:Date, default: Date.now}
});

// addproduct, removeproduct, allproducts, newcollection... (unchanged)
// I will only keep the product endpoints you already had for brevity

app.post('/addproduct', async (req,res) => {
  try {
    let all_products = await Product.find({}).sort({ id: 1 }).exec();
    let id = (all_products.length > 0) ? (all_products[all_products.length-1].id + 1) : 1;

    const product = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price
    });
    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (err) {
    console.error('/addproduct error', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.post('/removeproduct', async (req,res) => {
  try {
    await Product.findOneAndDelete({id:req.body.id});
    res.json({ success: true, name: req.body.name });
  } catch (err) {
    console.error('/removeproduct error', err);
    res.status(500).json({ success:false, error: 'Server error' });
  }
});

app.get('/allproducts', async (req,res) => {
  const all_products = await Product.find({});
  res.json(all_products);
});

app.get('/newcollection', async (req,res) => {
  const all_products = await Product.find({}).sort({ date: -1 }).limit(8).exec();
  res.json(all_products);
});

// robust fetchUser middleware
const fetchUser = async (req, res, next) => {
  const header = req.header('auth-token') || req.header('token') || req.header('authorization');
  if (!header) {
    return res.status(401).send({ error: "Please authenticate using a valid token (no token found)" });
  }

  // handle "Bearer <token>" as well
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : header;

  try {
    // Use env secret consistently
    const secret = process.env.JWT_SECRET || 'secret_ecom';
    const data = jwt.verify(token, secret);
    // data format depends on how you signed; earlier you used { user: { id: user.id } }
    req.user = data.user || data; 
    next();
  } catch (err) {
    console.error('fetchUser verify error', err);
    return res.status(401).send({ error: "Please authenticate using a valid token (invalid signature or token expired)" });
  }
};


// getcart, addtocart, removefromcart, signup, login endpoints (same logic with small safety)
app.post('/getcart', fetchUser, async (req,res) => {
  try {
    const userData = await User.findById(req.user.id).exec();
    if (!userData) return res.status(404).json(null);
    res.json(userData.cartData);
  } catch (err) {
    console.error('/getcart error', err);
    res.status(500).json(null);
  }
});
app.post('/addtocart', fetchUser, async (req,res) => {
  try {
    const userData = await User.findById(req.user.id).exec();
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;
    await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

    return res.status(200).json({ success: true, message: "Added to Cart", cartData: userData.cartData });
  } catch (err) {
    console.error('/addtocart error', err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post('/removefromcart', fetchUser, async (req,res) => {
  try {
    const userData = await User.findById(req.user.id).exec();
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    userData.cartData[req.body.itemId] = Math.max((userData.cartData[req.body.itemId] || 0) - 1, 0);
    await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

    return res.status(200).json({ success: true, message: "Removed from Cart", cartData: userData.cartData });
  } catch (err) {
    console.error('/removefromcart error', err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


app.post('/signup', async (req,res) => {
  try {
    let check = await User.findOne({email:req.body.email});
    if (check) return res.status(400).json({success: false, error: "Existing user found with same email address"});

    let cart = {};
    for(let i = 0; i < 300; i++) cart[i] = 0;

    const user = new User({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart
    });

    await user.save();
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_ecom');
    res.json({ success: true, token });
  } catch (err) {
    console.error('/signup error', err);
    res.status(500).json({ success:false, error: 'Server error' });
  }
});

app.post('/login', async (req,res) => {
  try {
    const user = await User.findOne({email:req.body.email});
    if (!user) return res.json({success: false, error: "User does not exist"});
    const passwordCompare = req.body.password === user.password;
    if (!passwordCompare) return res.json({success: false, error: "Invalid Password"});
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_ecom');
    res.json({ success: true, token });
  } catch (err) {
    console.error('/login error', err);
    res.status(500).json({ success:false, error: 'Server error' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const { category, limit = 12, page = 1 } = req.query;
    const numericLimit = parseInt(limit, 10) || 12;
    const skip = (parseInt(page, 10) - 1) * numericLimit;

    if (!category) {
      const all = await Product.find({}).skip(skip).limit(numericLimit).exec();
      return res.json(all);
    }

    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') }
    }).skip(skip).limit(numericLimit).exec();

    return res.json(products);
  } catch (err) {
    console.error('GET /products error:', err);
    return res.status(500).json({ success: 0, message: 'Server error' });
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    const idParam = req.params.id;
    let product;
    if (/^\d+$/.test(idParam)) {
      product = await Product.findOne({ id: Number(idParam) }).exec();
    } else {
      product = await Product.findById(idParam).exec();
    }
    if (!product) return res.status(404).json({ success: 0, message: 'Product not found' });
    return res.json(product);
  } catch (err) {
    console.error('GET /product/:id error', err);
    return res.status(500).json({ success: 0, message: 'Server error' });
  }
});
// POST /orders — require authentication and save userId
app.post("/orders", fetchUser, async (req, res) => {
  try {
    const body = req.body;

    if (!body || !Array.isArray(body.items) || body.items.length === 0) {
      return res.status(400).json({ success: false, error: "Invalid order payload" });
    }

    const id = body.id || `ord_${Date.now()}`;
    const orderDoc = new Order({
      id,
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
      status: body.status || "Order Packed",
      userId: req.user?.id,               // now safe, fetchUser guarantees req.user exists
      customer: body.customer || {},
      items: body.items,
      summary: body.summary || {},
      paymentMethod: body.paymentMethod || "cod",
      meta: body.meta || {},
    });

    await orderDoc.save();
    res.status(201).json({ success: true, id: orderDoc.id });
  } catch (err) {
    console.error("/orders POST error:", err);
    if (err.code === 11000) {
      return res.status(409).json({ success: false, error: "Order id collision" });
    }
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Read all orders (admin -> GET /orders)
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }).exec();
    res.json(orders);
  } catch (err) {
    console.error("/orders GET error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
// GET /orders/mine — returns only this user's orders
app.get("/orders/mine", fetchUser, async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Not authenticated" });

    // Try to return orders associated by userId first
    let orders = await Order.find({ userId }).sort({ createdAt: -1 }).exec();
    if (!orders || orders.length === 0) {
      // Fallback: try to find by customer's email (covers legacy orders)
      // load user to get email
      const user = await User.findById(userId).exec();
      if (user && user.email) {
        orders = await Order.find({ "customer.email": user.email }).sort({ createdAt: -1 }).exec();
      }
    }
    res.json(orders || []);
  } catch (err) {
    console.error("/orders/mine GET error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});



app.listen(port, () => console.log(`Server running on port ${port}`));
