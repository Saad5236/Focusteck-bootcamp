let form = document.querySelector("form");
let number = document.querySelector(".number");
form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("HEY", number.value);
})