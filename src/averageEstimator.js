import Player from "./combatsimulator/player";
import Equipment from "./combatsimulator/equipment";
import Ability from "./combatsimulator/ability";
import Consumable from "./combatsimulator/consumable";
import actionDetailMap from "./combatsimulator/data/actionDetailMap.json";
import itemDetailMap from "./combatsimulator/data/itemDetailMap.json";
import combatMonsterDetailMap from "./combatsimulator/data/combatMonsterDetailMap.json";
import openableLootDropMap from "./combatsimulator/data/openableLootDropMap.json";
import abilitySlotsLevelRequirementList from "./combatsimulator/data/abilitySlotsLevelRequirementList.json";
import achievementDetailMap from "./combatsimulator/data/achievementDetailMap.json";

const ONE_SECOND = 1e9;
const ONE_HOUR = 60 * 60 * ONE_SECOND;

let prices = {};

const defaultPlayerDataMap = {
    "1": "{\"player\":{\"attackLevel\":1,\"magicLevel\":1,\"meleeLevel\":1,\"rangedLevel\":1,\"defenseLevel\":1,\"staminaLevel\":1,\"intelligenceLevel\":1,\"equipment\":[]},\"food\":{\"/action_types/combat\":[{\"itemHrid\":\"\"},{\"itemHrid\":\"\"},{\"itemHrid\":\"\"}]},\"drinks\":{\"/action_types/combat\":[{\"itemHrid\":\"\"},{\"itemHrid\":\"\"},{\"itemHrid\":\"\"}]},\"abilities\":[{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"}],\"triggerMap\":{},\"zone\":\"/actions/combat/fly\",\"simulationTime\":\"100\",\"houseRooms\":{\"/house_rooms/dairy_barn\":0,\"/house_rooms/garden\":0,\"/house_rooms/log_shed\":0,\"/house_rooms/forge\":0,\"/house_rooms/workshop\":0,\"/house_rooms/sewing_parlor\":0,\"/house_rooms/kitchen\":0,\"/house_rooms/brewery\":0,\"/house_rooms/laboratory\":0,\"/house_rooms/dining_room\":0,\"/house_rooms/library\":0,\"/house_rooms/dojo\":0,\"/house_rooms/gym\":0,\"/house_rooms/armory\":0,\"/house_rooms/archery_range\":0,\"/house_rooms/mystical_study\":0,\"/house_rooms/observatory\":0},\"achievements\":{}}",
    "2": "{\"player\":{\"attackLevel\":1,\"magicLevel\":1,\"meleeLevel\":1,\"rangedLevel\":1,\"defenseLevel\":1,\"staminaLevel\":1,\"intelligenceLevel\":1,\"equipment\":[]},\"food\":{\"/action_types/combat\":[{\"itemHrid\":\"\"},{\"itemHrid\":\"\"},{\"itemHrid\":\"\"}]},\"drinks\":{\"/action_types/combat\":[{\"itemHrid\":\"\"},{\"itemHrid\":\"\"},{\"itemHrid\":\"\"}]},\"abilities\":[{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"}],\"triggerMap\":{},\"zone\":\"/actions/combat/fly\",\"simulationTime\":\"100\",\"houseRooms\":{\"/house_rooms/dairy_barn\":0,\"/house_rooms/garden\":0,\"/house_rooms/log_shed\":0,\"/house_rooms/forge\":0,\"/house_rooms/workshop\":0,\"/house_rooms/sewing_parlor\":0,\"/house_rooms/kitchen\":0,\"/house_rooms/brewery\":0,\"/house_rooms/laboratory\":0,\"/house_rooms/dining_room\":0,\"/house_rooms/library\":0,\"/house_rooms/dojo\":0,\"/house_rooms/gym\":0,\"/house_rooms/armory\":0,\"/house_rooms/archery_range\":0,\"/house_rooms/mystical_study\":0,\"/house_rooms/observatory\":0},\"achievements\":{}}",
    "3": "{\"player\":{\"attackLevel\":1,\"magicLevel\":1,\"meleeLevel\":1,\"rangedLevel\":1,\"defenseLevel\":1,\"staminaLevel\":1,\"intelligenceLevel\":1,\"equipment\":[]},\"food\":{\"/action_types/combat\":[{\"itemHrid\":\"\"},{\"itemHrid\":\"\"},{\"itemHrid\":\"\"}]},\"drinks\":{\"/action_types/combat\":[{\"itemHrid\":\"\"},{\"itemHrid\":\"\"},{\"itemHrid\":\"\"}]},\"abilities\":[{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"}],\"triggerMap\":{},\"zone\":\"/actions/combat/fly\",\"simulationTime\":\"100\",\"houseRooms\":{\"/house_rooms/dairy_barn\":0,\"/house_rooms/garden\":0,\"/house_rooms/log_shed\":0,\"/house_rooms/forge\":0,\"/house_rooms/workshop\":0,\"/house_rooms/sewing_parlor\":0,\"/house_rooms/kitchen\":0,\"/house_rooms/brewery\":0,\"/house_rooms/laboratory\":0,\"/house_rooms/dining_room\":0,\"/house_rooms/library\":0,\"/house_rooms/dojo\":0,\"/house_rooms/gym\":0,\"/house_rooms/armory\":0,\"/house_rooms/archery_range\":0,\"/house_rooms/mystical_study\":0,\"/house_rooms/observatory\":0},\"achievements\":{}}",
    "4": "{\"player\":{\"attackLevel\":1,\"magicLevel\":1,\"meleeLevel\":1,\"rangedLevel\":1,\"defenseLevel\":1,\"staminaLevel\":1,\"intelligenceLevel\":1,\"equipment\":[]},\"food\":{\"/action_types/combat\":[{\"itemHrid\":\"\"},{\"itemHrid\":\"\"},{\"itemHrid\":\"\"}]},\"drinks\":{\"/action_types/combat\":[{\"itemHrid\":\"\"},{\"itemHrid\":\"\"},{\"itemHrid\":\"\"}]},\"abilities\":[{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"}],\"triggerMap\":{},\"zone\":\"/actions/combat/fly\",\"simulationTime\":\"100\",\"houseRooms\":{\"/house_rooms/dairy_barn\":0,\"/house_rooms/garden\":0,\"/house_rooms/log_shed\":0,\"/house_rooms/forge\":0,\"/house_rooms/workshop\":0,\"/house_rooms/sewing_parlor\":0,\"/house_rooms/kitchen\":0,\"/house_rooms/brewery\":0,\"/house_rooms/laboratory\":0,\"/house_rooms/dining_room\":0,\"/house_rooms/library\":0,\"/house_rooms/dojo\":0,\"/house_rooms/gym\":0,\"/house_rooms/armory\":0,\"/house_rooms/archery_range\":0,\"/house_rooms/mystical_study\":0,\"/house_rooms/observatory\":0},\"achievements\":{}}",
    "5": "{\"player\":{\"attackLevel\":1,\"magicLevel\":1,\"meleeLevel\":1,\"rangedLevel\":1,\"defenseLevel\":1,\"staminaLevel\":1,\"intelligenceLevel\":1,\"equipment\":[]},\"food\":{\"/action_types/combat\":[{\"itemHrid\":\"\"},{\"itemHrid\":\"\"},{\"itemHrid\":\"\"}]},\"drinks\":{\"/action_types/combat\":[{\"itemHrid\":\"\"},{\"itemHrid\":\"\"},{\"itemHrid\":\"\"}]},\"abilities\":[{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"},{\"abilityHrid\":\"\",\"level\":\"1\"}],\"triggerMap\":{},\"zone\":\"/actions/combat/fly\",\"simulationTime\":\"100\",\"houseRooms\":{\"/house_rooms/dairy_barn\":0,\"/house_rooms/garden\":0,\"/house_rooms/log_shed\":0,\"/house_rooms/forge\":0,\"/house_rooms/workshop\":0,\"/house_rooms/sewing_parlor\":0,\"/house_rooms/kitchen\":0,\"/house_rooms/brewery\":0,\"/house_rooms/laboratory\":0,\"/house_rooms/dining_room\":0,\"/house_rooms/library\":0,\"/house_rooms/dojo\":0,\"/house_rooms/gym\":0,\"/house_rooms/armory\":0,\"/house_rooms/archery_range\":0,\"/house_rooms/mystical_study\":0,\"/house_rooms/observatory\":0},\"achievements\":{}}"
};

