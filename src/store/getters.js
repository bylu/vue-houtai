const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.app.token,
  object: state => state.app.object,
  uniquerouter: state => state.app.uniquerouter,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
}
export default getters
