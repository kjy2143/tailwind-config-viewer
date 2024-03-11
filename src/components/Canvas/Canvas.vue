<template>
  <div class="bg-gray-100 dark:bg-midnight">
    <div
      v-if="!config"
      style="height: calc(100vh - 63px);"
      class="flex items-center justify-center">
        <p class="font-bold text-center text-gray-600">Loading Config...</p>
    </div>
    <template v-if="config">
      <div class="flex px-3 pt-8">
        <div class="sticky top-0 flex-none hidden h-full max-h-screen pt-2 overflow-y-auto md:block">
          <ToggleSwitch
            name="dark-mode"
            class="mb-3 ml-3"
            :value="darkMode"
            @input="$emit('toggle-dark-mode', $event)"
            label="Dark Mode"
          />
          <div class="ml-3 text-sm text-gray-700 dark:text-gray-500">Tailwind v{{ config.tailwindVersion }}</div>
          <nav class="h-full px-3 pt-3 pb-12 pr-20">
            <a
              v-for="section in configTransformed"
              :key="section.title"
              :href="`#${section.title}`"
              class="relative flex items-center py-2 text-base rounded-sm hover:text-gray-900 dark-hover:text-gray-200"
              :class="[activeSection === section ? 'text-gray-900 dark:text-gray-200' : 'text-gray-700 dark:text-gray-500']"
              @click="setActiveSection(section)"
            >
              <div
                class="absolute transition duration-200 bg-gray-500 rounded-full dark:bg-gray-600"
                :class="[activeSection === section ? 'visible opacity-100' : 'invisible opacity-0']"
                :style="{width: '5px', height: '5px', left: '-12px'}"
              />
              {{ section.title }}
            </a>
          </nav>
        </div>
        <div class="md:pl-4">
          <CanvasSection
            v-for="section in configTransformed"
            :key="section.title"
            :title="section.title"
            :id="section.title"
          >
            <Intersect
              :threshold="[0.0]"
              rootMargin="-40% 0px -60% 0px"
              @enter="setActiveSection(section)"
              @leaave="setActiveSection(null)"
            >
              <component
                :is="sectionComponent(section.component)"
                :data="section.data"
                :config="config"
              />
            </Intersect>
          </CanvasSection>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import defu from 'defu'
import Intersect from 'vue-intersect'
import themeComponentMapper from './themeComponentMapper'
import fontTagCreator from './fontTagCreator'
import CanvasSection from './CanvasSection'
import ToggleSwitch from '../ToggleSwitch'
import defaultOptions from '../../defaultOptions'

export default {
  components: {
    CanvasSection,
    ToggleSwitch,
    Intersect
  },

  provide () {
    return {
      prefixClassName: this.prefixClassName,
      getConfig: this.getConfig
    }
  },

  props: {
    darkMode: {
      type: Boolean,
      required: false
    }
  },

  data () {
    return {
      activeSection: null,
      config: null,
      configTransformed: null
    }
  },

  methods: {
    sectionComponent (component) {
      return require(`./Sections/${component}.vue`).default
    },

    prefixClassName (className) {
      return this.config.prefix ? `${this.config.prefix}${className}` : className
    },

    getConfig () {
      return this.config
    },

    setActiveSection (section) {
      this.activeSection = section
    }
  },

  async mounted () {
    const config = await fetch(window.__TCV_CONFIG.configPath)
    this.config = await config.json()
    this.config = defu(this.config, defaultOptions)
    this.configTransformed = themeComponentMapper(this.config.theme)
    fontTagCreator(this.config.theme)
  }
}
</script>
