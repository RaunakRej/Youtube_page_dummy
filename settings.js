/* =====================================================
RTUBE SETTINGS
===================================================== */

const WATCH_HISTORY_KEY = "watchHistory";
const WATCH_HISTORY_PAUSED_KEY = "watchHistoryPaused";
const SEARCH_HISTORY_KEY = "searchHistory";
const SETTINGS_KEY = "rtubeSettings";

/* =====================================================
DEFAULT SETTINGS
===================================================== */

const defaultSettings = {
notifications: true,
recommendedNotifications: true,
autoplay: true,
videoQuality: "auto",
wifiOnly: true,
downloadQuality: "720p",
experimental: false,
theme: "system"
};

/* =====================================================
GET SETTINGS
===================================================== */

function getSettings() {

```
try {

    const saved = JSON.parse(
        localStorage.getItem(SETTINGS_KEY) || "{}"
    );

    return {
        ...defaultSettings,
        ...saved
    };

} catch (error) {

    console.error("Unable to load settings:", error);

    return {
        ...defaultSettings
    };
}
```

}

/* =====================================================
SAVE SETTINGS
===================================================== */

function saveSettings(settings) {

```
localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify(settings)
);
```

}

/* =====================================================
UPDATE SETTING
===================================================== */

function updateSetting(key, value) {

```
const settings = getSettings();

settings[key] = value;

saveSettings(settings);
```

}

/* =====================================================
APPLY THEME
===================================================== */

function applyTheme(theme) {

```
let darkMode = false;

if (theme === "dark") {

    darkMode = true;

} else if (theme === "system") {

    darkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

}

document.body.classList.toggle(
    "dark-mode",
    darkMode
);
```

}

/* =====================================================
LOAD SETTINGS INTO UI
===================================================== */

function loadSettings() {

```
const settings = getSettings();

const notificationsToggle =
    document.getElementById("notificationsToggle");

const recommendedToggle =
    document.getElementById("recommendedToggle");

const autoplayToggle =
    document.getElementById("autoplayToggle");

const wifiToggle =
    document.getElementById("wifiToggle");

const experimentalToggle =
    document.getElementById("experimentalToggle");

const qualitySelect =
    document.getElementById("qualitySelect");

const downloadQuality =
    document.getElementById("downloadQuality");


if (notificationsToggle) {
    notificationsToggle.checked =
        settings.notifications;
}

if (recommendedToggle) {
    recommendedToggle.checked =
        settings.recommendedNotifications;
}

if (autoplayToggle) {
    autoplayToggle.checked =
        settings.autoplay;
}

if (wifiToggle) {
    wifiToggle.checked =
        settings.wifiOnly;
}

if (experimentalToggle) {
    experimentalToggle.checked =
        settings.experimental;
}

if (qualitySelect) {
    qualitySelect.value =
        settings.videoQuality;
}

if (downloadQuality) {
    downloadQuality.value =
        settings.downloadQuality;
}


/* Theme */

const themeRadio =
    document.querySelector(
        `input[name="theme"][value="${settings.theme}"]`
    );

if (themeRadio) {
    themeRadio.checked = true;
}

applyTheme(settings.theme);

updateHistoryUI();
```

}

/* =====================================================
SETTINGS SIDEBAR
===================================================== */

const menuItems =
document.querySelectorAll("#settingsMenu li");

const sections =
document.querySelectorAll(".settings-section");

menuItems.forEach(function (item) {

```
item.addEventListener("click", function () {

    const sectionId =
        this.dataset.section;

    menuItems.forEach(function (menuItem) {

        menuItem.classList.remove("active");

    });

    this.classList.add("active");


    sections.forEach(function (section) {

        section.classList.remove(
            "active-section"
        );

    });


    const selectedSection =
        document.getElementById(sectionId);

    if (selectedSection) {

        selectedSection.classList.add(
            "active-section"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

});
```

});

/* =====================================================
NOTIFICATIONS
===================================================== */

const notificationsToggle =
document.getElementById(
"notificationsToggle"
);

if (notificationsToggle) {

```
notificationsToggle.addEventListener(
    "change",
    function () {

        updateSetting(
            "notifications",
            this.checked
        );

    }
);
```

}

/* =====================================================
RECOMMENDED NOTIFICATIONS
===================================================== */

const recommendedToggle =
document.getElementById(
"recommendedToggle"
);

if (recommendedToggle) {

```
recommendedToggle.addEventListener(
    "change",
    function () {

        updateSetting(
            "recommendedNotifications",
            this.checked
        );

    }
);
```

}

/* =====================================================
AUTOPLAY
===================================================== */

const autoplayToggle =
document.getElementById(
"autoplayToggle"
);

if (autoplayToggle) {

```
autoplayToggle.addEventListener(
    "change",
    function () {

        updateSetting(
            "autoplay",
            this.checked
        );

    }
);
```

}

/* =====================================================
VIDEO QUALITY
===================================================== */

const qualitySelect =
document.getElementById(
"qualitySelect"
);

if (qualitySelect) {

```
qualitySelect.addEventListener(
    "change",
    function () {

        updateSetting(
            "videoQuality",
            this.value
        );

    }
);
```

}

/* =====================================================
DOWNLOAD SETTINGS
===================================================== */

const wifiToggle =
document.getElementById(
"wifiToggle"
);

if (wifiToggle) {

```
wifiToggle.addEventListener(
    "change",
    function () {

        updateSetting(
            "wifiOnly",
            this.checked
        );

    }
);
```

}

const downloadQuality =
document.getElementById(
"downloadQuality"
);

