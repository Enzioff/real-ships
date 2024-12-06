// import Vue from 'vue';
// import { store } from '../../store';
//
// export default {
//   namespaced: true,
//   state: {
//     // id
//     // name
//     // surname
//     // middlename
//     // company
//     // dateBirth
//     // phone
//     // email
//     // gender
//     profile: {},
//     isAuth: false,
//   },
//   getters: {
//     profile(state) {
//       return state.profile;
//     },
//     isAuth(state) {
//       return state.isAuth;
//     },
//   },
//   mutations: {
//     setProfile(state, data) {
//       state.profile = data;
//     },
//     logIn(state) {
//       state.isAuth = true;
//     },
//     logOut(state) {
//       state.profile = {};
//       state.isAuth = false;
//     },
//   },
//   actions: {
//     // data имеет поле data - отправляемые данные, url - url запроса
//     loadProfile({ commit }, data) {
//       let url = (process.env.NODE_ENV !== 'production') ? 'profile/logIn.json' : data.url;
//       let method = (process.env.NODE_ENV !== 'production') ? 'get' : 'post';
//       return new Promise((resolve, reject) => {
//         Vue.http[method](url, data.data)
//           .then(response => response.json())
//           .then(data => {
//             if (data.success) {
//               commit('setProfile', data.profile);
//               commit('logIn');
//
//               store.dispatch('favorite/toggleAllFavorite', 'addFavorite').then();
//               resolve()
//
//             } else {
//               reject();
//             }
//           })
//           .catch(() => {
//             reject();
//           });
//       })
//     },
//     logOut({ commit }) {
//       const url = (process.env.NODE_ENV !== 'production') ? 'profile/logOut.json' : 'logOut';
//       return new Promise((resolve, reject) => {
//         Vue.http.get(url)
//           .then(response => response.json())
//           .then(data => {
//             if (data.success) {
//               commit('logOut');
//
//               store.dispatch('favorite/clearFavorite').then();
//               resolve();
//             } else {
//               reject(data.error);
//             }
//           })
//           .catch((data) => {
//             reject(data.error);
//           });
//       })
//     },
//   }
// };