let playerDataMap = { ...defaultPlayerDataMap };

const estimatorWorker = new Worker(new URL("averageWorker.js", import.meta.url), { type: "module" });

async function fetchPrices() {
    let response = null;
    try {
        response = await fetch('https://www.milkywayidle.com/game_data/marketplace.json', { mode: 'cors' });
    } catch (e) {
        console.error(e);
    }

    if (!response || !response.ok) {
        try {
            response = await fetch('https://www.milkywayidlecn.com/game_data/marketplace.json', { mode: 'cors' });
        } catch (e) {
            console.error(e);
        }
    }

    if (!response || !response.ok) {
        return;
    }

    const pricesJson = await response.json();
    const priceTmp = pricesJson['marketData'];
    prices = {};
    for (const item in itemDetailMap) {
        const hrid = itemDetailMap[item].hrid;
        prices[hrid] = { ask: -1, bid: -1, vendor: itemDetailMap[item].sellPrice };
        if (priceTmp[hrid] && priceTmp[hrid]['0']) {
            prices[hrid].ask = priceTmp[hrid]['0'].a;
            prices[hrid].bid = priceTmp[hrid]['0'].b;
        }
    }

    prices["/items/coin"] = { ask: 1, bid: 1, vendor: 1 };

    prices["/items/small_treasure_chest"] = {
        ask: openableLootDropMap["/items/small_treasure_chest"].map((item) => item.itemHrid in prices ? prices[item.itemHrid].ask * item.dropRate * (item.maxCount + item.minCount) / 2 : 0).reduce((a, b) => a + b, 0),
        bid: openableLootDropMap["/items/small_treasure_chest"].map((item) => item.itemHrid in prices ? prices[item.itemHrid].bid * item.dropRate * (item.maxCount + item.minCount) / 2 : 0).reduce((a, b) => a + b, 0),
        vendor: openableLootDropMap["/items/small_treasure_chest"].map((item) => item.itemHrid in prices ? prices[item.itemHrid].vendor : 0).reduce((a, b) => a + b, 0)
    };

    prices["/items/medium_treasure_chest"] = {
        ask: openableLootDropMap["/items/medium_treasure_chest"].map((item) => item.itemHrid in prices ? prices[item.itemHrid].ask * item.dropRate * (item.maxCount + item.minCount) / 2 : 0).reduce((a, b) => a + b, 0),
        bid: openableLootDropMap["/items/medium_treasure_chest"].map((item) => item.itemHrid in prices ? prices[item.itemHrid].bid * item.dropRate * (item.maxCount + item.minCount) / 2 : 0).reduce((a, b) => a + b, 0),
        vendor: openableLootDropMap["/items/medium_treasure_chest"].map((item) => item.itemHrid in prices ? prices[item.itemHrid].vendor : 0).reduce((a, b) => a + b, 0)
    };

    prices["/items/large_treasure_chest"] = {
        ask: openableLootDropMap["/items/large_treasure_chest"].map((item) => item.itemHrid in prices ? prices[item.itemHrid].ask * item.dropRate * (item.maxCount + item.minCount) / 2 : 0).reduce((a, b) => a + b, 0),
        bid: openableLootDropMap["/items/large_treasure_chest"].map((item) => item.itemHrid in prices ? prices[item.itemHrid].bid * item.dropRate * (item.maxCount + item.minCount) / 2 : 0).reduce((a, b) => a + b, 0),
        vendor: openableLootDropMap["/items/large_treasure_chest"].map((item) => item.itemHrid in prices ? prices[item.itemHrid].vendor : 0).reduce((a, b) => a + b, 0)
    };
}

