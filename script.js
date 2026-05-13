function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('open');
}

function filterProjects(category) {
  const chips = document.querySelectorAll('.filter-chip');
  const projects = document.querySelectorAll('.project-card');

  chips.forEach(chip => {
    chip.classList.remove('active');
    if (chip.textContent === category) {
      chip.classList.add('active');
    }
  });

  projects.forEach(project => {
    if (category === 'All' || project.dataset.category === category) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}

function handleSubmit(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  // Replace this with your actual form submission logic
  // For now, just construct a mailto link
  const subject = `Project Request: ${data.service}`;
  const body = `Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Service: ${data.service}
Message: ${data.message || 'No additional message'}`;

  const mailtoLink = `mailto:eight888studios@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Close mobile menu if open
      const navLinks = document.getElementById('navLinks');
      navLinks.classList.remove('open');
    }
  });
});
