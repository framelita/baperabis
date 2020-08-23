import Vue from 'vue';
import Questions from '~/assets/data/questions.json';
import Game from '~/assets/data/game.json';

import { randomInt } from '~/assets/scripts/utilities';

const MAX_HANDS = 3;

export const state = () => ({
  questions: Questions,
  answers: [],
  players: [], // 0: { id: playerId, name: playerName, status: status, hands: [] }
  gameMasterId: null,
  playerId: null,
  gameId: null,
  bossId: null,
});

export const mutations = {
  useQuestion(state, id) {
    const selectedQuestion = state.questions.find((q) => q.id === id);
    if (selectedQuestion) selectedQuestion.hasBeenUsed = true;
  },
  assignHands(state) {
    state.players.forEach((player, index) => {
      for (let i = 0; i < MAX_HANDS; i += 1) {
        const unassignedAnswers = state.answers.filter(
          (c) => !c.hasBeenAssigned
        );

        const max = unassignedAnswers.length - 1;
        const min = 0;
        const rand = randomInt(min, max);

        const selectedAnswer = unassignedAnswers[rand];
        selectedAnswer.hasBeenAssigned = true;

        state.players[index].hands.push(selectedAnswer.id);
      }
    });
  },
  updateGameSettings(state, game) {
    const { gameId, players } = game;
    state.gameId = gameId;
    Vue.set(state, 'players', players);
  },
};

export const getters = {
  getQuestions(state) {
    // make sure to only return question that hasn't been played
    const unusedQuestions = state.questions.filter((q) => !q.hasBeenUsed);
    if (unusedQuestions.length === 0) {
      state.questions.forEach((q) => {
        q.hasBeenUsed = false;
      });
    }
    return state.questions.filter((q) => !q.hasBeenUsed);
  },
  getPlayers(state) {
    return state.players;
  },
  getHands(state) {
    const player = state.players.find((player) => player.id === state.playerId);
    return player.hands.map((cardId) =>
      state.answers.find((answer) => answer.id === cardId)
    );
  },
};

export const actions = {
  // async getGameRoom ({ commit }) {
  //   const game = await this.$axios.$get('http://icanhazip.com')
  //   commit('updateGameSettings', game);
  // },
  getGameRoom({ commit }) {
    const game = Game[0];
    commit('updateGameSettings', game);
  },
};
