// @flow
import scoreReducer from './reducers';

export type PlayerScoreType = {
    sets: number,
    games: number,
    score: string,
    tieBreak: number,
    historicScoreboard: Array<number>,
}

export type MatchScoreType = {
    status: string,
    winner: string,
    player1: PlayerScoreType,
    player2: PlayerScoreType,
    inTiebreakMode: boolean,
}

export type StateType = {
    score: MatchScoreType
}

const reducers = {
  score: scoreReducer,
};

export default reducers;
