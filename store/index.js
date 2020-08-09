import Questions from '~/assets/data/questions.json';

export const state = () => ({
  questions: Questions,
});

export const mutations = {
  useQuestion(state, id) {
    const selectedQuestion = state.questions.find((q) => q.id === id);
    if (selectedQuestion) selectedQuestion.hasBeenUsed = true;
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
};
