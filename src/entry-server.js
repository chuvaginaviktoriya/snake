
import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    const { url } = context
    router.push(url)

    router.onReady(() => {
      context.state = store.state
      resolve(app)
    }, reject)
  })
}
