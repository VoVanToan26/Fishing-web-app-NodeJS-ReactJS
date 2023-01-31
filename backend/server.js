/* eslint-disable no-unused-vars */
import http from "http";
import { Server } from "socket.io";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
// user file .env to get aut, ...
dotenv.config();
const app = express();

// use middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
//through by 2 setting or 2 middleware

// connect data base use clound DB
mongoose
    .connect(
        process.env.MONGODB_URL ||
            "mongodb+srv://vantoan26:vantoan1@toan.hmtbaxg.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .then(() => console.log("MongoDB Connected!"))
    .catch((error) => console.log("MongoDB did not connect: ", error));
// define router
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/uploads", uploadRouter);

// add paypal payment
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// Add gg map
app.get("/api/config/google", (req, res) => {
    res.send(process.env.GOOGLE_API_KEY || "");
});

// put a slash upload file to sever folder (slash-GPC)
const __dirname = path.resolve(); // --> return current folder

// add status folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// The build folder with static assets is the only output produced by Create React App.
app.use(express.static(path.join(__dirname, "frontend", "build")));

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    const index = path.join(__dirname, "frontend", "build", "index.html");
    res.sendFile(index);
});
// example
// app.get('/', (req, res) => {
//     res.send('Sever is ready');
// });
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

//   });

// put a slash upload file to sever folder (slash-GPC)
const port = process.env.PORT || 5000;
console.log("port", port);

// app.listen(port, () => {
//     console.log(`Sever at http://localhost:${port}`);
// });

// WEB SOCKET
// Create http Sever form http package frm node js
const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const users = [];
// when we have new user in client
///Handle khi có connect từ client tới sever
io.on("connection", (socket) => {
    console.log("socket", socket);

    socket.on("disconnect", () => {
        // Tìm user đang kết nối với socket id
        const user = users.find((x) => x.socketId === socket.id);

        if (user) {
            // Change status tu offline
            user.online = false;
            console.log("Offline", user.name);

            const admin = users.find((x) => x.isAdmin && x.online);

            if (admin) {
                // show the message to the admin
                io.to(admin.socketId).emit("updateUser", user);
            }
        }
    });

    //we have new users in admin chart page
    socket.on("onLogin", (user) => {
        console.log("login socket:", user);
        const updatedUser = {
            ...user,
            online: true,
            socketId: socket.id,
            messages: [], // reset messages
        };
        // if exist user in userarrray
        const existUser = users.find((x) => x._id === updatedUser._id);
        if (existUser) {
            // update socketid and status
            existUser.socketId = socket.id;
            existUser.online = true;
        } else {
            // insert to user array
            users.push(updatedUser);
        }

        console.log("Online", user.name);
        const admin = users.find((x) => x.isAdmin && x.online);
        if (admin) {
            io.to(admin.socketId).emit("updateUser", updatedUser);
        }
        if (updatedUser.isAdmin) {
            io.to(updatedUser.socketId).emit("listUsers", users);
        }
    });

    socket.on("onUserSelected", (user) => {
        const admin = users.find((x) => x.isAdmin && x.online);
        if (admin) {
            const existUser = users.find((x) => x._id === user._id);
            io.to(admin.socketId).emit("selectUser", existUser);
        }
    });

    socket.on("onMessage", (message) => {
        if (message.isAdmin) {
            const user = users.find((x) => x._id === message._id && x.online);
            if (user) {
                io.to(user.socketId).emit("message", message);
                user.messages.push(message);
            }
        } else {
            const admin = users.find((x) => x.isAdmin && x.online);
            if (admin) {
                io.to(admin.socketId).emit("message", message);
                const user = users.find((x) => x._id === message._id && x.online);
                user.messages.push(message);
            } else {
                io.to(socket.id).emit("message", {
                    name: "Admin",
                    body: "Sorry. I am not online right now",
                });
            }
        }
    });
});

httpServer.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});
