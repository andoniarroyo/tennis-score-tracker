// @flow
// internal types
import type { PlayerScoreType, MatchScoreType } from '../index';
//internal modules
import { MATCH_STATUS_INPLAY } from '../constants';

/**
 * Composes a playscore with the values received by parameters
 * @param {number} sets The number of sets won by the player
 * @param {number} games The number of games won by the player
 * @param {string} score The number of points won by the player
 * @param {number} tieBreak The number of tiebreak points won by the player
 * @param {Array<number>} historicScoreboard The historic scoreboards for the player
 * @returns {PlayerScoreType} The player score generated object
 */
export const playerScoreFactory = (sets: number = 0, games: number = 0, score: string = '0',
  tieBreak: number = 0, historicScoreboard: Array<number> = []): PlayerScoreType => (
  {
    sets, games, score, tieBreak, historicScoreboard,
  }
);

/**
 * Composes a match score based on the received parameters
 * @param {PlayerScoreType} player1Score The player 1 score
 * @param {PlayerScoreType} player2Score The player 2 score
 * @param {boolean} inTiebreakMode The initial value for the in tiebreak mode
 * @returns {MatchScoreType} The match score generated object
 */
export const matchScoreFactory = (player1Score: PlayerScoreType = playerScoreFactory(),
  player2Score: PlayerScoreType = playerScoreFactory(), inTiebreakMode: boolean = false): MatchScoreType => (
  {
    status: MATCH_STATUS_INPLAY,
    winner: '',
    player1: player1Score,
    player2: player2Score,
    inTiebreakMode,
  }
);
