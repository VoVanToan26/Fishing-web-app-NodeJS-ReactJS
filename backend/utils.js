// define t SOME ultility function like generateToken export const jena rate tokan
import jwt from "jsonwebtoken";
import mg from "mailgun-js";
import dotenv from "dotenv";
dotenv.config();
export const generateToken = (user) => {
    // obj user for generateToken, jsonwetoken secret,
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
        },
        // create data to encrypt
        process.env.JWT_SECRET || "somethingsecret",
        {
            expiresIn: "30d",
        },
    );
    //sing{userObject,}
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    // console.log("authorization", authorization);
    if (authorization) {
        // Cắt chuỗi  từ index=6
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
        // console.log("token", token);
        //jwt.verify(token, secretOrPublicKey, [options, callback])
        jwt.verify(token, process.env.JWT_SECRET || "somethingsecret", (err, decode) => {
            if (err) {
                res.status(401).send({ message: "Invalid Token" });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        res.status(401).send({ message: "No Token" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: "Invalid Admin Token" });
    }
};

export const isSeller = (req, res, next) => {
    if (req.user && req.user.isSeller) {
        next();
    } else {
        res.status(401).send({ message: "Invalid Seller Token" });
    }
};

export const isSellerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
        next();
    } else {
        res.status(401).send({ message: "Invalid Admin/Seller Token" });
    }
};

export const mailgun = () =>
    mg({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    });

export const payOrderEmailTemplate = (order) => {
    return `<h1>Thanks for shopping with us</h1>
  <p>
  Hi ${order.user.name},</p>
  <p>We have finished processing your order.</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>Product</strong></td>
  <td><strong>Quantity</strong></td>
  <td><strong align="right">Price</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
      .map(
          (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.qty}</td>
    <td align="right"> $${item.price.toFixed(2)}</td>
    </tr>
    `,
      )
      .join("\n")}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items Price:</td>
  <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Tax Price:</td>
  <td align="right"> $${order.taxPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Shipping Price:</td>
  <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Price:</strong></td>
  <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Payment Method:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Shipping address</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Thanks for shopping with us.
  </p>
  `;
};

