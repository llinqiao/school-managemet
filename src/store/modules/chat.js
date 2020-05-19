import * as types from '../mutation-types';
import * as chatAPI from '../../api/chat';

// init state
const state = {
  chat: {
    list: [],
    noMore: false,
  },
};

// getters
const getters = {
  chat: state => state.toast,
};

let chatPage = {
  start: '',
  page: 0,
  num: 20,
};

// actions
const actions = {
  // context (state, getters, commit)
  // 解构 commit
  getChatList({ commit }) {
    if (state.chat.noMore) {
      return;
    }
    return new Promise((resolve, reject) => {
      chatAPI.getChatData(
        chatPage,
        data => {
          resolve();
          // 提交 mutations
          commit(types.CHAT_GET_LIST, data.data);
        },
        data => {
          console.error(data);
        }
      );
    });
  },
};

// mutations
const mutations = {
  [types.CHAT_GET_LIST](state, chatList) {
    chatList.map(item => {
      // 处理数据...
    });
    state.chat.list.unshift.apply(state.chat.list, chatList);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
