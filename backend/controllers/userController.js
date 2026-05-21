const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ReturnDocument } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

var ObjectId = require("mongodb").ObjectId;

const uri = process.env.MONGO_URI;

let client;

async function connectClient() {
    if(!client){
        client = new MongoClient(uri);

        await client.connect();
    }
}



async function signup(req,res){
    const {username , password , email } = req.body;
    try{
        await connectClient();
        const db = client.db("gitClone");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({username});
        if(user){
            return res.status(400).json({message : "user already exists !"});
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const newUser = {
            username,
            password : hashedPassword,
            email ,
            repositories : [] , 
            followedUsers : [] ,
            starRepos : []
        }

        const result = await usersCollection.insertOne(newUser);

        const token = jwt.sign(
            { id:result.insertedId },
            process.env.JWT_SECRET_KEY,
            {expiresIn : "1h"}
        );

        res.json({token , userId:result.insertedId});
    }catch(err){
        console.error("Error during signup :" , err.message);
        res.status(500).send("server error");
    }
}

async function login(req,res){
    const { email , password } = req.body;
    try{
       await connectClient();
        const db = client.db("gitClone");
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({email});
        if(!user){
            return res.status(500).json({message : "Invalid credentials !"});
        } 

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(500).json({message : "Invalid credentails !"});
        }

        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET_KEY , {expiresIn : "1h"});
        res.json({token , userId:user._id});
    }catch(err){
        console.error("Error during login " , err);
        res.status(500).send("Server error !");
    }
}

async function getAllUsers (req,res){
    try{
        await connectClient();
        const db = client.db("gitClone");
        const usersCollection = db.collection("users");

        const users = await usersCollection.find({}).toArray();
        res.json(users);

    }catch(err){
        console.error("Error during fetching " , err);
        res.status(500).send("Server error !");
    }
}


async function getUserProfile  (req ,res){
    const currentId = req.params.id;

    if (!ObjectId.isValid(currentId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try{
        await connectClient();
        const db = client.db("gitClone");
        const usersCollection = db.collection("users");


        const user = await usersCollection.findOne({
            _id: new ObjectId(currentId),
        })

        if(!user){
            return res.status(404).json({message : "user not found !"});
        }

        return res.status(200).json(user);
    }catch(err){
        console.error("Error during fetching " , err);
        res.status(500).send("Server error !");
    }
}

// Make sure ObjectId and bcrypt are imported at the top
// const { ObjectId } = require('mongodb');
// const bcrypt = require('bcrypt');

async function updateUserProfile(req, res) {
    const currentId = req.params.id;
    const { email, password } = req.body;

    // 1. Validate ID format first
    if (!ObjectId.isValid(currentId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        await connectClient();
        const db = client.db("gitClone");
        const usersCollection = db.collection("users");
        
        // 2. Safely construct updateFields (Data loss fix)
        let updateFields = {};
        
        // Sirf tabhi add karo jab data request mein bheja gaya ho
        if (email) {
            updateFields.email = email;
        }
        
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = hashedPassword;
        }

        // Agar user ne empty body bhej di toh DB call bachane ke liye early return
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "Please provide email or password to update" });
        }

        const result = await usersCollection.findOneAndUpdate(
            { _id: new ObjectId(currentId) },
            { $set: updateFields },
            { returnDocument: "after" }
        );

        // 3. Driver compatibility fix (Handles both old v5 and new v6 driver formats)
        const updatedUser = result.value || result;

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Send updated user back safely
        return res.status(200).json(updatedUser);

    } catch (err) {
        console.error("Error during profile update: ", err);
        return res.status(500).json({ message: "Server error!" });
    }
}



// Make sure to import ObjectId at the top
// const { ObjectId } = require('mongodb');

async function deleteUserProfile(req, res) {
    const currentId = req.params.id;

    // 1. Validate ID format first taaki app crash na ho
    if (!ObjectId.isValid(currentId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        await connectClient();
        const db = client.db("gitClone");
        const usersCollection = db.collection("users");

        const result = await usersCollection.deleteOne({
            _id: new ObjectId(currentId),
        });

        // 2. Fix Typo: 'deletedCount' (with a 'd')
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Use status 200 for successful deletion
        return res.status(200).json({ message: "User profile Deleted!" });

    } catch (err) {
        console.error("Error during profile delete: ", err);
        return res.status(500).json({ message: "Server error!" });
    }
}


module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}