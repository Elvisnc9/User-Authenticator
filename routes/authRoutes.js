const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/register',  (req, res) => {
     console.log('Register route hit');
    const { username, password, roles, groups, permissions } = req.body;

    try {
        const user = new User({ username, password, roles, groups, permissions });
        user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(400).send('Registration failed');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid credentials');

        const token = jwt.sign(
            { id: user._id, roles: user.roles, permissions: user.permissions },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
