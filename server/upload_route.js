const express = require("express");
const router = express.Router();
const upload = require("./services/awsupload");

const singleUpload = upload.single('image');

router.post('/upload', (req, res) => {
    singleUpload(req, res, err => {
        if (err) return res.status(422).send({errors: {title: 'Invalid upload', detail: err.message}});
        return res.json({'imageUrl': req.file.location})
    })
});

module.exports = router;