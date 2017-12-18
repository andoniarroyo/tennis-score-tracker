// @flow
import type { ScoreContextType, UpdateSideEffectType } from '../matchScoreCalculator';

export type NextPointSideEffectType = {
    isFinishingGame: boolean,
    updates: Array<UpdateSideEffectType>,
}

/**
 * Gives the new points value from 0
 * @returns {string} The next points value
 * @private
 */
const from0 = () => '15';

/**
 * Gives the new points value from 15
 * @returns {string} The next points value
 * @private
 */
const from15 = () => '30';

/**
 * Gives the new points value from 30
 * @returns {string} The next points value
 * @private
 */
const from30 = () => '40';

/**
 * Gives the new points value from 40, taking into consideration the another
 * player points value
 * @param {string} loserPoints The points of the loser player
 * @returns {string} The next points value
 * @private
 */
const from40 = (loserPoints: string): string => {
  switch (loserPoints) {
    case 'A':
      return '40';
    case '40':
      return 'A';
    default:
      return '0';
  }
};

/**
 * Gives the new points value from advantage
 * @returns {string} The next points value
 * @private
 */
const fromA = () => '0';

/**
 * The set of rules to be applied based on the current points value
 */
const advanceRules = {
  from0,
  from15,
  from30,
  from40,
  fromA,
};

/**
 * Calculates the new winner points value
 * @param {string} winnerScore The winner points value
 * @param {string} loserScore  The loser points value
 * @returns {string} The new winner points value
 * @private
 */
const calculateNewWinerScore = (winnerScore: string, loserScore:string): string =>
  advanceRules[`from${winnerScore}`](loserScore);

/**
 * Calculates the new loser points value
 * @param {string} newWinnerScore The new winner points value
 * @param {string} oldWinnerScore The old winner points value
 * @param {string} loserScore The loser points value
 * @returns {string} The new winner points value
 * @private
 */
const calculateNewLoserScore = (newWinnerScore: string, oldWinnerScore: string, loserScore: string): string => {
  if (newWinnerScore === '0') {
    return '0';
  }
  return newWinnerScore === oldWinnerScore ? '40' : loserScore;
};

/**
 *  Calculates if the point finishes the current game
 * @param {string} newWinnerScore The new winner points score
 * @returns {boolean} True if the point finishes the game, False otherwise
 * @private
 */
const calculateIsFinishingGame = (newWinnerScore: string): boolean => newWinnerScore === '0';

/**
 * Calculates the next points value based on the winner of the current point
 * @param {ScoreContextType} scoreContext score context
 * @returns {NextPointSideEffectType} The next point side effect generated by this point
 * @public
 */
const calculateNextScore = ({ winnerName, loserName, matchScore }: ScoreContextType): NextPointSideEffectType => {
  const winnerScore = matchScore[winnerName].score;
  const loserScore = matchScore[loserName].score;
  const newWinnerScore = calculateNewWinerScore(winnerScore, loserScore);
  const newLoserScore = calculateNewLoserScore(newWinnerScore, winnerScore, loserScore);
  const isFinishingGame = calculateIsFinishingGame(newWinnerScore);

  return {
    isFinishingGame,
    updates: [
      {
        keyPath: `${winnerName},score`,
        value: newWinnerScore,
      },
      {
        keyPath: `${loserName},score`,
        value: newLoserScore,
      },
    ],
  };
};

export default calculateNextScore;