function populateZones() {
    const zoneSelect = document.getElementById("zoneSelect");
    const dungeonSelect = document.getElementById("dungeonSelect");

    const zones = Object.values(actionDetailMap)
        .filter(a => a.type === "/action_types/combat" && !a.combatZoneInfo.isDungeon)
        .sort((a, b) => a.sortIndex - b.sortIndex);

    zones.forEach(action => {
        const opt = new Option(action.name, action.hrid);
        zoneSelect.add(opt);
    });

    const dungeons = Object.values(actionDetailMap)
        .filter(a => a.type === "/action_types/combat" && a.combatZoneInfo.isDungeon)
        .sort((a, b) => a.sortIndex - b.sortIndex);

    dungeons.forEach(action => {
        const opt = new Option(action.name, action.hrid);
        dungeonSelect.add(opt);
    });
}

function parsePlayerJson(playerJson, hrid) {
    let playerData = {
        hrid: hrid,
        food: [],
        drinks: [],
        abilities: [],
        ...playerJson.player,
        houseRooms: playerJson.houseRooms,
    };
    playerData.equipment = {};
    const triggerMap = playerJson.triggerMap || {};
    ["head", "body", "legs", "feet", "hands", "off_hand", "pouch", "neck", "earrings", "ring", "back", "main_hand", "two_hand", "charm"].forEach((type) => {
        let currentEquipment = playerJson.player.equipment.find(item => item.itemLocationHrid === "/item_locations/" + type);
        if (currentEquipment) {
            playerData.equipment[`/equipment_types/${type}`] = new Equipment(currentEquipment.itemHrid, currentEquipment.enhancementLevel);
        }
    });

    for (const foodHrid of playerJson.food["/action_types/combat"]) {
        if (foodHrid.itemHrid === "") continue;
        const food = new Consumable(foodHrid.itemHrid, triggerMap[foodHrid.itemHrid]);
        playerData.food.push(food);
    }
    for (const drinkHrid of playerJson.drinks["/action_types/combat"]) {
        if (drinkHrid.itemHrid === "") continue;
        const drink = new Consumable(drinkHrid.itemHrid, triggerMap[drinkHrid.itemHrid]);
        playerData.drinks.push(drink);
    }
    for (let i = 0; i < 5; i++) {
        const ability = playerJson.abilities[i];
        if (!ability || !ability.abilityHrid) continue;
        const level = Number(ability.level);
        if (level > 0 && playerData.intelligenceLevel >= abilitySlotsLevelRequirementList[i + 1]) {
            playerData.abilities.push(new Ability(ability.abilityHrid, level, triggerMap[ability.abilityHrid]));
        }
    }

    playerData.houseRooms = playerJson.houseRooms || {};
    playerData.achievements = playerJson.achievements || {};

    return Player.createFromDTO(playerData);
}

