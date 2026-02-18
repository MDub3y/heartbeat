const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

// Remove trailing slash if present
const cleanUrl = url?.replace(/\/$/, "");

async function sendCommand(command: string[]) {
  const response = await fetch(cleanUrl!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });
  return await response.json();
}

async function verify() {
  const region = "in";
  const streamKey = `betteruptime:website:${region}`;

  console.log(`\n🔍 Verifying Infrastructure for: ${region}`);

  // 1. Check Stream Info
  const streamInfo = await sendCommand(["XINFO", "STREAM", streamKey]);
  if (streamInfo.error) {
    console.error("❌ Stream Error:", streamInfo.error);
  } else {
    console.log("✅ Stream Exists!");
    // Simplified output log
    console.log("   Details:", "Length:", streamInfo.result[1], "| First Entry:", streamInfo.result[17]?.[0]);
  }

  // 2. Check Consumer Groups
  const groupInfo = await sendCommand(["XINFO", "GROUPS", streamKey]);
  if (groupInfo.error) {
    console.error("❌ Group Error:", groupInfo.error);
  } else {
    // Result is an array of group objects. We check if ours is in there.
    // XINFO GROUPS returns: [[ "name", "group-in", "consumers", 0, ... ]]
    const groups = groupInfo.result;
    const myGroup = groups.find((g: any) => g.includes && g.includes(`group-${region}`));

    if (groups.length > 0) {
      console.log("✅ Consumer Group Found!");
      console.log("   Group Name:", groups[0][1]); // The name is usually at index 1
    } else {
      console.error("❌ No Consumer Groups found.");
    }
  }
}

verify();