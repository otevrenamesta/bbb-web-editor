/* global axios, API, _ */
import ComponentEditor from './component.js'
import MyTreeView from './treeView.js'
import FormconfigManager from './formconfigs.js'

export default {
  data: () => {
    return {
      data: null,
      formConfig: null,
      ready: false,
      edited: null
    }
  },
  props: ['cfg'],
  async created () {
    const siteWebdata = `${this.cfg.webdata_url}/${this.$router.currentRoute.params.website}`
    const getFormconfig = FormconfigManager(siteWebdata)
    const ver = new Date().toISOString()
    const pageUrl = `${siteWebdata}/pages/${this.$router.currentRoute.query.id}?ver=${ver}`
    const dataReq = await axios.get(pageUrl)
    const data = jsyaml.load(dataReq.data)
    const formConfiPromises = []
    function iterateChildren (path, children) {
      return _.map(children, (i, idx) => {
        if (i.component === 'composition') {
          i.children = iterateChildren(`${path}.${idx}.children`, i.children)
          i.collapsed = false // open by default
        } else {
          const p = getFormconfig(i.component).then(formconfig => {
            i.formConfig = formconfig
          })
          formConfiPromises.push(p)
        }
        i.id = `${path}.${idx}`
        return i
      })
    }
    const treeData = iterateChildren('children', data.children)
    await Promise.all(formConfiPromises)
    this.$data.data = treeData
    this.$data.ready = true
  },
  methods: {
    componentEdit: function (node) {
      this.$data.edited = node
    },
    toggle: function (node) {
      node.collapsed = !node.collapsed
    }
  },
  computed: {
    parentRoute: function () {
      return {
        name: 'webeditor',
        params:{
          website: this.$router.currentRoute.params.website
        }
      }
    },
    link2page: function () {
      const m = this.$router.currentRoute.query.id.match(/^(.*)\/(.+).yaml$/)
      return 'https://' + this.$router.currentRoute.params.website
        + m[1] + '/' + (m[2] === 'index' ? '' : m[2])
        + `?ver=${new Date().toISOString()}`
    }
  },
  components: {
    'b-tree-view': MyTreeView, ComponentEditor
  },
  template: `
  <div class="row">
    <div class="col-12">
      <b-breadcrumb>
        <b-breadcrumb-item :to="parentRoute">
          {{ $router.currentRoute.params.website }}
        </b-breadcrumb-item>
        <b-breadcrumb-item active>{{ $router.currentRoute.query.id }}</b-breadcrumb-item>
      </b-breadcrumb>
    </div>

    <div v-if="ready" class="col-3">
      <h2>{{ data.title }}</h2>
      <p>{{ data.desc }}</p>
      <a :href="link2page" target="_blank">vidět aktuální stav</a>
      <h4>Komponenty</h4>
      <b-tree-view 
        :sett="{labelProp: 'component', variant: 'component'}" 
        :data="data"
        :events="{toggle, componentEdit}" />
    </div>

    <div class="col-9">
      <ComponentEditor v-if="edited" 
        :cfg="cfg"
        :data="edited" 
        :pagefile="$router.currentRoute.query.id" />
    </div>

  </div>
  `
}
