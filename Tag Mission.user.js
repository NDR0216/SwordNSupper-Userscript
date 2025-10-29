// ==UserScript==
// @name         Tag Mission
// @namespace    https://github.com/NDR0216/
// @version      0.0.1
// @description  generate mission title in console
// @author       NDR0216
// @match        https://*.devvit.net/index.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @updateURL    https://github.com/NDR0216/SwordNSupper-Userscript/raw/refs/heads/main/Tag%20Mission.user.js
// @downloadURL  https://github.com/NDR0216/SwordNSupper-Userscript/raw/refs/heads/main/Tag%20Mission.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const map_name = {
        fields: "Fields",
        mossy_forest: "Mossy Forest",
        mountain_pass: "Mountain Pass",
        ruined_path: "Ruined Path",
        seaside_cliffs: "Seaside Cliffs",
        outer_temple: "Outer Temple",
        forbidden_city: "Forbidden City",
        new_eden: "New Eden",
        haunted_forest: "Haunted Forest"
    };

    const boss_name = {
        skelFireHead: "Flaming Skeleton",
        skelIceHead: "Ice Flame Skeleton",
        mushroomLargeBoss: "Boss Mushroom",
        darkDemon: "Umbral Winged Shadeborn",
        livingArmor: "Steel Revenant",
        woodGolem: "Heartroot Guardian",
        icyWoodGolem: "Frostroot Guardian",
        robotNo6: "BRX-7 Sentry Chassis",
        robotBoss: "Slumbering Guardian-X5"
    }

    window.addEventListener("message", (event) => {
        if (event.data.data.message.type == "initialData") {
            console.log(event.data.data.message.data.missionMetadata.mission);

            const mission = event.data.data.message.data.missionMetadata.mission;

            const minLevel = mission.minLevel;
            const maxLevel = mission.maxLevel;
            var difficulty = mission.difficulty + "★";
            const map = map_name[mission.environment];
            var mini_boss = false;
            var hut = false;
            var boss = new Set();
            const food = mission.foodImage.slice(0, -4);

            if (mission.type == "bossRush") {
                difficulty = "BOSS RUSH";
            }

            for (const encounter of mission.encounters) {
                if (encounter.type == "boss") {
                    boss.add(boss_name[encounter.enemies[0].type]);
                } else if (encounter.type == "crossroadsFight") {
                    mini_boss = true;
                } else if (encounter.type == "investigate") {
                    hut = true;
                }
            }

            var str = "Level " + minLevel + "-" + maxLevel + " | " + difficulty + " | " + map + " | ";

            for (const item of boss) {
                str += item + " | ";
            }
            if (mini_boss) {
                str += "Mini Boss | ";
            }
            if (hut) {
                str += "Hut | ";
            }

            str += food;

            console.log(str);
        }
    });
})();
