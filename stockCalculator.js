const stockCalculator = (
  position,
  ppg, // Points Per Game
  threepg, // Three Pointers Per Game
  apg, // Assists Per Game
  ftpg, // Free Throws Per Game
  rpg, // Rebounds Per Game
  spg, // Steals Per Game
  bpg, // Blocks Per Game
  topg, // Turnovers Per Game
  pfpg, // Personal Fouls Per Game
  d_d2, // Double Doubles Per Game
  t_d3, // Triple Doubles Per Game
  games_played,
  games_started
) => {
  const gamesStartedBonus = games_started / games_played;
  const gamesPlayedBonus = games_played / 82;
  const pointsPerGameBonus = ppg * 2;
  const threesBonus = threepg * 3;
  const doubleDoubleBonus = d_d2 * 2;
  const tripleDoubleBonus = t_d3 * 3;
  const turnoverPenalty = topg * 2;
  let assistsBonus = 0;
  let stealsBonus = 0;
  let reboundsBonus = 0;
  let blocksBonus = 0;

  if (position === "PG" || "SG") {
    assistsBonus = apg * 2;
    stealsBonus = spg * 3;
    reboundsBonus = rpg * 1;
    blocksBonus = bpg * 1;
  } else if (position === "SF") {
    assistsBonus = apg * 2;
    stealsBonus = spg * 2;
    reboundsBonus = rpg * 2;
    blocksBonus = bpg * 2;
  } else if (position === "PF" || "C") {
    assistsBonus = apg * 1.5;
    stealsBonus = spg * 1;
    reboundsBonus = rpg * 2.5;
    blocksBonus = bpg * 3;
  }

  const bonuses =
    gamesPlayedBonus +
    gamesStartedBonus +
    pointsPerGameBonus +
    threesBonus +
    doubleDoubleBonus +
    tripleDoubleBonus +
    assistsBonus +
    stealsBonus +
    reboundsBonus +
    blocksBonus +
    ftpg;
  const penalties = pfpg + turnoverPenalty;
  const stock = bonuses - penalties;

  return Number(stock.toFixed(2));
};

module.exports = { stockCalculator };
