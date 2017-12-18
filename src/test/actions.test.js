import updateScore from '../main/actions';
import { matchScoreFactory, playerScoreFactory } from '../main/scoreCalculator/scoreFactories';
import { UPDATE_SCORE_REQUESTED } from '../main/constants';

describe('actions.js', () => {
  it('creating the update score action', () => {
    const newScore = matchScoreFactory(playerScoreFactory(0, 0, '15', 0));
    const action = updateScore(newScore);
    expect(action.type).toBe(UPDATE_SCORE_REQUESTED);
    expect(action.newScore).toBe(newScore);
  });
});
