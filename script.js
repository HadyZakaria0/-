
"use strict";

/* =================================
   SETTINGS
================================= */

const PASSWORD = "112007";

const birthdayTexts = {
  heroKicker: "احلي يوم دههه",
  heroSmall: "كل سنته وانتي طيبه يبنوتي",
  heroName: "حبوبتي ",
  heroSubtitle: "بحبك.",

  memoriesEyebrow: "مزتي",
  memoriesTitle: "اجمل وده ",
  memoriesHighlight: "beautiful memories.",
  memoriesDescription: "Every picture has a story of its own.",
  memoriesCaption: "Some moments are too special to be forgotten.",

  cakeEyebrow: "CHAPTER THREE",
  cakeTitle: "Make a wish,",
  cakeHighlight: "it's your day.",
  cakeDescription: "A little moment, just for you.",
  cakeInstruction: "Take a moment and make a wish.",
  wishButton: "Make a wish",

  letterEyebrow: "CHAPTER FOUR",
  letterTitle: "A few words,",
  letterHighlight: "from the heart.",
  letterContent: "عامله ايه يحبيبي يارب تكوني كويسه وبخير يبحيبه انتي وحشتيني اوي ومش متخيل اننا بعدنا الفتره دي كلهما بس تمام طلاما مرتاحه انا مقدرش انسي عيد ميلادك و لا يعدي بدون م ااكون انا اول حد يعيد عليكي  ويتمنالك عام سعيد عليكي و يبقا كلو نجاح وفرح وتحققي وتوصلي للي نفسك في يبوبي  انا عايز اقولك اني بحبك اوي ووحشتيني ووحشني كلامك وضحكك وهزارك معايا ضجكتك وحشتني كلامك واستكيراتك افتقدها مش مصدق اني بعيد عنك بس الحمدالله اكيد خير يارب اكوني كويسه والزعل ميلمس قلبك وعايز اقولك هفضل اعشقك يحبيبه لغايه م اموت وهحاول اوصلك وابقا معاكي ومسبيكشش لحد غيري مقدرش اعيش من غيرك ولا اتخيل حياتي من غيرك ان شاء الله يحبيبه هنبقا سوا ومتزعليش اني بعيد عنك انا بعمل الي انتي عايزاه و الي يريحك وانا مش عايز اكتر من كده بحبك يحبيبه سلام وكل سنه وبوبتي حبيبي بخير عام الهنا يبوبي",

  finaleEyebrow: "ONE LAST THING",
  finaleTitle: "Happy Birthday,",
  finaleHighlight: "Habiba.",
  finaleDescription: "May your days always be filled with beautiful moments.",
  finaleFooter: "THIS IS YOUR DAY. ENJOY EVERY SECOND."
};

/* =================================
   HELPERS
================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

function setText(selector, value) {
  const element = $(selector);
  if (element && value !== undefined) {
    element.textContent = value;
  }
}

function setHeading(selector, first, second) {
  const heading = $(selector);
  if (!heading) return;

  const highlight = $("span", heading);

  if (highlight) {
    const firstText = [...heading.childNodes].find(
      node => node.nodeType === Node.TEXT_NODE &&
      node.textContent.trim()
    );

    if (firstText) {
      firstText.textContent = first;
    }

    highlight.textContent = second;
  } else {
    heading.textContent = `${first} ${second}`;
  }
}

/* =================================
   PERSONAL TEXT
================================= */

