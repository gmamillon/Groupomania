import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router';

export default createStore({
  state: {
    loggedIn: false,
    token: "",
    user: {},
    postsFrom: [],
    feedPosts: [],
    users: [],
    searchedProfiles: [],
    profileUser: {},
  },
  mutations: {
    LOGIN(state, body) {
      axios.post('http://localhost:3000/api/auth/login', body)
      .then(res => {
        state.user = res.data.user;
        state.token = res.data.token;
        sessionStorage.setItem('userId', res.data.user.id);
        sessionStorage.setItem('token', res.data.token);
        router.push({ name: 'Feed' });
      })
      .catch(err => alert("Identifiants invalides"))
    },

    SIGNUP(state, body) {
      axios.post('http://localhost:3000/api/auth/signup', body)
      .then(res => {
        state.user = res.data.user;
        state.token = res.data.token;
        sessionStorage.setItem('userId', res.data.user.id);
        sessionStorage.setItem('token', res.data.token)
        router.push({ name: 'Feed' });
      })
      .catch(err => alert("Vous devez utiliser une adresse e-mail valide et non utilisée"))
    },

    CHECK_USER(state, user) {
      const auth = { headers: { Authorization: `Bearer "${user.token}"` }};
      axios.get('http://localhost:3000/api/auth/' + user.id, auth)
      .then(res => {
        state.token = user.token;
        state.user = res.data.user;
        router.push({ name: 'Feed' });
      })
      .catch(router.push({ name: 'Logger' }))
    },

    DELETE_USER(state, id) {
      const auth = { headers: { Authorization: `Bearer "${state.token}"` }};
      axios.delete('http://localhost:3000/api/auth/' + id, auth)
      .then(res => {
        sessionStorage.clear();
        router.push({ name: "Logger" });
      })
      .catch(console.log)
    },

    GET_FEED_POSTS(state) {
      const auth = { headers: { Authorization: `Bearer "${state.token}"` }};
      axios.get('http://localhost:3000/api/post/', auth)
      .then(res => {
        state.feedPosts = res.data.latestPost;
      }).catch(console.log);
    },
    
    DELETE_REPLY(state, id) {
      const auth = { headers: { Authorization: `Bearer "${state.token}"` }};
      axios.delete('http://localhost:3000/api/post/reply/' + id, auth)
      .then()
      .catch(console.log)
    },

    GET_POSTS_FROM(state, id) {
      const auth = { headers: { Authorization: `Bearer "${state.token}"` }};
      axios.get('http://localhost:3000/api/post/' + id, auth)
      .then(res => {
        state.postsFrom = res.data.postFrom;
      })
      .catch(console.log)
    },

    SEARCH_PROFILES(state, userName) {
      const auth = { headers: { Authorization: `Bearer "${state.token}"` }};
      axios.post('http://localhost:3000/api/auth/many', userName, auth)
      .then(res => {
        state.searchedProfiles = res.data.users;
      })
      .catch(console.log)
    },

    ADD_POST(state, data) {
      const auth = { headers: { 
          Authorization: `Bearer "${state.token}"`,
          'content-type': 'multipart/form-data;boundary="WebKitFormBoundary"'
        },
      };
      axios.post('http://localhost:3000/api/post/new', data, auth)
      .then(res => {
        const newFeedPost = res.data.post;
        newFeedPost.media = res.data.medialist;
        newFeedPost.user = state.user;
        newFeedPost.replies = [];
        state.feedPosts.unshift(newFeedPost);
      })
      .catch(console.log);
    },
    
    MODIFY(state, data) {
      const auth = { headers: { 
          Authorization: `Bearer "${state.token}"`,
          'content-type': 'multipart/form-data;boundary="WebKitFormBoundary"'
        },
      };
      axios.put('http://localhost:3000/api/auth/', data, auth)
      .then(res => {
        state.user = res.data.userAfter;
        router.push({ path: "/profile/" + state.user.id })
      })
      .catch(console.log)
    },

  },

  getters: {
    user(state) {
      return state.user;
    },
    myProfile(state) {
      if (state.user !== undefined) {
        return "/profile/" + state.user.id;
      }
    },
    posts(state) {
      return state.feedPosts;
    },
    searchedProfiles(state) {
      return state.searchedProfiles
    }
  },
  actions: {

    findUser(context, id) {
      const auth = { headers: { Authorization: `Bearer "${context.state.token}"` }};
      axios.get('http://localhost:3000/api/auth/' + id, auth)
      .then(res => {
        context.state.profileUser = res.data.user;
        context.commit('GET_POSTS_FROM', id);
      })
      .catch(console.log)
    },

    deleteFeedPost(context, id) {
      const auth = { headers: { Authorization: `Bearer "${context.state.token}"` }};
      axios.delete('http://localhost:3000/api/post/' + id, auth)
      .then(res => {
        context.commit('GET_FEED_POSTS');
      })
    },

    deleteProfilePost(context, id) {
      const auth = { headers: { Authorization: `Bearer "${context.state.token}"` }};
      axios.delete('http://localhost:3000/api/post/' + id, auth)
      .then(res => {
        context.commit('GET_POSTS_FROM');
      })
    },

    sendReply(context, data) {
      const auth = { headers: { Authorization: `Bearer "${context.state.token}"` }};
      return axios.post('http://localhost:3000/api/post/reply', data, auth)
    },
  },
  modules: {
  }
})
