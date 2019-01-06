const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

// Item model
const User = require('../../models/User');

// @route GET api/items
// @desc GET All items
// @access public
router.get('/', (req, res) => {
    User.find()
        .sort({ data: -1 })
        .then(users => res.json(users))
});

// @route POST api/items
// @desc create a contact
// @access public
router.post('/', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ user: "user already exists" });
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', // rating
                    d: 'mm' //rating
                })

                const newUser = new User({
                    name: req.body.name,
                    address: req.body.address,
                    email: req.body.email,
                    avatar,
                    phone: req.body.phone
                });
                newUser.save().then(user => res.json(user));

            }
        })
});

// @route POST api/items
// @desc create a contact
// @access public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove()
            .then(() => res.json({ success: true }))
        ).catch(err => res.status(404).json({ success: false }))
});
module.exports = router;