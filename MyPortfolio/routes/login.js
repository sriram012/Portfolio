var express = require('express');
// require('firebase/firebase-app');
// require('firebase/firebase-auth');
// require('firebase/firebase-firestore');
var firebase = require('firebase');

// require('https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js');
// require('https://www.gstatic.com/firebasejs/6.0.2/firebase-auth.js');
// require('https://www.gstatic.com/firebasejs/6.0.2/firebase-firestore.js');



var app = express();
var router = express.Router();



/*
    method = [GET] => Go to login page...
*/
router.get('/', (request, response) => {
    response.render('login', {layout: false});
});




/* 
    method = [POST] => Authenticate with submitted credentials...
*/
// General login page...
router.post('/', (request, response) => {
    var email = request.body.email;
    response.send('Email: ' + email);
});
// Google Sign in...
router.get('/google', (request, response) => {
    initializeFirebaseApp();
    googleSignIn();
});




/*
    Initializing Firebase App...
*/
function initializeFirebaseApp() {
    var firebaseConfig = {
        apiKey: "AIzaSyCvmM-LF1rJ_ztVgkZElIhXkkwAEw1Juz8",
        authDomain: "protfolio-fa3e5.firebaseapp.com",
        databaseURL: "https://protfolio-fa3e5.firebaseio.com",
        projectId: "protfolio-fa3e5",
        storageBucket: "protfolio-fa3e5.appspot.com",
        messagingSenderId: "442993637183",
        appId: "1:442993637183:web:ba065e494e0c744e"
    };
    console.log(firebase.apps);
    if(firebase.apps.length == 0) {
        firebase.initializeApp(firebaseConfig);
    }
}


/*
    Google Singin...
*/
function googleSignIn() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function(result) {
            console.log(result);
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        })
        .catch(function(error) {
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
}



module.exports = {
    router: router,
    isAutheticated: isAutheticated,
};



/*
    General use functions...
*/

// Check if any user is logged in...
function isAutheticated(request, response) {
    var user = firebase.auth().currentUser;
    if(user == null) {
        return false;
    }
    return true;
}
