// @flow
// external modules
import React from 'react';
import shortid from 'shortid';

import '../styles/components/historicScoreboard.scss';

type HistoricScoreboardPropsType = {
  player1historicScoreboard: Array<number>,
  player2historicScoreboard: Array<number>
}

/**
 * Render a historic scoreboard for a player
 * @param {Array<number>} historicScoreboard The scoreboard to render
 * @returns {React.Element<*>} The generated react element
 */
const renderHistoricScoreboard = (historicScoreboard: Array<number>): Array<React.Element<*>> => (
  historicScoreboard.map((historicScoreboardItem: number): React.Element<*> => (
    <td key={shortid.generate()}>
      {historicScoreboardItem}
    </td>
  ))
);

/**
 * Renders the historic scoreboard part of the application
 * @param {HistoricScoreboardPropsType} scoreboards The coreboards information
 * @returns {React.Element<*>} The generated react element
 */
const HistoricScoreboard = ({ player1historicScoreboard, player2historicScoreboard }:
  HistoricScoreboardPropsType): React.Element<*> => (
    <table>
      <thead>
        <tr>
          <td>
            <span>Scoreboard:</span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="player-historic-name">
          player 1:
          </td>
          {renderHistoricScoreboard(player1historicScoreboard)}
        </tr>
        <tr>
          <td className="player-historic-name">
          player 2:
          </td>
          {renderHistoricScoreboard(player2historicScoreboard)}
        </tr>
      </tbody>
    </table>
);

export default HistoricScoreboard;
