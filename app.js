require('dotenv').config()
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const db = require('./config/db');


const productRouter = require('./SRC/feature/product/router-products');
const userRouter = require('./SRC/feature/user/user.router');
const cartitem = require('./SRC/feature/cartitem/router.cartitem');
const jwtAuth = require('./middileware/auth.middileare');
app.use(express.json());



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cartitem',cartitem );






app.listen(port, function(err){
    if(err){
        console.log('server is not running', port);
    }
    console.log('server is running on port', port);
})



