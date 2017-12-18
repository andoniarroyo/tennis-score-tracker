// @flow
// external modules
import React from 'react';
// internal types
import type { PlayerScoreType } from '../index';
// internal modules
import { MATCH_STATUS_FINISHED } from '../constants';

import '../styles/components/playerScoreTracker.scss';

type PlayerScoreTrackerPropsType = {
  name: string,
  status: string,
  playerScore: PlayerScoreType,
  updateScore: Function,
  playerScored: Function
}

/**
 * The tennis score tracker render method
 * @param {TennisScoreTrackerPropsType} The properties to render the object
 * @returns {React$Element<any>} HTML markup for the component
 */
const PlayerScoreTracker = ({
  name, status, playerScore, updateScore, playerScored,
}: PlayerScoreTrackerPropsType): React.Element<*> => (
  <div>
    <div className="player-name">{name}</div>
    <div className="player-score-content">
      <div>
        sets:
      </div>
      <div>
        {playerScore.sets}
      </div>
      <div>
        games:
      </div>
      <div>
        {playerScore.games}
      </div>
      <div>
        score:
      </div>
      <div className="score-main-value">
        {playerScore.score}
      </div>
      <div className="scored">
        <button disabled={status === MATCH_STATUS_FINISHED} onClick={() => updateScore(playerScored())}>
          {name} scored!
        </button>
      </div>
    </div>
  </div>
);

export default PlayerScoreTracker;
