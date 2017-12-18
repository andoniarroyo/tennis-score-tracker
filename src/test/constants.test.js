import {
  SETS_TO_WIN,
  MATCH_STATUS_INPLAY,
  MATCH_STATUS_FINISHED,
  UPDATE_SCORE_REQUESTED,
} from '../main/constants';

describe.only('constants.js', () => {
  it('defines the number of sets to win a match', () => {
    expect(typeof SETS_TO_WIN).toBe('number');
  });
  it('defines the inplay status for the match', () => {
    expect(typeof MATCH_STATUS_INPLAY).toBe('string');
  });
  it('defines the finished status for the match', () => {
    expect(typeof MATCH_STATUS_FINISHED).toBe('string');
  });
  describe('actions', () => {
    it('defines the update score action type', () => {
      expect(typeof UPDATE_SCORE_REQUESTED).toBe('string');
    });
  });
});
