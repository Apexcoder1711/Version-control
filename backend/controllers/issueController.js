const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createIssue(req , res){
    const {title , description} = req.body;
    const {id} = req.params;
    
    try{
        const issue = new Issue({
            title,
            description,
            repository : id,
        })

        await issue.save();

        res.status(201).json(issue);
    }catch(err){
        console.error("Error during issue creation : " , err.message);
        res.status(500).send("server error");
    }
};


async function updateIssueById (req , res){
    const {id } = req.params;
    const {title , description , status} = req.body;
    try{
        const issue = await Issue.findById(id);

        if(!issue){
            return res.status(404).json({error : "Issue not found"});
        }

        issue.title = title;
        issue.status = status;
        issue.description = description;

        await issue.save();

        res.json(issue , {message : "Issue updated"});

    }catch(err){
        console.error("Error during fetching issue : " , err.message);
        res.status(500).send("server error");
    }
};


async function deleteIssueById (req , res){
    const {id} = req.params;
    try{
        const issue = await Issue.findByIdAndDelete(id);

        if(!issue){
            return res.status(404).json({error : "Issue not found"});
        }

        res.json({message : "Issue deleted"});
    }catch(err){
        console.error("Error during issue deletion: " , err.message);
        res.status(500).send("server error");
    }
};


async function getAllIssues (req , res) {
    const {id } = req.params;
    try{
        const issues = await Issue.find({repository : id});
        if(!issue){
            return res.status(404).json({error : "Issue not found"});
        }
        res.status(200).json(issues);
    }catch(err){
        console.error("Error during fetching issues: " , err.message);
        res.status(500).send("server error");
    }
};

async function getIssueById (req , res){
    const {id } = req.params;

    try{
        const issue = await Issue.findById(id);

        if(!issue){
            return res.status(404).json({error : "Issue not found"});
        }



        res.json(issue);

    }catch(err){
        console.error("Error during fetching issue : " , err.message);
        res.status(500).send("server error");
    }    
};

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById
}

