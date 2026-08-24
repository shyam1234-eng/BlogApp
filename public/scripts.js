const toggleHamburger = document.querySelector(".hamburger");
const toggleNavbar = document.querySelector(".nav-bar");

toggleHamburger.addEventListener("click", () => {
  toggleHamburger.classList.toggle("active");
  toggleNavbar.classList.toggle("active");
});

console.log("hello world");


//carousel functionality
const carouselItems = document.querySelectorAll(".carousel-item");
let currentIndex = 0;
const prevButton = document.querySelector(".carouselPrev");
const nextButton = document.querySelector(".carouselNext");
if (!carouselItems.length || !prevButton || !nextButton) {
  console.log("Carousel is not present on this page.");
} else {
function showSlide(index) {
  // logic to print image based on index
  for (let i = 0; i < carouselItems.length; i++) {
    carouselItems[i].classList.remove("active");
  }
  carouselItems[index].classList.add("active");
}
showSlide(currentIndex);

prevButton.addEventListener("click", function () {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = carouselItems.length - 1;
  }
  showSlide(currentIndex);
});
nextButton.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex > carouselItems.length - 1) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
});

setInterval(() => {
  currentIndex++;
  if (currentIndex > carouselItems.length - 1) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
}, 2000);
}

