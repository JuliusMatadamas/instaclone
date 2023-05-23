const mongoose = require('mongoose')
require('dotenv').config({path:'.env'});

mongoose.connect(process.env.BD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log(`Error code: ${err.code}`, `Error message: ${err.message}`);
})
