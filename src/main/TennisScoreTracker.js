// @flow
// external modules
import React from 'react';
// internal types
import type { MatchScoreType } from './index';
import type { UpdateScoreActionType } from './actions';
// internal modules
import { matchScoreFactory } from './scoreCalculator/scoreFactories';
import HistoricScoreboard from './components/HistoricScoreboard';
import MatchScoreTracker from './components/MatchScoreTracker';

import './styles/tennisScoreTracker.scss';

export type TennisScoreTrackerPropsType = {
    score: MatchScoreType,
    updateScore: (matchScore: MatchScoreType) => UpdateScoreActionType
};

/**
 * The tennis score tracker render method
 * @param {TennisScoreTrackerPropsType} The properties to render the object
 * @returns {React$Element<any>} HTML markup for the component
 */
const TennisScoreTracker = ({ score, updateScore }: TennisScoreTrackerPropsType) => (
  <main>
    <header>
      <h3>Status: {score.status}</h3>
      <h4>Winner: {score.winner || '...'}</h4>
    </header>
    <section>
      <MatchScoreTracker score={score} updateScore={updateScore} />
      <HistoricScoreboard player1historicScoreboard={score.player1.historicScoreboard}
        player2historicScoreboard={score.player2.historicScoreboard}
      />
    </section>
    <footer>
      <h3>
        Other actions:
      </h3>
      <button onClick={() => updateScore(matchScoreFactory())}>
        Reset the match and start again!
      </button>
    </footer>
  </main>
);

export default TennisScoreTracker;
