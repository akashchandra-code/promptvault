const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register user
async function registerUser(req, res) {
    const { username, name, email, password } = req.body;
    if(!username || !name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const existingUser = await userModel.findOne({
            $or: [{ email }, { username }]
        });
        if(existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, name, email, password: hashedPassword });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure:true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).json({ message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                name: newUser.name,
                email: newUser.email
            }
         });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
//login user
async function loginUser(req, res) {
    console.log("Login attempt received");
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "Please provide username/email and password",
      });
    }

    const isEmail =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    // Find user by email OR username
    const user = await userModel.findOne(
      isEmail ? { email: identifier } : { username: identifier }
    ).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

     const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
        httpOnly: true,
        secure:true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({ message: 'Login successful',
        token,
        user: {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email
        }
        });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
    console.error("Login error:", error);
  }
};


//get current user
async function getCurrentUser(req, res) {
    return res.status(200).json({ user: req.user });
}

//logout user
async function logoutUser(req, res) {
    const token = req.cookies?.token;
    if(!token) {
        return res.status(400).json({ message: 'No token found' });
    }
    res.clearCookie('token',{
        httpOnly: true,
        secure:true
    });
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
};