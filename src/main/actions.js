// @flow
// internal types
import type { MatchScoreType } from './index';
// internal modules
import { UPDATE_SCORE_REQUESTED } from './constants';

export type UpdateScoreActionType = {
    type: string,
    newScore: MatchScoreType
};

/**
 * Action creator to update the match score
 * @param {MatchScoreType} newScore The new score value
 * @returns {UpdateScoreActionType} The generated action
 * @public
 */
const updateScore = (newScore: MatchScoreType): UpdateScoreActionType => (
  {
    type: UPDATE_SCORE_REQUESTED,
    newScore,
  }
);

export default updateScore;
