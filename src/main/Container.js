// @flow
// external modules
import { connect } from 'react-redux';
// internal types
import type { StateType, MatchScoreType } from './index';
// internal modules
import scoreSelector from './selectors';
import TenisScoreTracker from './TennisScoreTracker';
import updateScore from './actions';

type StateToPropsType = {
    score: MatchScoreType
}

/**
 * Maps the application state to props passed to the component
 * @param {StateType} state The application redux state
 * @returns {StateToPropsType} The props coming from the state
 * @private
 */
const mapStateToProps = (state: StateType): StateToPropsType => ({
  score: scoreSelector(state),
});

const mapDispatchToProps = {
  updateScore,
};

export default connect(mapStateToProps, mapDispatchToProps)(TenisScoreTracker);
