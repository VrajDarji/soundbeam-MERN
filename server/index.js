const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const stripe = require("stripe")(
  "sk_test_51NkehuSGYPcSkVrjK4OnQHyhDp3mEX5O9b7lVg3YAg13Eo6qnRiHm8vFwvnoN3EygVwaveJ4u7nYlYM4JlH2hCV800V00rRO9l"
);
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

const domain = "http://localhost:3000";

const cart = mongoose.model("cart", {
  id: Number,
  color: String,
  cc: String,
  img: String,
  title: String,
  sTitle: String,
  price: String,
  qty: Number,
  uid: String,
});
const user = mongoose.model("user", {
  user_id: String,
  email: String,
  name: String,
});
const server = () => {
  mongoose
    .connect(
      "mongodb+srv://vrajdarji573:cdQT4QjOef24IAop@cluster0.z8hoiq1.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log("failed to connect");
      console.error(err);
    });
  app.listen(8080, () => {
    console.log("live on 8080");
  });
};
app.get("/api/v1/data", async (req, res) => {
  try {
    const a = await cart.find();
    res.json(a);
  } catch (err) {
    console.error(err);
  }
});
app.post("/api/v1/data", async (req, res) => {
  const a = req.body;
  try {
    const c = new cart({
      id: a?.id,
      color: a?.color,
      cc: a?.cc,
      img: a?.img,
      title: a?.title,
      sTitle: a?.sTitle,
      price: a?.price,
      qty: a?.qty,
      uid: a?.uid,
    });
    const s = await c.save();
    res.json(s);
  } catch (err) {
    console.error(err);
  }
});
app.delete("/api/v1/data/:id", async (req, res) => {
  const id = req.params.id;
  const d = await cart.findByIdAndDelete(id);
  try {
    if (d);
    res.json({ m: "deleted" });
  } catch (err) {
    console.error(err);
  }
});
app.post("/create-checkout-session", async (req, res) => {
  const a = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: parseFloat(a.price),
            product_data: {
              name: a.name,
            },
          },
          quantity: a.quantity,
        },
      ],
      mode: "payment",
      success_url: a.success_url,
      cancel_url: a.cancel_url,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create a checkout session" });
  }
});
app.get("/create-checkout-session", async (req, res) => {
  res.json({ url: "Hi" });
});
var currentUser;
app.post("/api/v1/user", async (req, res) => {
  const a = req.body;
  currentUser = a;
  try {
    const b = new user({
      user_id: a?.uid,
      email: a?.email,
      name: a?.displayName,
    });
    const s = await b.save();
    res.json(s);
  } catch (err) {
    console.error(err);
  }
});
app.get("/api/v1/user", async (req, res) => {
  try {
    res.json(currentUser);
  } catch (err) {
    console.error(err);
  }
});
server();