function getSelectedPlayers() {
    const selected = [];
    for (let i = 1; i <= 5; i++) {
        const checkbox = document.getElementById(`playerCheck${i}`);
        if (checkbox.checked) {
            selected.push(i.toString());
        }
    }
    return selected;
}

function getPlayerObjects(selectedIds) {
    const players = [];
    let maxCombatLevel = 1;

    selectedIds.forEach((id) => {
        const jsonText = playerDataMap[id];
        const parsed = JSON.parse(jsonText);
        const player = parsePlayerJson(parsed, `player${id}`);
        player.updateCombatDetails();
        player.combatLevel = calcCombatLevel(player.staminaLevel, player.intelligenceLevel, player.defenseLevel, player.attackLevel, player.meleeLevel, player.rangedLevel, player.magicLevel);
        maxCombatLevel = Math.max(maxCombatLevel, player.combatLevel);
        players.push(player);
    });

    players.forEach((player) => {
        if ((maxCombatLevel / player.combatLevel) > 1.2) {
            const maxDebuffOnLevelGap = 0.9;
            let levelPercent = Math.floor(((maxCombatLevel / player.combatLevel) - 1.2) * 100) / 100;
            player.debuffOnLevelGap = -1 * Math.min(maxDebuffOnLevelGap, 3 * levelPercent);
        } else {
            player.debuffOnLevelGap = 0;
        }
    });

    return players;
}

function calcCombatLevel(staminaLevel, intelligenceLevel, defenseLevel, attackLevel, meleeLevel, rangedLevel, magicLevel) {
    return Math.floor(
        0.1 * (staminaLevel + intelligenceLevel + attackLevel + defenseLevel + Math.max(meleeLevel, rangedLevel, magicLevel))
        + 0.5 * Math.max(attackLevel, defenseLevel, meleeLevel, rangedLevel, magicLevel)
    );
}

function onEstimate() {
    const simulationHours = Number(document.getElementById("simulationHours").value || "1");
    const simTimeLimit = simulationHours * ONE_HOUR;
    const selectedPlayers = getSelectedPlayers();
    if (selectedPlayers.length === 0) {
        alert("Select at least one player.");
        return;
    }

    const zoneHrid = document.getElementById("zoneSelect").value;
    const dungeonHrid = document.getElementById("dungeonSelect").value;
    const useDungeon = document.getElementById("toggleDungeon").checked;
    const difficulty = Number(document.getElementById("difficultySelect").value || "0");

    const zone = useDungeon && dungeonHrid ? dungeonHrid : zoneHrid;
    if (!zone) {
        alert("Select a zone or dungeon.");
        return;
    }

    const mooPass = document.getElementById("mooPassToggle").checked;
    const comExpToggle = document.getElementById("comExpToggle").checked;
    const comExp = comExpToggle ? Number(document.getElementById("comExpInput").value || "0") : 0;
    const comDropToggle = document.getElementById("comDropToggle").checked;
    const comDrop = comDropToggle ? Number(document.getElementById("comDropInput").value || "0") : 0;

    const players = getPlayerObjects(selectedPlayers);
    const payload = {
        type: "start_simulation",
        players: players.map((p) => structuredClone(p)),
        zone: { zoneHrid: zone, difficultyTier: difficulty },
        simulationTimeLimit: simTimeLimit,
        extra: { mooPass, comExp, comDrop }
    };

    document.getElementById("progress").textContent = "Estimating...";
    estimatorWorker.postMessage(payload);
}

