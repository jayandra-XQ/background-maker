import express from 'express';
import Pattern from '../models/pattern.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Middleware to protect routes
function requireAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Route for generating and saving a new pattern

router.post('/generate-pattern', requireAuth, (req, res) => {
  const { image, patternType, primaryColor, density, size } = req.body;

  if (!image || !patternType || !primaryColor || !density || !size) {
    return res.status(400).send('Missing required data');
  }

  const uploadDir = path.join(__dirname, '..', 'public', 'uploads');

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create uploads folder if it doesn't exist
  }

  const filePath = path.join(uploadDir, `pattern-${Date.now()}.png`);
  const base64Data = image.replace(/^data:image\/png;base64,/, ''); // Strip off base64 prefix

  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      console.log('Error saving pattern:', err);
      return res.status(500).send('Failed to save pattern.');
    }

    const newPattern = new Pattern({
      image: filePath,  // Path to the saved image
      patternType,
      primaryColor,
      density,
      size,
      user: req.session.user._id,  // Associate the pattern with the logged-in user's ID
    });

    newPattern.save()
      .then(() => res.status(200).send('Pattern saved successfully!'))
      .catch((err) => {
        console.log('Error saving pattern to database:', err);
        res.status(500).send('Failed to save pattern to database.');
      });
  });
});


//Route for fetching all saved patterns for the logged in user 
router.get('/my-patterns', requireAuth, async (req, res) => {
  try {
    const patterns = await Pattern.find({ user: req.session.user._id });
    res.render('my-patterns', { patterns });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patterns', error: error.message })
  }
})


export default router