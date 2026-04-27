const getAllUsers = (req,res)=>{
    res.send("All users fetched!");
}

const signup = (req,res)=>{
    res.send("signing up!");
}

const login = (req,res) =>{
    res.send("Logging in !")
}

const getUserProfile = (req ,res)=>{
    res.send("Profile fetched!");
}

const updateUserProfile = (req,res) =>{
    res.send("Profile update !");
}

const deleteUserProfile = (req,res)=>{
    res.send("profile deleted !");
}


module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}