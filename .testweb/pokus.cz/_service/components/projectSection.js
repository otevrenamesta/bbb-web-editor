export default {
  props: ['data'],
  template: `
  <div class="container">
    <div class="columns is-desktop project" 
        :class="data.switched ? 'is-flex-direction-row-reverse' : ''">

      <div class="column">
        <h1>{{ data.title }}</h1>
        <h2>{{ data.subtitle }}</h2>
        <markdown :text="data.content" />
      </div>

      <div class="column">
        <img class="column is-quarter" :src="data.image" />
      </div>

    </div>
  </div>
  `
}