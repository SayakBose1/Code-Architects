const aboutSection = document.querySelector(".about-section");
const aboutMeBtn = document.querySelector(".about-me-btn");
const xIcon = document.querySelector(".x-icon");
const navbar = document.querySelector(".navbar");
const socialIcons = document.querySelector(".social-links");
const overlay = document.querySelector(".overlay");
const bodyContainer = document.querySelector("#body-container");
const latestWorks = document.querySelector(".latest-works-link");
const downArrow = document.querySelector(".down-arrow");
const latestWorksArrow = document.querySelector(".latest-works-arrow");
const blackLogo = document.querySelector(".black-logo");
// const contactForm = document.querySelector(".contact");
const sendButton = document.querySelector(".submit-btn");
const mainSection = document.querySelector(".main-section");
const contactSection = document.querySelector(".contact-section");
const contactForm = document.querySelector(".contact-form");
const contactFormElement = document.querySelector(".contact");

//Sun and Moon icon document selector
const icon = document.getElementById("icon");

//form label selection
var contact_section = document.querySelector(".contact-section");
var label1 = contact_section.querySelector(".label1");
var label2 = contact_section.querySelector(".label2");
var label3 = contact_section.querySelector(".label3");

//when icon is clicked theme is toggled
icon.onclick = function () {
  document.body.classList.toggle("dark-theme");

  //if theme is dark then sun icon will be displayed
  if (document.body.classList.contains("dark-theme")) {
    icon.src = "images/sun.png";
  }
  //else moon icon will by default be displayed
  else {
    icon.src = "images/moon.png";
  }
  //if theme is dark then form label is white else will remain black
  label1.style.color = "white";
  label2.style.color = "white";
  label3.style.color = "white";
};

aboutMeBtn.addEventListener("click", () => {
  aboutSection.classList.add("active");
  overlay.classList.add("active");
  navbar.classList.add("hidden");
  navbar.classList.add("hidden");
  socialIcons.classList.add("hidden");
  disableScroll();
});

xIcon.addEventListener("click", () => {
  aboutSection.classList.remove("active");
  overlay.classList.remove("active");
  navbar.classList.remove("hidden");
  socialIcons.classList.remove("hidden");
  enableScroll();
});

overlay.addEventListener("click", () => {
  aboutSection.classList.remove("active");
  overlay.classList.remove("active");
  navbar.classList.remove("hidden");
  socialIcons.classList.remove("hidden");
  enableScroll();
});

// canvas.addEventListener('wheel', (e) => {
//   window.scrollTo(0, (mainSection.clientHeight * e.deltaY) / Math.abs(e.deltaY))
// })

latestWorks.addEventListener("click", (e) => {
  scrollTo(0, mainSection.clientHeight);
});

downArrow.addEventListener("click", (e) => {
  scrollTo(0, mainSection.clientHeight);
});

latestWorksArrow.addEventListener("click", (e) => {
  scrollTo(0, mainSection.clientHeight);
});

blackLogo.addEventListener("click", (e) => {
  scrollTo(0, 0);
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let myForm = contactForm;
  let formData = new FormData(myForm);
  const buttonText = sendButton.innerHTML;
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      sendButton.classList.add("sent");
      sendButton.innerHTML = "Message Sent";
      console.log("Message Sent Successfully");
    })
    .catch((error) => {
      sendButton.classList.add("notSent");
      sendButton.innerHTML = `Something went wrong!`;
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        sendButton.classList.remove("sent");
        sendButton.classList.remove("notSent");
        sendButton.innerHTML = buttonText;
      }, 3000);
    });

  Array.from(contactForm.children).forEach((child, i) => {
    if (!(i % 2)) {
      child.value = "";
    }
  });
});

var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
});

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  console.log("Scroll Disabled");
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  console.log("Scroll Enabled");
}

const features = [
  "Full Stack Web Development",
  "AI & Machine Learning",
  "Image Processing",
  "Scalable Web Solutions",
  "Modern UI & UX Design",
];

let currentIndex = 0;
const featureText = document.getElementById("feature-text");

function rotateFeature() {
  // Step 1: Fade out
  featureText.classList.remove("fade-in");
  featureText.classList.add("fade-out");

  // Step 2: After fade-out, change text
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % features.length;
    featureText.textContent = features[currentIndex];

    // Step 3: Force reflow (CRITICAL LINE)
    void featureText.offsetWidth;

    // Step 4: Fade in again
    featureText.classList.remove("fade-out");
    featureText.classList.add("fade-in");
  }, 600);
}

// Initial state
featureText.classList.add("fade-in");

// Repeat every 5 seconds
setInterval(rotateFeature, 3000);

// Create SVG animation container
const svgContainer = document.createElement("div");
svgContainer.className = "svg-animation-container";
svgContainer.style.cssText = `
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  opacity: 1;
  transition: opacity 0.5s ease;
`;

