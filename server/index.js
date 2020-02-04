const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieSession=require('cookie-session');
const passport=require('passport');
const keys=require('./config/keys');

require('./models/User'); // beware: this has to be before passport otherwise there's the schema error
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000, // 30 days
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);

app.listen(process.env.PORT || 5000,() => {
    console.log('listening');
});

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

app.get('/googlea0f1138ad69fe3bf.html',(req,res) => {
    res.sendFile(path.join(__dirname,'./googlea0f1138ad69fe3bf.html'));
});
    
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'./index.html'));
});