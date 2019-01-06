const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./routes/api/users');
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true } )
    .then(() => console.log("Mong0db connected"))
    .catch(err => console.log(err));

// use routes
app.use('/api/users', users);
    const port = process.env.PORT || 5000;

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.statis('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(port, () => console.log(`Server started on port ${port}`));

