// =====================================================
// VIDEO DATA FROM SPRING BOOT API
// =====================================================

let videos = [];

const API_URL = "/api/videos";
// Search API
const SEARCH_API_URL = "/api/videos/search";

// =====================================================
// LOCAL STORAGE KEYS
// =====================================================

const LIKED_VIDEOS_KEY = "likedVideoIds";

// =====================================================
// WATCH HISTORY STORAGE
// =====================================================

const WATCH_HISTORY_KEY = "watchHistory";

// =====================================================
// GET WATCH HISTORY
// =====================================================

function getWatchHistory() {
  try {
    const history = JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || "[]");

    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.error("Error reading watch history:", error);

    return [];
  }
}

// =====================================================
// SAVE WATCH HISTORY
// =====================================================

function saveWatchHistory(history) {
  localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(history));
}

// =====================================================
// ADD VIDEO TO WATCH HISTORY
// =====================================================

function addToWatchHistory(video) {
  // ---------------------------------------------------
  // DO NOT ADD HISTORY WHEN HISTORY IS PAUSED
  // ---------------------------------------------------

  const historyPaused = localStorage.getItem("watchHistoryPaused") === "true";

  if (historyPaused) {
    console.log("Watch history is paused.");

    return;
  }

  // ---------------------------------------------------
  // Validate video
  // ---------------------------------------------------

  if (!video || !video.id) {
    console.warn("Cannot add invalid video to history.");

    return;
  }

  let history = getWatchHistory();

  const videoId = String(video.id);

  // ---------------------------------------------------
  // Remove duplicate
  // ---------------------------------------------------

  history = history.filter(function (item) {
    // Support old ID-only format
    if (typeof item === "string" || typeof item === "number") {
      return String(item) !== videoId;
    }

    // New object format
    return String(item.id) !== videoId;
  });

  // ---------------------------------------------------
  // Create history object
  // ---------------------------------------------------

  const historyItem = {
    id: video.id,

    title: video.title || "Untitled Video",

    channel: video.channel || "Unknown Channel",

    views: video.views || "0 views",

    uploaded: video.uploaded || "",

    duration: video.duration || "",

    thumbnail: video.thumbnail || "",

    category: video.category || "recommended",

    videoUrl: video.videoUrl || video.url || "",

    watchedAt: new Date().toISOString(),
  };

  // ---------------------------------------------------
  // Add to beginning
  // ---------------------------------------------------

  history.unshift(historyItem);

  // ---------------------------------------------------
  // Maximum history size
  // ---------------------------------------------------

  const MAX_HISTORY_ITEMS = 100;

  if (history.length > MAX_HISTORY_ITEMS) {
    history = history.slice(0, MAX_HISTORY_ITEMS);
  }

  // ---------------------------------------------------
  // Save
  // ---------------------------------------------------

  saveWatchHistory(history);

  console.log("Video added to watch history:", historyItem);
}
// =====================================================
// LIKED VIDEOS STORAGE
// =====================================================

function getLikedVideoIds() {
  try {
    return JSON.parse(localStorage.getItem(LIKED_VIDEOS_KEY) || "[]");
  } catch (error) {
    console.error("Error reading liked videos:", error);
    return [];
  }
}

function saveLikedVideoIds(ids) {
  localStorage.setItem(LIKED_VIDEOS_KEY, JSON.stringify(ids));
}

// =====================================================
// UPDATE LIKED VIDEOS COUNT
// =====================================================

function updateLikedVideosCount() {
  const likedVideoIds = getLikedVideoIds();

  const count = likedVideoIds.length;

  const countElements = [
    document.getElementById("likedVideosCount"),
    document.getElementById("likedVideoCount"),
    document.getElementById("liked-count"),
    document.getElementById("likedCount"),
  ];

  countElements.forEach(function (element) {
    if (element) {
      element.textContent = count;
    }
  });

  console.log("Liked videos count:", count);
}

// =====================================================
// WATCH HISTORY STORAGE
// =====================================================

// =====================================================
// GET VIDEO FROM CURRENT VIDEO ARRAY
// =====================================================

function getVideoById(videoId) {
  return videos.find(function (video) {
    return String(video.id) === String(videoId);
  });
}

