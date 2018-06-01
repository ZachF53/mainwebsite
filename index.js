const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// Load View
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Contact Route
app.get('/index', (req, res) => {
  res.render('index');
});

// Add Route
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/port', (req, res) => {
  res.render('port');
});
app.get('/service', (req, res) => {
  res.render('service1');
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
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'imap-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'zachery@firstresponsewebdesign.com', // generated ethereal user
        pass: '56nTk46!'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <zachery@firstresponsewebdesign.com>', // sender address
      to: 'football45353@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
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


app.listen(3000, () => console.log('Server started...'));
