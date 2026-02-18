const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  console.error("❌ Error: Missing Upstash URL or Token in .env");
  process.exit(1);
}

// Ensure no trailing slash on URL for fetch concatenation
const cleanUrl = url.replace(/\/$/, "");

async function sendCommand(command: (string | number)[]) {
  const response = await fetch(cleanUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });
  return await response.json();
}

async function run() {
  const region = "in"; // Region code
  const streamKey = `betteruptime:website:${region}`;
  const groupName = `group-${region}`;

  console.log(`\n🔧 Initializing Stream Infrastructure for: ${region}`);
  console.log(`   Stream Key: ${streamKey}`);
  console.log(`   Group Name: ${groupName}`);

  // 1. Create Stream (XADD)
  // We assume this works, or validates the stream exists.
  console.log("\n1️⃣  Creating/Verifying Stream...");
  const xaddRes = await sendCommand(["XADD", streamKey, "*", "type", "INIT"]);

  if (xaddRes.error) {
    console.error("❌ Stream Creation Failed:", xaddRes.error);
    process.exit(1);
  }
  console.log("✅ Stream Verified. Event ID:", xaddRes.result);

  // 2. Create Consumer Group (XGROUP CREATE)
  console.log("\n2️⃣  Creating Consumer Group...");

  // Attempt 1: Standard creation
  // We DO NOT send MKSTREAM here because step 1 already ensured the stream exists.
  // Sending MKSTREAM when the stream exists is valid, but skipping it is safer for "Invalid XGROUP" errors.
  const groupRes = await sendCommand(["XGROUP", "CREATE", streamKey, groupName, "0"]);

  if (groupRes.result === "OK") {
    console.log("✅ SUCCESS: Consumer Group created!");
  } else if (groupRes.error) {
    if (groupRes.error.includes("BUSYGROUP")) {
      console.log("✅ SUCCESS: Consumer Group already exists.");
    } else {
      console.error("❌ FAILED:", groupRes.error);
      console.log("\n⚠️  Debugging info:");
      console.log("   URL:", cleanUrl);
      console.log("   Command sent:", `["XGROUP", "CREATE", "${streamKey}", "${groupName}", "0"]`);
      process.exit(1);
    }
  }

  console.log("\n✨ Infrastructure Ready. You can restart your worker now.");
}

run();