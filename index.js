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
app.get('/about', function (req, res) {
  res.render("about");
});
app.get('/client', function (req, res) {
  res.render("client");
});
app.get('/contact', function (req, res) {
  res.render("contact");
});
app.get('/send', function (req, res) {
  res.redirect("contact");
});
app.get('/index', function (req, res) {
  res.render("index");
});
app.get('/service', function (req, res) {
  res.render("service");
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

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'frwebdesigns1@gmail.com', // generated ethereal user
      pass: '56nTk46!!'  // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Website Contact" <frwebdesigns1@gmail.com>', // sender address
    to: 'football45353@gmail.com, frwebdesigns1@gmail.com', // list of receivers
    subject: 'Website Contact Request', // Subject line
    text: 'Contact Request', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
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
