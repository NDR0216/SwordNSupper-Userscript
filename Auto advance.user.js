// ==UserScript==
// @name         Auto advance
// @namespace    https://github.com/NDR0216/
// @version      0.2
// @description  automatically click advance
// @author       NDR0216
// @match        https://*.devvit.net/index.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @updateURL    https://github.com/NDR0216/SwordNSupper-Userscript/raw/refs/heads/main/Auto%20advance.user.js
// @downloadURL  https://github.com/NDR0216/SwordNSupper-Userscript/raw/refs/heads/main/Auto%20advance.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const NEXT_MISSION = true;

    if (location.hostname.match(/cabbageidle-eimoap-.*-webview.devvit.net/)) {
        const speed = 10;

        const originalSetInterval = window.setInterval;
        const originalSetTimeout = window.setTimeout;
        const dateNow = Date.now;
        const performanceNow = window.performance.now;

        window.setInterval = function(functionRef, delay=0, ...param) {
            return originalSetInterval(functionRef, delay/speed, ...param);
        }
        window.setTimeout = function(functionRef, delay=0, ...param) {
            return originalSetTimeout(functionRef, delay/speed, ...param);
        }

        let dateNowReference;
        let performanceNowReference;
        Date.now = function() {
            dateNowReference ??= dateNow();
            return dateNowReference + (dateNow()-dateNowReference) * speed;
        };
        window.performance.now = function() {
            performanceNowReference ??= performanceNow.call(window.performance);
            return performanceNowReference + (performanceNow.call(window.performance)-performanceNowReference) * speed;
        };

        localStorage.setItem("gameAnimationSpeed", speed.toString());

        let intervalId;

        function clickButton() {
            document.querySelector(".advance-button")?.click();
            document.querySelector(".skip-button")?.click();
            document.querySelector(".skill-button")?.click();
            document.querySelector(".continue-button")?.click();

            if (NEXT_MISSION) {
                const end = document.querySelectorAll(".end-mission-button");
                if (end.length) {
                    end[end.length-1].click();
                }

                const link = document.querySelector(".mission-link");
                if (link) {
                    clearInterval(intervalId);
                    // release our intervalId from the variable
                    intervalId = null;

                    link.click();
                }

                window.addEventListener("message", (event) => {
                    if (event.data.data?.message?.type == "recentMissions") {
                        if (event.data.data.message.data.recentMissions.length == 0) {
                            clearInterval(intervalId);
                            // release our intervalId from the variable
                            intervalId = null;
                        }
                    }
                });
            } else {
                const end = document.querySelectorAll(".end-mission-button");
                if (end.length) {
                    end[end.length-1].click();
                    clearInterval(intervalId);
                    // release our intervalId from the variable
                    intervalId = null;
                }
            }
        }

        intervalId ??= setInterval(clickButton, 1000);
    }
})();
