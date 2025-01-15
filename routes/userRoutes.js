const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const User = require('../models/user');

const router = express.Router();

router.get('/dashboard', authenticate, (req, res) => {
    res.status(200).send(`Welcome to the dashboard, user ID: ${req.user.id}`);
});

router.post('/assign-roles', authenticate, authorize(['assign_roles']), async (req, res) => {
    const { userId, roles } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        user.roles = roles;
        await user.save();
        res.status(200).send('Roles updated successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
