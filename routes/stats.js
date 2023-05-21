const express = require('express');
const router = express.Router();
const axios = require('axios');
const stockCalculator = require('../stockCalculator');
require('dotenv').config();


/* api.fantasy-stock.net/stats/allPlayers */
router.get("/allPlayers", async (req, res) => {
    try {
        const responseArray = [];
        const response = await axios.get(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2023?key=${process.env.SPORTS_DATA_IO}`);
        const stats = response.data;

        stats.forEach((s) => {
            let player = {
                playerId: s["PlayerID"],
                playerName: s["Name"],
                team: s["Team"],
                position: s["Position"],
                pointsPerGame: Number((s["Points"] / s["Games"]).toFixed(2)),
                threesPerGame: Number((s["ThreePointersMade"] / s["Games"]).toFixed(2)),
                assistsPerGame: Number((s["Assists"] / s["Games"]).toFixed(2)),
                freeThrowsPerGame: Number((s["FreeThrowsMade"] / s["Games"]).toFixed(2)),
                reboundsPerGame: Number((s["Rebounds"] / s["Games"]).toFixed(2)),
                stealsPerGame: Number((s["Steals"] / s["Games"]).toFixed(2)),
                blocksPerGame: Number((s["BlockedShots"] / s["Games"]).toFixed(2)),
                turnoversPerGame: Number((s["Turnovers"] / s["Games"]).toFixed(2)),
                personalFoulsPerGame: Number((s["PersonalFouls"] / s["Games"]).toFixed(2)),
                doubleDoublesPerGame: Number((s["DoubleDoubles"] / s["Games"]).toFixed(2)),
                tripleDoublesPerGame: Number((s["TripleDoubles"] / s["Games"]).toFixed(2)),
                plusMinus: s["PlusMinus"],
                stock: stockCalculator.stockCalculator(
                    s["Position"],
                    s["Points"] / s["Games"],
                    s["ThreePointersMade"] / s["Games"],
                    s["Assists"] / s["Games"],
                    s["FreeThrowsMade"] / s["Games"],
                    s["Rebounds"] / s["Games"],
                    s["Steals"] / s["Games"],
                    s["BlockedShots"] / s["Games"],
                    s["Turnovers"] / s["Games"],
                    s["PersonalFouls"] / s["Games"],
                    s["DoubleDoubles"] / s["Games"],
                    s["TripleDoubles"] / s["Games"],
                    s["Games"],
                    s["Started"]
                )
            };
            responseArray.push(player);
        });
        res.json(responseArray);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


/* api.fantasy-stock.net/stats/player/<int:playerid> */
router.get("/player/:playerid", async (req, res) => {
    const playerid = Number(req.params.playerid);
    const response = await axios.get(`https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2023?key=${process.env.SPORTS_DATA_IO}`);
    const stats = response.data;

    let playerStats = stats.filter(entry => entry["PlayerID"] === playerid);

    if (playerStats.length === 1) {
        let player = {
            playerId: playerStats[0]["PlayerID"],
            playerName: playerStats[0]["Name"],
            team: playerStats[0]["Team"],
            position: playerStats[0]["Position"],
            pointsPerGame: Number((playerStats[0]["Points"] / playerStats[0]["Games"]).toFixed(2)),
            threesPerGame: Number((playerStats[0]["ThreePointersMade"] / playerStats[0]["Games"]).toFixed(2)),
            assistsPerGame: Number((playerStats[0]["Assists"] / playerStats[0]["Games"]).toFixed(2)),
            freeThrowsPerGame: Number((playerStats[0]["FreeThrowsMade"] / playerStats[0]["Games"]).toFixed(2)),
            reboundsPerGame: Number((playerStats[0]["Rebounds"] / playerStats[0]["Games"]).toFixed(2)),
            stealsPerGame: Number((playerStats[0]["Steals"] / playerStats[0]["Games"]).toFixed(2)),
            blocksPerGame: Number((playerStats[0]["BlockedShots"] / playerStats[0]["Games"]).toFixed(2)),
            turnoversPerGame: Number((playerStats[0]["Turnovers"] / playerStats[0]["Games"]).toFixed(2)),
            personalFoulsPerGame: Number((playerStats[0]["PersonalFouls"] / playerStats[0]["Games"]).toFixed(2)),
            doubleDoublesPerGame: Number((playerStats[0]["DoubleDoubles"] / playerStats[0]["Games"]).toFixed(2)),
            tripleDoublesPerGame: Number((playerStats[0]["TripleDoubles"] / playerStats[0]["Games"]).toFixed(2)),
            plusMinus: playerStats[0]["PlusMinus"],
            stock: stockCalculator.stockCalculator(
                playerStats[0]["Position"],
                playerStats[0]["Points"] / playerStats[0]["Games"],
                playerStats[0]["ThreePointersMade"] / playerStats[0]["Games"],
                playerStats[0]["Assists"] / playerStats[0]["Games"],
                playerStats[0]["FreeThrowsMade"] / playerStats[0]["Games"],
                playerStats[0]["Rebounds"] / playerStats[0]["Games"],
                playerStats[0]["Steals"] / playerStats[0]["Games"],
                playerStats[0]["BlockedShots"] / playerStats[0]["Games"],
                playerStats[0]["Turnovers"] / playerStats[0]["Games"],
                playerStats[0]["PersonalFouls"] / playerStats[0]["Games"],
                playerStats[0]["DoubleDoubles"] / playerStats[0]["Games"],
                playerStats[0]["TripleDoubles"] / playerStats[0]["Games"],
                playerStats[0]["Games"],
                playerStats[0]["Started"]
            )
        }
        res.json(player);
    } else {
        console.log("Too many JSON objects to calculate stock");
        res.sendStatus(500);
    }
});

module.exports = router