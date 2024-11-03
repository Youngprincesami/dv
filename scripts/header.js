const header = document.getElementById("header");
const toggleButton = document.querySelector(".toggle");
const nav = header.querySelector(".nav");

isActive = false;
// Add event listener to the window object
toggleButton.addEventListener("click", () => {
  if (!isActive) {
    // Add active class to header
    nav.classList.add("active");
    header.classList.add("active");
    isActive = true;
  } else {
    nav.classList.remove("active");
    header.classList.remove("active");
    isActive = false;
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    nav.classList.remove("active");
    header.classList.remove("active");
    // console.log(toggleButton);
    // You can add actions to be taken when the window width is > 700px
  } else {
  }
});
