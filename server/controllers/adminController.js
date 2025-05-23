const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const createToken = require('../utils/generateToken');

//login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await user.findOne({ email })

        if (!admin || admin.role !== 'admin') {
            return res.status(401).json({ error: "Admin not found" })
        }

        //compare password
        const passwordMatch = await bcrypt.compare(password, admin.password)

        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid password" })
        }

        const token = createToken(admin._id, admin.role);
        const adminObject = admin.toObject();
        delete adminObject.password; // Remove password from the response

        res.status(200).json({message: "Admin login successful",
            adminObject,
            token
        });

            
    } catch (error) {
         console.log(error)
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    
    }
}

//logout
const adminLogout = async (req, res) =>{
    try {
        res.clearCookie("token");
    res.status(200).json({ success: true, message: "Admin logged out successfully" }) 

    } catch (error) {
        console.log(error);
    res.status(500).json({ error: "Something went wrong" })
    }
}


 //delete
 const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};



module.exports = { adminLogin, adminLogout,deleteUser};