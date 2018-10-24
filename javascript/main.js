
//delarations
const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");
const all = document.getElementById("all");

//event listeners
menuButton.addEventListener("click", openClose);
window.addEventListener("resize", resetCSS);

//displays and hides the side menu
function openClose(){
    if (navbar.style.width === "150px") {
        navbar.style.width = "0";
        all.style.marginLeft = "0";
        menuButton.style.left =" 20px";
    } else {
        navbar.style.width = "150px";
        all.style.marginLeft = "150px";
        menuButton.style.left =" 170px";
    }
}

//resets the css when whole browser is resized
function resetCSS(){
  navbar.style.width = "";
  all.style.marginLeft = "";
  menuButton.style.left ="";

}