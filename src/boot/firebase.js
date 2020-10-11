import firebase from "firebase/app";

// Import needed firebase modules
import "firebase/auth";
import "firebase/database";

// Firebase app config
const config = {
  apiKey: "AIzaSyD0A5wcXqaw6FbNBRglP10saDS9udW2uX8",
  authDomain: "vue-chat-app-c0259.firebaseapp.com",
  databaseURL: "https://vue-chat-app-c0259.firebaseio.com",
  projectId: "vue-chat-app-c0259",
  storageBucket: "vue-chat-app-c0259.appspot.com",
  messagingSenderId: "753029664715",
  appId: "1:753029664715:web:fcd84d93e044443feab04e"
};

// Init our firebase app
firebase.initializeApp(config);