// =====================================================
// COMMON DOM ELEMENTS
// =====================================================

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const spinner = document.getElementById("spinner");

const clearBtn = document.getElementById("clearBtn");

// =====================================================
// LOAD VIDEOS FROM SPRING BOOT API
// =====================================================

async function loadVideosFromAPI() {
  try {
    console.log("Fetching videos from Spring Boot API...");

    if (spinner) {
      spinner.style.display = "flex";
    }

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("API request failed. Status: " + response.status);
    }

    const data = await response.json();

    console.log("Videos received from API:", data);

    videos = data;

    // =================================================
    // RESTORE LIKED STATUS FROM LOCAL STORAGE
    // =================================================

    const likedVideoIds = getLikedVideoIds();

    videos.forEach(function (video) {
      video.liked = likedVideoIds.includes(String(video.id));
    });

    // =================================================
    // UPDATE LIKED COUNT
    // =================================================

    updateLikedVideosCount();

    // =================================================
    // RENDER VIDEOS
    // =================================================

    renderVideos();
  } catch (error) {
    console.error("Error loading videos from API:", error);

    showAPIError();
  } finally {
    if (spinner) {
      spinner.style.display = "none";
    }
  }
}

// =====================================================
// API ERROR MESSAGE
// =====================================================

function showAPIError() {
  const containers = [
    document.getElementById("recommendedVideos"),

    document.getElementById("trendingVideos"),

    document.getElementById("musicVideos"),

    document.getElementById("movieVideos"),
  ];

  containers.forEach(function (container) {
    if (container) {
      container.innerHTML = `

        <div class="no-results">

          <h3>
            Unable to load videos
          </h3>

          <p>
            Please make sure the Spring Boot API
            is running on port 8080.
          </p>

        </div>

      `;
    }
  });
}

// =====================================================
// CREATE VIDEO CARD
// =====================================================

function createVideoCard(video) {
  const isLiked = video.liked === true;

  return `

    <div class="video-card">

      <article data-id="${video.id}">

        <div class="thumbnail-container">

          <img
            src="${video.thumbnail || ""}"
            alt="${video.title || "Video"}"
            loading="lazy"
          >

          <span class="dur">
            ${video.duration || ""}
          </span>

        </div>

        <div class="video-info">

          <h3>
            ${video.title || "Untitled Video"}
          </h3>

          <p>
            ${video.channel || "Unknown Channel"}
          </p>

          <p>
            ${video.views || "0 views"} •
            ${video.uploaded || ""}
          </p>

          <button
            class="like-btn ${isLiked ? "liked" : ""}"
            data-id="${video.id}"
            type="button"
          >
            ${isLiked ? "♥ Liked" : "♡ Like"}
          </button>

        </div>

      </article>

    </div>

  `;
}

// =====================================================
// LIKE / UNLIKE VIDEO API
// =====================================================

async function toggleLikeVideo(videoId, likeButton) {
  const isCurrentlyLiked = likeButton.classList.contains("liked");

  try {
    likeButton.disabled = true;

    let response;

    // =================================================
    // UNLIKE
    // =================================================

    if (isCurrentlyLiked) {
      response = await fetch(`${API_URL}/${videoId}/like`, {
        method: "DELETE",
      });
    }

    // =================================================
    // LIKE
    // =================================================
    else {
      response = await fetch(`${API_URL}/${videoId}/like`, {
        method: "POST",
      });
    }

    // =================================================
    // CHECK RESPONSE
    // =================================================

    if (!response.ok) {
      throw new Error("Like API failed. Status: " + response.status);
    }

    // =================================================
    // READ RESPONSE
    // =================================================

    let updatedVideo = null;

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      updatedVideo = await response.json();
    }

    console.log("Like API response:", updatedVideo);

    // =================================================
    // NEW LIKE STATUS
    // =================================================

    const newLikeStatus = !isCurrentlyLiked;

    // =================================================
    // UPDATE VIDEO ARRAY
    // =================================================

    const videoIndex = videos.findIndex(function (video) {
      return String(video.id) === String(videoId);
    });

    if (videoIndex !== -1) {
      videos[videoIndex].liked = newLikeStatus;
    }

    // =================================================
    // UPDATE LOCAL STORAGE
    // =================================================

    let likedVideoIds = getLikedVideoIds();

    if (newLikeStatus) {
      if (!likedVideoIds.includes(String(videoId))) {
        likedVideoIds.push(String(videoId));
      }
    } else {
      likedVideoIds = likedVideoIds.filter(function (id) {
        return String(id) !== String(videoId);
      });
    }

    saveLikedVideoIds(likedVideoIds);

    // =================================================
    // UPDATE COUNT
    // =================================================

    updateLikedVideosCount();

    // =================================================
    // UPDATE BUTTON
    // =================================================

    if (newLikeStatus) {
      likeButton.classList.add("liked");

      likeButton.innerHTML = "♥ Liked";
    } else {
      likeButton.classList.remove("liked");

      likeButton.innerHTML = "♡ Like";
    }
  } catch (error) {
    console.error("Like/Unlike error:", error);

    alert("Unable to update like status.");
  } finally {
    likeButton.disabled = false;
  }
}

