const express = require("express");
require("dotenv").config();
const cors = require("cors");

const session = require("express-session");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// Session Setup
app.use(
  session({
    // It holds the secret key for session
    secret: "yashpande",

    // Forces the session to be saved
    // back to the session store
    resave: true,
    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: false,
  })
);

let viewsOnWebsite = null;
// Get function in which send session as routes.
app.get("/", function (req, res, next) {
  if (viewsOnWebsite) {
    // Increment the number of views.
    viewsOnWebsite += 1;

    return res.json({
      views: viewsOnWebsite,
    });
  } else {
    viewsOnWebsite = 1;
    return res.json({
      views: viewsOnWebsite,
    });
  }
});

const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, function (err) {
  if (err) {
    console.log("Error:", err);
  }

  console.log("Server is running on port:", port);
});
