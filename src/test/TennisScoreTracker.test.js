import React from 'react';
import renderer from 'react-test-renderer';

import TennisScoreTracker from '../main/TennisScoreTracker';
import { matchScoreFactory } from '../main/scoreCalculator/scoreFactories';

describe('<TennisScoreTracker />', () => {
  it('renders the tennis score tracker', () => {
    const props = {
      score: matchScoreFactory(),
      updateScore: () => {},
    };

    const tree = renderer.create(<TennisScoreTracker {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
