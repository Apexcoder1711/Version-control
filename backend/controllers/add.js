const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
    const repoPath = path.resolve(process.cwd(), ".meraGit");
    const stagingPath = path.join(repoPath, "staging");

    try {
        // Step 1: Ensure staging folder exists (Ye miss ho gaya tha)
        await fs.mkdir(stagingPath, { recursive: true });

        // Step 2: Check if source file actually exists
        try {
            await fs.access(filePath);
        } catch (e) {
            console.error(`Error: File "${filePath}" does not exist in the current directory.`);
            return;
        }

        const fileName = path.basename(filePath);
        const destinationPath = path.join(stagingPath, fileName);

        // Step 3: Copy file to staging
        await fs.copyFile(filePath, destinationPath);
        
        console.log(`✅ File ${fileName} added to staging area`);
    } catch (err) {
        console.error("❌ Error adding File: ", err.message);
    }
}

module.exports = { addRepo };