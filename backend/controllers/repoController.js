const createRepository = (req , res) =>{
    res.send("Repository Created !");
}

const getAllRepository = (req , res) =>{
    res.send("All repository fetched !");
}

const fetchRepositoryById = (req , res) =>{
    res.send("Repository details fetched");
}


const fetchRepositoryByName = (req , res) =>{
    res.send("Repository details fetched");
}


const fetchRepositoryForCurrentUser = (req , res) =>{
    res.send("Repository for Logged In user fetched !!");
}


const updateRepositoryById = (req , res) =>{
    res.send("Repository  updated !");
}

const toggleVisibilityById = (req ,res) =>{
    res.send("Visibility toggled !");
}

const deleteRepositoryById = (req ,res) =>{
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
