// @flow
// external modules
import React from 'react';

import '../styles/components/tiebreakScoreTracker.scss';

type TiebreakScoreTrackerPropsType = {
  inTiebreakMode: boolean,
  player1TieBreak: number,
  player2TieBreak: number,
}

const TiebreakScoreTracker = ({ inTiebreakMode, player1TieBreak, player2TieBreak }:
  TiebreakScoreTrackerPropsType): React.Element<*> => (
    <div className={`tiebreak-mode-${inTiebreakMode.toString()}`}>
      <div>Tiebreak:</div>
      <div className="tiebreak-content">
        <div className="score-tiebreak">
          {player1TieBreak}
        </div>
        <div className="score-tiebreak">
          {player2TieBreak}
        </div>
      </div>
    </div>
);

export default TiebreakScoreTracker;
