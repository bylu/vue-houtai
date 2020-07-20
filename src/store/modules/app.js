import Cookies from 'js-cookie'
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    uniquerouter: true,
    token: '',//玩家token
    object:""
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
   
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    setToken: (state, token) => {
      state.token = token
      sessionStorage.setItem('token', token);
    },
    clearToken: (state) => {
      localStorage.clear(),
      sessionStorage.clear()
    },
    setObject: (state, object) => {
      state.object = object
    },
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setToken({ commit }, token) {
      return new Promise(resolve => {//构造函数
          commit('setToken', token)
          resolve()//执行函数
      })
    },
    setObject({ commit }, object) {
      return new Promise(resolve => {//构造函数
          commit('setObject', object)
          resolve()//执行函数
      });
    },
  }

}

export default app
