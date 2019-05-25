var firebase = require('firebase');

// <!-- The core Firebase JS SDK is always required and must be listed first -->

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#config-web-app -->

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
    firebase.initializeApp(firebaseConfig);
}

module.exports = initializeFirebaseApp;
