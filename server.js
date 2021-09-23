const express = require('express');
const nodemailer = require("nodemailer");
const path = require('path');
const app = express();


const PORT = process.env.PORT || 3000;

//css
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());

//html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contactpage.html')
})


app.post('/', (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'FROM EMAILID',
            pass: 'PASSWORD'
        }
    })

    const mailOptions = {
        form: req.body.email,
        to: 'TO EMAILID',
        subject: `Message from ${req.body.email}: ${req.body.name}`,
        text: `subject: ${req.body.subject} 
                message: ${req.body.message}`
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent:' + info.response)
            res.send('success')
        }
    })
})

app.listen(PORT, ()=> {
    console.log(`server is runnning on POrt ${PORT}`)
})