function readPlayerData() {
    const textarea = document.getElementById("playerDataTextarea");
    try {
        const parsed = JSON.parse(textarea.value);
        playerDataMap = parsed;
        alert("Player data loaded.");
    } catch (e) {
        alert("Invalid JSON for player data map.");
    }
}

function resetPlayerData() {
    playerDataMap = { ...defaultPlayerDataMap };
    document.getElementById("playerDataTextarea").value = JSON.stringify(playerDataMap, null, 2);
}

function priceForItem(itemHrid, type = "ask") {
    if (!prices[itemHrid]) {
        prices[itemHrid] = { ask: -1, bid: -1, vendor: itemDetailMap[itemHrid]?.sellPrice || 0 };
    }
    if (type === "ask") return prices[itemHrid].ask > 0 ? prices[itemHrid].ask : prices[itemHrid].vendor;
    if (type === "bid") return prices[itemHrid].bid > 0 ? prices[itemHrid].bid : prices[itemHrid].vendor;
    return prices[itemHrid].vendor;
}

function calcDropMaps(simResult, playerHrid) {
    const numberOfPlayers = simResult.numberOfPlayers;
    const dropMap = new Map();
    const rareDropMap = new Map();
    const debuffOnLevelGap = simResult.debuffOnLevelGap[playerHrid] ?? 0;
    const dropRateMultiplier = simResult.dropRateMultiplier[playerHrid] ?? 1;
    const rareFindMultiplier = simResult.rareFindMultiplier[playerHrid] ?? 1;
    const combatDropQuantity = simResult.combatDropQuantity[playerHrid] ?? 0;

    for (const monster in simResult.deaths) {
        if (!combatMonsterDetailMap[monster]) continue;
        const dropTable = combatMonsterDetailMap[monster].dropTable ?? [];
        const rareTable = combatMonsterDetailMap[monster].rareDropTable ?? [];

        for (const drop of dropTable) {
            const rate = Math.min(1.0, drop.dropRate * dropRateMultiplier);
            if (!dropMap.has(drop.itemHrid)) {
                dropMap.set(drop.itemHrid, { dropRate: rate, number: 0, dropMin: drop.minCount, dropMax: drop.maxCount, noRngDropAmount: 0 });
            }
        }

        for (const drop of rareTable) {
            const rate = drop.dropRate * rareFindMultiplier;
            if (!rareDropMap.has(drop.itemHrid)) {
                rareDropMap.set(drop.itemHrid, { dropRate: rate, number: 0, dropMin: drop.minCount, dropMax: drop.maxCount, noRngDropAmount: 0 });
            }
        }
    }

    if (!simResult.isDungeon) {
        for (const monster in simResult.deaths) {
            const dropTable = combatMonsterDetailMap[monster]?.dropTable ?? [];
            const rareTable = combatMonsterDetailMap[monster]?.rareDropTable ?? [];

            const dropRateMultiplier = simResult.dropRateMultiplier[playerHrid] ?? 1;
            const rareFindMultiplier = simResult.rareFindMultiplier[playerHrid] ?? 1;

            for (const drop of dropTable) {
                const dropObject = dropMap.get(drop.itemHrid);
                if (!dropObject) continue;

                dropObject.number += simResult.deaths[monster] * drop.dropRate * (1 + debuffOnLevelGap) * (1 + combatDropQuantity) / numberOfPlayers;
                dropObject.noRngDropAmount += simResult.deaths[monster] * dropObject.dropRate * ((dropObject.dropMax + dropObject.dropMin) / 2) * (1 + debuffOnLevelGap) * (1 + combatDropQuantity) / numberOfPlayers;
            }

            for (const drop of rareTable) {
                const dropObject = rareDropMap.get(drop.itemHrid);
                if (!dropObject) continue;

                dropObject.number += simResult.deaths[monster] * drop.dropRate * rareFindMultiplier * (1 + debuffOnLevelGap) * (1 + combatDropQuantity) / numberOfPlayers;
                dropObject.noRngDropAmount += simResult.deaths[monster] * dropObject.dropRate * ((dropObject.dropMax + dropObject.dropMin) / 2) * (1 + debuffOnLevelGap) * (1 + combatDropQuantity) / numberOfPlayers;
            }
        }
    }

    const totalDropMap = new Map();
    const noRngTotalDropMap = new Map();

    for (let [name, dropObject] of dropMap.entries()) {
        const rollDrop = () => {
            return Math.floor(Math.random() * (dropObject.dropMax - dropObject.dropMin + 1) + dropObject.dropMin) * (1 + debuffOnLevelGap) * (1 + combatDropQuantity);
        };

        for (let i = 0; i < Math.floor(dropObject.number); i++) {
            let amount = dropObject.dropRate === 1 ? dropObject.dropMax : rollDrop();
            totalDropMap.set(name, (totalDropMap.get(name) ?? 0) + amount);
        }

        const dropRateFraction = dropObject.number - Math.floor(dropObject.number);
        if (dropRateFraction > 0) {
            if (Math.random() < dropRateFraction) {
                let amount = dropObject.dropRate === 1 ? dropObject.dropMax : rollDrop();
                totalDropMap.set(name, (totalDropMap.get(name) ?? 0) + amount);
            }
        }

        noRngTotalDropMap.set(name, (noRngTotalDropMap.get(name) ?? 0) + dropObject.noRngDropAmount);
    }

    for (let [name, dropObject] of rareDropMap.entries()) {
        const rollDrop = () => {
            return Math.floor(Math.random() * (dropObject.dropMax - dropObject.dropMin + 1) + dropObject.dropMin) * (1 + debuffOnLevelGap) * (1 + combatDropQuantity);
        };

        for (let i = 0; i < Math.floor(dropObject.number); i++) {
            let amount = rollDrop();
            totalDropMap.set(name, (totalDropMap.get(name) ?? 0) + amount);
        }

        const dropRateFraction = dropObject.number - Math.floor(dropObject.number);
        if (dropRateFraction > 0) {
            if (Math.random() < dropRateFraction) {
                let amount = rollDrop();
                totalDropMap.set(name, (totalDropMap.get(name) ?? 0) + amount);
            }
        }

        noRngTotalDropMap.set(name, (noRngTotalDropMap.get(name) ?? 0) + dropObject.noRngDropAmount);
    }

    return { totalDropMap, noRngTotalDropMap };
}

