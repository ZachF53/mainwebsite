const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.set('port', (process.env.PORT || 80))

// Load View
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Contact Route
app.get('/', (req, res) => {
  res.render('index');
});

// Add Route
app.get('/index', (req, res) => {
  res.render('index');
});
app.get('/port', (req, res) => {
  res.render('port');
});
app.get('/service', (req, res) => {
  res.render('service');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/blog', (req, res) => {
  res.render('blog');
});
app.get('/landing', (req, res) => {
  res.render('landing');
});
app.get('/paralax', (req, res) => {
  res.render('paralax');
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.firstname} ${req.body.lastname}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'frwebdesigns1@gmail.com',
        pass: '56nTk46!!'
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Website Contact" <frwebdesigns1@gmail.com>',
      to: 'football45353@gmail.com, frwebdesigns1@gmail.com', 
      subject: 'Website Contact Request', 
      text: 'Contact Request', 
      html: output
  };


  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact');
  });
});


app.listen(app.get('port'), function() {
 console.log("Node app is running at localhost:" + app.get('port'))
})
