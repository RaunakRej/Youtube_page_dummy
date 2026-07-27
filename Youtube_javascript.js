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
  const value = searchInput.value.toLowerCase();

  videoCards.forEach(function (card) {
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
  const input = document.getElementById("searchInput");

  input.value = "";

  document.getElementById("clearBtn").style.display = "none";

  videoCards.forEach(function (card) {
    card.style.display = "block";
  });

  input.focus();
}

// ===============================
// Footer
// ===============================

document.querySelector("footer p").innerHTML =
  `&copy; ${new Date().getFullYear()} RTube. This is a dummy webpage created for learning purposes.`;
