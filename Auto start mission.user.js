// ==UserScript==
// @name         Auto start mission
// @namespace    https://github.com/NDR0216/
// @version      0.2.1
// @description  automatically click "Start Mission"
// @author       NDR0216
// @match        https://www.reddit.com/r/SwordAndSupperGame/comments/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        window.onurlchange
// @updateURL    https://github.com/NDR0216/SwordNSupper-Userscript/raw/refs/heads/main/Auto%20start%20mission.user.js
// @downloadURL  https://github.com/NDR0216/SwordNSupper-Userscript/raw/refs/heads/main/Auto%20start%20mission.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let intervalId;

    function clickButton() {
        document.querySelector("shreddit-devvit-ui-loader")
            ?.shadowRoot?.querySelector("devvit-surface")
            ?.shadowRoot?.querySelector("devvit-blocks-renderer")
            ?.shadowRoot?.querySelector("div>div>div")?.click();

        console.log("clicked");

        if (document.querySelector('#devvit-web-view-dialog')) {
            clearInterval(intervalId);
            // release our intervalId from the variable
            intervalId = null;
        }
    }

    intervalId ??= setInterval(clickButton, 1000);

    if (window.onurlchange === null) {
        // feature is supported
        window.addEventListener('urlchange', (info) => {intervalId ??= setInterval(clickButton, 1000);});
    }
})();
