// @flow
// internal types
import type { StateType, MatchScoreType } from './index';
// internal modules
import { matchScoreFactory } from './scoreCalculator/scoreFactories';

/**
 * Gets the score from the state
 * @param {StateType} state The curent state of the application
 * @returns {MatchScoreType} The score in the state, or the default one in case it is not there
 * @public
 */
const scoreSelector = (state: StateType): MatchScoreType => (state && state.score) || matchScoreFactory();

export default scoreSelector;
