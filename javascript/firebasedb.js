
//test to realtime database
let text = document.getElementById("dblink");
const dblinkText = firebase.database().ref().child('text');


dblinkText.on('value', snap => text.innerText = snap.val());

dblinkObj = firebase.database().ref().child('Workouts');

dblinkObj.on('value', snap => text.innerText = snap.val());
dblinkObj.on('value', snap => console.log(snap.val()));

//pushing object text
const users = firebase.database().ref().child('users');
const newUser = 'David';

users.child(newUser).set({
  "fistname" : "david",
  "lastname" : "Potter",
  "age" : "21"
});

//push workout obj to real time database
const pushButton = document.getElementById("pushToFirebase");

pushButton.addEventListener("click", () => {
  users.child(newUser).child('workouts').set(workout)
});












