// @flow
// internal types
import type { UpdateScoreActionType } from './actions';
import type { MatchScoreType } from './index';
// internal modules
import { matchScoreFactory } from './scoreCalculator/scoreFactories';
import { UPDATE_SCORE_REQUESTED } from './constants';

type CommonActionType = {
    type: string,
}

const reducers = {
  [UPDATE_SCORE_REQUESTED]:
        (score: MatchScoreType, { newScore }: UpdateScoreActionType) => newScore,
};

/**
 * Reduces the score in the state based on the received action
 * @param {MatchScoreType} score The current score
 * @param {CommonActionType} action The action to be evaluated
 * @returns {MatchScoreType} The new reduced score
 */
const scoreReducer = (score: MatchScoreType = matchScoreFactory(), action: CommonActionType): MatchScoreType => {
  const reducer = reducers[action.type];
  return reducer ? reducer(score, action) : score;
};

export default scoreReducer;
