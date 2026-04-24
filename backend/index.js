const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const bodyParser = require("body-parser");


const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

dotenv.config();

yargs(hideBin(process.argv))
  .command("start", "Start a new server ! ", {}, startServer)
  .command("init", "Initialize the new repository", {}, initRepo)

  .command(
    "add <filePath>",
    "Add file to the repo",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.filePath);
    },
  )

  .command(
    "commit <message>",
    "commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    },
  )

  .command("push", "push commits to S3", {}, pushRepo)

  .command("pull", "push commits from S3", {}, pullRepo)

  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "commit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    },
  )

  .demandCommand(1, "You need at least one command")
  .help()
  .parse(); // Use .parse() instead of .argv for better reliability


function startServer(){
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());
  app.use(express.json());

  const mongoURI = process.env.MONGO_URI;
  console.log(`Runnig on Port ${port} `)
  mongoose.connect(mongoURI).then(()=>{
    console.log("MongoDB connected")
  }).catch((err)=>{
    console.error("Unable to connect " , err);
  })
}