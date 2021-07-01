export default {
  props: ['data'],
  template: `
<div class="myhero">

  <img class="logo" src="http://data.vxk.cz/webom/logo-om.svg" />
  
  <div class="myhero-bluebox">
    <div class="myhero-content">
      <h1>{{ data.title }}</h1>
      <markdown :text="data.content" />
    </div>
  </div>

  <div class="socials">
    <a :href="$store.state.site.github" target="_blank"><i class="fab fa-github"></i></a>
    <a :href="$store.state.site.facebook" target="_blank"><i class="fab fa-facebook"></i></a>
    <a :href="$store.state.site.gitlab" target="_blank"><i class="fab fa-gitlab"></i></a>
  </div>

</div>
  `
}