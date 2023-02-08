import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";
const uploadRouter = express.Router();
const storage = (folderName) =>
    multer.diskStorage({
        destination(req, file, cb) {
            cb(null, `uploads/images/${folderName}`);
        },
        filename(req, file, cb) {
            cb(null, `${Date.now()}.jpg`);
        },
    });

//upload single file
uploadRouter.post("/:folder", isAuth, (req, res) => {
    const folderName = req.params.folder;
    const upload = multer({ storage: storage(folderName) });
    console.log("folder", folderName);
    upload.single("image")(req, res, (error) => {
        if (error) {
            return res.send(error.message);
        }
        res.send(`/${req.file.path}`);
    });
});

uploadRouter.post("/", isAuth, (req, res) => {
    const upload = multer({ storage: storage() });
    upload.single("image")(req, res, (error) => {
        if (error) {
            return res.send(error.message);
        }
        res.send(`/${req.file.path}`);
    });
});

export default uploadRouter;
