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

dotenv.config();
const app = express();

// use middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
//through by 2 setting or 2 middleware

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

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/uploads", uploadRouter);
app.get("/api/config/paypal", (req, res) => {
    console.log("paypal id",process.env.PAYPAL_CLIENT_ID || "sb");
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
// Add gg map
app.get("/api/config/google", (req, res) => {
    res.send(process.env.GOOGLE_API_KEY || "");
});
// put a slash upload file to sever folder (slash-GPC)
const __dirname = path.resolve(); // --> return current folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// The build folder with static assets is the only output produced by Create React App.
app.use(express.static(path.join(__dirname, "frontend", "build")));

console.log(path.join(__dirname, "frontend", "build"));
console.log(path.join(__dirname, "frontend", "build", "index.html"));
// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
    const index = path.join(__dirname, "frontend", "build", "index.html");
    res.sendFile(index);
});
// app.get('/', (req, res) => {
//     res.send('Sever is ready');
// });
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

// const httpSever = http.Server(app);
// const io = SocketIO(httpSever);
// const users = [];
// io.on('connection', (socket) => {
//   console.log('connection', socket.id);
//   socket.on('disconnect', () => {
//     const user = users.find((x) => x.socketId === socket.id);
//     if (user) {
//       user.online = false;
//       console.log('Offline', user.name);
//       const admin = users.find((x) => x.isAdmin && x.online);
//       if (admin) {
//         io.to(admin.socketId).emit('updateUser', user);
//       }
//     }
//   });

// put a slash upload file to sever folder (slash-GPC)
const port = process.env.PORT || 5000;
console.log("port", port);
// app.listen(port, () => {
//     console.log(`Sever at http://localhost:${port}`);
// });

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const users = [];

io.on("connection", (socket) => {
    console.log("connection", socket.id);
    socket.on("disconnect", () => {
        const user = users.find((x) => x.socketId === socket.id);
        if (user) {
            user.online = false;
            console.log("Offline", user.name);
            const admin = users.find((x) => x.isAdmin && x.online);

            if (admin) {
                io.to(admin.socketId).emit("updateUser", user);
            }
        }
    });
    //
    socket.on("onLogin", (user) => {
        const updatedUser = {
            ...user,
            online: true,
            socketId: socket.id,
            messages: [],
        };

        const existUser = users.find((x) => x._id === updatedUser._id);
        if (existUser) {
            existUser.socketId = socket.id;
            existUser.online = true;
        } else {
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