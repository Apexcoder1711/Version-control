const { supabase } = require("./config/supabase-config");

async function checkConnection() {
    // Ye command bas check karegi ki storage access ho raha hai ya nahi
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
        console.log("❌ Connection Fail ho gaya:", error.message);
    } else {
        console.log("✅ Supabase Connected! Aapke buckets hain:");
        data.forEach(bucket => console.log(`- ${bucket.name}`));
    }
}

checkConnection();