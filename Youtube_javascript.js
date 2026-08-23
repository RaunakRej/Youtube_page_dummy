// =====================================================
// VIDEO DATA
// =====================================================

const videos = [
  {
    id: 1,
    title: "Jannat Full Movie | Emraan Hashmi",
    channel: "T-Series Movies",
    views: "25M views",
    uploaded: "2 years ago",
    duration: "2:08:19",
    thumbnail:
      "https://cdn.cinematerial.com/p/297x/iajmjaap/jannat-indian-movie-poster-md.jpg?v=1456298328",
    category: "recommended",
    url: "https://youtu.be/rdDSok6g1LI?si=g5i3DvlkaO555qY0",
  },

  {
    id: 2,
    title: "Aashiq Banaya Aapne | HD Video Song",
    channel: "Bollywood Hits",
    views: "120M views",
    uploaded: "4 years ago",
    duration: "2:05:33",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42lvnHL2Hnqnjocbv1Q9vMdhVQEsehl34HcLcrfSHyg&s=10",
    category: "recommended",
    url: "https://www.youtube.com/embed/VIDEO_ID_2",
  },

  {
    id: 3,
    title: "Murder (2004) Best Scenes",
    channel: "Movie Clips",
    views: "15M views",
    uploaded: "1 year ago",
    duration: "2:04:12",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvSOC3si4jKR47IV6FprMm03f3dcYL5GoGmZEZQvebmg&s=10",
    category: "recommended",
    url: "https://www.youtube.com/embed/VIDEO_ID_3",
  },

  {
    id: 4,
    title: "Hamari Adhuri Kahani | Official Trailer",
    channel: "Movie Trailers",
    views: "45M views",
    uploaded: "5 years ago",
    duration: "2:09:33",
    thumbnail: "https://picsum.photos/300/180",
    category: "recommended",
    url: "https://www.youtube.com/embed/VIDEO_ID_4",
  },

  {
    id: 5,
    title: "Emraan Hashmi Exclusive Interview",
    channel: "Film Companion",
    views: "3.5M views",
    uploaded: "6 months ago",
    duration: "45:19",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXip1tYlrJ4pef4ugmcjnHD7na_C_I8Eia4FzfLFLU6Q&s=10",
    category: "recommended",
    url: "https://www.youtube.com/embed/VIDEO_ID_5",
  },

  {
    id: 6,
    title: "To phir Aao Song",
    channel: "Vishesh Films",
    views: "101M views",
    uploaded: "2 months ago",
    duration: "05:17",
    thumbnail:
      "https://th.bing.com/th/id/OIP.k1V3mVsjP0pYUZnOzcvTlQHaEK?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "trending",
    url: "https://www.youtube.com/embed/VIDEO_ID_6",
  },

  {
    id: 7,
    title: "Hale Dil",
    channel: "Murder 2",
    views: "284M views",
    uploaded: "10 years ago",
    duration: "04:49",
    thumbnail:
      "https://th.bing.com/th/id/OIP.tdBI_FTDeRU-NCZe9yZO_gHaEK?w=320&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "music",
    url: "https://www.youtube.com/embed/VIDEO_ID_7",
  },

  {
    id: 8,
    title: "Lutt Gaye",
    channel: "Music Album",
    views: "680M views",
    uploaded: "3 years ago",
    duration: "04:00",
    thumbnail:
      "https://tellyflight.com/wp-content/uploads/2021/02/LUT-GAYE-SONG-CAST-AND-LYRICS-copy.jpg",
    category: "music",
    url: "https://www.youtube.com/embed/VIDEO_ID_8",
  },

  {
    id: 9,
    title: "Tumhare liye",
    channel: "Music Album",
    views: "4.5M views",
    uploaded: "11 Hours ago",
    duration: "03:28",
    thumbnail:
      "https://i.ytimg.com/vi/8Mj-MjMFDxc/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAA3Ty-5NFd2HmJo-tjmKFLrXrGfQ",
    category: "music",
    url: "https://www.youtube.com/embed/VIDEO_ID_9",
  },

  {
    id: 10,
    title: "Raaz The Mystery Continues",
    channel: "Raaz 2",
    views: "145M views",
    uploaded: "8 months ago",
    duration: "2:17:13",
    thumbnail:
      "https://www.bing.com/th/id/OIP._8PqTx9T1g9OUQ_4Rf5oFgHaJ4?w=193&h=257&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=ImgAns&rm=2",
    category: "movies",
    url: "https://www.youtube.com/embed/VIDEO_ID_10",
  },

  {
    id: 11,
    title: "Raaz 3",
    channel: "Raaz 3D",
    views: "152M views",
    uploaded: "1 year ago",
    duration: "2:12:06",
    thumbnail:
      "https://m.media-amazon.com/images/S/pv-target-images/78127490fdc2d9ba76361584d915587983a5664a9d6a0fc987e892b15df1d602.jpg",
    category: "movies",
    url: "https://www.youtube.com/embed/VIDEO_ID_11",
  },

  {
    id: 12,
    title: "Raaz Reboot",
    channel: "Raaz Reboot",
    views: "50M views",
    uploaded: "6 months ago",
    duration: "2:06:18",
    thumbnail:
      "https://a10.gaanacdn.com/gn_img/albums/10q3ZR1352/0q3ZA9A6K5/size_l.jpg",
    category: "movies",
    url: "https://www.youtube.com/embed/VIDEO_ID_12",
  },

  {
    id: 13,
    title: "Ek thi Daayan",
    channel: "Ek thi Daayan",
    views: "118M views",
    uploaded: "12 years ago",
    duration: "2:11:06",
    thumbnail:
      "https://th.bing.com/th/id/OIP.6jYyGT7PLez-jDAN4IFkQgHaHa?w=161&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "movies",
    url: "https://www.youtube.com/embed/VIDEO_ID_13",
  },

  {
    id: 14,
    title: "Crook",
    channel: "Crook",
    views: "10M views",
    uploaded: "11 Months ago",
    duration: "1:59:45",
    thumbnail:
      "https://th.bing.com/th/id/OIP.T4B8ybFe3zhahGm_lz9s_QHaKn?w=208&h=299&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    category: "movies",
    url: "https://www.youtube.com/embed/VIDEO_ID_14",
  },
];

