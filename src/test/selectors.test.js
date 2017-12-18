import scoreSelector from '../main/selectors';
import { matchScoreFactory, playerScoreFactory } from '../main/scoreCalculator/scoreFactories';

describe('selectors.js', () => {
  it('returns a default score if there is no state', () => {
    const expectedScore = matchScoreFactory();
    const state = undefined;
    const store = scoreSelector(state);

    expect(store).toEqual(expectedScore);
  });
  it('returns a default score if the state has no score', () => {
    const expectedScore = matchScoreFactory();
    const state = {};
    const store = scoreSelector(state);

    expect(store).toEqual(expectedScore);
  });
  it('returns the score from the state ', () => {
    const expectedScore = matchScoreFactory(playerScoreFactory(1, 1, 1, 1));
    const state = { score: expectedScore };
    const store = scoreSelector(state);

    expect(store).toEqual(expectedScore);
  });
});
