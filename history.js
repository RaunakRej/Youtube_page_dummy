// =====================================================
// WATCH HISTORY
// =====================================================

const HISTORY_KEY = "watchHistory";

const API_URL = "http://localhost:8080/api/videos";

// =====================================================
// GLOBAL VARIABLES
// =====================================================

let videos = [];
let historyVideos = [];
let currentFilter = "all";

let historyPaused = localStorage.getItem("watchHistoryPaused") === "true";

// =====================================================
// GET HISTORY FROM LOCAL STORAGE
// =====================================================

function getHistory() {
  try {
    const storedHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");

    if (!Array.isArray(storedHistory)) {
      return [];
    }

    return storedHistory;
  } catch (error) {
    console.error("Error reading watch history:", error);
    return [];
  }
}

// =====================================================
// SAVE HISTORY
// =====================================================

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// =====================================================
// NORMALIZE HISTORY
// Supports both:
// 1. Old format: [1, 2, 3]
// 2. New format: [{id: 1, title: "..."}]
// =====================================================

function normalizeHistory(history) {
  return history
    .map(function (item) {
      // Old format
      if (typeof item === "string" || typeof item === "number") {
        const video = videos.find(function (video) {
          return String(video.id) === String(item);
        });

        if (video) {
          return {
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
        }

        return null;
      }

      // New format
      if (typeof item === "object" && item !== null) {
        return item;
      }

      return null;
    })
    .filter(function (item) {
      return item !== null;
    });
}

// =====================================================
// REMOVE VIDEO FROM HISTORY
// =====================================================

function removeFromHistory(videoId) {
  let history = getHistory();

  history = normalizeHistory(history);

  history = history.filter(function (item) {
    return String(item.id) !== String(videoId);
  });

  saveHistory(history);

  loadHistory();
}

// =====================================================
// CLEAR ALL HISTORY
// =====================================================

function clearAllHistory() {
  const history = getHistory();

  if (history.length === 0) {
    alert("Watch history is already empty.");
    return;
  }

  const confirmation = confirm("Clear all watch history?");

  if (!confirmation) {
    return;
  }

  localStorage.removeItem(HISTORY_KEY);

  historyVideos = [];

  renderHistory();
}

// =====================================================
// FETCH VIDEOS FROM SPRING BOOT API
// =====================================================

async function loadVideosFromAPI() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch videos. Status: " + response.status);
    }

    videos = await response.json();

    console.log("Videos loaded from API:", videos);

    loadHistory();
  } catch (error) {
    console.error("API Error:", error);

    // Even if API fails, try displaying
    // history objects already stored locally.
    loadHistory();
  }
}

// =====================================================
// LOAD HISTORY
// =====================================================

function loadHistory() {
  let history = getHistory();

  // Convert old ID-only history to objects
  history = normalizeHistory(history);

  historyVideos = history;

  // Save normalized history
  saveHistory(history);

  console.log("History videos:", historyVideos);

  renderHistory();
}

// =====================================================
// RENDER HISTORY
// =====================================================

function renderHistory() {
  const historyList = document.getElementById("historyList");

  const emptyState = document.getElementById("emptyState");

  if (!historyList) {
    console.error("historyList element not found in history.html");
    return;
  }

  historyList.innerHTML = "";

  // =================================================
  // APPLY CATEGORY FILTER
  // =================================================

  let filteredVideos = [...historyVideos];

  if (currentFilter !== "all") {
    filteredVideos = filteredVideos.filter(function (video) {
      const category = String(video.category || "").toLowerCase();

      return category === currentFilter.toLowerCase();
    });
  }

  // =================================================
  // SEARCH
  // =================================================

  const searchInput = document.getElementById("historySearch");

  const searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";

  if (searchText) {
    filteredVideos = filteredVideos.filter(function (video) {
      const title = String(video.title || "").toLowerCase();

      const channel = String(video.channel || "").toLowerCase();

      return title.includes(searchText) || channel.includes(searchText);
    });
  }

  // =================================================
  // EMPTY STATE
  // =================================================

  if (filteredVideos.length === 0) {
    if (emptyState) {
      emptyState.style.display = "block";

      if (historyVideos.length > 0) {
        emptyState.textContent = "No videos found in your watch history.";
      } else {
        emptyState.textContent = "Videos you watch will appear here.";
      }
    }

    return;
  }

  if (emptyState) {
    emptyState.style.display = "none";
  }

  // =================================================
  // TODAY HEADING
  // =================================================

  const heading = document.createElement("h2");

  heading.className = "day-heading";

  heading.textContent = "Today";

  historyList.appendChild(heading);

  // =================================================
  // CREATE HISTORY ITEMS
  // =================================================

  filteredVideos.forEach(function (video) {
    const item = createHistoryItem(video);

    historyList.appendChild(item);
  });
}

