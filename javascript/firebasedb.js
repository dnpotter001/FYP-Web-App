
push.addEventListener("click", e => {
  console.log(workout);
})

//test to realtime database
let text = document.getElementById("dblink");
const dblink = firebase.database().ref().child('text');

dblink.on('value', snap => text.innerText = snap.val())


function writeUserData(userID, name){
  database.ref('users/' + userId).set({
    name: name
  });
}






