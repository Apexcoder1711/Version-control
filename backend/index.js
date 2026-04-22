const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');


const { initRepo } = require("./controllers/init"); 
const { addRepo } = require("./controllers/add"); 

yargs(hideBin(process.argv))
  .command(
    "init", 
    "Initialize the new repository", 
    {}, 
    initRepo
  )


  .command(
    "add <file>", 
    "Add file to the repo", 
    (yargs) => {yargs.positional("file" , {
        describe : "File to add the staging area",
        type : "string"
    });
    }, 
    addRepo
  )
  .demandCommand(1, "You need at least one command")
  .help()
  .parse(); // Use .parse() instead of .argv for better reliability