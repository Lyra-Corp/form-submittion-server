const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const multer = require('multer');
const cors = require('cors');

app.use(cors({
    origin:"*"
}));
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded());
// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
        user: 'lyramailer@gmail.com', // your email
        pass: 'udvzwkfdldjmxwev' // your password
    }
});
const upload = multer()
// Route to handle POST request and send email
app.post('/send-email', (req, res) => {
    // const { to, subject, text } = req.body;
    console.log(req.body);
    // Email options
    const mailOptions = {
        from:  'lyramailer@gmail.com',
        to: 'info@lyracorp.in',
        subject: "hello",
        html: `
        <h4>Name : ${req.body?.name}</h4>
        <h4>email : ${req.body?.email}</h4>
        <h4>phone : ${req.body?.phone}</h4>
        <h4>message : ${req.body?.msg}</h4>

        `
    };

    // Sending email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
            res.status(500).send('Error occurred while sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
    res.sendStatus(200)
});


// app.post('/career', (req, res) => {
//     // const { to, subject, text } = req.body;
//     console.log(req.body?.resume)
//     // Email options
//     const mailOptions = {
//         from:  'lyramailer@gmail.com',
//         to: 'farisahammedali@lyracorp.in',
//         subject: "hello",
//         text: "files",
//         attachments: [{
//             filename: "resume.pdf",
//             content: res.body?.resume
//         }]
//     };

//     // Sending email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error occurred:', error);
//             res.status(500).send('Error occurred while sending email');
//         } else {
//             console.log('Email sent:', info.response);
//             res.status(200).send('Email sent successfully');
//         }
//     });
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is listening`);
});
