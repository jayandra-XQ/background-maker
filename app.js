// Import require modules
import 'dotenv/config'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'
import session from 'express-session';
import bodyParser from 'body-parser';
import { dirname } from 'path';


import authRoutes from './routes/auth.js'
import patternRoutes from './routes/pattern.js'

import { connectDB } from './lib/db.js';


const app = express();
const PORT = process.env.PORT || 4000;

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// express session
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

//set the view engine to ejs
app.set('view engine', 'ejs');



app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', authRoutes);
app.use('/pattern', patternRoutes)


// Middleware to protect routes
function requireAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/', requireAuth, (req, res) => {
  if (req.session.user) {
    res.render('index', {
      title: 'Background Maker',
      body: ' ',
      user: req.session.user
    });
  } else {
    res.redirect('/login');  // Redirect to login if not authenticated
  }
});

// Start the server on port 4000
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
  connectDB(); // Connect to MongoDB
});