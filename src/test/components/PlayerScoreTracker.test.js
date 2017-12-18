import React from 'react';
import renderer from 'react-test-renderer';

import { MATCH_STATUS_FINISHED } from '../../main/constants';
import PlayerScoreTracker from '../../main/components/PlayerScoreTracker';
import { playerScoreFactory } from '../../main/scoreCalculator/scoreFactories';

describe('<PlayerScoreTracker />', () => {
  it('renders the player score tracker', () => {
    const props = {
      name: 'andoni',
      status: MATCH_STATUS_FINISHED,
      playerScore: playerScoreFactory(),
      updateScore: () => {},
      playerScored: () => {},
    };

    const tree = renderer.create(<PlayerScoreTracker {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
