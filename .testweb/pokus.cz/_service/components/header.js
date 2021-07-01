
export default {
  data: function () {
    return { expanded: false }
  },
  template: `
<nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
  <div class="container">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger" aria-label="menu"
            :class="expanded ? 'is-active' : ''"
            @click="expanded = !expanded">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="expanded ? 'is-active' : ''">
      <div class="navbar-end">

        <router-link v-for="i in $store.state.site.menu" class="navbar-item" :to="i.link">
          {{ i.label }}
        </router-link>

      </div>
    </div>
  </div>
</nav>
`
}
