const User = require("./user.module");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



module.exports.SignUp = async (req, res) => {
  const { email, password, type } = req.body;
  try {
   

    const user = new User({ email, password, type });
    const newUser = await user.save();
    res.json({ message: "Successfully SignUp", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// const token = jwt.sign({ id: user._id }, "C7766321BB4EBB18", { expiresIn: "1h" });


module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email is not found" });
    }

    // Check if the user's password is valid
    if (!user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // If the password is valid, create a JWT token
    const token = jwt.sign({ id: user._id }, "C7766321BB4EBB18", { expiresIn: "1h" });

    // Set the JWT token as an HTTP-only cookie
    res.cookie("jwt", token, { httpOnly: true });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};