const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
//initialize admin SDK using serciceAcountKey
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
