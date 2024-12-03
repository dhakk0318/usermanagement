const User = require('../models/User'); // Import the User model


const createUser = async (req, res) => {
    try {
      const { name, email, phoneNumber } = req.body;
  
      const newUser = new User({
        name,
        email,
        phoneNumber,
        photo: req.file.filename // Assuming photo is uploaded via multer
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phoneNumber,
        photo: req.file ? req.file.filename : undefined // Only update photo if it's provided
      },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
