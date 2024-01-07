const Product = require("../product/modules-product");

module.exports.productadd = async (req, res) => {
  const { name, desc, price, category, sizes } = req.body;
  const imageUrl = req.file.filename;
  try {
    const product = new Product({
      name,
      desc,
      price,
      imageUrl,
      category,
      sizes,
    });
    const newproduct = await product.save();
    res.json({ message: "Product added successfully", product: newproduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.getproduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (err) {
    res.status(500).json("err" + err);
  }
};

module.exports.getbyid = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!Product) {
      res.status(404).json({ message: "Product is not find" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json("err" + err);
  }
};

module.exports.updateproduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!Product) {
      res.status(404).json({ message: "Product is not find" });
    }
    product.set(req.body);
    const newproduct = await product.save();
    res.json(newproduct);
  } catch (err) {
    res.status(500).json("err" + err);
  }
};

module.exports.deletedproduct = async (req, res) => {};

module.exports.filterProducts = async (req, res) => {
  try {
    const { name, category, price } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: new RegExp(name, "i") };
    if (category) filter.category = category;

    // Handle the price range
    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      if (minPrice) filter.price = { $gte: minPrice };
      if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };
    }

    const filteredProducts = await Product.find(filter);
    console.log(filteredProducts);

    res.json({
      message: "Products filtered successfully",
      products: filteredProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// rating a products

module.exports.ratingproduct = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Access the ratings array from the product object, not directly from the Product model
    product.ratings.push({
      userId,
      rating,
      comment,
    });

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// module.exports.gettbyId = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     const newproduct = await product.save();
//     res.status(200).json(newproduct);
//   } catch (error) {
//     res.status(500).json({ message: "Server is Error" });
//   }
// };
module.exports.getproductByid = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const ratings = product.ratings || [];
  
      if (ratings.length === 0) {
        return res.json({
          product,
          averageRating: 0, // or any default value you want to provide
        });
      }
  
      const averageRating =
        ratings.reduce((total, rating) => total + rating.rating, 0) /
        ratings.length;
  
      res.json({
        product,
        averageRating,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  
// delete a product is not use using some time 
module.exports.deleteproduct = async(req, res)=>{
    try {
        const ratingproduct = await Product.findByIdAndDelete(req.params.id);
        if(ratingproduct){
            res.status(404).json({Error: 'user is not found'});
        }
        res.json({message:'user is delete'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });  
    }
}


