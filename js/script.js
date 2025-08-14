document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".menu-toggle");
  const links = document.querySelector(".links");
  const icon = toggleBtn.querySelector("i");

  if (!toggleBtn || !links) {
    console.error("Menu toggle or links element not found");
    return;
  }

  toggleBtn.addEventListener("click", () => {
    console.log("Toggle clicked"); // Debug
    links.classList.toggle("show");
    console.log("Links classList:", links.classList); // Debug

    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });
});

const links = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll("section");

function updateActiveLink() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", updateActiveLink);

(function () {
  emailjs.init("q-Ku4cSd8vglp_L5i");
})();
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let number = document.getElementById("phone").value;
    let templateParams = {
      to_name: "Rashed Talaat ",
      from_name: name,
      from_email: email,
      from_number: number,
      message: message,
    };
    // send the message to the email
    emailjs.send("service_cmaf79l", "template_s3zghec", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("your message has been sent successfully!");
        document.getElementById("contact-form").reset();
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Failed to send your message. please try again.");
      }
    );
  });
let scrollBtn = document.getElementById("scrollToUp");
window.addEventListener("scroll", () => {
  if ((window, scrollY > 300)) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
