import { upload } from '../utils.js'

export default {
  props: ['data', 'formConfig', 'cfg', 'pagefile'],
  methods: {
    onSubmit: async function (item) {
      if (!item) return
      const data = _.omit(this.$props.data, ['id', 'component'])
      const website = this.$router.currentRoute.params.website
      const url = `${this.cfg.apiUrl}/${website}/changedpage`
      Object.assign(data, item)
      const res = await this.$store.dispatch('send', {
        method: 'put',
        url,
        data: item,
        params: { id: this.$props.data.id, file: this.pagefile }
      })
      const fname = res.data.path + this.pagefile
      await upload(fname, res.data.content, res.data.token, this)
      this.$store.dispatch('toast', { message: `uloženo` })
    }
  },
  template: `
  <div :key="data.id">
    <h2>{{ data.component }} (<small>{{ data.id }}</small>)</h2>
    <ACDynamicForm :config="data.formConfig" :onSubmit="onSubmit" :item="data" />
  </div>
  `
}
