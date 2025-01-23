// Import require modules
import 'dotenv/config'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'

import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';


// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//initialize the app
const app = express();

app.use(express.json())
app.use(cookieParser());

//set the view engine to ejs
app.set('view engine', 'ejs');

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


// Start the server on port 4000
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
  connectDB(); // Connect to MongoDB
});