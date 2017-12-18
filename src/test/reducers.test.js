import scoreReducer from '../main/reducers';
import { matchScoreFactory, playerScoreFactory } from '../main/scoreCalculator/scoreFactories';
import updateScore from '../main/actions';

describe('reducers.js', () => {
  it('reduces the score if the action is of type UPDATE_SCORE_REQUESTED', () => {
    const score = matchScoreFactory();
    const newScore = matchScoreFactory(playerScoreFactory(0, 0, '15', 0));
    const updateScoreAction = updateScore(newScore);

    const reducedScore = scoreReducer(score, updateScoreAction);
    expect(reducedScore).toEqual(newScore);
  });
});
