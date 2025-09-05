// ==================== CONFIG ==================== //
const IMG_MARGIN = 60; // Margin between stripe images
const ANIM_MS = 300; // Animation speed in ms
const INTERVAL_MS = 3000; // Auto-scroll interval
let currentTranslateX = 0; // Current scroll position
let autoScrollInterval; // Interval ID for scrolling

// ==================== GRAY STRIPE ==================== //
const stripeContent = document.querySelector("#gray-stripe .stripe-content");

const stripeImages = [
  { src: "assests/grayStripe/1.svg", width: 200, height: 150 },
  { src: "assests/grayStripe/2.png", width: 110, height: 40 },
  { src: "assests/grayStripe/3.svg", width: 160, height: 200 },
  { src: "assests/grayStripe/4.svg", width: 140, height: 120 },
  { src: "assests/grayStripe/5.svg", width: 170, height: 170 },
  { src: "assests/grayStripe/6.svg", width: 190, height: 160 },
  { src: "assests/grayStripe/7.svg", width: 150, height: 150 },
  { src: "assests/grayStripe/8.png", width: 120, height: 60 },
  { src: "assests/grayStripe/9.svg", width: 180, height: 140 },
  { src: "assests/grayStripe/10.svg", width: 160, height: 160 },
];

// Append images & duplicates for looping
const frag = document.createDocumentFragment();
stripeImages.forEach(({ src, width, height }) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "logo";
  img.style.width = width + "px";
  img.style.height = height + "px";
  img.style.marginRight = IMG_MARGIN + "px";
  frag.appendChild(img);
});
stripeContent.appendChild(frag.cloneNode(true)); // Original
stripeContent.appendChild(frag.cloneNode(true)); // Duplicate

// Auto-scroll once
function scrollOnce() {
  const firstImg = stripeContent.querySelector("img");
  const firstImgWidth = firstImg.getBoundingClientRect().width + IMG_MARGIN;

  stripeContent.style.transition = `transform ${ANIM_MS}ms ease`;
  currentTranslateX -= firstImgWidth;
  stripeContent.style.transform = `translateX(${currentTranslateX}px)`;

  setTimeout(() => {
    stripeContent.style.transition = "none";
    stripeContent.appendChild(firstImg);
    currentTranslateX += firstImgWidth;
    stripeContent.style.transform = `translateX(${currentTranslateX}px)`;
  }, ANIM_MS);
}

// Start auto-scroll
function startAutoScroll() {
  if (autoScrollInterval) clearInterval(autoScrollInterval);
  autoScrollInterval = setInterval(scrollOnce, INTERVAL_MS);
}

startAutoScroll();

// ==================== TEAM SLIDER ==================== //
const sliderData = [
  {
    name: "Samreen Malla",
    role: "Project Manager",
    img: "assests/slider/a.jpg",
  },
  {
    name: "Surhid Amatya",
    role: "Solution Architect",
    img: "assests/slider/b.jpg",
  },
  {
    name: "Subigya Ojha",
    role: "Project Manager",
    img: "assests/slider/c.jpg",
  },
  {
    name: "Imson Sherma",
    role: "Motion Designer",
    img: "assests/slider/d.jpg",
  },
  {
    name: "Niraj Shakya",
    role: "Design Director",
    img: "assests/slider/e.jpg",
  },
  {
    name: "Vinod Karki",
    role: "Graphic Designer",
    img: "assests/slider/f.jpg",
  },
  { name: "Anjali Shrestha", 
    role: "UX Designer", 
    img: "assests/slider/g.jpg", 
  },
  {
    name: "Ramesh Thapa",
    role: "Frontend Developer",
    img: "assests/slider/h.jpeg",
  },
  {
    name: "Priya Gurung",
    role: "Backend Developer",
    img: "assests/slider/i.jpg",
  },
  { name: "Kiran Lama", 
    role: "QA Engineer", 
    img: "assests/slider/j.jpg", 
  },
  {
    name: "Suman Adhikari",
    role: "Product Owner",
    img: "assests/slider/k.jpg",
  },
  { name: "Maya Rai", 
    role: "Business Analyst", 
    img: "assests/slider/l.jpg",
  },
];

// Create slider elements
const container = document.getElementById("team-slider-container");
const slider = document.createElement("div");
slider.classList.add("team-slider");

const leftArrow = document.createElement("button");
leftArrow.classList.add("arrow-btn", "arrow-left");
leftArrow.textContent = "←";

const rightArrow = document.createElement("button");
rightArrow.classList.add("arrow-btn", "arrow-right");
rightArrow.textContent = "→";

