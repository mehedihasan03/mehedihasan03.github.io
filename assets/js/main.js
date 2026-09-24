(() => {
  const menu = document.querySelector(".menu");
  const nav = document.querySelector("#nav");
  const resumeMenu = document.querySelector(".resume-menu");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();

  const closeMenu = () => {
    nav?.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
    if (resumeMenu) resumeMenu.open = false;
  };

  if (menu && nav) {
    document.documentElement.classList.add("nav-enhanced");
    menu.hidden = false;
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
      if (!open && resumeMenu) resumeMenu.open = false;
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });
    window.matchMedia("(min-width: 801px)").addEventListener("change", closeMenu);
  }

  document.addEventListener("click", event => {
    if (resumeMenu?.open && !resumeMenu.contains(event.target)) {
      resumeMenu.open = false;
    }
    if (nav?.classList.contains("open") && !nav.contains(event.target) && !menu?.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (resumeMenu?.open) {
      resumeMenu.open = false;
      resumeMenu.querySelector("summary")?.focus();
    } else if (nav?.classList.contains("open")) {
      closeMenu();
      menu?.focus();
    }
  });

  const proofSection = document.querySelector(".proof-section");
  const counters = proofSection?.querySelectorAll(".proof-strip dt");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (proofSection && counters?.length && !reduceMotion && "IntersectionObserver" in window) {
    const animateCount = element => {
      const target = Number.parseInt(element.textContent, 10);
      if (!Number.isFinite(target)) return;

      const duration = 900;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        element.textContent = `${Math.round(target * eased)}+`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      counters.forEach(animateCount);
      counterObserver.disconnect();
    }, { threshold: 0.35 });

    counterObserver.observe(proofSection);
  }
})();
