const headerRef = document.querySelector(".header");

const navBarLinks = document.querySelectorAll(".nav-page-link");

let scrollPos;

function fixHeader() {
  scrollPos = headerRef.offsetHeight;
  let scrolled = window.scrollY;

  if (scrolled >= scrollPos) {
    headerRef.classList.add("active");
  } else {
    headerRef.classList.remove("active");
  }
}

window.onscroll = function () {
  fixHeader();
};

for (let i = 0; i < navBarLinks.length; i += 1) {
  navBarLinks[i].addEventListener("click", onNavBarLinkClick);
}

function onNavBarLinkClick(event) {
  smoothScroll(event);
}

function smoothScroll(event) {
  event.preventDefault();

  const targetId =
    event.currentTarget.getAttribute("href") === "#"
      ? "header"
      : event.currentTarget.getAttribute("href");

  const duration = 500;
  const targetPosition = Math.round(
    Number(document.querySelector(targetId).offsetTop) - headerRef.offsetHeight
  );

  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) {
      start = timestamp;
    }
    const progress = timestamp - start;

    window.scrollTo({
      top: targetId === "#" ? 0 : targetPosition,
      behavior: "smooth",
    });

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }
}
