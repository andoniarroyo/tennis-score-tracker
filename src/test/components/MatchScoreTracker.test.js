import React from 'react';
import renderer from 'react-test-renderer';

import MatchScoreTracker from '../../main/components/MatchScoreTracker';
import { matchScoreFactory } from '../../main/scoreCalculator/scoreFactories';

describe('<MatchScoreTracker />', () => {
  it('renders the match score tracker', () => {
    const props = {
      score: matchScoreFactory(),
      updateScore: () => {},
    };

    const tree = renderer.create(<MatchScoreTracker {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
