const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createRepository (req , res) {
    const  { owner , name , issues , content , description , visibility } = req.body;
    
    try{
        if(!name){
            return res.status(400).json({error : "Repository name is required"});
        }

        if(!mongoose.Types.ObjectId.isValid(owner)){
            return res.status(400).json({error : "User id is required"});
        }

        const newRepository = new Repository({
            name,
            description,
            visibility,
            owner,
            content,
            issues
        });

        const result = await newRepository.save();

        res.status(201).json({
            message : "Repository created",
            repositoryID : result._id,
        })
    } catch (err) {
        console.error("Error during repository creation ", err);
        return res.status(500).json({ message: "Server error!" });
    }
}

async function  getAllRepository (req , res) {
    res.send("All repository fetched !");
}

async function  fetchRepositoryById  (req , res){
    res.send("Repository details fetched");
}


async function  fetchRepositoryByName (req , res) {
    res.send("Repository details fetched");
}


async function  fetchRepositoryForCurrentUser (req , res) {
    res.send("Repository for Logged In user fetched !!");
}


async function  updateRepositoryById(req , res) {
    res.send("Repository  updated !");
}

async function  toggleVisibilityById (req ,res) {
    res.send("Visibility toggled !");
}

async function  deleteRepositoryById  (req ,res){
    res.send("Delete Repository By Id");
}



module.exports = {
    createRepository,
    getAllRepository,
    fetchRepositoryById,
    fetchRepositoryByName,
    fetchRepositoryForCurrentUser,
    updateRepositoryById,
    toggleVisibilityById,
    deleteRepositoryById
}
