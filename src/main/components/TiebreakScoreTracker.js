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
    <article className={`tiebreak-mode-${inTiebreakMode.toString()}`}>
      <h3>Tiebreak:</h3>
      <div className="tiebreak-content">
        <div className="score-tiebreak">
          {player1TieBreak}
        </div>
        <div className="score-tiebreak">
          {player2TieBreak}
        </div>
      </div>
    </article>
);

export default TiebreakScoreTracker;
