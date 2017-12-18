// @flow
// internal types
import type { MatchScoreType } from './index';

// internal modules
import { PLAYER1_NAME, PLAYER2_NAME } from './constants';
import calculateNextPoint from './scoreCalculator/points';
import calculateNextGame from './scoreCalculator/games';
import calculateNextSet from './scoreCalculator/sets';
import calculateNextTieBreak from './scoreCalculator/tieBreak';

export type ScoreContextType = {
    winnerName: string,
    loserName: string,
    matchScore: MatchScoreType,
}
export type UpdateSideEffectType = {
    keyPath: string,
    value: mixed
}
export type UpdateSideEffectsType = Array<UpdateSideEffectType>;

/**
 * Gets the point loser player name
 * @param {string} winnerPlayer Name of the payer who won the point
 * @returns {string} The name of the loser player
 * @private
 */
const getLoserPlayer = (winnerPlayer: string): string => (
  winnerPlayer === PLAYER1_NAME ? PLAYER2_NAME : PLAYER1_NAME
);

/**
 * Clones the current match story
 * @param {MatchScoreType} previousMatchScore The match score object to be cloned
 * @returns {MatchScoreType} The new cloned score
 * @private
 */
const cloneMatchScore = (previousMatchScore: MatchScoreType): MatchScoreType => (
  Object.assign({}, previousMatchScore)
);

/**
 * Applies a side effect to the match score updating the state
 * @param {MatchScoreType} matchScore The match score to be used as reference
 * @param {UpdateSideEffectsType} updatesSideEffects The side effects to be applied
 * @returns {MatchScoreType} The match scrore resulting status
 * @private
 */
const applySideEffect = (matchScore: MatchScoreType, updatesSideEffects: UpdateSideEffectsType): MatchScoreType => {
  const newMatchScore = cloneMatchScore(matchScore);
  updatesSideEffects.forEach((update: UpdateSideEffectType) => {
    const keys = update.keyPath.split(',');
    if (keys.length === 1) {
      newMatchScore[keys[0]] = update.value;
      return newMatchScore;
    }
    let reference = matchScore;
    while (keys.length > 1) {
      reference = reference[keys.shift()];
    }
    reference[keys.shift()] = update.value;
    return reference;
  });
  return newMatchScore;
};

/**
 * Updates the incoming match score based on the player who won the point
 * @param {string} winnerName The name of the point winner
 * @param {MatchScoreType} previousMatchScore The match score to be used as reference
 * @returns {MatchScoreType} The new match score generated
 * @private
 */
const playerScored = (winnerName: string, previousMatchScore: MatchScoreType): MatchScoreType => {
  let matchScore = cloneMatchScore(previousMatchScore);
  const loserName = getLoserPlayer(winnerName);
  const scoreContext = { winnerName, loserName, matchScore };
  // Tiebreak mode has their special flow
  if (previousMatchScore.inTiebreakMode) {
    const newTiebreakSideEffect = calculateNextTieBreak(scoreContext);
    return applySideEffect(matchScore, newTiebreakSideEffect);
  }
  // score
  const newScoreSideEffect = calculateNextPoint(scoreContext);
  matchScore = applySideEffect(matchScore, newScoreSideEffect.updates);
  if (newScoreSideEffect.isFinishingGame) {
    // games
    const newGamesSideEffect = calculateNextGame(scoreContext);
    matchScore = applySideEffect(matchScore, newGamesSideEffect.updates);
    if (newGamesSideEffect.isFinishingSet) {
      // sets
      const newSetsSideEffect = calculateNextSet(scoreContext);
      matchScore = applySideEffect(matchScore, newSetsSideEffect);
    }
  }
  return matchScore;
};

/**
 * Updates the match score based on the player1 scored a point
 * @param {MatchScoreType} previousScore The previous match score
 * @returns {MatchScoreType} The new match score applying the side effects of the players 1 point
 * @public
 */
export const player1Scored = (previousScore: MatchScoreType): MatchScoreType =>
  playerScored(PLAYER1_NAME, previousScore);

/**
 * Updates the match score based on the player2 scored a point
 * @param {MatchScoreType} previousScore The previous match score
 * @returns {MatchScoreType} The new match score applying the side effects of the players 2 point
 * @public
 */
export const player2Scored = (previousScore: MatchScoreType): MatchScoreType =>
  playerScored(PLAYER2_NAME, previousScore);
