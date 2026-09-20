(() => {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector("#nav");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  }));
  const resumeMenu = document.querySelector(".resume-menu");
  document.addEventListener("click", event => {
    if (resumeMenu?.open && !resumeMenu.contains(event.target)) {
      resumeMenu.open = false;
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && resumeMenu?.open) {
      resumeMenu.open = false;
    }
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(item => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      window.setTimeout(() => entry.target.classList.add("visible"), 180);
      observer.unobserve(entry.target);
    }
  }), { threshold: .18, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach(item => observer.observe(item));
})();