// =====================================================
// CREATE HISTORY ITEM
// =====================================================

function createHistoryItem(video) {
  const item = document.createElement("div");

  item.className = "hist-item";

  // =================================================
  // THUMBNAIL
  // =================================================

  const thumb = document.createElement("div");

  thumb.className = "thumb";

  const img = document.createElement("img");

  img.src =
    video.thumbnail || "https://picsum.photos/seed/" + video.id + "/300/180";

  img.alt = video.title || "Video";

  img.onerror = function () {
    this.src = "https://picsum.photos/seed/" + video.id + "/300/180";
  };

  const duration = document.createElement("span");

  duration.className = "dur";

  duration.textContent = video.duration || "0:00";

  thumb.appendChild(img);
  thumb.appendChild(duration);

  // =================================================
  // VIDEO INFORMATION
  // =================================================

  const info = document.createElement("div");

  info.className = "hist-info";

  const title = document.createElement("h3");

  title.textContent = video.title || "Untitled video";

  const channel = document.createElement("p");

  channel.className = "channel-name";

  channel.textContent = video.channel || "Unknown channel";

  const views = document.createElement("p");

  views.textContent = "▷ " + (video.views || "0 views");

  info.appendChild(title);
  info.appendChild(channel);
  info.appendChild(views);

  // =================================================
  // WATCHED TIME
  // =================================================

  if (video.watchedAt) {
    const watchedTime = document.createElement("p");

    watchedTime.className = "watched-time";

    watchedTime.textContent = getWatchedTime(video.watchedAt);

    info.appendChild(watchedTime);
  }

  // =================================================
  // THREE DOT BUTTON
  // =================================================

  const dots = document.createElement("button");

  dots.className = "dots-btn";

  dots.textContent = "⋮";

  dots.title = "Remove from watch history";

  dots.type = "button";

  dots.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    removeFromHistory(video.id);
  });

  // =================================================
  // APPEND
  // =================================================

  item.appendChild(thumb);
  item.appendChild(info);
  item.appendChild(dots);

  // =================================================
  // OPEN VIDEO
  // =================================================

  item.addEventListener("click", function () {
    // Add again to top because
    // user watched it again
    addToHistory(video.id);

    window.location.href = "video.html?id=" + encodeURIComponent(video.id);
  });

  return item;
}

// =====================================================
// WATCHED TIME
// =====================================================

function getWatchedTime(dateString) {
  if (!dateString) {
    return "";
  }

  const watchedDate = new Date(dateString);

  if (isNaN(watchedDate.getTime())) {
    return "";
  }

  const now = new Date();

  const difference = now.getTime() - watchedDate.getTime();

  const minutes = Math.floor(difference / (1000 * 60));

  if (minutes < 1) {
    return "Watched just now";
  }

  if (minutes < 60) {
    return "Watched " + minutes + " minute" + (minutes > 1 ? "s" : "") + " ago";
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return "Watched " + hours + " hour" + (hours > 1 ? "s" : "") + " ago";
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return "Watched " + days + " day" + (days > 1 ? "s" : "") + " ago";
  }

  return "Watched on " + watchedDate.toLocaleDateString();
}

// =====================================================
// ADD VIDEO TO HISTORY
// =====================================================

function addToHistory(videoId) {
  if (historyPaused) {
    return;
  }

  const video = videos.find(function (video) {
    return String(video.id) === String(videoId);
  });

  if (!video) {
    console.warn("Video not found:", videoId);
    return;
  }

  let history = normalizeHistory(getHistory());

  // Remove duplicate
  history = history.filter(function (item) {
    return String(item.id) !== String(videoId);
  });

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

  history.unshift(historyItem);

  // Maximum 100 history items
  if (history.length > 100) {
    history = history.slice(0, 100);
  }

  saveHistory(history);
}

