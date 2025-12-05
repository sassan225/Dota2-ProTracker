

/*export function initCarrusel() {
  var track = document.querySelector(".carousel-track");
  var slides = Array.prototype.slice.call(track.children);
  var prevBtn = document.querySelector(".prev");
  var nextBtn = document.querySelector(".next");

  var slideWidth = slides[0].offsetWidth + 10;
  var index = 0;

  slides.forEach(function(slide) {
    track.appendChild(slide.cloneNode(true));
  });

  var originalSlidesCount = slides.length;

  function moveCarousel() {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = "translateX(-" + (index * slideWidth) + "px)";

    if (index >= originalSlidesCount) {
      setTimeout(function() {
        track.style.transition = "none";
        index = 0;
        track.style.transform = "translateX(-" + (index * slideWidth) + "px)";
      }, 500);
    }

    if (index < 0) {
      setTimeout(function() {
        track.style.transition = "none";
        index = originalSlidesCount - 1;
        track.style.transform = "translateX(-" + (index * slideWidth) + "px)";
      }, 500);
    }
  }

  nextBtn.addEventListener("click", function() {
    index++;
    moveCarousel();
  });

  prevBtn.addEventListener("click", function() {
    index--;
    moveCarousel();
  });

  setInterval(function() {
    index++;
    moveCarousel();
  }, 3000);

  window.addEventListener("resize", function() {
    slideWidth = slides[0].offsetWidth + 10;
    moveCarousel();
  });
}