// =====================================================
// RENDER VIDEOS
// =====================================================

function renderVideos() {
  const recommendedContainer = document.getElementById("recommendedVideos");

  const trendingContainer = document.getElementById("trendingVideos");

  const musicContainer = document.getElementById("musicVideos");

  const moviesContainer = document.getElementById("movieVideos");

  if (
    !recommendedContainer ||
    !trendingContainer ||
    !musicContainer ||
    !moviesContainer
  ) {
    console.error("Video containers are missing from HTML.");

    return;
  }

  recommendedContainer.innerHTML = "";
  trendingContainer.innerHTML = "";
  musicContainer.innerHTML = "";
  moviesContainer.innerHTML = "";

  videos.forEach(function (video) {
    const card = createVideoCard(video);

    if (video.category === "recommended") {
      recommendedContainer.innerHTML += card;
    } else if (video.category === "trending") {
      trendingContainer.innerHTML += card;
    } else if (video.category === "music") {
      musicContainer.innerHTML += card;
    } else if (video.category === "movies") {
      moviesContainer.innerHTML += card;
    }
  });

  attachVideoEvents();

  updateLikedVideosCount();
}

// =====================================================
// VIDEO CLICK + LIKE BUTTON EVENTS
// =====================================================

function attachVideoEvents() {
  const articles = document.querySelectorAll(
    "#recommendedVideos article, " +
      "#trendingVideos article, " +
      "#musicVideos article, " +
      "#movieVideos article",
  );

  articles.forEach(function (article) {
    article.style.cursor = "pointer";

    // =================================================
    // VIDEO CLICK
    // =================================================

    article.addEventListener("click", function (event) {
      // Do not open video when Like clicked
      if (event.target.closest(".like-btn")) {
        return;
      }

      const id = article.dataset.id;

      console.log("Opening video:", id);

      // =============================================
      // ADD VIDEO TO WATCH HISTORY
      // =============================================

      const video = getVideoById(id);

      if (video) {
        addToWatchHistory(video);
      }

      // =============================================
      // OPEN VIDEO PAGE
      // =============================================

      window.open("video.html?id=" + encodeURIComponent(id), "_blank");
    });

    // =================================================
    // LIKE BUTTON
    // =================================================

    const likeButton = article.querySelector(".like-btn");

    if (likeButton) {
      likeButton.addEventListener("click", function (event) {
        event.preventDefault();

        event.stopPropagation();

        const videoId = this.dataset.id;

        console.log("Like button clicked:", videoId);

        toggleLikeVideo(videoId, this);
      });
    }

    // =================================================
    // HOVER EFFECT
    // =================================================

    article.addEventListener("mouseenter", function () {
      article.style.transform = "scale(1.02)";
    });

    article.addEventListener("mouseleave", function () {
      article.style.transform = "scale(1)";
    });
  });
}

// =====================================================
// GET ACTIVE CATEGORY
// =====================================================

function getActiveCategory() {
  const trendingSection = document.getElementById("trending-section");

  const musicSection = document.getElementById("music-section");

  const moviesSection = document.getElementById("movies");

  if (trendingSection && trendingSection.style.display !== "none") {
    return "trending";
  }

  if (musicSection && musicSection.style.display !== "none") {
    return "music";
  }

  if (moviesSection && moviesSection.style.display !== "none") {
    return "movies";
  }

  return "recommended";
}