if (downloadQuality) {

```
downloadQuality.addEventListener(
    "change",
    function () {

        updateSetting(
            "downloadQuality",
            this.value
        );

    }
);
```

}

/* =====================================================
EXPERIMENTAL FEATURES
===================================================== */

const experimentalToggle =
document.getElementById(
"experimentalToggle"
);

if (experimentalToggle) {

```
experimentalToggle.addEventListener(
    "change",
    function () {

        updateSetting(
            "experimental",
            this.checked
        );

    }
);
```

}

/* =====================================================
THEME
===================================================== */

document
.querySelectorAll('input[name="theme"]')
.forEach(function (radio) {

```
    radio.addEventListener(
        "change",
        function () {

            updateSetting(
                "theme",
                this.value
            );

            applyTheme(
                this.value
            );

        }
    );

});
```

/* =====================================================
CLEAR WATCH HISTORY
===================================================== */

const clearHistoryBtn =
document.getElementById(
"clearHistoryBtn"
);

if (clearHistoryBtn) {

```
clearHistoryBtn.addEventListener(
    "click",
    function () {

        const confirmed =
            confirm(
                "Are you sure you want to clear your entire watch history?"
            );

        if (!confirmed) {
            return;
        }

        localStorage.removeItem(
            WATCH_HISTORY_KEY
        );

        updateHistoryUI();

        alert(
            "Watch history has been cleared."
        );

    }
);
```

}

/* =====================================================
PAUSE / RESUME WATCH HISTORY
===================================================== */

const pauseHistoryBtn =
document.getElementById(
"pauseHistoryBtn"
);

if (pauseHistoryBtn) {

```
pauseHistoryBtn.addEventListener(
    "click",
    function () {

        const paused =
            localStorage.getItem(
                WATCH_HISTORY_PAUSED_KEY
            ) === "true";


        if (paused) {

            localStorage.setItem(
                WATCH_HISTORY_PAUSED_KEY,
                "false"
            );

        } else {

            localStorage.setItem(
                WATCH_HISTORY_PAUSED_KEY,
                "true"
            );

        }

        updateHistoryUI();

    }
);
```

}

/* =====================================================
UPDATE HISTORY UI
===================================================== */

function updateHistoryUI() {

```
const historyStatus =
    document.getElementById(
        "historyStatus"
    );

const pauseHistoryBtn =
    document.getElementById(
        "pauseHistoryBtn"
    );

const paused =
    localStorage.getItem(
        WATCH_HISTORY_PAUSED_KEY
    ) === "true";


if (historyStatus) {

    historyStatus.textContent =
        paused
            ? "Watch history is currently paused."
            : "Your watch history is active.";

}


if (pauseHistoryBtn) {

    pauseHistoryBtn.textContent =
        paused
            ? "Resume history"
            : "Pause history";

}
```

}

/* =====================================================
CLEAR SEARCH HISTORY
===================================================== */

const clearSearchHistoryBtn =
document.getElementById(
"clearSearchHistoryBtn"
);

if (clearSearchHistoryBtn) {

```
clearSearchHistoryBtn.addEventListener(
    "click",
    function () {

        const confirmed =
            confirm(
                "Are you sure you want to clear your search history?"
            );

        if (!confirmed) {
            return;
        }

        localStorage.removeItem(
            SEARCH_HISTORY_KEY
        );

        /*
         * Support possible alternative
         * search-history keys.
         */

        localStorage.removeItem(
            "searchHistoryItems"
        );

        localStorage.removeItem(
            "recentSearches"
        );

        alert(
            "Search history has been cleared."
        );

    }
);
```

}

/* =====================================================
RESET SETTINGS
===================================================== */

const resetSettingsBtn =
document.getElementById(
"resetSettingsBtn"
);

if (resetSettingsBtn) {

```
resetSettingsBtn.addEventListener(
    "click",
    function () {

        const confirmed =
            confirm(
                "Reset all RTube settings to their default values?"
            );

        if (!confirmed) {
            return;
        }

        saveSettings(
            defaultSettings
        );

        loadSettings();

        alert(
            "Settings have been reset."
        );

    }
);
```

}

/* =====================================================
HOME BUTTON
===================================================== */

const homeBtn =
document.getElementById(
"homeBtn"
);

if (homeBtn) {

```
homeBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "youtube_mainhtml.html";

    }
);
```

}

/* =====================================================
SETTINGS SEARCH
===================================================== */

const settingsSearch =
document.getElementById(
"settingsSearch"
);

if (settingsSearch) {

```
settingsSearch.addEventListener(
    "input",
    function () {

        const query =
            this.value
                .trim()
                .toLowerCase();


        menuItems.forEach(function (item) {

            const text =
                item.textContent
                    .toLowerCase();

            item.style.display =
                text.includes(query)
                    ? ""
                    : "none";

        });

    }
);
```

}

/* =====================================================
LINK / DEMO BUTTONS
===================================================== */

document
.querySelectorAll(
"[data-message]"
)
.forEach(function (element) {

```
    element.addEventListener(
        "click",
        function () {

            alert(
                this.dataset.message
            );

        }
    );

});
```

/* =====================================================
SYSTEM THEME CHANGE
===================================================== */

window
.matchMedia(
"(prefers-color-scheme: dark)"
)
.addEventListener(
"change",
function () {

```
        const settings =
            getSettings();

        if (
            settings.theme ===
            "system"
        ) {

            applyTheme(
                "system"
            );

        }

    }
);
```

/* =====================================================
INITIALIZE
===================================================== */

document.addEventListener(
"DOMContentLoaded",
function () {

```
    loadSettings();

    console.log(
        "RTube Settings loaded successfully."
    );

}
```

);
