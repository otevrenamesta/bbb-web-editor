export default {
  props: ['item', 'events'],
  computed: {
    showDelete: function () {
      return false //this.$props.item.type === 'file'
    },
    showEdit: function () {
      return this.$props.item.type === 'file'
    }
  },
  template: `
<b-dropdown right dropright text="akce" size="sm">
  <b-dropdown-item v-if="showEdit" variant="primary" @click="events.editPage(item)">
    upravit <i class="fas fa-edit"></i>
  </b-dropdown-item>
  <b-dropdown-item variant="warning" @click="events.renamePage(item)">
    přejmenovat <i class="fas fa-edit"></i>
  </b-dropdown-item>
  <b-dropdown-divider></b-dropdown-divider>
  <b-dropdown-item variant="success" @click="events.addPage(item)">
    přidat podstránku <i class="far fa-file"></i>
  </b-dropdown-item>
  <b-dropdown-divider></b-dropdown-divider>
  <b-dropdown-item v-if="showDelete" variant="danger" @click="events.deletePage(item)">
    smazat <i class="fas fa-trash-alt"></i>
  </b-dropdown-item>
</b-dropdown>
  `
}