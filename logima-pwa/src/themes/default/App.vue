<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const DefaultLayout = () => import(/* webpackChunkName: "logima-layout-default" */ './layouts/Default')
const EmptyLayout = () => import(/* webpackChunkName: "logima-layout-empty" */ './layouts/Empty')
const MinimalLayout = () => import(/* webpackChunkName: "logima-layout-minimal" */ './layouts/Minimal')

export default {
  data () {
    return {
      ordersData: []
    }
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    }),
    layout () {
      return `${(this.$route.meta.layout || 'default')}-layout`
    }
  },
  components: {
    DefaultLayout,
    EmptyLayout,
    MinimalLayout
  }
}
</script>
