<template>
  <div class="top-0 z-50 block sticky-section-header" :class="this.id">
    <div
        class="w-full p-3 -mx-3 -mt-3 duration-150 rounded-lg sm:inline-block"
        :class="{
          'stuck shadow-xl bg-white dark:bg-midnight bg-opacity-75 dark:bg-opacity-75': stuck
        }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import StickyEvents from '@/lib/stickyEvents'

export default {

  props: {
    id: {
      type: String,
      requied: true
    }
  },

  data () {
    return {
      stuck: false
    }
  },

  mounted () {
    const top = this.$el.getBoundingClientRect().y

    const stickyEvents = new StickyEvents({
      stickySelector: `.${this.id}.sticky-section-header`
    })

    stickyEvents.stickyElements.forEach(sticky => {
      sticky.addEventListener(StickyEvents.CHANGE, e => {
        /**
         * We need to check if scrollY is greater than element top + some offset
         * in order to prevent bug with stickyEvents that causes isSticky to be
         * true on page load
         */
        this.stuck = e.detail && e.detail.isSticky && window.scrollY >= top - 25
      })
    })
  }
}
</script>

<style scoped>
  .sticky-section-header {
    transition-property: all;
    top: theme('spacing.6');
  }
  .stuck {
    backdrop-filter: blur(5px);
  }
</style>
