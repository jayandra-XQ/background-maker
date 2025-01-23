import express from 'express';
import User from '../models/user.js'




const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register', body: '' });
})


// route for register 
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ name })
    if (existingUser) {
      return res.send('Username already exist')
    }

    const newUser = new User({ name, email, password })
    await newUser.save()
    res.redirect('/login')

  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user.');
  }
})

router.get('/login', (req, res) => {
  res.render('login', { title: 'login', body: '' })
});

// route for login
router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name, password })

    if (user) {
      req.session.user = user
      res.redirect('/')
    } else {
      res.send('Invalid credentials')
    }

  } catch (error) {
    console.error(error)
    res.status(500).send('Error logging in.')
  }
})

// route for logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

export default router;


