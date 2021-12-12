import WebEditor from './src/index.js'
import { ROUTE_NAMES } from './consts.js'

export function createMenu (user) {
  const children = this.websites && this.websites.length > 0 
    && this.websites.filter(i => {
      return user.groups.indexOf(i.webmastergroup) >= 0
    }).map(i => {
      return { label: i.domain, to: { 
        name: ROUTE_NAMES.editor, 
        params: { website: i.domain } 
      } }
    })
  return children.length > 0 ? { label: 'webové stránky', children } : null
}

export async function setupRoutes (routes, path, cfg, initConfig) {

  routes.push({ 
    path: `${path}:website`, 
    name: ROUTE_NAMES.editor, 
    component: WebEditor, 
    props: route => {
      return { query: route.query, website: route.params.website, cfg }
    }
  })

}