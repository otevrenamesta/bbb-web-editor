import PageEditor from './page/editor.js'
import { newPageConfig } from './pages/formconfig.js'
import { loadfolder, createItem, unloadFolder } from './utils.js'
import PageTreeView from './pages/treeView.js'

export default {
  data: () => {
    return {
      curr: null,
      ready: false,
      loading: false,
      tree: createItem('/', 'root', 'directory')
    }
  },
  props: ['cfg', 'query', 'website'],
  async created () {
    if (this.query.id) {
      this.$data.curr = this.query.id
      return
    }
    loadfolder(this, '/', this.tree)
    this.$data.ready = true
  },
  computed: {
    addFormConfig: function () {
      const parentOptions = _.map(_.sortBy(this.$data.pages, 'path'), i => {
        return { text: i.path, value: i.data }
      })
      return newPageConfig(parentOptions)
    }
  },
  methods: {
    addPage: function () {
      this.$bvModal.show('modal-add')
    },
    deletePage: function (node) {
    },
    onAddedPage: async function (page) {
      if (page) {
        const req = {
          method: 'POST',
          url: this.$props.cfg.apiUrl,
          data: page
        }
        try {
          const res = await this.$store.dispatch('send', req)
          this.$store.dispatch('toast', { message: 'uloženo' })
          const newPage = { data: `${page.path}.yaml`, path: `/${page.path}` }
          this.$router.push({ path: this.$router.currentRoute.path, query: { id: newPage.data } })
        } catch (err) {
          const message = err.response.data
          this.$store.dispatch('toast', { message, type: 'error' })
        }
      }
      this.$bvModal.hide('modal-add')
    },
    editPage: async function (node) {
      this.$router.push({ 
        path: this.$router.currentRoute.path, query: { 
          id: (node.path + '/' + node.name).replace(/\/\//, '/')
        } 
      })
    },
    toggle: function (f) {
      f.loaded ? unloadFolder(this, f) : loadfolder(this, f.path + '/' + f.name, f)
    }
  },
  components: { PageTreeView, PageEditor },
  template: `
<PageEditor v-if="curr" :data="curr" :cfg="cfg" />
<div v-else>
  <PageTreeView class="m-2"
    :data="tree" :sett="{}"
    :events="{toggle, editPage, deletePage, addPage}"
  />
  <b-modal v-if="ready" size="xl" id="modal-add" title="Upravit" hide-footer>
    <DynamicForm :config="addFormConfig" :onSubmit="onAddedPage" />
  </b-modal>
</div>
  `
}
