import { SETS_TO_WIN } from '../main/constants';
import { player1Scored, player2Scored } from '../main/matchScoreCalculator';
import { matchScoreFactory, playerScoreFactory } from '../main/scoreCalculator/scoreFactories';

describe('The matchScoreCalculator', () => {
  it('increases the player 1 score when the player1 scored', () => {
    const previousMatchScore = matchScoreFactory();
    const newMatchScore = player1Scored(previousMatchScore);

    expect(newMatchScore).toMatchSnapshot();
  });

  it('increases the player 2 score when the player1 scored', () => {
    const previousMatchScore = matchScoreFactory();
    const newMatchScore = player2Scored(previousMatchScore);

    expect(newMatchScore).toMatchSnapshot();
  });

  describe('scoring without change the game', () => {
    it('increases the score from 0 to 15', () => {
      const previousMatchScore = matchScoreFactory();
      const newMatchScore = player1Scored(previousMatchScore);

      expect(newMatchScore).toMatchSnapshot();
    });
    it('increases the score from 15 to 30', () => {
      const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 0, '15', 0));
      const newMatchScore = player1Scored(previousMatchScore);

      expect(newMatchScore).toMatchSnapshot();
    });
    it('increases the score from 30 to 40', () => {
      const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 0, '30', 0));
      const newMatchScore = player1Scored(previousMatchScore);

      expect(newMatchScore).toMatchSnapshot();
    });
    it('gives advantage if both players were in deuce (40 - 40)', () => {
      const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 0, '40', 0),
        playerScoreFactory(0, 0, '40', 0));
      const newMatchScore = player1Scored(previousMatchScore);

      expect(newMatchScore).toMatchSnapshot();
    });
    it('sets the deuce again if the other player had advantage', () => {
      const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 0, '40', 0),
        playerScoreFactory(0, 0, 'A', 0));
      const newMatchScore = player1Scored(previousMatchScore);

      expect(newMatchScore).toMatchSnapshot();
    });
  });

  describe('increasing the game', () => {
    it('increases the game when the player wins the game', () => {
      const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 0, '40', 0),
        playerScoreFactory(0, 1, '30', 0));
      const newMatchScore = player1Scored(previousMatchScore);

      expect(newMatchScore).toMatchSnapshot();
    });
    it('increases the game when the player wins the game from the advantage', () => {
      const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 0, 'A', 0),
        playerScoreFactory(0, 0, '40', 0));
      const newMatchScore = player1Scored(previousMatchScore);

      expect(newMatchScore).toMatchSnapshot();
    });
    it('increases the sets when the player wins 6 games and the other player 4 or less', () => {
      const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 5, '40', 0),
        playerScoreFactory(0, 4, '30', 0));
      const newMatchScore = player1Scored(previousMatchScore);

      expect(newMatchScore).toMatchSnapshot();
    });
    it(`in spite of reaching 6 games, does not increase the sets if the difference is not equal 
        or bigger than 2`, () => {
        const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 5, '40', 0),
          playerScoreFactory(0, 5, '30', 0));
        const newMatchScore = player1Scored(previousMatchScore);

        expect(newMatchScore).toMatchSnapshot();
      });
    it('in case both players win 6 games the tie break mode starts', () => {
      const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 5, '40', 0),
        playerScoreFactory(0, 6, '30', 0));
      const newMatchScore = player1Scored(previousMatchScore);

      expect(newMatchScore).toMatchSnapshot();
    });

    describe('in tie break mode', () => {
      it('adds point to the tiebreak', () => {
        const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 6, '0', 0),
          playerScoreFactory(0, 6, '0', 0), true);
        const newMatchScore = player1Scored(previousMatchScore);

        expect(newMatchScore).toMatchSnapshot();
      });
      it('continue adding points if the difference is smaller than 2 points', () => {
        const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 6, '0', 7),
          playerScoreFactory(0, 6, '0', 7), true);
        const newMatchScore = player1Scored(previousMatchScore);

        expect(newMatchScore).toMatchSnapshot();
      });
      it(`wins the game and resolves the tiebreak mode if the value is 7 or more and the difference 
          is equal or bigger than  2`, () => {
          const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 6, '0', 7),
            playerScoreFactory(0, 6, '0', 6), true);
          const newMatchScore = player1Scored(previousMatchScore);

          expect(newMatchScore).toMatchSnapshot();
        });
    });
  });
  describe('increasing the sets', () => {
    it(`increases the sets for the scoring player and reset the games and scores 
        for both players`, () => {
        const previousMatchScore = matchScoreFactory(playerScoreFactory(0, 5, '40', 0),
          playerScoreFactory(0, 4, '30', 0));
        const newMatchScore = player1Scored(previousMatchScore);

        expect(newMatchScore).toMatchSnapshot();
      });
    it('finishes the match when a player wins the defined set to win amount of sets', () => {
      const currentWonSets = SETS_TO_WIN - 1;
      const previousMatchScore = matchScoreFactory(playerScoreFactory(currentWonSets, 5, '40', 0),
        playerScoreFactory(currentWonSets, 4, '30', 0));
      const newMatchScore = player1Scored(previousMatchScore);

      expect(newMatchScore).toMatchSnapshot();
    });
  });
});
