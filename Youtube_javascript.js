// ===============================
// Search Videos
// ===============================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const videoCards = document.querySelectorAll(".video-card");

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
// Video Click
// ===============================

const articles = document.querySelectorAll("article");

articles.forEach(function (article) {
  article.addEventListener("click", function () {
    const title = this.querySelector("h3").textContent;

    alert("Now Playing:\n\n" + title);
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

// ===============================
// Footer
// ===============================

document.querySelector("footer p").innerHTML =
  `&copy; ${new Date().getFullYear()} RTube. This is a dummy webpage created for learning purposes.`;
