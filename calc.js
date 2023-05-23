const pointsBonus = (points, games) => {
  return Number((points / games).toFixed(2));
};

const threesBonus = (threes, games) => {
  return Number(((threes / games) * 3).toFixed(2));
};

const assistsBonus = (assists, games, position) => {
  let multiplier = 0;

  switch (position) {
    case "PG":
    case "SG":
      multiplier = 2;
      break;
    case "SF":
    case "PF":
    case "C":
      multiplier = 1;
      break;
    default:
      multiplier = 0;
  }

  return Number(((assists / games) * multiplier).toFixed(2));
};

const freeThrowsBonus = (freeThrows, games) => {
  return Number((freeThrows / games).toFixed(2));
};

const reboundsBonus = (rebounds, games, position) => {
  let multiplier = 0;

  switch (position) {
    case "PG":
    case "SG":
    case "SF":
      multiplier = 1;
      break;
    case "PF":
    case "C":
      multiplier = 2;
    default:
      multiplier = 0;
  }

  return Number(((rebounds / games) * multiplier).toFixed(2));
};

const blocksBonus = (blocks, games, position) => {
  let multiplier = 0;

  switch (position) {
    case "PG":
    case "SG":
      multiplier = 1;
      break;
    case "SF":
      multiplier = 1.5;
      break;
    case "PF":
    case "C":
      multiplier = 2;
      break;
    default:
      multiplier = 0;
  }

  return Number(((blocks / games) * multiplier).toFixed(2));
};

const turnoversPenalty = (turnovers, games) => {
  return Number(((turnovers / games) * 2).toFixed(2));
};

const personalFoulsPenalty = (personalFouls, games) => {
  return Number((personalFouls / games).toFixed(2));
};

const doubleDoublesBonus = (doubleDoubles, games) => {
  return Number(((doubleDoubles / games) * 2).toFixed(2));
};

const tripleDoublesBonus = (tripleDoubles, games) => {
  return Number(((tripleDoubles / games) * 3).toFixed(2));
};

const gamesPlayedBonus = (gamesPlayed) => {
  return Number(((gamesPlayed / 82) * 100).toFixed(2));
};

const gamesStartedBonus = (gamesStarted, gamesPlayed) => {
  return Number(((gamesStarted / gamesPlayed) * 100).toFixed(2));
};

const calcStock = (
  gamesPlayedBonus,
  gamesStartedBonus,
  pointsBonus,
  threesBonus,
  assistsBonus,
  freeThrowsBonus,
  reboundsBonus,
  blocksBonus,
  doubleDoublesBonus,
  tripleDoublesBonus,
  turnoversPenalty,
  personalFoulsPenalty
) => {
  return Number(
    (
      gamesPlayedBonus +
      gamesStartedBonus +
      pointsBonus +
      threesBonus +
      assistsBonus +
      freeThrowsBonus +
      reboundsBonus +
      blocksBonus +
      doubleDoublesBonus +
      tripleDoublesBonus -
      turnoversPenalty -
      personalFoulsPenalty
    ).toFixed(2)
  );
};

module.exports = {
  pointsBonus,
  threesBonus,
  assistsBonus,
  freeThrowsBonus,
  blocksBonus,
  reboundsBonus,
  turnoversPenalty,
  personalFoulsPenalty,
  doubleDoublesBonus,
  tripleDoublesBonus,
  gamesPlayedBonus,
  gamesStartedBonus,
  calcStock,
};
