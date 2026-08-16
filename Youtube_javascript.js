// ===============================
// Search Videos with Spinner
// ===============================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const videoCards = document.querySelectorAll(".video-card");
const spinner = document.getElementById("spinner");

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

  // Show spinner
  spinner.style.display = "flex";

  // Simulate search delay
  setTimeout(() => {
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

    // Hide spinner after search
    spinner.style.display = "none";
  }, 800); // 0.8 second delay for spinner effect
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

// ===== Namespaced Help panel JS (non-invasive) =====
(function () {
  const profileContainer = document.querySelector(".profile-container");
  if (!profileContainer) return;

  const helpBtn = profileContainer.querySelector("#helpBtn");
  const helpMenu = profileContainer.querySelector("#helpMenu");
  const closeHelp = profileContainer.querySelector("#closeHelp");
  const helpSearch = profileContainer.querySelector("#helpSearch");

  if (!helpBtn || !helpMenu) return;

  // Toggle help open/close
  helpBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const open = helpMenu.classList.contains("is-open");
    if (open) {
      helpMenu.classList.remove("is-open");
      helpMenu.setAttribute("aria-hidden", "true");
    } else {
      // show help panel without forcing profile menu to close
      helpMenu.classList.add("is-open");
      helpMenu.setAttribute("aria-hidden", "false");

      // move focus to search input for accessibility
      const input = helpMenu.querySelector("#helpSearch");
      if (input) input.focus();
    }
  });

  // Prevent clicks inside the help panel from closing it
  helpMenu.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  // Close help using the close button
  if (closeHelp) {
    closeHelp.addEventListener("click", function (e) {
      e.stopPropagation();
      helpMenu.classList.remove("is-open");
      helpMenu.setAttribute("aria-hidden", "true");
    });
  }

  // Clicking outside closes help (does not affect other handlers)
  document.addEventListener("click", function () {
    if (helpMenu.classList.contains("is-open")) {
      helpMenu.classList.remove("is-open");
      helpMenu.setAttribute("aria-hidden", "true");
    }
  });

  // Optional: simple search/filter within help items
  if (helpSearch) {
    helpSearch.addEventListener("input", function () {
      const q = helpSearch.value.trim().toLowerCase();
      const items = helpMenu.querySelectorAll(".help-item");
      items.forEach(function (item) {
        const txt = item.textContent.trim().toLowerCase();
        item.style.display = txt.includes(q) ? "flex" : "none";
      });
    });
  }
})();

// ==========================================
// WATCH LATER
// ==========================================

const watchLaterBtn = document.getElementById("watchLaterBtn");

if (watchLaterBtn) {
  watchLaterBtn.addEventListener("click", function () {
    window.location.href = "watchlater.html";
  });
}
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
// =====================================================
// NOTIFICATION POPUP
// =====================================================
// =====================================================
// NOTIFICATION POPUP
// =====================================================

const notificationBtn = document.getElementById("notificationBtn");

const notificationPopup = document.getElementById("notificationPopup");

const notificationContainer = document.querySelector(".notification-container");

// -----------------------------------------------------
// OPEN / CLOSE NOTIFICATION POPUP
// -----------------------------------------------------

notificationBtn.addEventListener("click", function (event) {
  event.stopPropagation();

  const isOpen = notificationPopup.classList.contains("show");

  if (isOpen) {
    notificationPopup.classList.remove("show");
  } else {
    notificationPopup.classList.add("show");
  }
});

// -----------------------------------------------------
// DON'T CLOSE WHEN CLICKING INSIDE NOTIFICATION POPUP
// -----------------------------------------------------

notificationPopup.addEventListener("click", function (event) {
  event.stopPropagation();
});

// -----------------------------------------------------
// CLOSE WHEN CLICKING ANYWHERE OUTSIDE
// -----------------------------------------------------

document.addEventListener("click", function (event) {
  if (!notificationContainer.contains(event.target)) {
    notificationPopup.classList.remove("show");
  }
});