// =====================================================
// FILTER BUTTONS
// =====================================================

function setupFilters() {
  const chips = document.querySelectorAll(".chip");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.classList.remove("active");
      });

      this.classList.add("active");

      currentFilter = this.dataset.filter || "all";

      renderHistory();
    });
  });
}

// =====================================================
// HISTORY SEARCH
// =====================================================

function setupHistorySearch() {
  const searchInput = document.getElementById("historySearch");

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener("input", function () {
    renderHistory();
  });
}

// =====================================================
// CLEAR ALL BUTTON
// =====================================================

function setupClearButton() {
  const clearButton = document.getElementById("clearAllBtn");

  if (!clearButton) {
    return;
  }

  clearButton.addEventListener("click", clearAllHistory);
}

// =====================================================
// PAUSE / RESUME HISTORY
// =====================================================

function updatePauseButton() {
  const pauseLabel = document.getElementById("pauseLabel");

  const pauseBtn = document.getElementById("pauseBtn");

  if (!pauseLabel || !pauseBtn) {
    return;
  }

  if (historyPaused) {
    pauseLabel.textContent = "Resume watch history";

    const icon = pauseBtn.querySelector(".ico");

    if (icon) {
      icon.textContent = "▶";
    }
  } else {
    pauseLabel.textContent = "Pause watch history";

    const icon = pauseBtn.querySelector(".ico");

    if (icon) {
      icon.textContent = "⏸";
    }
  }
}

function toggleHistoryPause() {
  historyPaused = !historyPaused;

  localStorage.setItem("watchHistoryPaused", historyPaused);

  updatePauseButton();
}

function setupPauseButton() {
  const pauseBtn = document.getElementById("pauseBtn");

  if (!pauseBtn) {
    return;
  }

  pauseBtn.addEventListener("click", toggleHistoryPause);

  updatePauseButton();
}

// =====================================================
// MENU BUTTON
// =====================================================

function setupMenuButton() {
  const menuBtn = document.getElementById("menuBtn");

  const sidebar = document.getElementById("sidebar");

  if (!menuBtn || !sidebar) {
    return;
  }

  menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
  });
}

// =====================================================
// SEARCH BUTTON
// =====================================================

function setupSearchButton() {
  const searchBtn = document.getElementById("searchBtn");

  const searchInput = document.getElementById("searchInput");

  if (!searchBtn || !searchInput) {
    return;
  }

  function performSearch() {
    const query = searchInput.value.trim();

    if (!query) {
      return;
    }

    window.location.href = "index.html?search=" + encodeURIComponent(query);
  }

  searchBtn.addEventListener("click", performSearch);

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });
}

// =====================================================
// VOICE SEARCH
// =====================================================

function setupVoiceSearch() {
  const voiceBtn = document.getElementById("voiceBtn");

  const searchInput = document.getElementById("searchInput");

  if (!voiceBtn || !searchInput) {
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    voiceBtn.addEventListener("click", function () {
      alert("Voice search is not supported in this browser.");
    });

    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-IN";

  recognition.continuous = false;

  recognition.interimResults = false;

  voiceBtn.addEventListener("click", function () {
    recognition.start();
  });

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;

    searchInput.value = text;
  };

  recognition.onerror = function (event) {
    console.error("Voice search error:", event.error);
  };
}

// =====================================================
// API ERROR
// =====================================================

function showAPIError() {
  const historyList = document.getElementById("historyList");

  const emptyState = document.getElementById("emptyState");

  if (historyList) {
    historyList.innerHTML = `

      <div style="
        padding:20px;
        color:#ff0000;
        text-align:center;
      ">

        Unable to load videos from server.

        <br>

        Please make sure Spring Boot is running.

      </div>

    `;
  }

  if (emptyState) {
    emptyState.style.display = "none";
  }
}

// =====================================================
// INITIALIZE
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("History page loaded.");

  setupFilters();

  setupHistorySearch();

  setupClearButton();

  setupPauseButton();

  setupMenuButton();

  setupSearchButton();

  setupVoiceSearch();

  loadVideosFromAPI();
});
