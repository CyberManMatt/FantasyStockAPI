const express = require("express");
const router = express.Router();
const axios = require("axios");
const calc = require("../calc");
require("dotenv").config();

/* api.fantasy-stock.net/stats/allPlayers */
router.get("/allPlayers", async (req, res) => {
  try {
    const responseArray = [];
    const response = await axios.get(
      `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2023?key=${process.env.SPORTS_DATA_IO}`
    );
    const stats = response.data;

    stats.forEach((s) => {
      player = {
        playerid: s["PlayerID"],
        name: s["Name"],
        position: s["Position"],
        team: s["Team"],
        gamesPlayed: s["Games"],
        gamesStarted: s["Started"],
        pointsPerGame: s["Points"] / s["Games"],
        assistsPerGame: s["Assists"] / s["Games"],
        freeThrowsPerGame: s["FreeThrowsMade"] / s["Games"],
        reboundsPerGame: s["Rebounds"] / s["Games"],
        blocksPerGame: s["BlockedShots"] / s["Games"],
        dd2: s["DoubleDoubles"] / s["Games"],
        td3: s["TripleDoubles"] / s["Games"],
        stock: calc.calcStock(
          calc.gamesPlayedBonus(s["Games"]),
          calc.gamesStartedBonus(s["Started"], s["Games"]),
          calc.pointsBonus(s["Points"], s["Games"]),
          calc.threesBonus(s["ThreePointersMade"], s["Games"]),
          calc.assistsBonus(s["Assists"], s["Games"], s["Position"]),
          calc.freeThrowsBonus(s["FreeThrowsMade"], s["Games"]),
          calc.reboundsBonus(s["Rebounds"], s["Games"], s["Position"]),
          calc.blocksBonus(s["BlockedShots"], s["Games"], s["Position"]),
          calc.doubleDoublesBonus(s["DoubleDoubles"], s["Games"]),
          calc.tripleDoublesBonus(s["TripleDoubles"], s["Games"]),
          calc.turnoversPenalty(s["Turnovers"], s["Games"]),
          calc.personalFoulsPenalty(s["PersonalFouls"], s["Games"])
        ),
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
  const response = await axios.get(
    `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2023?key=${process.env.SPORTS_DATA_IO}`
  );
  const stats = response.data;

  let playerStats = stats.filter((entry) => entry["PlayerID"] === playerid);

  if (playerStats.length === 1) {
    let player = {
      playerId: playerStats[0]["PlayerID"],
      playerName: playerStats[0]["Name"],
      team: playerStats[0]["Team"],
      position: playerStats[0]["Position"],
      pointsPerGame: Number(
        (playerStats[0]["Points"] / playerStats[0]["Games"]).toFixed(2)
      ),
      threesPerGame: Number(
        (playerStats[0]["ThreePointersMade"] / playerStats[0]["Games"]).toFixed(
          2
        )
      ),
      assistsPerGame: Number(
        (playerStats[0]["Assists"] / playerStats[0]["Games"]).toFixed(2)
      ),
      freeThrowsPerGame: Number(
        (playerStats[0]["FreeThrowsMade"] / playerStats[0]["Games"]).toFixed(2)
      ),
      reboundsPerGame: Number(
        (playerStats[0]["Rebounds"] / playerStats[0]["Games"]).toFixed(2)
      ),
      stealsPerGame: Number(
        (playerStats[0]["Steals"] / playerStats[0]["Games"]).toFixed(2)
      ),
      blocksPerGame: Number(
        (playerStats[0]["BlockedShots"] / playerStats[0]["Games"]).toFixed(2)
      ),
      turnoversPerGame: Number(
        (playerStats[0]["Turnovers"] / playerStats[0]["Games"]).toFixed(2)
      ),
      personalFoulsPerGame: Number(
        (playerStats[0]["PersonalFouls"] / playerStats[0]["Games"]).toFixed(2)
      ),
      doubleDoublesPerGame: Number(
        (playerStats[0]["DoubleDoubles"] / playerStats[0]["Games"]).toFixed(2)
      ),
      tripleDoublesPerGame: Number(
        (playerStats[0]["TripleDoubles"] / playerStats[0]["Games"]).toFixed(2)
      ),
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
      ),
    };
    res.json(player);
  } else {
    console.log("Too many JSON objects to calculate stock");
    res.sendStatus(500);
  }
});

module.exports = router;
