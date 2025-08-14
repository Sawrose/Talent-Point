// ==================== CONFIG ==================== //
const IMG_MARGIN = 60;          // Margin between stripe images
const ANIM_MS = 300;            // Animation speed in ms
const INTERVAL_MS = 3000;       // Auto-scroll interval
let currentTranslateX = 0;      // Current scroll position
let autoScrollInterval;         // Interval ID for scrolling

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
  { name: "Samreen Malla", role: "Project Manager", img: "assests/slider/a.jpg" },
  { name: "Surhid Amatya", role: "Solution Architect", img: "assests/slider/b.jpg" },
  { name: "Subigya Ojha", role: "Project Manager", img: "assests/slider/c.jpg" },
  { name: "Imson Sherma", role: "Motion Designer", img: "assests/slider/d.jpg" },
  { name: "Niraj Shakya", role: "Design Director", img: "assests/slider/e.jpg" },
  { name: "Vinod Karki", role: "Graphic Designer", img: "assests/slider/f.jpg" },
  { name: "Anjali Shrestha", role: "UX Designer", img: "assests/slider/g.jpg" },
  { name: "Ramesh Thapa", role: "Frontend Developer", img: "assests/slider/h.jpeg" },
  { name: "Priya Gurung", role: "Backend Developer", img: "assests/slider/i.jpg" },
  { name: "Kiran Lama", role: "QA Engineer", img: "assests/slider/j.jpg" },
  { name: "Suman Adhikari", role: "Product Owner", img: "assests/slider/k.jpg" },
  { name: "Maya Rai", role: "Business Analyst", img: "assests/slider/l.jpg" },
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