svgContainer.innerHTML = `
  <svg width="300px" height="300px" viewBox="0 0 32.666 32.666" fill="none" stroke="#1788ae">
    <path class="animated-path" stroke-width="0.2" fill="none" d="M28.189,16.504h-1.666c0-5.437-4.422-9.858-9.856-9.858l-0.001-1.664C23.021,4.979,28.189,10.149,28.189,16.504z
    M16.666,7.856L16.665,9.52c3.853,0,6.983,3.133,6.981,6.983l1.666-0.001C25.312,11.735,21.436,7.856,16.666,7.856z M16.333,0
    C7.326,0,0,7.326,0,16.334c0,9.006,7.326,16.332,16.333,16.332c0.557,0,1.007-0.45,1.007-1.006c0-0.559-0.45-1.01-1.007-1.01
    c-7.896,0-14.318-6.424-14.318-14.316c0-7.896,6.422-14.319,14.318-14.319c7.896,0,14.317,6.424,14.317,14.319
    c0,3.299-1.756,6.568-4.269,7.954c-0.913,0.502-1.903,0.751-2.959,0.761c0.634-0.377,1.183-0.887,1.591-1.529
    c0.08-0.121,0.186-0.228,0.238-0.359c0.328-0.789,0.357-1.684,0.555-2.518c0.243-1.064-4.658-3.143-5.084-1.814
    c-0.154,0.492-0.39,2.048-0.699,2.458c-0.275,0.366-0.953,0.192-1.377-0.168c-1.117-0.952-2.364-2.351-3.458-3.457l0.002-0.001
    c-0.028-0.029-0.062-0.061-0.092-0.092c-0.031-0.029-0.062-0.062-0.093-0.092v0.002c-1.106-1.096-2.506-2.34-3.457-3.459
    c-0.36-0.424-0.534-1.102-0.168-1.377c0.41-0.311,1.966-0.543,2.458-0.699c1.326-0.424-0.75-5.328-1.816-5.084
    c-0.832,0.195-1.727,0.227-2.516,0.553c-0.134,0.057-0.238,0.16-0.359,0.24c-2.799,1.774-3.16,6.082-0.428,9.292
    c1.041,1.228,2.127,2.416,3.245,3.576l-0.006,0.004c0.031,0.031,0.063,0.06,0.095,0.09c0.03,0.031,0.059,0.062,0.088,0.095
    l0.006-0.006c1.16,1.118,2.535,2.765,4.769,4.255c4.703,3.141,8.312,2.264,10.438,1.098c3.67-2.021,5.312-6.338,5.312-9.719
    C32.666,7.326,25.339,0,16.333,0z"/>
  </svg>
`;

// Hide form initially and show SVG
contactForm.style.opacity = "0";
contactForm.style.display = "none";
contactForm.parentElement.insertBefore(svgContainer, contactForm);

// Animate SVG path with proper drawing effect
const animatePath = () => {
  const path = svgContainer.querySelector(".animated-path");
  const length = path.getTotalLength();

  // Set up the starting positions
  path.style.strokeDasharray = length + " " + length;
  path.style.strokeDashoffset = length;
  path.getBoundingClientRect(); // Force reflow

  // Animate the path
  path.style.transition = "stroke-dashoffset 3s cubic-bezier(0.4, 0, 0.2, 1)";
  path.style.strokeDashoffset = "0";
};

// Intersection Observer to trigger animation when section is visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animatePath();
        observer.unobserve(entry.target);

        // Show form after animation completes
        setTimeout(() => {
          svgContainer.style.opacity = "0";
          setTimeout(() => {
            svgContainer.style.display = "none";
            contactForm.style.display = "flex";
            setTimeout(() => {
              contactForm.style.opacity = "1";
            }, 50);
          }, 500);
        }, 3000);
      }
    });
  },
  { threshold: 0.3 }
);

observer.observe(contactSection);

// Add this to your script.js file

// Web3Forms Contact Form Handler

if (contactFormElement) {
  contactFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Replace with your Web3Forms access key
    formData.append("access_key", "ed7befcf-3cfe-405c-a6b8-b871ea4ea2ff");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const sendButton = document.querySelector(".submit-btn");
    const originalButtonText = sendButton.innerHTML;

    // Show loading state
    sendButton.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> &nbsp; Sending...';
    sendButton.disabled = true;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await res.json();

      if (result.success) {
        console.log("Success", result);

        // Show success state
        sendButton.classList.add("sent");
        sendButton.innerHTML =
          '<i class="fas fa-check"></i> &nbsp; Message Sent!';

        // Clear the form
        event.target.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          sendButton.classList.remove("sent");
          sendButton.innerHTML = originalButtonText;
          sendButton.disabled = false;
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error:", error);

      // Show error state
      sendButton.classList.add("notSent");
      sendButton.innerHTML =
        '<i class="fas fa-times"></i> &nbsp; Something went wrong!';

      // Reset button after 3 seconds
      setTimeout(() => {
        sendButton.classList.remove("notSent");
        sendButton.innerHTML = originalButtonText;
        sendButton.disabled = false;
      }, 3000);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const observer = new MutationObserver((mutations) => {});

  observer.observe(document.body, {
    childList: true,
  });
});
