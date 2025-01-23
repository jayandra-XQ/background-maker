import express from 'express';
import Pattern from '../models/pattern.js'
import fs from 'fs'

const router = express.Router();

// Route for generating and saving a new pattern

router.post('/generate-pattern', requireAuth, async (req, res) => {
  try {
    const { patternType, primaryColor, density, size, image } = req.body;

    // Decode base64 image and save it as a file
    const base64Data = image.replace(/^data:image\/png;base64,/, '');
    const filePath = `public/uploads/${Date.now()}-pattern.png`;

    fs.writeFileSync(filePath, base64Data, 'base64');

    //save the pattern to the database
    const newPattern = new Pattern({
      user: req.session.user._id,
      patternType,
      primaryColor,
      density,
      size,
      image: filePath,
    });
    await newPattern.save();
    res.status(201).json({ message: 'Pattern saved successfully', pattern: newPattern })
  } catch (error) {
    res.status(500).json({ message: 'Error saving pattern', error: error.message })
  }
})

//Route for fetching all saved patterns for the logged in user 
router.get('/my-patterns', requireAuth, async (req, res) => {
  try {
    const patterns = await Pattern.find({ user: req.session.user._id });
    res.status(200).json(patterns)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patterns', error: error.message })
  }
})

export default router