container.append(leftArrow, slider, rightArrow);

// Add team members dynamically
const sliderFrag = document.createDocumentFragment();
sliderData.forEach(({ name, role, img }) => {
  const memberDiv = document.createElement("div");
  memberDiv.classList.add("team-member");
  memberDiv.innerHTML = `
    <img src="${img}" alt="${name}">
    <div class="name">${name}</div>
    <div class="role">${role}</div>
  `;
  sliderFrag.appendChild(memberDiv);
});
slider.appendChild(sliderFrag);

// Scroll amount based on first card width
const scrollAmount = slider.querySelector(".team-member").offsetWidth + 20;

leftArrow.addEventListener("click", () => {
  slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});
rightArrow.addEventListener("click", () => {
  slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

//top right animate word

function animateWords(elementId, words, delay = 3000) {
  let index = 0;
  const el = document.getElementById(elementId);
  // el.style.padding = "1px";
  el.style.fontSize = "20px";

  function changeWord() {
    el.classList.remove("slide-in");
    el.classList.add("slide-out");

    setTimeout(() => {
      index = (index + 1) % words.length;
      el.textContent = words[index];

      el.classList.remove("slide-out");
      el.classList.add("slide-in");
    }, 700); // matches CSS animation time
  }

  // Initial setup
  el.textContent = words[index];
  el.classList.add("slide-in");
  setInterval(changeWord, delay);
}

// Run animations
animateWords("changeable", ["Hiring", "Processing", "Staffing"]);
animateWords("changeable2", ["With Us", "Better", "Faster"]);

// Scroll to top on page load
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// scroll when click
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button when user scrolls down a bit
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    // show after 300px scroll
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

// Smooth scroll to top
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// endblack part
const skills = [
  "Nodejs",
  "React",
  "Vue",
  "QA",
  "GCP",
  "Project Manager",
  "Kotlin",
  "Express",
  "Angular",
  "Next",
  "AWS",
  "AZURE",
  "Network Administrator",
  "Java",
  "SEO Specialist",
  "Social Media Manager",
  "UI/UX Design",
  "Motion Graphics",
  "PostGres",
  "Nosql",
  "Flutter",
  "SEM Specialist",
  "CRO Specialist",
  "Graphic Designer",
  "MySql",
  "SQL",
  "Mongodb",
  "React Native",
];

// Find your div
const blackPart = document.getElementById("blackpartend");

// Create skills container
const skillsWrapper = document.createElement("div");
skillsWrapper.classList.add("skills-container");

// Add skill items
skills.forEach((skill) => {
  const skillDiv = document.createElement("div");
  skillDiv.classList.add("skill-item");
  skillDiv.innerText = skill;
  skillsWrapper.appendChild(skillDiv);
});

// Append container below "Specializations"
blackPart.appendChild(skillsWrapper);

// secondlast part start
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  const toggle = item.querySelector(".faq-toggle");

  // Initial state
  answer.style.maxHeight = "0px";
  answer.style.overflow = "hidden";
  answer.style.opacity = "0";
  answer.style.transition = "max-height 0.5s ease, opacity 0.5s ease";

  question.addEventListener("click", () => {
    const isOpen = answer.style.maxHeight !== "0px";

    if (isOpen) {
      // Collapse
      answer.style.maxHeight = "0px";
      answer.style.opacity = "0";
      toggle.innerText = "+";
      item.classList.remove("active");
    } else {
      // Expand
      answer.style.maxHeight = answer.scrollHeight + "px";
      answer.style.opacity = "1";
      toggle.innerText = "-";
      item.classList.add("active");

      // Only scroll if the answer is too tall to fit
      setTimeout(() => {
        const rect = answer.getBoundingClientRect();
        const fullyVisible = rect.bottom <= window.innerHeight;

        if (!fullyVisible) {
          const offset = 100; // adjust this for more/less space
          const targetY =
            window.scrollY + rect.bottom - window.innerHeight + offset;

          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });
        }
      }, 600); // wait for expand animation
    }
  });
});

// this is a function for togglebar open

const hamIcon = document.querySelector(".ham-icon");
const navTogether = document.querySelector(".nav-together");
const icon = hamIcon.querySelector("i"); // Font Awesome icon inside ham-icon

hamIcon.addEventListener("click", () => {
  // toggle menu
  navTogether.classList.toggle("active");

  // lock/unlock body scroll
  if (navTogether.classList.contains("active")) {
    document.body.classList.add("menu-open"); // disable scroll
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times"); // show cross
  } else {
    document.body.classList.remove("menu-open"); // enable scroll
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars"); // back to hamburger
  }
});
