const fs = require("fs").promises;  // File system module ko promises ke saath load kiya taaki async/await use kar sakein.


const path = require("path");  // Path module ka use kiya file aur folder ke raste (paths) sahi se manage karne ke liye.


async function addRepo(filePath) { // Ye function ek 'filePath' leta hai, yaani us file ka naam jise aap stage karna chahte ho.
     

    const repoPath = path.resolve(process.cwd(), ".meraGit"); // Aapke current folder mein jo '.meraGit' directory hai, uska absolute path nikala.
    

    const stagingPath = path.join(repoPath, "staging"); // .meraGit ke andar ek 'staging' naam ka folder setup karne ke liye path banaya.
    

    try {
        // Step 1: Ensure staging folder exists
        await fs.mkdir(stagingPath, { recursive: true });
        // Agar 'staging' folder pehle se nahi hai, toh use create kiya. 
        // { recursive: true } ka matlab hai agar parent folder (.meraGit) bhi nahi hai toh wo bhi ban jaye.

        // Step 2: Check if source file actually exists
        try {
            await fs.access(filePath); // Check kiya ki jo file aap add kar rahe ho, wo sach mein aapke PC par hai ya nahi.
            
        } catch (e) { // Agar file nahi mili toh error message dikhakar function ko yahin rok diya.
            
            console.error(`Error: File "${filePath}" does not exist in the current directory.`);
            return;
        }

        const fileName = path.basename(filePath); // Poore path se sirf file ka naam nikala (jaise 'C:/user/hello.txt' se sirf 'hello.txt').
        

        const destinationPath = path.join(stagingPath, fileName); // Staging folder ke andar file kahan save hogi, uska poora path taiyar kiya.
        

        // Step 3: Copy file to staging
        await fs.copyFile(filePath, destinationPath);   // File ko original jagah se uthakar '.meraGit/staging' folder mein copy kar diya.
      
        
        console.log(`✅ File ${fileName} added to staging area`); // Terminal par success message dikhaya.
        

    } catch (err) {
        console.error("❌ Error adding File: ", err.message); // Agar poore process mein koi bhi technical error aaya toh use catch kiya.
        
    }
}

module.exports = { addRepo }; // Is function ko export kiya taaki hum ise index.js ya kisi aur file se call kar sakein.
