const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, 'video-' + createFileName() + ".webm")
    }
});
const upload = multer({ storage: storage });

const toDateString = t => t.toString().padStart(2, "0");
function createFileName() {
    const d = new Date();
    return [
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ].map(t => toDateString(t)).join("-");
}

const app = express();
app.use('/', express.static(__dirname + '/public'));

app.post('/fileUpload', upload.single("webm"), function (req, res, next) {
    res.status(200).json({
        message: "ok!"
    });
});

app.listen(80, function () {
    console.log('Example app listening!');
});
