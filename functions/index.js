const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({
  apiKey: "AIzaSyAPn1ddQ10XUQcwb4QQtRuc2BLx-dbZ0c4",
  authDomain: "makeit-5f8a9.firebaseapp.com",
  databaseURL: "https://makeit-5f8a9.firebaseio.com",
  projectId: "makeit-5f8a9",
  storageBucket: "makeit-5f8a9.appspot.com",
  messagingSenderId: "1096218029195"
});
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.status(200).send("Hello, World!");
});
// exports.fcmSend = functions.database.ref("/turboGames").onCreate(event => {
//   const message = event.after.val();
//   const userId = event.params.userId;

//   const payload = {
//     notification: {
//       title: message.title,
//       body: message.body,
//       icon: "https://placeimg.com/250/250/people"
//     }
//   };

//   admin
//     .database()
//     .ref(`/fcmTokens/${userId}`)
//     .once("value")
//     .then(token => token.val())
//     .then(userFcmToken => {
//       return admin.messaging().sendToDevice(userFcmToken, payload);
//     })
//     .then(res => {
//       console.log("Sent Successfully", res);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });
