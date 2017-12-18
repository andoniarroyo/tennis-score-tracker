// @flow
// internal types
import type { ScoreContextType, UpdateSideEffectsType } from '../matchScoreCalculator';
// internal modules
import { SETS_TO_WIN, MATCH_STATUS_FINISHED } from '../constants';

const MINIMUM_POINTS_TO_WIN_A_TIEBREAK = 7;
const MINIMUM_GAMES_DIFFERENCE_TO_WIN_A_TIBREAK = 2;

/**
 * Calculates if the tiebreak is finished bacuase of the finished point
 * @param {number} winnerTiebreak The winner tiebreak value
 * @param {number} loserTiebreak The loser tiebreak value
 * @returns {boolean} True if the tiebreak is finished, false otherwise
 * @private
 */
const calculateIsFinishingTiebreak = (winnerTiebreak: number, loserTiebreak: number): boolean => (
  winnerTiebreak >= MINIMUM_POINTS_TO_WIN_A_TIEBREAK &&
    (winnerTiebreak - loserTiebreak) >= MINIMUM_GAMES_DIFFERENCE_TO_WIN_A_TIBREAK
);

/**
* Calculates the implications of win a point in the tiebreal for the match score
* @param {ScoreContextType} scoreContext The latest point context
* @returns {UpdateSideEffectType} The side effects of the latest point in the match score
* @public
 */
const calculateNextTieBreak = ({ winnerName, loserName, matchScore }: ScoreContextType): UpdateSideEffectsType => {
  let winnerTieBreak = matchScore[winnerName].tieBreak + 1;
  let loserTieBreak = matchScore[loserName].tieBreak;
  let winnerGames = matchScore[winnerName].games;
  let loserGames = matchScore[loserName].games;
  let winnerSets = matchScore[winnerName].sets;
  let { status } = matchScore;
  let matchWinner = '';

  const newWinnerHistoricScoreboard = Array.from(matchScore[winnerName].historicScoreboard);
  const newLoserHistoricScoreboard = Array.from(matchScore[loserName].historicScoreboard);

  const isFinishingTiebreak = calculateIsFinishingTiebreak(winnerTieBreak, loserTieBreak);

  if (isFinishingTiebreak) {
    newWinnerHistoricScoreboard.push(winnerGames + 1);
    newLoserHistoricScoreboard.push(loserGames);
    winnerGames = 0;
    loserGames = 0;
    winnerSets = matchScore[winnerName].sets + 1;
    winnerTieBreak = 0;
    loserTieBreak = 0;
    if (winnerSets === SETS_TO_WIN) {
      status = MATCH_STATUS_FINISHED;
      matchWinner = winnerName;
    }
  }

  return [
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
      value: !isFinishingTiebreak,
    },
    {
      keyPath: `${winnerName},tieBreak`,
      value: winnerTieBreak,
    },
    {
      keyPath: `${loserName},tieBreak`,
      value: loserTieBreak,
    },
    {
      keyPath: `${winnerName},games`,
      value: winnerGames,
    },
    {
      keyPath: `${loserName},games`,
      value: loserGames,
    },
    {
      keyPath: `${winnerName},sets`,
      value: winnerSets,
    },
    {
      keyPath: 'status',
      value: status,
    },
    {
      keyPath: 'winner',
      value: matchWinner,
    },
  ];
};

export default calculateNextTieBreak;
