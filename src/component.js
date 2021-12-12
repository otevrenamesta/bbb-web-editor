export default {
  props: ['data', 'formConfig', 'apiUrl', 'pagefile'],
  methods: {
    onSubmit: async function (item) {
      if (!item) return
      const data = _.omit(this.$props.data, ['id', 'component'])
      Object.assign(data, item)
      await this.$store.dispatch('send', {
        method: 'put',
        url: this.apiUrl,
        data: item,
        params: {
          id: this.$props.data.id,
          file: this.$props.pagefile
        }
      })
    }
  },
  template: `
  <div :key="data.id">
    <h2>{{ data.component }} (<small>{{ data.id }}</small>)</h2>
    <ACDynamicForm :config="data.formConfig" :onSubmit="onSubmit" :item="data" />
  </div>
  `
}
