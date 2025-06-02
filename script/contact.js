// Contact Form - Contact Page
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const status = document.getElementById('formStatus');
  
    fetch('https://formspree.io/f/meokjbyy', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.textContent = "Message sent successfully!";
        status.style.color = "green";
        form.reset();
      } else {
        status.textContent = "Oops! Something went wrong.";
        status.style.color = "red";
      }
    }).catch(error => {
      status.textContent = "Error: " + error.message;
      status.style.color = "red";
    });
  });
  