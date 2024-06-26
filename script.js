function callToAction() {
    alert(
      "Thank you for your interest! Please fill out the form below to get in touch."
    );
  }
  
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      alert(
        "Thank you for contacting me, " +
          document.getElementById("name").value +
          "! I will get back to you soon."
      );
    });