const fs = require("fs").promises; // fs module import kiya promises support ke saath taaki hum 'await' use kar sakein.


const path = require("path"); // path module import kiya file paths ko sahi se handle karne ke liye (Windows/Linux compatibility).


const { v4: uuidv4 } = require("uuid"); // uuid library se v4 function liya hai jo har commit ke liye ek unique random ID generate karega.


async function commitRepo(message) {// commitRepo function banaya jo 'message' argument leta hai (jaise git commit -m "message").
  

  const repoPath = path.resolve(process.cwd(), ".meraGit"); // Current working directory mein .meraGit folder ka absolute path find kiya.
  

  const stagedPath = path.join(repoPath, "staging"); // .meraGit ke andar 'staging' folder ka path jahan temporary files rakhi hain.
  

  const commitPath = path.join(repoPath, "commits"); // .meraGit ke andar 'commits' folder ka path jahan permanent history save hogi.
  

  try {
    const commitID = uuidv4(); // Ek unique ID generate ki (e.g., '1b9d6bcd-bbfd-4b2d...').
    

    const commitDir = path.join(commitPath, commitID); // Commits folder ke andar is unique ID ke naam ka ek naya folder path banaya.
    

    await fs.mkdir(commitDir, { recursive: true }); // Is unique ID waale folder ko physically create kiya.
    

    const files = await fs.readdir(stagedPath);  // Staging area mein jitni bhi files hain, un sabki list read ki.
    

    for (const file of files) { // Har ek file par loop chalaya taaki use commit folder mein move kar sakein.
      

      await fs.copyFile( // File ko 'staging' se uthakar naye bane 'commit' folder mein copy kar diya.
        path.join(stagedPath, file),
        path.join(commitDir, file)
      );
      
    }

    await fs.writeFile( // Commit ka metadata (message aur timestamp) ek JSON file mein save kar diya.
        path.join(commitDir , "commit.json"),
        JSON.stringify({message, date : new Date().toISOString()})
    );
    

    console.log(`Commit ${commitID} created with message : ${message}`) // Success message print kiya terminal par.
    

  } catch (err) {
    console.error("Error commiting files : " , err); // Agar folder banane ya file copy karne mein error aaye toh use catch kiya.
    
  }
}

module.exports = { commitRepo }; // Is function ko export kiya taaki index.js ya kisi aur file mein use kar sakein.
