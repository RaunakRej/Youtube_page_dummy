// ===============================
// Search Videos
// ===============================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const videoCards = document.querySelectorAll(".video-card");

const videos = {
  1: {
    title: "Jannat Full Movie | Emraan Hashmi",
    url: "https://youtu.be/rdDSok6g1LI?si=g5i3DvlkaO555qY0",
  },

  2: {
    title: "Aashiq Banaya Aapne | HD Video Song",
    url: "https://www.youtube.com/embed/VIDEO_ID_2",
  },

  3: {
    title: "Murder (2004) Best Scenes",
    url: "https://www.youtube.com/embed/VIDEO_ID_3",
  },

  4: {
    title: "Hamari Adhuri Kahani | Official Trailer",
    url: "https://www.youtube.com/embed/VIDEO_ID_4",
  },

  5: {
    title: "Emraan Hashmi Exclusive Interview",
    url: "https://www.youtube.com/embed/VIDEO_ID_5",
  },
};
function searchVideos() {
  const value = searchInput.value.trim().toLowerCase();

  // Find the section that is currently visible
  let activeSection = document.getElementById("recommended-section");

  if (document.getElementById("trending-section").style.display === "block") {
    activeSection = document.getElementById("trending-section");
  }

  if (document.getElementById("music-section").style.display === "block") {
    activeSection = document.getElementById("music-section");
  }

  if (document.getElementById("movies").style.display === "block") {
    activeSection = document.getElementById("movies");
  }

  const cards = activeSection.querySelectorAll(".video-card");

  cards.forEach(function (card) {
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (title.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

searchBtn.addEventListener("click", searchVideos);

searchInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    searchVideos();
  }
});

searchInput.addEventListener("input", searchVideos);

// ===============================
// Profile Menu
// ===============================
const profileBtn = document.getElementById("profileBtn");
const profileMenu = document.getElementById("profileMenu");

profileBtn.addEventListener("click", function (e) {
  e.stopPropagation();

  if (profileMenu.style.display === "block") {
    profileMenu.style.display = "none";
  } else {
    profileMenu.style.display = "block";
  }
});

// Prevent clicks inside the menu from closing it
profileMenu.addEventListener("click", function (e) {
  e.stopPropagation();
});

// Close only when clicking outside
document.addEventListener("click", function () {
  profileMenu.style.display = "none";
});

// ===============================
// Sidebar
// ===============================

const menuItems = document.querySelectorAll("aside li");

menuItems.forEach(function (item) {
  item.addEventListener("click", function () {
    menuItems.forEach(function (li) {
      li.style.background = "";
    });

    this.style.background = "red";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const appearanceBtn = document.getElementById("appearanceBtn");
  const appearanceMenu = document.getElementById("appearanceMenu");
  const backAppearance = document.getElementById("backAppearance");

  appearanceBtn.addEventListener("click", () => {
    appearanceMenu.style.display = "block";
  });

  backAppearance.addEventListener("click", () => {
    appearanceMenu.style.display = "none";
  });

  document.querySelectorAll('input[name="theme"]').forEach((item) => {
    item.addEventListener("change", function () {
      if (this.value === "dark") {
        document.body.classList.add("dark-mode");
      } else if (this.value === "light") {
        document.body.classList.remove("dark-mode");
      } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.body.classList.add("dark-mode");
        } else {
          document.body.classList.remove("dark-mode");
        }
      }
    });
  });
});

// ===============================
// Sidebar Toggle
// ===============================
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const hideItems = document.querySelectorAll(".hide-item");

menuBtn.addEventListener("click", function () {
  sidebar.classList.toggle("small");

  hideItems.forEach(function (item) {
    if (item.style.display === "none") {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
// ===============================
// Video Click
// ===============================
const articles = document.querySelectorAll("article");

articles.forEach((article) => {
  article.style.cursor = "pointer";

  article.addEventListener("click", () => {
    const id = article.dataset.id;

    window.open("video.html?id=" + id, "_blank");
  });
});

// ===============================
// Hover
// ===============================

articles.forEach(function (article) {
  article.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
  });

  article.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// ===============================
// Header Buttons
// ===============================

const headerButtons = document.querySelectorAll("header button");

headerButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (this.innerHTML.includes("📹"))
      alert("Create Video feature coming soon!");

    if (this.innerHTML.includes("🔔")) alert("No new notifications.");

    if (this.innerHTML.includes("👤")) alert("User Profile");
  });
});

function toggleClearButton() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");

  if (input.value.trim() !== "") {
    clearBtn.style.display = "flex";
  } else {
    clearBtn.style.display = "none";
  }
}
function clearSearch() {
  searchInput.value = "";

  document.getElementById("clearBtn").style.display = "none";

  document.querySelectorAll(".video-card").forEach(function (card) {
    card.style.display = "block";
  });

  searchInput.focus();
}

// ===============================
// Footer
// ===============================

// trending //// Handle Trending click
// ===============================
// Trending
// ===============================

document.getElementById("trending").addEventListener("click", function () {
  resetSearch();

  document.getElementById("recommended-section").style.display = "none";
  document.getElementById("music-section").style.display = "none";
  document.getElementById("movies").style.display = "none";
  document.getElementById("trending-section").style.display = "block";
});

/// Music ///// ===============================
// Music
// ===============================
document.getElementById("music").addEventListener("click", function () {
  resetSearch();

  document.getElementById("recommended-section").style.display = "none";
  document.getElementById("trending-section").style.display = "none";
  document.getElementById("movies").style.display = "none";
  document.getElementById("music-section").style.display = "block";
});

/// Movies ///// ===============================
// Movies
// ===============================
document.getElementById("moviesBtn").addEventListener("click", function () {
  resetSearch();

  document.getElementById("recommended-section").style.display = "none";
  document.getElementById("trending-section").style.display = "none";
  document.getElementById("music-section").style.display = "none";
  document.getElementById("movies").style.display = "block";
});

// main //// ===============================
// Home
// ===============================

document.getElementById("home").addEventListener("click", function () {
  resetSearch();

  document.getElementById("recommended-section").style.display = "block";
  document.getElementById("trending-section").style.display = "none";
  document.getElementById("music-section").style.display = "none";
  document.getElementById("movies").style.display = "none";
});

document.querySelector("footer p").innerHTML =
  `&copy; ${new Date().getFullYear()} RTube. This is a dummy webpage created for learning purposes.`;

/// footer ///

function resetSearch() {
  searchInput.value = "";

  document.getElementById("clearBtn").style.display = "none";

  document.querySelectorAll(".video-card").forEach(function (card) {
    card.style.display = "block";
  });
}

// ===============================
// Voice Search
// ===============================

const voiceBtn = document.getElementById("voiceBtn");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  voiceBtn.addEventListener("click", () => {
    recognition.start();

    voiceBtn.innerHTML = "🎙️";
  });

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;

    searchInput.value = transcript;

    toggleClearButton();

    searchVideos();
  });

  recognition.addEventListener("end", () => {
    voiceBtn.innerHTML = "🎤";
  });

  recognition.addEventListener("error", () => {
    voiceBtn.innerHTML = "🎤";

    alert("Voice recognition failed.");
  });
} else {
  voiceBtn.style.display = "none";

  console.log("Speech Recognition not supported.");
}
