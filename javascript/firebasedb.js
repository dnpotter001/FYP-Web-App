
const database = firebase.database();

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

pushButton.addEventListener("click", () => {
  let date = new Date()
  let timestamp = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
  let time = new Date().getTime();
  let userWorkoutRef = users.child(newUser).child('workouts').push();
  userWorkoutRef.set({
    "time": time,
    "date" : timestamp, 
    workout,
  });
  console.log('user ref: ' + userWorkoutRef);
  
});
//retrieving data 



/*to do
-make sure data is not deleted
-

*/