// =====================================================
// CLOSE NOTIFICATION WHEN CLICKING OTHER HEADER BUTTONS
// =====================================================

const otherHeaderButtons = document.querySelectorAll(
  "header button:not(#notificationBtn)",
);

otherHeaderButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    notificationPopup.classList.remove("show");
  });
});

// =====================================================
// CLOSE NOTIFICATION WHEN CLICKING OTHER IMPORTANT
// ELEMENTS OUTSIDE THE NOTIFICATION
// =====================================================

document.addEventListener("click", function (event) {
  if (!event.target.closest(".notification-container")) {
    notificationPopup.classList.remove("show");
  }
});
const headerButtons = document.querySelectorAll("header button");

headerButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (this.innerHTML.includes("📹"))
      if (this.innerHTML.includes("🔔"))
        // alert("Create Video feature coming soon!");

        alert("No new notifications.");

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

  // Hide spinner when clearing search
  spinner.style.display = "none";

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

  // Hide spinner when resetting
  spinner.style.display = "none";

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
// ===============================
// Logout Functionality
// ===============================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userEmail");

      window.open("about:blank", "_blank");
    }
  });
}
// ===============================
// Create Menu
// ===============================

const createBtn = document.getElementById("createBtn");
const createMenu = document.getElementById("createMenu");

if (createBtn && createMenu) {
  // Open / close Create menu
  createBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    createMenu.classList.toggle("show");
  });

  // Prevent clicks inside menu from closing it immediately
  createMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // Close menu when clicking anywhere outside
  document.addEventListener("click", function () {
    createMenu.classList.remove("show");
  });
}

// ===============================
// Upload Video
// ===============================

const uploadVideoBtn = document.getElementById("uploadVideoBtn");

if (uploadVideoBtn) {
  uploadVideoBtn.addEventListener("click", function () {
    window.location.href = "upload.html";
  });
}

// ===============================
// Go Live
// ===============================

const goLiveBtn = document.getElementById("goLiveBtn");

if (goLiveBtn) {
  goLiveBtn.addEventListener("click", function () {
    window.location.href = "live.html";
  });
}

// ===============================
// Create Post
// ===============================

const createPostBtn = document.getElementById("createPostBtn");

if (createPostBtn) {
  createPostBtn.addEventListener("click", function () {
    window.location.href = "create-post.html";
  });
}

// Filter chips: All / Videos / Shorts / Podcasts / Music
const chips = document.querySelectorAll(".chip");
const items = document.querySelectorAll(".hist-item");
const emptyState = document.getElementById("emptyState");

function applyFilter(filter) {
  let visibleCount = 0;
  items.forEach((item) => {
    const match = filter === "all" || item.dataset.category === filter;
    item.style.display = match ? "flex" : "none";
    if (match) visibleCount++;
  });
  emptyState.style.display = visibleCount === 0 ? "block" : "none";
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    applyFilter(chip.dataset.filter);
  });
});

// Search within watch history
document.getElementById("historySearch").addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  let visibleCount = 0;
  items.forEach((item) => {
    const match = item.dataset.title.toLowerCase().includes(q);
    item.style.display = match ? "flex" : "none";
    if (match) visibleCount++;
  });
  emptyState.style.display = visibleCount === 0 ? "block" : "none";
});

// Clear all watch history
document.getElementById("clearAllBtn").addEventListener("click", () => {
  if (confirm("Clear all watch history? This cannot be undone.")) {
    items.forEach((item) => item.remove());
    emptyState.style.display = "block";
  }
});

// Pause / resume watch history (just a UI toggle for this dummy app)
let paused = false;
document.getElementById("pauseBtn").addEventListener("click", () => {
  paused = !paused;
  document.getElementById("pauseLabel").textContent = paused
    ? "Resume watch history"
    : "Pause watch history";
});

document.getElementById("manageBtn").addEventListener("click", () => {
  alert("Manage all history settings would open here.");
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("hide-item");
});
