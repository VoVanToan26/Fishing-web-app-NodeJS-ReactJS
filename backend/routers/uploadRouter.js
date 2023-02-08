import multer from 'multer';
import express from 'express';
import {  isAuth } from '../utils.js';

const uploadRouter = express.Router();
// define storage path
const storage = multer.diskStorage({
    destination(req, file, cb) {
        //
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        // null is no error  + name_fiel. format file
        cb(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({ storage });
//upload signle file 
uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});


export default uploadRouter;