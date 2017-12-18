import React from 'react';
import renderer from 'react-test-renderer';

import TiebreakScoreTracker from '../../main/components/TiebreakScoreTracker';

describe('<TiebreakScoreTracker />', () => {
  it('renders the tiebreak score tracker', () => {
    const props = {
      inTiebreakMode: true,
      player1TieBreak: 7,
      player2TieBreak: 8,
    };

    const tree = renderer.create(<TiebreakScoreTracker {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
