import Vue from "vue";
import firebase from "firebase/app";

let messagesRef;

const state = {
  user: {},
  error: {},
  users: {},
  messages: {}
};

const getters = {
  getUsers(state) {
    let usersFiltered = {};
    Object.keys(state.users).forEach(key => {
      if (key !== state.user.userId) {
        usersFiltered[key] = state.users[key];
      }
    });
    return usersFiltered;
  },
  isUserAuth(state) {
    return Object.keys(state.user).length;
  },
  getError(state) {
    return state.error;
  }
};

// mutations
const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.users);
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.user);
  },
  addMessage(state, payload) {
    Vue.set(state.messages, payload.messageId, payload.message);
  },
  clearMessages(state) {
    state.messages = {};
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  }
};

// actions
const actions = {
  signUpAction({ commit }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        let userId = firebase.auth().currentUser.uid;
        const rootRef = firebase
          .database()
          .ref(`users/${userId}`)
          .set({
            name: payload.name,
            email: payload.email,
            online: true
          });
        this.$router.push("/");
        return rootRef;
      })
      .catch(error => {
        commit("SET_ERROR", error.message);
      });
  },
  signInAction({ commit }, payload) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        this.$router.push("/");
      })
      .catch(error => {
        commit("SET_ERROR", error.message);
      });
  },
  signOutAction({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.$router.push("/");
      })
      .catch(error => {
        commit("SET_ERROR", error.message);
      });
  },
  authAction({ commit, dispatch, state }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // user logged in
        let userId = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref(`users/${userId}`)
          .once("value", snapshot => {
            let userData = snapshot.val();
            commit("setUser", {
              name: userData.name,
              email: userData.email,
              userId
            });
          });
        // update user state at firebase
        dispatch("firebaseUpdateUserAction", {
          userId,
          updates: {
            online: true
          }
        });
        dispatch("getUsersAction");
      } else {
        // user logged out
        dispatch("firebaseUpdateUserAction", {
          userId: state.user.userId,
          updates: {
            online: false
          }
        });
        commit("setUser", {});
      }
    });
  },
  firebaseUpdateUserAction({ state }, payload) {
    payload.userId &&
      firebase
        .database()
        .ref(`users/${payload.userId}`)
        .update(payload.updates);
  },
  getUsersAction({ commit }) {
    // user added
    firebase
      .database()
      .ref(`users`)
      .on("child_added", snapshot => {
        let users = snapshot.val();
        let userId = snapshot.key;
        commit("addUser", {
          userId,
          users
        });
      });
    // user updated
    firebase
      .database()
      .ref(`users`)
      .on("child_changed", snapshot => {
        let user = snapshot.val();
        let userId = snapshot.key;
        commit("updateUser", {
          userId,
          user
        });
      });
  },
  getMessagesAction({ commit, state }, id) {
    let myId = state.user.userId;
    messagesRef = firebase.database().ref(`chats/${myId}/${id}`);
    messagesRef.on("child_added", snapshot => {
      let message = snapshot.val();
      let messageId = snapshot.key;
      commit("addMessage", {
        message,
        messageId
      });
    });
  },
  sendMessageAction({ state }, payload) {
    let myId = state.user.userId;
    firebase
      .database()
      .ref(`chats/${myId}/${payload.otherUserId}`)
      .push(payload.message);
    payload.message.from = "them";
    firebase
      .database()
      .ref(`chats/${payload.otherUserId}/${myId}`)
      .push(payload.message);
  },
  leaveChatAction({ commit }) {
    messagesRef && (messagesRef.off("child_added"), commit("clearMessages"));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
