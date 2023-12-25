const Cartitem = require('../cartitem/model.cartitem');
// this is add cartitmm controller 
module.exports.addcart = async(req, res)=>{
    const {productId, userId, quantity, id} = req.body;
    try {
        const newitem = new Cartitem({productId, userId, quantity, id});
        const item = await newitem.save();
        res.json({message:'Item added successfully', newitem: item});
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}