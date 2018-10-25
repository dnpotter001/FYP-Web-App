  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAasXA5ssvag-jcCMJQuk6UBc7HyBs-htc",
    authDomain: "mileage-6d74b.firebaseapp.com",
    databaseURL: "https://mileage-6d74b.firebaseio.com",
    projectId: "mileage-6d74b",
    storageBucket: "mileage-6d74b.appspot.com",
    messagingSenderId: "742059742575"
  };
firebase.initializeApp(config);



let text = document.getElementById("dblink");
const dblink = firebase.database().ref().child('text');

dblink.on('value', snap => text.innerText = snap.val())


function writeUserData(userID, name){
  database.ref('users/' + userId).set({
    name: name
  });
}






