const pageList = {
  props: ['item', 'events', 'sett'],
  computed: {
    renderChildren: function () {
      return this.$props.item.children && !this.$props.item.collapsed
    },
    label: function () {
      return this.$props.item[this.$props.sett.labelProp || 'name']
    }
  },
  template: `
  <div>
    <div class="clearfix">

      <i class="fas" v-if="item.children" @click="events.toggle(item)"
        :class="item.collapsed ? 'fa-plus-square' : 'fa-minus-square'"></i>

      <a v-if="item.children" @click.prevent="events.toggle(item)">
        {{ label }}
      </a>
      <span v-else>{{ label }}</span>

      <div class="float-right">
        <b-dropdown v-if="item.formConfig !== null" right dropright>
          <b-dropdown-item variant="primary" @click="events.componentEdit(item)">
            upravit <i class="fas fa-edit"></i>
          </b-dropdown-item>
        </b-dropdown>
      </div>

    </div>

    <div class="ml-4" v-if="renderChildren">
      <MyTreeViewNodeList v-for="i, idx in item.children" :key="idx" 
        :item="i" :events="events" :sett="sett" />
    </div>
  </div>
  `
}

export default {
  created: function () {
    Vue.component('MyTreeViewNodeList', pageList)
  },
  props: ['data', 'events', 'sett'],
  template: `
  <div class="accordion" role="tablist">
    <MyTreeViewNodeList v-for="i, idx in data" :key="idx"
      :item="i" :events="events" :sett="sett" 
    />
  </div>
  `
}