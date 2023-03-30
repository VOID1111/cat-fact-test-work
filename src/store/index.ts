import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    item: null as FACTS.Fact | null,
    items: [] as FACTS.Facts,
    tabelHeadersMap: [
      { text: 'tabelHeader-_id', value: '_id' },
      { text: 'tabelHeader-user', value: 'user' },
      { text: 'tabelHeader-text', value: 'text' },
      { text: 'tabelHeader-type', value: 'type' },
      { text: 'tabelHeader-createdAt', value: 'createdAt' },
      { text: 'tabelHeader-updatedAt', value: 'updatedAt' }
    ],
    showTabelHeaders: {
      _id: true,
      user: true,
      text: true,
      type: true,
      createdAt: true,
      updatedAt: true
    } as { [key: string]: boolean; }
  },
  getters: {
    getItems(state) {
      return state.items;
    },
    getItem(state) {
      return state.item;
    },
    getTabelHeaders(state) {
      return state.tabelHeadersMap.filter(item => state.showTabelHeaders[item.value])
    },
    getShowTabelHeaders(state) {
      return state.showTabelHeaders;
    }
  },
  mutations: {
    setItems(state, items: FACTS.Facts) {
      state.items = items;
    },
    setItem(state, item: FACTS.Fact | null) {
      state.item = item;
    },
    updShowTabelHeaders(state, data: { val: boolean; key: string; }) {
      state.showTabelHeaders[data.key] = data.val;
    }
  },
  actions: {
    fetchFacts(context, itemsPerPage) {
      fetch(`https://cat-fact.herokuapp.com/facts/random?amount=${itemsPerPage}`)
        .then((response) => response.json())
        .then((data) => {
          context.commit("setItems", data);
        })
        .catch((err) => console.error(err));
    },
    fetchFact(context, id) {
      fetch(`https://cat-fact.herokuapp.com/facts/${id}`)
        .then((response) => response.json())
        .then((data) => {
          context.commit("setItem", data);
        })
        .catch((err) => console.error(err));
    }
  }
})
