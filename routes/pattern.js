import express from 'express';
import Pattern from '../models/pattern.js'

const router = express.Router();

// Route for generating and saving a new pattern

router.post('/generate-pattern', requireAuth, async (req, res) => {
  try {
    const { patternType, primaryColor, density, size, image } = req.body;

    //save the pattern to the database
    const newPattern = new Pattern({
      user: req.session.user._id,
      patternType,
      primaryColor,
      density,
      size,
      image
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