importScripts("https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js");

var config = {
  apiKey: "AIzaSyAPn1ddQ10XUQcwb4QQtRuc2BLx-dbZ0c4",
  authDomain: "makeit-5f8a9.firebaseapp.com",
  databaseURL: "https://makeit-5f8a9.firebaseio.com",
  projectId: "makeit-5f8a9",
  storageBucket: "makeit-5f8a9.appspot.com",
  messagingSenderId: "1096218029195"
};
firebase.initializeApp(config);

messaging.onMessage(function(payload) {
  console.log("Message received. ", payload);
  // ...
});