function applyBirthdayTexts() {
  setText(".hero-kicker", birthdayTexts.heroKicker);
  setText(".hero-small", birthdayTexts.heroSmall);
  setText(".hero-name", birthdayTexts.heroName);
  setText(".hero-subtitle", birthdayTexts.heroSubtitle);

  setText(".memories-scene .scene-eyebrow", birthdayTexts.memoriesEyebrow);

  setHeading(
    ".memories-scene .scene-title",
    birthdayTexts.memoriesTitle,
    birthdayTexts.memoriesHighlight
  );

  setText(".memory-info p", birthdayTexts.memoriesCaption);

  setText(".cake-heading .scene-eyebrow", birthdayTexts.cakeEyebrow);

  setHeading(
    ".cake-heading .scene-title",
    birthdayTexts.cakeTitle,
    birthdayTexts.cakeHighlight
  );

  setText(".cake-heading .scene-description", birthdayTexts.cakeDescription);
  setText("#cakeInstruction", birthdayTexts.cakeInstruction);
  setText("#wishButton span:first-child", birthdayTexts.wishButton);

  setText(".letter-heading .scene-eyebrow", birthdayTexts.letterEyebrow);

  setHeading(
    ".letter-heading .scene-title",
    birthdayTexts.letterTitle,
    birthdayTexts.letterHighlight
  );

  setText("#letterContent", birthdayTexts.letterContent);

  setText(".finale-content .scene-eyebrow", birthdayTexts.finaleEyebrow);

  setHeading(
    ".finale-content .finale-title",
    birthdayTexts.finaleTitle,
    birthdayTexts.finaleHighlight
  );

  setText(".finale-message", birthdayTexts.finaleDescription);

  setText(".finale-footer", birthdayTexts.finaleFooter);
}

/* =================================
   PASSWORD
================================= */

function normalizePassword(value) {
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  const persian = "۰۱۲۳۴۵۶۷۸۹";

  return value
    .replace(/[٠-٩]/g, digit => arabic.indexOf(digit))
    .replace(/[۰-۹]/g, digit => persian.indexOf(digit))
    .trim();
}

function initializePassword() {
  const form = $("#passwordForm");
  const input = $("#passwordInput");
  const lockScreen = $("#lockScreen");
  const surprise = $("#surprise");
  const error = $("#errorMessage");

  if (!form || !input || !lockScreen || !surprise) {
    console.error("Password screen elements are missing.");
    return;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (normalizePassword(input.value) !== PASSWORD) {
      if (error) {
        error.textContent = "كلمة السر غير صحيحة، حاولي مرة أخرى.";
        error.classList.add("show");
      }

      input.classList.add("error");
      input.value = "";

      setTimeout(() => input.classList.remove("error"), 500);
      input.focus();

      return;
    }

    if (error) error.classList.remove("show");

    lockScreen.classList.add("unlocking");

    setTimeout(() => {
      // إخفاء شاشة كلمة السر
      lockScreen.style.display = "none";

      // إظهار الموقع بالكامل
      surprise.hidden = false;
      surprise.style.display = "block";
      surprise.style.visibility = "visible";
      surprise.style.opacity = "1";
      surprise.classList.add("is-visible");

      document.body.style.overflow = "auto";
      document.body.classList.add("birthday-open");

      window.scrollTo(0, 0);

      startBirthday();
    }, 900);
  });
}

/* =================================
   STARS
================================= */

