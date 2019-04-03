const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!', error)  //加return是为了阻止函数继续执行下去
    }
    console.log('connected!');
});

app.get('/', (req, res) => {res.send('hello!')});

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});