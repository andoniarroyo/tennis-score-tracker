import reducers from '../main';

describe.only('index.js', () => {
  it('compose the reducers object', () => {
    expect(reducers.score).toBeDefined();
  });
});
