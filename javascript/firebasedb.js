
push.addEventListener("click", e => {
  console.log(workout);
})

//test to realtime database
let text = document.getElementById("dblink");
const dblinkText = firebase.database().ref().child('text');

dblinkText.on('value', snap => text.innerText = snap.val());

dblinkObj = firebase.database().ref().child('Workouts');

dblinkObj.on('value', snap => text.innerText = snap.val());
dblinkObj.on('value', snap => console.log(snap.val()));

//pushing object text


//dblinkObj.


function writeUserData(userID, name){
  database.ref('users/' + userId).set({
    name: name
  });
}








