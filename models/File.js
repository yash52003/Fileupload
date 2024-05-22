const mongoose = require("mongoose");
const transporter = require("../config/mailConfig"); // Adjust the path as necessary

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
});

fileSchema.post("save", async function (doc) {
    try {
        console.log("DOC", doc);

        // Send mail
        let info = await transporter.sendMail({
            from: `CodeHelp - By Yash Choudhary <${process.env.MAIL_USER}>`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html: `<h2>Hello Jee</h2> <p>File Uploaded</p> View here : <a href="${doc.imageUrl}"> ${doc.imageUrl} </a>`,
        });

        console.log("INFO", info);
    } catch (error) {
        console.error(error);
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
