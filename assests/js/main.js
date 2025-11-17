const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const themeIcon = document.getElementById("mode-icon");
let darkMode = localStorage.getItem("darkMode");

const date = document.querySelector("span.date");
console.log(date);
date.textContent = new Date().getFullYear();

// Events
menuBtn.addEventListener("click", toggleMenu);
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});
window.addEventListener("scroll", closeMenu);
window.addEventListener("resize", closeMenu);
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
    closeMenu();
  }
});
themeIcon.addEventListener("click", themeMenu);

function toggleMenu() {
  menuBtn.classList.toggle("fa-times");
  nav.classList.toggle("show");
}

function closeMenu() {
  menuBtn.classList.remove("fa-times");
  nav.classList.remove("show");
}

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// OnScroll
function addScroll() {
  let header = document.querySelector("#header");
  header.classList.add("on-scroll");

  if (window.scrollY == 0) {
    header.classList.remove("on-scroll");
    // let hero = document.getElementById("hero");
    // hero.classList.remove("full-hero");
  }
}
// OnScroll Add EventListener To Window
window.addEventListener("scroll", addScroll);
// Theme
function enableDarkMode() {
  let body = document.body;
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");

  body.classList.add("dark-mode");

  localStorage.setItem("darkMode", "enabled");
}
function disableDarkMode() {
  let body = document.body;
  themeIcon.classList.remove("fa-sun");
  themeIcon.classList.add("fa-moon");
  body.classList.remove("dark-mode");

  localStorage.setItem("darkMode", "disabled");
}

if (darkMode === "enabled") {
  enableDarkMode();
}

function themeMenu() {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode != "enabled") {
    enableDarkMode();
    console.log(darkMode);
  } else {
    disableDarkMode();
    console.log(darkMode);
  }
}

// Projects Tab
const tabItems = document.querySelectorAll(".tab-item");
const tabContentItems = document.querySelectorAll(".tab-content-item");

tabItems.forEach((tab) => {
  tab.addEventListener("click", selectItem);
});

function selectItem() {
  removeActive();
  removeShow();
  this.classList.add("active-tab");
  runTabPagenation();
  // Getting the correct tab content
  const tabContentItem = document.querySelector(`#${this.id}-content`);
  tabContentItem.classList.add("show");
}

function removeActive() {
  tabItems.forEach((tab) => tab.classList.remove("active-tab"));
}
function removeShow() {
  tabContentItems.forEach((item) => item.classList.remove("show"));
}
// Pagenation
window.onload = runLoadPagenation();

function runLoadPagenation() {
  document.getElementById("form").reset();
  const pagenation = document.querySelector(".pagination-container");
  const activeTab = document.querySelector(".active-tab");
  const activeTabId = activeTab.id;
  const activeTabContent = document.getElementById(`${activeTabId}-content`);
  const activeTabContentChildrenLength = activeTabContent.children.length;
  const pagenationButtonContainer = document.querySelector(".button-container");
  pagenationButtonContainer.innerHTML = "";

  if (activeTabContentChildrenLength > 1) {
    pagenation.classList.add("show");
  } else {
    pagenation.classList.remove("show");
  }
  for (let i = 1; i <= activeTabContentChildrenLength; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    btn.id = i;
    btn.className = "pagenation-item";
    pagenationButtonContainer.appendChild(btn);
  }
  pagenationButtonContainer.firstElementChild.classList.add("active");

  // Break
  const pagenationItems = document.querySelectorAll(".pagenation-item");
  const pagenationContentItems = activeTabContent.querySelectorAll(
    ".pagenation-content-item"
  );
  pagenationItems.forEach((item) => {
    item.addEventListener("click", selectPageitem);
  });

  function selectPageitem() {
    removeActivePage();
    removeShowPageContent();
    this.classList.add("active");

    const pagenationContentItem = activeTabContent.querySelector(
      `#work-${this.id}-content`
    );
    pagenationContentItem.classList.add("show");
  }

  function removeActivePage() {
    pagenationItems.forEach((tab) => tab.classList.remove("active"));
  }
  function removeShowPageContent() {
    pagenationContentItems.forEach((content) =>
      content.classList.remove("show")
    );
  }
}
function runTabPagenation() {
  const pagenation = document.querySelector(".pagination-container");
  const activeTab = document.querySelector(".active-tab");
  const activeTabId = activeTab.id;
  const activeTabContent = document.getElementById(`${activeTabId}-content`);
  const activeTabContentChildrenLength = activeTabContent.children.length;
  const pagenationButtonContainer = document.querySelector(".button-container");
  pagenationButtonContainer.innerHTML = "";

  if (activeTabContentChildrenLength > 1) {
    pagenation.classList.add("show");
  } else {
    pagenation.classList.remove("show");
  }
  for (let i = 1; i <= activeTabContentChildrenLength; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    btn.id = i;
    btn.className = "pagenation-item";
    pagenationButtonContainer.appendChild(btn);
  }

  // Break
  const pagenationItems = document.querySelectorAll(".pagenation-item");
  const pagenationContentItems = activeTabContent.querySelectorAll(
    ".pagenation-content-item"
  );
  let index = Array.from(pagenationContentItems).findIndex((div) =>
    div.classList.contains("show")
  );

  let activeBtn = Array.from(pagenationItems).find(
    (btn) => btn.id == index + 1
  );
  activeBtn.classList.add("active");

  // Break
  pagenationItems.forEach((item) => {
    item.addEventListener("click", selectPageitem);
  });
  function selectPageitem() {
    const videoContainers = document.querySelectorAll(".video-container");
    videoContainers.forEach((container) => {
      const video = container.querySelector(".video");

      function isVideoPlaying(video) {
        return !!(
          video.currentTime > 0 &&
          !video.paused &&
          !video.ended &&
          video.readyState > 2
        );
      }
      if (isVideoPlaying(video)) {
        // Center controls
        const playBtn = container.querySelector(".play");
        const pauseBtn = container.querySelector(".pause");

        // Bottom controls
        const playSmall = container.querySelector(".play-small");
        const pauseSmall = container.querySelector(".pause-small");

        const resetVideo = () => {
          video.currentTime = 0;
          video.pause();
          playBtn.classList.remove("hide");
          pauseBtn.classList.add("hide");
          playSmall.classList.remove("hide");
          pauseSmall.classList.add("hide");
        };

        resetVideo();
      }
    });
    removeActivePage();
    removeShowPageContent();
    this.classList.add("active");

    const pagenationContentItem = activeTabContent.querySelector(
      `#work-${this.id}-content`
    );
    pagenationContentItem.classList.add("show");
  }

  function removeActivePage() {
    pagenationItems.forEach((tab) => tab.classList.remove("active"));
  }
  function removeShowPageContent() {
    pagenationContentItems.forEach((content) =>
      content.classList.remove("show")
    );
  }
}