// =====================================================
// SEARCH VIDEOS USING SPRING BOOT SEARCH API
// =====================================================

async function searchVideos() {
  if (!searchInput) {
    return;
  }

  const value = searchInput.value.trim();

  // =================================================
  // EMPTY SEARCH
  // =================================================

  if (value === "") {
    resetSearch();

    return;
  }

  const activeCategory = getActiveCategory();

  console.log("Searching for:", value);

  console.log("Active category:", activeCategory);

  // =================================================
  // BUILD SEARCH URL
  // =================================================

  const searchURL =
    SEARCH_API_URL +
    "?keyword=" +
    encodeURIComponent(value) +
    "&category=" +
    encodeURIComponent(activeCategory);

  console.log("Search API:", searchURL);

  // =================================================
  // SHOW SPINNER
  // =================================================

  if (spinner) {
    spinner.style.display = "flex";
  }

  try {
    const response = await fetch(searchURL);

    if (!response.ok) {
      throw new Error("Search API request failed. Status: " + response.status);
    }

    const searchResults = await response.json();

    console.log("Search results received:", searchResults);

    // =================================================
    // RESTORE LIKE STATUS
    // =================================================

    const likedVideoIds = getLikedVideoIds();

    searchResults.forEach(function (video) {
      video.liked = likedVideoIds.includes(String(video.id));
    });

    // =================================================
    // DISPLAY RESULTS
    // =================================================

    renderSearchResults(searchResults, activeCategory);
  } catch (error) {
    console.error("Search API error:", error);

    renderSearchAPIError();
  } finally {
    if (spinner) {
      spinner.style.display = "none";
    }
  }
}

// =====================================================
// RENDER SEARCH RESULTS
// =====================================================

function renderSearchResults(videoList, category) {
  const containers = {
    recommended: document.getElementById("recommendedVideos"),

    trending: document.getElementById("trendingVideos"),

    music: document.getElementById("musicVideos"),

    movies: document.getElementById("movieVideos"),
  };

  const container = containers[category];

  if (!container) {
    console.error("Container not found:", category);

    return;
  }

  container.innerHTML = "";

  // =================================================
  // NO RESULTS
  // =================================================

  if (!videoList || videoList.length === 0) {
    container.innerHTML = `

      <div class="no-results">

        <h3>
          No videos found
        </h3>

        <p>
          Try another search term.
        </p>

      </div>

    `;

    return;
  }

  // =================================================
  // DISPLAY RESULTS
  // =================================================

  videoList.forEach(function (video) {
    container.innerHTML += createVideoCard(video);
  });

  attachVideoEvents();

  updateLikedVideosCount();
}

// =====================================================
// SEARCH API ERROR
// =====================================================

function renderSearchAPIError() {
  const category = getActiveCategory();

  const containers = {
    recommended: document.getElementById("recommendedVideos"),

    trending: document.getElementById("trendingVideos"),

    music: document.getElementById("musicVideos"),

    movies: document.getElementById("movieVideos"),
  };

  const container = containers[category];

  if (!container) {
    return;
  }

  container.innerHTML = `

    <div class="no-results">

      <h3>
        Unable to search videos
      </h3>

      <p>
        Please make sure the Spring Boot
        backend is running on port 8080.
      </p>

      <p>
        Search API:
        <strong>
          /api/videos/search
        </strong>
      </p>

    </div>

  `;
}

// =====================================================
// SEARCH BUTTON
// =====================================================

if (searchBtn) {
  searchBtn.addEventListener("click", function () {
    searchVideos();
  });
}

// =====================================================
// ENTER KEY SEARCH
// =====================================================

if (searchInput) {
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchVideos();
    }
  });

  searchInput.addEventListener("input", function () {
    toggleClearButton();
  });
}

// =====================================================
// CLEAR BUTTON
// =====================================================

function toggleClearButton() {
  if (!searchInput || !clearBtn) {
    return;
  }

  if (searchInput.value.trim() !== "") {
    clearBtn.style.display = "flex";
  } else {
    clearBtn.style.display = "none";
  }
}

