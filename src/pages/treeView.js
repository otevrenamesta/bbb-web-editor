import PageActions from './editDropDown.js'

const pageList = {
  props: ['item', 'events', 'sett'],
  computed: {
    renderChildren: function () {
      return this.$props.item.children && !this.$props.item.collapsed
    }
  },
  components: { PageActions },
  template: `
  <div>
    <div class="clearfix">

      <i class="fas" v-if="item.type === 'directory'" 
        @click="events.toggle(item)"
        :class="item.loaded ? 'fa-minus-square' : 'fa-plus-square'"></i>

      <span>{{ item.name }}</span>

      <div v-if="sett.variant === 'component'" class="float-right">
        <b-dropdown v-if="item.formConfig !== null" right dropright>
          <b-dropdown-item variant="primary" @click="events.componentEdit(item)">
            upravit <i class="fas fa-edit"></i>
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <PageActions v-else :events="events" :item="item" />
    </div>

    <div class="ml-4" v-if="item.loaded">
      <MyTreeViewNodeList v-for="i,idx in item.children" :key="idx" 
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
    <MyTreeViewNodeList :item="data" :events="events" :sett="sett" />
  </div>
  `
}