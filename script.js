document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var form = event.target;
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
          form.reset();
          document.getElementById('response-message').style.display = 'block';
      } else {
          alert('There was an issue submitting the form. Please try again.');
      }
  };
  xhr.send(formData);
});



$(document).ready(function () {
  $('.carousel').carousel({
    interval: 5000
  });
});

$(document).ready(function () {
  $('.carousel').carousel({
    interval: 5000
  });
});


const typingText = document.getElementById('typing-text');
const phrases = [
  "I'm a Web Designer",
  'Software Developer',
  'Graphics Designer',
  'UI/UX Product Designer',
  'Music lover, Tech and Science Enthusiast'
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let darkMode = false; // Set initial mode based on your actual toggle

function typePhrase() {
  const phrase = phrases[currentPhraseIndex];
  typingText.textContent += phrase[currentCharIndex];
  currentCharIndex++;
  updateTextColor(); // Ensure text color is updated
  if (currentCharIndex < phrase.length) {
    setTimeout(typePhrase, 50);
  } else {
    setTimeout(erasePhrase, 1000);
  }
}

function erasePhrase() {
  typingText.textContent = typingText.textContent.slice(0, -1);
  currentCharIndex--;
  updateTextColor(); // Ensure text color is updated
  if (currentCharIndex > 0) {
    setTimeout(erasePhrase, 50);
  } else {
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    setTimeout(typePhrase, 1000);
  }
}

function updateTextColor() {
  if (darkMode) {
    typingText.style.color = 'white';
  } else {
    typingText.style.color = 'black';
  }
}

// Start typing effect when the page loads
document.addEventListener('DOMContentLoaded', () => {
  typePhrase();
});

// Toggle dark mode function
function toggleDarkMode() {
  darkMode = !darkMode;
  updateTextColor(); // Update text color based on the new mode
}

// Example dark mode toggle button
const toggleButton2 = document.getElementById('theme-toggle-2');
const icon2 = document.getElementById('icon-2');

toggleButton2.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode'); // Toggle class for dark mode

  if (document.body.classList.contains('dark-mode')) {
    icon2.classList.remove('fa-sun');
    icon2.classList.add('fa-moon');
    darkMode = true;
  } else {
    icon2.classList.remove('fa-moon');
    icon2.classList.add('fa-sun');
    darkMode = false;
  }
  updateTextColor(); // Update text color after toggling dark mode
});





document.addEventListener('DOMContentLoaded', function () {
  const meters = document.querySelectorAll('.fill');

  meters.forEach(meter => {
    const percent = meter.getAttribute('data-percent');
    meter.style.setProperty('--percent', percent + '%');
    meter.style.animationDuration = `${percent * 0.1 + 4}s`; /* Slower animation */
  });
});






function animateCounter(element, endValue) {
  let currentValue = 0;
  let interval;
  let paused = false;

  function animate() {
    interval = setInterval(() => {
      if (!paused) {
        currentValue++;
        element.textContent = currentValue;
        if (currentValue >= endValue) {
          paused = true;
          setTimeout(() => {
            paused = false;
            currentValue = 0;
          }, 3000);
        }
      }
    }, 70);
  }

  animate();
}

animateCounter(document.getElementById("years-of-experience"), 4);
animateCounter(document.getElementById("projects-completed"), 30);
animateCounter(document.getElementById("industries-covered"), 15);


const toggleButton = document.getElementById('theme-toggle');
const icon = document.getElementById('icon');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  } else {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
});