function buildSummary(simResult) {
    const hours = simResult.simulatedTime / ONE_HOUR;
    const summaries = [];
    const encountersPerHour = hours > 0 ? simResult.encounters / hours : 0;

    const selectedPlayers = Object.keys(simResult.experienceGained);
    selectedPlayers.forEach((playerHrid) => {
        const xpGained = simResult.experienceGained[playerHrid];
        const xpPerHour = {};
        for (const skill in xpGained) {
            xpPerHour[skill] = xpGained[skill] / hours;
        }

        const deathsForPlayer = simResult.deaths[playerHrid] ?? 0;
        const deathsPerHour = hours > 0 ? deathsForPlayer / hours : 0;

        const { totalDropMap, noRngTotalDropMap } = !simResult.isDungeon ? calcDropMaps(simResult, playerHrid) : { totalDropMap: new Map(), noRngTotalDropMap: new Map() };
        let revenue = 0;
        let noRngRevenue = 0;
        for (let [name, dropAmount] of totalDropMap.entries()) {
            revenue += priceForItem(name, "ask") * dropAmount;
        }
        for (let [name, dropAmount] of noRngTotalDropMap.entries()) {
            noRngRevenue += priceForItem(name, "ask") * dropAmount;
        }

        let expenses = 0;
        if (simResult.consumablesUsed[playerHrid]) {
            for (const consumable in simResult.consumablesUsed[playerHrid]) {
                expenses += priceForItem(consumable, "bid") * simResult.consumablesUsed[playerHrid][consumable];
            }
        }

        summaries.push({
            player: playerHrid,
            hours,
            xpPerHour,
            revenue,
            revenuePerHour: revenue / hours,
            profitPerHour: (revenue - expenses) / hours,
            expensesPerHour: expenses / hours,
            noRngRevenuePerHour: noRngRevenue / hours,
            noRngProfitPerHour: (noRngRevenue - expenses) / hours,
            deathsPerHour
        });
    });

    return { summaries, encountersPerHour };
}

