// Import require modules
import 'dotenv/config'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'
import session from 'express-session';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.js'

import { connectDB } from './lib/db.js';


// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//initialize the app
const app = express();
app.use(express.json())


//set the view engine to ejs
app.set('view engine', 'ejs');

// express session
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.use('/', authRoutes);

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;

// Define routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Background Maker',
    body: ' '
  }); // Render 'index.ejs' template
});


app.get('/protected', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user.username}! This is protected content.`);
  } else {
    res.redirect('/login');
  }
});

// Start the server on port 4000
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
  connectDB(); // Connect to MongoDB
});