// =====================================================
// CLEAR SEARCH
// =====================================================

function clearSearch() {
  if (!searchInput) {
    return;
  }

  searchInput.value = "";

  toggleClearButton();

  if (spinner) {
    spinner.style.display = "none";
  }

  renderVideos();

  searchInput.focus();
}

if (clearBtn) {
  clearBtn.addEventListener("click", clearSearch);
}

// =====================================================
// RESET SEARCH
// =====================================================

function resetSearch() {
  if (searchInput) {
    searchInput.value = "";
  }

  toggleClearButton();

  if (spinner) {
    spinner.style.display = "none";
  }

  renderVideos();

  updateLikedVideosCount();
}

// =====================================================
// PROFILE MENU
// =====================================================

const profileBtn = document.getElementById("profileBtn");

const profileMenu = document.getElementById("profileMenu");

if (profileBtn && profileMenu) {
  profileBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    if (profileMenu.style.display === "block") {
      profileMenu.style.display = "none";
    } else {
      profileMenu.style.display = "block";
    }
  });

  profileMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", function () {
    profileMenu.style.display = "none";
  });
}

// =====================================================
// HELP PANEL
// =====================================================

(function () {
  const profileContainer = document.querySelector(".profile-container");

  if (!profileContainer) {
    return;
  }

  const helpBtn = profileContainer.querySelector("#helpBtn");

  const helpMenu = profileContainer.querySelector("#helpMenu");

  const closeHelp = profileContainer.querySelector("#closeHelp");

  const helpSearch = profileContainer.querySelector("#helpSearch");

  if (!helpBtn || !helpMenu) {
    return;
  }

  helpBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    const open = helpMenu.classList.contains("is-open");

    if (open) {
      helpMenu.classList.remove("is-open");

      helpMenu.setAttribute("aria-hidden", "true");
    } else {
      helpMenu.classList.add("is-open");

      helpMenu.setAttribute("aria-hidden", "false");

      if (helpSearch) {
        helpSearch.focus();
      }
    }
  });

  helpMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  if (closeHelp) {
    closeHelp.addEventListener("click", function (event) {
      event.stopPropagation();

      helpMenu.classList.remove("is-open");

      helpMenu.setAttribute("aria-hidden", "true");
    });
  }

  document.addEventListener("click", function () {
    if (helpMenu.classList.contains("is-open")) {
      helpMenu.classList.remove("is-open");

      helpMenu.setAttribute("aria-hidden", "true");
    }
  });

  if (helpSearch) {
    helpSearch.addEventListener("input", function () {
      const q = helpSearch.value.trim().toLowerCase();

      const items = helpMenu.querySelectorAll(".help-item");

      items.forEach(function (item) {
        const text = item.textContent.trim().toLowerCase();

        item.style.display = text.includes(q) ? "flex" : "none";
      });
    });
  }
})();

// =====================================================
// WATCH LATER
// =====================================================

const watchLaterBtn = document.getElementById("watchLaterBtn");

if (watchLaterBtn) {
  watchLaterBtn.addEventListener("click", function () {
    window.location.href = "watchlater.html";
  });
}

// =====================================================
// SIDEBAR
// =====================================================

const menuItems = document.querySelectorAll("aside li");

menuItems.forEach(function (item) {
  item.addEventListener("click", function () {
    menuItems.forEach(function (li) {
      li.style.background = "";
    });

    this.style.background = "red";
  });
});

