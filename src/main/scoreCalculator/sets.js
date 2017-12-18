// @flow
// internal types
import type { ScoreContextType, UpdateSideEffectsType } from '../matchScoreCalculator';

// internal modules
import { SETS_TO_WIN, MATCH_STATUS_INPLAY, MATCH_STATUS_FINISHED } from '../constants';

/**
 * Calculates the new sets value
 * @param {number} winnerSets Won sets by the winner
 * @returns {number} The new won sets by the winner
 * @private
 */
const calculateNewWinnerSets = (winnerSets: number): number => winnerSets + 1;

/**
 * Calculates the match new status
 * @param {number} newWinnerSets Won sets by the winner (including the current point)
 * @returns {string} The new status of the match
 * @private
 */
const calculateMatchStatus = (newWinnerSets: number): string => (
  newWinnerSets === SETS_TO_WIN ? MATCH_STATUS_FINISHED : MATCH_STATUS_INPLAY
);

/**
 * Calculates the winner name of the match if there is one
 * @param {string} matchStatus The current match status
 * @param {string} winner The point winner name
 * @returns {string} The name of the winner if the match is over, empty string otherwise
 * @private
 */
const calculateNewWinner = (matchStatus: string, winner: string) => (
  matchStatus === MATCH_STATUS_FINISHED ? winner : ''
);

/**
  * Calculates the implications of win the set in the match score
  * @param {ScoreContextType} scoreContext The latest point context
  * @returns {UpdateSideEffectsType} The side effects of the latest point in the match score
  * @public
  */
const calculateNextSet = ({ winnerName, matchScore }: ScoreContextType): UpdateSideEffectsType => {
  const winnerSets = matchScore[winnerName].sets;
  const newWinnerSets = calculateNewWinnerSets(winnerSets);
  const matchStatus = calculateMatchStatus(newWinnerSets);
  const matchWinner = calculateNewWinner(matchStatus, winnerName);

  return [
    {
      keyPath: `${winnerName},sets`,
      value: newWinnerSets,
    },
    {
      keyPath: 'status',
      value: matchStatus,
    },
    {
      keyPath: 'winner',
      value: matchWinner,
    },
  ];
};

export default calculateNextSet;
