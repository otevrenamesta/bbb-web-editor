import { upload } from '../utils.js'

export default {
  props: ['data', 'formConfig', 'cfg', 'pagefile'],
  methods: {
    onSubmit: async function (item) {
      if (!item) return
      const data = _.omit(this.$props.data, ['id', 'component'])
      const url = `${this.cfg.apiUrl}/changedpage`
      const file = `${this.cfg.webdata_url}/${this.$router.currentRoute.params.website}/pages${this.pagefile}`
      Object.assign(data, item)
      const res = await this.$store.dispatch('send', {
        method: 'put',
        url,
        data: item,
        params: { id: this.$props.data.id, file }
      })
      const fname = '_webdata/' + this.$router.currentRoute.params.website
        + `/pages${this.pagefile}`
      const r = await upload(fname, res.data.content, this)
    }
  },
  template: `
  <div :key="data.id">
    <h2>{{ data.component }} (<small>{{ data.id }}</small>)</h2>
    <ACDynamicForm :config="data.formConfig" :onSubmit="onSubmit" :item="data" />
  </div>
  `
}