function createStars() {
  const container = $("#starField");

  if (!container) return;

  container.innerHTML = "";

  const amount = window.innerWidth < 700 ? 45 : 90;

  for (let i = 0; i < amount; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${2 + Math.random() * 4}s`;
    star.style.opacity = `${0.2 + Math.random() * 0.7}`;

    container.appendChild(star);
  }
}

/* =================================
   CURSOR
================================= */

function initializeCursor() {
  const glow = $(".golden-cursor-glow");

  if (!glow || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  window.addEventListener("mousemove", event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = "1";
  });
}

/* =================================
   HERO ANIMATION
================================= */

function animateHero() {
  if (typeof gsap === "undefined") return;

  const hero = $(".hero-scene");
  if (!hero) return;

  const elements = [
    ".hero-kicker",
    ".hero-name",
    ".hero-divider",
    ".hero-subtitle",
    ".hero-small",
    ".cinematic-button",
    ".scroll-indicator"
  ]
    .map(selector => $(selector, hero))
    .filter(Boolean);

  gsap.fromTo(
    elements,
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      clearProps: "all"
    }
  );

  gsap.fromTo(
    $$(".hero-ring"),
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 1.8,
      stagger: 0.2,
      ease: "power3.out"
    }
  );
}

/* =================================
   SCROLL ANIMATIONS
================================= */

function initializeScrollAnimations() {
  if (
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  ) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const selectors = [
    ".section-heading",
    ".gallery-container",
    ".cake-heading",
    ".cake-stage",
    ".letter-heading",
    ".letter-container",
    ".finale-content"
  ];

  selectors.forEach(selector => {
    $$(selector).forEach(element => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true
          }
        }
      );
    });
  });

  $$(".gallery-card").forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          once: true
        }
      }
    );
  });
}

/* =================================
   GALLERY
================================= */

function initializeGallery() {
  if (typeof Swiper === "undefined") return;

  const gallery = $(".gallery-swiper");
  if (!gallery) return;

  new Swiper(gallery, {
    slidesPerView: 1.15,
    spaceBetween: 18,
    centeredSlides: true,
    loop: true,
    speed: 850,
    grabCursor: true,

    navigation: {
      nextEl: $(".gallery-next"),
      prevEl: $(".gallery-prev")
    },

    pagination: {
      el: $(".gallery-pagination"),
      clickable: true
    },

    breakpoints: {
      700: {
        slidesPerView: 2,
        spaceBetween: 25
      },

      1000: {
        slidesPerView: 2.5,
        spaceBetween: 30
      }
    }
  });
}

/* =================================
   SCROLL PROGRESS
================================= */

function initializeProgressBar() {
  const bar = $("#progressBar");
  if (!bar) return;

  function update() {
    const total =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = total > 0 ? window.scrollY / total : 0;

    bar.style.width = `${progress * 100}%`;
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* =================================
   NAVIGATION
================================= */

function initializeNavigation() {
  const button = $("#beginButton");
  const target = $("#memoriesScene");

  if (!button || !target) return;

  button.addEventListener("click", () => {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

/* =================================
   CAKE & CANDLES
================================= */

function initializeCake() {
  const button = $("#wishButton");
  const instruction = $("#cakeInstruction");
  const candles = $$(".cake-candles .candle");

  if (!button || candles.length === 0) return;

  let completed = false;

  button.addEventListener("click", () => {
    if (completed) return;

    completed = true;

    candles.forEach((candle, index) => {
      setTimeout(() => {
        candle.classList.add("blown");
      }, index * 300);
    });

    if (instruction) {
      instruction.textContent = "Your wish is on its way.";
    }

    button.disabled = true;

    const label = $("span:first-child", button);
    if (label) label.textContent = "Wish made";

    if (typeof confetti === "function") {
      confetti({
        particleCount: 100,
        spread: 75,
        startVelocity: 35,
        origin: { y: 0.65 },
        colors: ["#d6b779", "#f5efe3", "#aa8950", "#ffffff"]
      });

      setTimeout(() => {
        confetti({
          particleCount: 55,
          spread: 100,
          startVelocity: 25,
          origin: { y: 0.55 },
          colors: ["#d6b779", "#f5efe3", "#ffffff"]
        });
      }, 500);
    }
  });
}

/* =================================
   START
================================= */

function startBirthday() {
  createStars();
  initializeCursor();
  animateHero();
  initializeScrollAnimations();
  initializeGallery();
  initializeProgressBar();
  initializeNavigation();
  initializeCake();

  if (typeof ScrollTrigger !== "undefined") {
    setTimeout(() => ScrollTrigger.refresh(), 300);
  }
}

/* =================================
   INITIALIZE
================================= */

document.addEventListener("DOMContentLoaded", () => {
  applyBirthdayTexts();
  initializePassword();
});
