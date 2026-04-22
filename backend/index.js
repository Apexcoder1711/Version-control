const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');


const { initRepo } = require("./controllers/init"); 
const { addRepo } = require("./controllers/add"); 
const { commitRepo } = require("./controllers/commit"); 
const { pushRepo } = require("./controllers/push"); 
const { pullRepo } = require("./controllers/pull"); 
const { revertRepo } = require("./controllers/revert"); 

yargs(hideBin(process.argv))

  .command(
    "init", 
    "Initialize the new repository", 
    {}, 
    initRepo
  )


  .command(
    "add <filePath>", 
    "Add file to the repo", 
    (yargs) => {yargs.positional("file" , {
        describe : "File to add the staging area",
        type : "string"
    });
    }, 
    (argv) =>{
      addRepo(argv.filePath);
    }
  )

  .command(
    "commit <message>", 
    "commit the staged files", 
    (yargs) => {yargs.positional("message" , {
        describe : "commit message",
        type : "string"
    });
    }, 
    commitRepo
  )

  .command(
    "push", 
    "push commits to S3", 
    {}, 
    pushRepo
  )

  .command(
    "pull", 
    "push commits from S3", 
    {}, 
    pullRepo
  )



  .command(
    "revert <commitID>", 
    "Revert to a specific commit", 
    (yargs) => {yargs.positional("commitID" , {
        describe : "commit ID to revert to",
        type : "string"
    });
    }, 
    revertRepo
  )

  .demandCommand(1, "You need at least one command")
  .help()
  .parse(); // Use .parse() instead of .argv for better reliability