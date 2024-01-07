
const express = require('express');
const productController = require('../product/controller-product');
const uploads = require('../../../middileware/fileuploads');
const router = express.Router();


// upload.single('imageUrl'),
router.post('/productadd', uploads.single('imageUrl'), productController.productadd);
router.get('/getproducts', productController.getproduct);
router.get('/gebyid/:id', productController.getbyid);
router.get('/productupdate/:id', productController.updateproduct);
router.get('/filterproduct', productController.filterProducts);
router.post('/ratingproduct', productController.ratingproduct);
router.get('/getproductbyid/:id', productController.getproductByid);
// router.delete('/delteproduct/:id', productController.deleteproduct);

module.exports = router;
