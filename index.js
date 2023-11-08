require('dotenv').config();
const express = require('express');
const port = process.env.PORT || '8080';
const app = express();
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            align-items: center;
            justify-content: center;
            background-color: #f0f0f0;
            padding: 30px;
            margin: 0;
            height: 100vh;
          }
          h1 {
            font-size: 3rem;
            color: #ff6347;
            display: flex;
            align-items: center;
          }
          .emoji {
            font-size: 2rem;
            margin-right: 10px;
          }
        </style>
      </head>
      <body>
        <h1><span class="emoji">🏥</span>Welcome To Hospital API <span class="emoji">🚑</span></h1>
      </body>
    </html>
  `);
});


// Loading the router
app.use('/', require('./routes/index'));

// Starting the server
app.listen(port, function (err) {
  if (err) {
    console.log('Error in starting the server');
  }
  console.log(`Server is up and running on Port ${port}`);
});
