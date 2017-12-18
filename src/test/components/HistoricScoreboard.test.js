import React from 'react';
import renderer from 'react-test-renderer';

import HistoricScoreBoard from '../../main/components/HistoricScoreboard';

describe('<HistoricScoreBoard />', () => {
  it('renders the historic scoreboard', () => {
    const props = {
      player1historicScoreboard: [6, 6],
      player2historicScoreboard: [4, 4],
    };

    const tree = renderer.create(<HistoricScoreBoard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
