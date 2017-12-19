// @flow
// external modules
import React from 'react';
// internal types
import type { TennisScoreTrackerPropsType } from '../TennisScoreTracker';
// internal modules
import PlayerScoreTracker from './PlayerScoreTracker';
import TiebreakScoreTracker from './TiebreakScoreTracker';
import { player1Scored, player2Scored } from '../matchScoreCalculator';

import '../styles/components/matchScoreTracker.scss';

/**
 * The match score information
 * @param {TennisScoreTrackerPropsType} The properties to render the object
 * @returns {React$Element<any>} HTML markup for the component
 */
const MatchScoreTracker = ({ score, updateScore }: TennisScoreTrackerPropsType): React.Element<*> => (
  <section className="container">
    <PlayerScoreTracker name="player1"
      status={score.status}
      playerScore={score.player1}
      updateScore={updateScore}
      playerScored={player1Scored.bind(null, score)}
    />
    <TiebreakScoreTracker inTiebreakMode={score.inTiebreakMode}
      player1TieBreak={score.player1.tieBreak}
      player2TieBreak={score.player2.tieBreak}
    />
    <PlayerScoreTracker name="player2"
      status={score.status}
      playerScore={score.player2}
      updateScore={updateScore}
      playerScored={player2Scored.bind(null, score)}
    />
  </section>
);

export default MatchScoreTracker;
