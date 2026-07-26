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

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

document.getElementById("title").innerText = videos[id].title;

document.getElementById("player").src = videos[id].url;