function renderSummary(result, simResult) {
    const { summaries, encountersPerHour } = result;
    const container = document.getElementById("result");
    container.innerHTML = "";

    const header = document.createElement("pre");
    header.textContent = `Zone: ${simResult.zoneName} | Difficulty: ${simResult.difficultyTier} | Dungeon: ${simResult.isDungeon ? "Yes" : "No"} | Sim hours: ${(simResult.simulatedTime / ONE_HOUR).toFixed(2)} | Encounters/hr: ${encountersPerHour.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    container.appendChild(header);

    summaries.forEach((summary) => {
        const pre = document.createElement("pre");
        pre.textContent =
`== ${summary.player} ==
XP/hr: ${Object.entries(summary.xpPerHour).map(([k, v]) => `${k}: ${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`).join(", ")}
Revenue/hr: ${summary.revenuePerHour.toLocaleString(undefined, { maximumFractionDigits: 2 })} | Profit/hr: ${summary.profitPerHour.toLocaleString(undefined, { maximumFractionDigits: 2 })}
No-RNG Revenue/hr: ${summary.noRngRevenuePerHour.toLocaleString(undefined, { maximumFractionDigits: 2 })} | No-RNG Profit/hr: ${summary.noRngProfitPerHour.toLocaleString(undefined, { maximumFractionDigits: 2 })}
Deaths/hr: ${summary.deathsPerHour.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
        container.appendChild(pre);
    });

    const debug = document.createElement("pre");
    const firstEnemies = simResult.encounterEnemyStats?.[0]?.enemies ?? [];
    const enemyDebug = firstEnemies.map(e => {
        const s = e.stats;
        return `${e.hrid} -> HP:${s.maxHp} Armor:${s.armor} Res(W/N/F):${s.waterRes}/${s.natureRes}/${s.fireRes} Acc(stab/slash/smash/ranged/magic):${s.stabAcc}/${s.slashAcc}/${s.smashAcc}/${s.rangedAcc}/${s.magicAcc} Dmg(stab/slash/smash/ranged/magic):${s.stabDmg}/${s.slashDmg}/${s.smashDmg}/${s.rangedDmg}/${s.magicDmg} Interval:${s.attackInterval}`;
    }).join("\n");

    const playerDebug = Object.entries(simResult.playerStats ?? {}).map(([hrid, s]) => {
        return `${hrid} -> HP:${s.maxHp} Armor:${s.armor} Res(W/N/F):${s.waterRes}/${s.natureRes}/${s.fireRes} Acc(stab/slash/smash/ranged/magic):${s.stabAcc}/${s.slashAcc}/${s.smashAcc}/${s.rangedAcc}/${s.magicAcc} Dmg(stab/slash/smash/ranged/magic):${s.stabDmg}/${s.slashDmg}/${s.smashDmg}/${s.rangedDmg}/${s.magicDmg} Interval:${s.attackInterval}`;
    }).join("\n");

    debug.textContent = `--- Debug Stats ---\nPlayers:\n${playerDebug || "n/a"}\n\nFirst Encounter Enemies:\n${enemyDebug || "n/a"}`;
    container.appendChild(debug);
}

estimatorWorker.onmessage = function (event) {
    switch (event.data.type) {
        case "simulation_result":
            document.getElementById("progress").textContent = "Done.";
            const simResult = event.data.simResult;
            const summary = buildSummary(simResult);
            renderSummary(summary, simResult);
            break;
        case "simulation_progress":
            document.getElementById("progress").textContent = `${Math.floor(event.data.progress * 100)}%`;
            break;
        case "simulation_error":
            document.getElementById("progress").textContent = "Error";
            alert(event.data.error);
            break;
    }
};

document.getElementById("estimateBtn").addEventListener("click", onEstimate);
document.getElementById("loadPlayerDataBtn").addEventListener("click", readPlayerData);
document.getElementById("resetPlayerDataBtn").addEventListener("click", resetPlayerData);

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("playerDataTextarea").value = JSON.stringify(playerDataMap, null, 2);
    populateZones();
    fetchPrices();
});