// =====================================================
// THEME / APPEARANCE
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  const appearanceBtn = document.getElementById("appearanceBtn");

  const appearanceMenu = document.getElementById("appearanceMenu");

  const backAppearance = document.getElementById("backAppearance");

  if (appearanceBtn && appearanceMenu) {
    appearanceBtn.addEventListener("click", function () {
      appearanceMenu.style.display = "block";
    });
  }

  if (backAppearance && appearanceMenu) {
    backAppearance.addEventListener("click", function () {
      appearanceMenu.style.display = "none";
    });
  }

  document.querySelectorAll('input[name="theme"]').forEach(function (item) {
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

// =====================================================
// SIDEBAR TOGGLE
// =====================================================

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

const hideItems = document.querySelectorAll(".hide-item");

if (menuBtn && sidebar) {
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
}

// =====================================================
// NOTIFICATION POPUP
// =====================================================

const notificationBtn = document.getElementById("notificationBtn");

const notificationPopup = document.getElementById("notificationPopup");

const notificationContainer = document.querySelector(".notification-container");

if (notificationBtn && notificationPopup) {
  notificationBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    notificationPopup.classList.toggle("show");
  });

  notificationPopup.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", function (event) {
    if (
      notificationContainer &&
      !notificationContainer.contains(event.target)
    ) {
      notificationPopup.classList.remove("show");
    }
  });
}

// =====================================================
// HEADER BUTTONS
// =====================================================

const headerButtons = document.querySelectorAll("header button");

headerButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (this.innerHTML.includes("🔔")) {
      // Notification handled separately
    }

    if (this.innerHTML.includes("👤")) {
      console.log("User Profile");
    }
  });
});

// =====================================================
// HOME / TRENDING / MUSIC / MOVIES
// =====================================================

function showSection(sectionName) {
  const recommendedSection = document.getElementById("recommended-section");

  const trendingSection = document.getElementById("trending-section");

  const musicSection = document.getElementById("music-section");

  const moviesSection = document.getElementById("movies");

  if (recommendedSection) {
    recommendedSection.style.display =
      sectionName === "recommended" ? "block" : "none";
  }

  if (trendingSection) {
    trendingSection.style.display =
      sectionName === "trending" ? "block" : "none";
  }

  if (musicSection) {
    musicSection.style.display = sectionName === "music" ? "block" : "none";
  }

  if (moviesSection) {
    moviesSection.style.display = sectionName === "movies" ? "block" : "none";
  }

  resetSearch();
}

// =====================================================
// HOME
// =====================================================

const homeBtn = document.getElementById("home");

if (homeBtn) {
  homeBtn.addEventListener("click", function () {
    showSection("recommended");
  });
}

// =====================================================
// TRENDING
// =====================================================

const trendingBtn = document.getElementById("trending");

if (trendingBtn) {
  trendingBtn.addEventListener("click", function () {
    showSection("trending");
  });
}

// =====================================================
// MUSIC
// =====================================================

const musicBtn = document.getElementById("music");

if (musicBtn) {
  musicBtn.addEventListener("click", function () {
    showSection("music");
  });
}

// =====================================================
// MOVIES
// =====================================================

const moviesBtn = document.getElementById("moviesBtn");

if (moviesBtn) {
  moviesBtn.addEventListener("click", function () {
    showSection("movies");
  });
}

// =====================================================
// FOOTER
// =====================================================

const footerText = document.querySelector("footer p");

if (footerText) {
  footerText.innerHTML = `&copy; ${new Date().getFullYear()} RTube. This is a dummy webpage created for learning purposes.`;
}

// =====================================================
// VOICE SEARCH
// =====================================================

const voiceBtn = document.getElementById("voiceBtn");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (voiceBtn && SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.interimResults = false;

  recognition.maxAlternatives = 1;

  voiceBtn.addEventListener("click", function () {
    recognition.start();

    voiceBtn.innerHTML = "🎙️";
  });

  recognition.addEventListener("result", function (event) {
    const transcript = event.results[0][0].transcript;

    if (searchInput) {
      searchInput.value = transcript;

      toggleClearButton();

      searchVideos();
    }
  });

  recognition.addEventListener("end", function () {
    voiceBtn.innerHTML = "🎤";
  });

  recognition.addEventListener("error", function () {
    voiceBtn.innerHTML = "🎤";

    alert("Voice recognition failed.");
  });
} else if (voiceBtn) {
  voiceBtn.style.display = "none";
}

// =====================================================
// LOGOUT
// =====================================================

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

// =====================================================
// CREATE MENU
// =====================================================

const createBtn = document.getElementById("createBtn");

const createMenu = document.getElementById("createMenu");

if (createBtn && createMenu) {
  createBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    createMenu.classList.toggle("show");
  });

  createMenu.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", function () {
    createMenu.classList.remove("show");
  });
}

