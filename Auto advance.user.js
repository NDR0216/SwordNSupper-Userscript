// ==UserScript==
// @name         Auto advance
// @namespace    https://github.com/NDR0216/
// @version      0.0
// @description  automatically click advance
// @author       NDR0216
// @match        https://cabbageidle-eimoap-0-0-50-webview.devvit.net/index.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
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

        const end = document.querySelectorAll(".end-mission-button");
        if (end.length) {
            end[end.length-1].click();

            //clearInterval(intervalId);
            // release our intervalId from the variable
            //intervalId = null;
        }

        const link = document.querySelector(".mission-link");
        if (link) {
            clearInterval(intervalId);
            // release our intervalId from the variable
            intervalId = null;

            link.click();
        }

    }

    intervalId ??= setInterval(clickButton, 1000);
})();