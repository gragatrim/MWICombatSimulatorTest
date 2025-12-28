import CombatSimulator from "./combatsimulator/combatSimulator";
import Player from "./combatsimulator/player";
import Zone from "./combatsimulator/zone";
import CombatUtilities from "./combatsimulator/combatUtilities";

// Deterministic mode: use average outcomes instead of RNG
CombatUtilities.setDeterministic(true);
Math.random = () => 0.5;

onmessage = async function (event) {
    switch (event.data.type) {
        case "start_simulation":
            runSimulation(event.data);
            break;
    }
};

async function runSimulation(data) {
    let extraBuffs = [];
    if (data.extra?.mooPass) {
        const mooPassBuff = {
            "uniqueHrid": "/buff_uniques/experience_moo_pass_buff",
            "typeHrid": "/buff_types/wisdom",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.05,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 0
        };
        extraBuffs.push(mooPassBuff);
    }
    if (data.extra?.comExp > 0) {
        const comExpBuff = {
            "uniqueHrid": "/buff_uniques/experience_community_buff",
            "typeHrid": "/buff_types/wisdom",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.005 * (data.extra.comExp - 1) + 0.2,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 0
        };
        extraBuffs.push(comExpBuff);
    }
    if (data.extra?.comDrop > 0) {
        const comDropBuff = {
            "uniqueHrid": "/buff_uniques/combat_community_buff",
            "typeHrid": "/buff_types/combat_drop_quantity",
            "ratioBoost": 0,
            "ratioBoostLevelBonus": 0,
            "flatBoost": 0.005 * (data.extra.comDrop - 1) + 0.2,
            "flatBoostLevelBonus": 0,
            "startTime": "0001-01-01T00:00:00Z",
            "duration": 0
        };
        extraBuffs.push(comDropBuff);
    }

    let playersData = data.players;
    let players = [];
    let zone = new Zone(data.zone.zoneHrid, data.zone.difficultyTier);
    for (let i = 0; i < playersData.length; i++) {
        let currentPlayer = Player.createFromDTO(structuredClone(playersData[i]));
        currentPlayer.zoneBuffs = zone.buffs;
        currentPlayer.extraBuffs = extraBuffs;
        players.push(currentPlayer);
    }

    let simulationTimeLimit = data.simulationTimeLimit;
    let combatSimulator = new CombatSimulator(players, zone);
    combatSimulator.addEventListener("progress", (event) => {
        postMessage({ type: "simulation_progress", progress: event.detail.progress, zone: event.detail.zone, difficultyTier: event.detail.difficultyTier });
    });

    try {
        let simResult = await combatSimulator.simulate(simulationTimeLimit);
        postMessage({ type: "simulation_result", simResult: simResult });
    } catch (e) {
        console.log(e);
        postMessage({ type: "simulation_error", error: e });
    }
}
