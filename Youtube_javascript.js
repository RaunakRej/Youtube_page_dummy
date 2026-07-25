// ===============================
// Search Videos
// ===============================

function searchVideos() {
  const input = document.querySelector("header input");
  const filter = input.value.toLowerCase();

  const videos = document.querySelectorAll("article");

  videos.forEach(function (video) {
    const title = video.querySelector("h3").textContent.toLowerCase();

    if (title.includes(filter)) {
      video.style.display = "flex";
    } else {
      video.style.display = "none";
    }
  });
}

// Search when button is clicked
const searchButton = document.querySelector("header input + button");

searchButton.addEventListener("click", searchVideos);

// Search when Enter key is pressed
document
  .querySelector("header input")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchVideos();
    }
  });

// ===============================
// Sidebar Active Menu
// ===============================

const menuItems = document.querySelectorAll("aside li");

menuItems.forEach(function (item) {
  item.addEventListener("click", function () {
    menuItems.forEach(function (li) {
      li.style.background = "";
    });

    this.style.background = "#ff0000";
  });
});

// ===============================
// Video Card Click
// ===============================

const videos = document.querySelectorAll("article");

videos.forEach(function (video) {
  video.addEventListener("click", function () {
    const title = this.querySelector("h3").textContent;

    alert("Now Playing:\n\n" + title);
  });
});

// ===============================
// Hover Animation
// ===============================

videos.forEach(function (video) {
  video.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
  });

  video.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });
});

// ===============================
// Header Buttons
// ===============================

const headerButtons = document.querySelectorAll("header button");

headerButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (this.innerHTML.includes("📹")) {
      alert("Create Video feature coming soon!");
    }

    if (this.innerHTML.includes("🔔")) {
      alert("No new notifications.");
    }

    if (this.innerHTML.includes("👤")) {
      alert("User Profile");
    }
  });
});

// ===============================
// Footer Year
// ===============================

const footer = document.querySelector("footer p");

const year = new Date().getFullYear();

footer.innerHTML = `&copy; ${year} MyTube. This is a dummy webpage created for learning purposes.`;