// Vidoes
const videoContainers = document.querySelectorAll(".video-container");

videoContainers.forEach((container) => {
  const video = container.querySelector(".video");

  // Center controls
  const playBtn = container.querySelector(".play");
  const pauseBtn = container.querySelector(".pause");

  // Bottom controls
  const playSmall = container.querySelector(".play-small");
  const pauseSmall = container.querySelector(".pause-small");
  const backwardBtn = container.querySelector(".backward");
  const forwardBtn = container.querySelector(".forward");
  const fullscreenBtn = container.querySelector(".fullscreen");
  const progressBar = container.querySelector(".progress-bar");
  const progress = container.querySelector(".progress");
  const timeDisplay = container.querySelector(".time");

  //  format time
  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  // Play / Pause / Reset
  const playVideo = () => {
    document.querySelectorAll(".video").forEach((v) => {
      if (v !== video) {
        v.pause();
        const c = v.closest(".video-container");
        c.classList.remove("playing");
        c.querySelector(".play").classList.remove("hide");
        c.querySelector(".pause").classList.add("hide");
      }
    });
    video.play();
    container.classList.add("playing");
    playBtn.classList.add("hide");
    pauseBtn.classList.remove("hide");
    playSmall.classList.add("hide");
    pauseSmall.classList.remove("hide");
  };
  const pauseVideo = () => {
    video.pause();
    playBtn.classList.remove("hide");
    pauseBtn.classList.add("hide");
    playSmall.classList.remove("hide");
    pauseSmall.classList.add("hide");
  };

  playBtn.addEventListener("click", playVideo);
  pauseBtn.addEventListener("click", pauseVideo);
  playSmall.addEventListener("click", playVideo);
  pauseSmall.addEventListener("click", pauseVideo);

  // Project Tabs
  const tabItems = document.querySelectorAll(".tab-item");
  tabItems.forEach((tab) => {
    tab.addEventListener("click", () => {
      function isVideoPlaying(video) {
        return !!(
          video.currentTime > 0 &&
          !video.paused &&
          !video.ended &&
          video.readyState > 2
        );
      }
      if (isVideoPlaying(video)) {
        const resetVideo = () => {
          video.currentTime = 0;
          video.pause();
          playBtn.classList.remove("hide");
          pauseBtn.classList.add("hide");
          playSmall.classList.remove("hide");
          pauseSmall.classList.add("hide");
        };

        resetVideo();
      }
    });
  });

  // Seek and Time
  video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = `${percent}%`;

    timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(
      video.duration
    )}`;
  });

  let isDragging = false;
  progressBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    updateProgress(e);
  });
  document.addEventListener("mouseup", () => (isDragging = false));
  document.addEventListener("mousemove", (e) => {
    if (isDragging) updateProgress(e);
  });

  function updateProgress(e) {
    const rect = progressBar.getBoundingClientRect();
    const pos = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);

    video.currentTime = (pos / rect.width) * video.duration;
  }

  // Forward/ Backward
  backwardBtn.addEventListener("click", () => {
    video.currentTime = Math.max(0, video.currentTime - 5);
  });
  forwardBtn.addEventListener("click", () => {
    video.currentTime = Math.min(video.duration, video.currentTime + 5);
  });

  // Fullscreen
  fullscreenBtn.addEventListener("click", (e) => {
    const fullbtn = e.target;
    const videoContainer = fullbtn.parentElement.parentElement.parentElement;
    const video = videoContainer.querySelector(".video");

    if (!document.fullscreenElement) {
      if (video.classList.contains("portrait")) {
        video.classList.add("pFull");
      } else {
        video.classList.add("lFull");
        videoContainer.classList.add("full");
      }
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      container.classList.remove("full");
      video.classList.remove("lFull");
      video.classList.remove("pFull");
    }
  });

  // Reset at End
  video.addEventListener("ended", () => {
    container.classList.remove("playing");
    pauseVideo();
    progress.style.width = "0%";
  });
});
