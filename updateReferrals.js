const admin = require("firebase-admin");

// Initialize Firebase
const serviceAccount = require("./serviceAccountKey.json"); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://starx-network-default-rtdb.firebaseio.com"
});

const db = admin.database();

async function updateReferrals() {
  try {
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");
    const updates = {};
    let count = 0;

    snapshot.forEach((childSnapshot) => {
      const user = childSnapshot.val();
      if (user.referredBy === "yağlı") {
        updates[`${childSnapshot.key}/referredBy`] = "frtygl";
        count++;
      }
    });

    if (count > 0) {
      await usersRef.update(updates);
      console.log(`Referral updates completed successfully! Updated ${count} user(s).`);
    } else {
      console.log("No users found with referredBy = 'yağlı'.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error updating referrals:", error);
    process.exit(1);
  }
}

updateReferrals();
