// @flow
import type { UpdateSideEffectType, ScoreContextType } from '../matchScoreCalculator';

const MINIMUM_GAMES_TO_WIN_A_SET = 6;
const MINIMUM_GAMES_DIFFERENCE_TO_WIN_A_SET = 2;

export type NextGameSideEffectType = {
    isFinishingSet: boolean,
    updates: Array<UpdateSideEffectType>,
}

/**
 * Calculates the new games value for the winner of the point
 * @param {number} winnerGames Won games by the winner
 * @param {number} loserGames Won games by the loser
 * @return {number} The new won games by the winner of the point
 * @private
 */
const calculateWinnerGames = (winnerGames: number, loserGames: number): number => {
  const newWinnerGames = winnerGames + 1;
  return (newWinnerGames >= MINIMUM_GAMES_TO_WIN_A_SET &&
    newWinnerGames - loserGames >= MINIMUM_GAMES_DIFFERENCE_TO_WIN_A_SET) ? 0 : (newWinnerGames);
};

/**
 * Calculates the new games value for the loser of the point
 * @param {number} newWinnerGames Won games by the winner (including the current point)
 * @param {number} loserGames Won games by the loser
 * @return {number} The new won games by the loser of the point
 * @private
 */
const calculateLoserGames = (newWinnerGames: number, loserGames:number): number => (
  newWinnerGames === 0 ? 0 : loserGames
);

/**
 * Calculates if the point finishes the current set
 * @param {number} newWinnerGames Won games by the winner (including the current point)
 * @return {boolean} True if as a side effect of winning the point the current set ends
 * @private
 */
const calculateIsFinishingSet = (newWinnerGames: number): boolean => newWinnerGames === 0;

/**
 * Calculates if the match enters in tie break mode
 * @param {number} newWinnerGames Won games by the winner (including the current point)
 * @param {number} loserGames Won games by the loser
 * @return {boolean} True if the match enters in tie break mode, False otherwise
 * @private
 */
const calculateEnterTiebreakMode = (newWinnerGames: number, loserGames: number): boolean =>
  newWinnerGames === MINIMUM_GAMES_TO_WIN_A_SET && loserGames === MINIMUM_GAMES_TO_WIN_A_SET;

/**
  * Calculates the implications of win the point in the match score
  * @param {ScoreContextType} scoreContext The latest point context
  * @returns {NextGameSideEffectType} The side effects of the latest point in the match score
  * @public
  */
const calculateNextGame = ({ winnerName, loserName, matchScore }: ScoreContextType): NextGameSideEffectType => {
  const winnerGames = matchScore[winnerName].games;
  const loserGames = matchScore[loserName].games;

  const newWinnerGames = calculateWinnerGames(winnerGames, loserGames);
  const newLoserGames = calculateLoserGames(newWinnerGames, loserGames);
  const isFinishingSet = calculateIsFinishingSet(newWinnerGames);

  const newWinnerHistoricScoreboard = Array.from(matchScore[winnerName].historicScoreboard);
  const newLoserHistoricScoreboard = Array.from(matchScore[loserName].historicScoreboard);

  if (isFinishingSet) {
    newWinnerHistoricScoreboard.push(newWinnerGames || winnerGames + 1);
    newLoserHistoricScoreboard.push(loserGames);
  }

  const isInTiebreakMode = calculateEnterTiebreakMode(newWinnerGames, loserGames);

  return {
    isFinishingSet,
    updates: [
      {
        keyPath: `${winnerName},historicScoreboard`,
        value: newWinnerHistoricScoreboard,
      },
      {
        keyPath: `${loserName},historicScoreboard`,
        value: newLoserHistoricScoreboard,
      },
      {
        keyPath: 'inTiebreakMode',
        value: isInTiebreakMode,
      },
      {
        keyPath: `${winnerName},games`,
        value: newWinnerGames,
      },
      {
        keyPath: `${loserName},games`,
        value: newLoserGames,
      },
    ],
  };
};

export default calculateNextGame;
