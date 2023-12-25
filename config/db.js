const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console,'db is not connect'));
db.once('open', function(){
    console.log('db is connect');
})