// =====================================================
// UPLOAD VIDEO
// =====================================================

const uploadVideoBtn = document.getElementById("uploadVideoBtn");

if (uploadVideoBtn) {
  uploadVideoBtn.addEventListener("click", function () {
    window.location.href = "upload.html";
  });
}

// =====================================================
// GO LIVE
// =====================================================

const goLiveBtn = document.getElementById("goLiveBtn");

if (goLiveBtn) {
  goLiveBtn.addEventListener("click", function () {
    window.location.href = "live.html";
  });
}

// =====================================================
// CREATE POST
// =====================================================

const createPostBtn = document.getElementById("createPostBtn");

if (createPostBtn) {
  createPostBtn.addEventListener("click", function () {
    window.location.href = "create-post.html";
  });
}

// =====================================================
// WATCH HISTORY
// =====================================================

const chips = document.querySelectorAll(".chip");

const items = document.querySelectorAll(".hist-item");

const emptyState = document.getElementById("emptyState");

function applyFilter(filter) {
  let visibleCount = 0;

  items.forEach(function (item) {
    const match = filter === "all" || item.dataset.category === filter;

    item.style.display = match ? "flex" : "none";

    if (match) {
      visibleCount++;
    }
  });

  if (emptyState) {
    emptyState.style.display = visibleCount === 0 ? "block" : "none";
  }
}

chips.forEach(function (chip) {
  chip.addEventListener("click", function () {
    chips.forEach(function (c) {
      c.classList.remove("active");
    });

    chip.classList.add("active");

    applyFilter(chip.dataset.filter);
  });
});

// =====================================================
// HISTORY SEARCH
// =====================================================

const historySearch = document.getElementById("historySearch");

if (historySearch) {
  historySearch.addEventListener("input", function (e) {
    const q = e.target.value.trim().toLowerCase();

    let visibleCount = 0;

    items.forEach(function (item) {
      const title = item.dataset.title || "";

      const match = title.toLowerCase().includes(q);

      item.style.display = match ? "flex" : "none";

      if (match) {
        visibleCount++;
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? "block" : "none";
    }
  });
}

// =====================================================
// CLEAR ALL HISTORY
// =====================================================

const clearAllBtn = document.getElementById("clearAllBtn");

if (clearAllBtn) {
  clearAllBtn.addEventListener("click", function () {
    if (confirm("Clear all watch history? This cannot be undone.")) {
      // =============================================
      // CLEAR LOCAL STORAGE HISTORY
      // =============================================

      localStorage.removeItem(WATCH_HISTORY_KEY);

      // =============================================
      // REMOVE HISTORY ITEMS FROM PAGE
      // =============================================

      items.forEach(function (item) {
        item.remove();
      });

      if (emptyState) {
        emptyState.style.display = "block";
      }
    }
  });
}

// =====================================================
// PAUSE / RESUME HISTORY
// =====================================================

const pauseBtn = document.getElementById("pauseBtn");

const pauseLabel = document.getElementById("pauseLabel");

let paused = false;

if (pauseBtn) {
  pauseBtn.addEventListener("click", function () {
    paused = !paused;

    if (pauseLabel) {
      pauseLabel.textContent = paused
        ? "Resume watch history"
        : "Pause watch history";
    }

    // Store history pause state
    localStorage.setItem("watchHistoryPaused", paused);
  });
}

// =====================================================
// RESTORE HISTORY PAUSE STATE
// =====================================================

const savedPausedState = localStorage.getItem("watchHistoryPaused");

if (savedPausedState === "true") {
  paused = true;

  if (pauseLabel) {
    pauseLabel.textContent = "Resume watch history";
  }
}

// =====================================================
// MANAGE HISTORY
// =====================================================

const manageBtn = document.getElementById("manageBtn");

if (manageBtn) {
  manageBtn.addEventListener("click", function () {
    alert("Manage all history settings would open here.");
  });
}

// =====================================================
// INITIALIZE APPLICATION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("RTube frontend loaded.");

  // ===============================================
  // UPDATE LIKED COUNT
  // ===============================================

  updateLikedVideosCount();

  // ===============================================
  // LOAD VIDEOS
  // ===============================================

  loadVideosFromAPI();
});