// =====================================================
// COMMON DOM ELEMENTS
// =====================================================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const spinner = document.getElementById("spinner");
const clearBtn = document.getElementById("clearBtn");

// =====================================================
// CREATE VIDEO CARD
// =====================================================

function createVideoCard(video) {
  return `
    <div class="video-card">

      <article data-id="${video.id}">

        <div class="thumbnail-container">

          <img
            src="${video.thumbnail}"
            alt="${video.title}"
            loading="lazy"
          >

          <span class="dur">
            ${video.duration}
          </span>

        </div>

        <div class="video-info">

          <h3>${video.title}</h3>

          <p>${video.channel}</p>

          <p>
            ${video.views} • ${video.uploaded}
          </p>

        </div>

      </article>

    </div>
  `;
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
}

// =====================================================
// VIDEO CLICK EVENTS
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

    article.addEventListener("click", function () {
      const id = article.dataset.id;

      console.log("Opening video:", id);

      window.open("video.html?id=" + id, "_blank");
    });

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
// SEARCH VIDEOS WITH SPINNER
// =====================================================

function searchVideos() {
  if (!searchInput) {
    return;
  }

  const value = searchInput.value.trim().toLowerCase();

  const activeCategory = getActiveCategory();

  // Show spinner
  if (spinner) {
    spinner.style.display = "flex";
  }

  // Give the browser time to display the spinner
  setTimeout(function () {
    try {
      let filteredVideos;

      if (value === "") {
        filteredVideos = videos.filter(function (video) {
          return video.category === activeCategory;
        });
      } else {
        filteredVideos = videos.filter(function (video) {
          const matchesText =
            video.title.toLowerCase().includes(value) ||
            video.channel.toLowerCase().includes(value);

          const matchesCategory = video.category === activeCategory;

          return matchesText && matchesCategory;
        });
      }

      renderSearchResults(filteredVideos, activeCategory);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      // Hide spinner after search is completed
      if (spinner) {
        spinner.style.display = "none";
      }
    }
  }, 300);
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

  if (videoList.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>No videos found</h3>
        <p>Try another search term.</p>
      </div>
    `;

    return;
  }

  videoList.forEach(function (video) {
    container.innerHTML += createVideoCard(video);
  });

  attachVideoEvents();
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
// CLEAR SEARCH BUTTON
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

function clearSearch() {
  if (!searchInput) {
    return;
  }

  searchInput.value = "";

  toggleClearButton();

  if (spinner) {
    spinner.style.display = "none";
  }

  const category = getActiveCategory();

  const filteredVideos = videos.filter(function (video) {
    return video.category === category;
  });

  renderSearchResults(filteredVideos, category);

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

  const otherHeaderButtons = document.querySelectorAll(
    "header button:not(#notificationBtn)",
  );

  otherHeaderButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      notificationPopup.classList.remove("show");
    });
  });
}

// =====================================================
// HEADER BUTTONS
// =====================================================

const headerButtons = document.querySelectorAll("header button");

headerButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (this.innerHTML.includes("🔔")) {
      // Notification popup handles
      // notification button.
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

    searchInput.value = transcript;

    toggleClearButton();

    searchVideos();
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
// These elements may exist only on the
// Watch History page.
// Therefore null checks are required.
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
  });
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
  renderVideos();
});
