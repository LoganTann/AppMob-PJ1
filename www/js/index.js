alert("Je suis là");

document.addEventListener("DOMContentLoaded", function() {
    const content = document.querySelector(".content");
    content.addEventListener("click", function() {
        alert("Je suis cliqué");
    });
});