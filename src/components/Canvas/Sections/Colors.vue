<template>
  <div>
    <StickySectionHeader id="section-colors">
      <ButtonGroup>
        <Button
          class="w-full sm:w-32"
          :selected="selectedProp === 'backgroundColor'"
          @click="selectedProp = 'backgroundColor'"
        >
          Background
        </Button>
        <Button
          class="w-full sm:w-32"
          :selected="selectedProp === 'textColor'"
          @click="selectedProp = 'textColor'"
        >
          Text
        </Button>
        <Button
          class="w-full sm:w-32"
          :selected="selectedProp === 'borderColor'"
          @click="selectedProp = 'borderColor'"
        >
          Border
        </Button>
      </ButtonGroup>
    </StickySectionHeader>
    <div>
      <div
        v-for="(value, prop) in selectedColorGroupItems"
        :key="prop"
      >
        <div class="mt-6 text-2xl font-bold capitalize">{{prop}}</div>

        <div class="flex flex-wrap">
          <div
            v-for="(value, prop) in value"
            :key="prop"
            class="w-full mb-2 mr-2 md:w-24"
          >
            <div
              class="flex items-center justify-center flex-none w-full h-16 mb-2 md:h-24"
              :class="{'border border-gray-300': selectedProp !== 'borderColor'}"
              :style="tileStyle(value)"
            >
              <span
                class="text-3xl"
                :style="{
                  color: value
                }"
                v-if="selectedProp === 'textColor'">Aa</span>
            </div>
            <CanvasBlockLabel
              :label="`${selectedPropClassPrefix}-${prop}`"
              :value="value"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CanvasBlockLabel from '../CanvasBlockLabel'
import ButtonGroup from '../../ButtonGroup'
import Button from '../../Button'
import StickySectionHeader from '../../StickySectionHeader'

export default {
  components: {
    CanvasBlockLabel,
    ButtonGroup,
    Button,
    StickySectionHeader
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      selectedProp: 'backgroundColor'
    }
  },

  computed: {
    selectedColorGroupItems () {
      const colors = this.data[this.selectedProp]
      const order = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orage', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'purple', 'fuchsia', 'pink', 'rose', 'others']

      const groupedColors = Object.keys(colors).reduce((acc, key) => {
        // 접두사와 숫자를 분리합니다.
        const match = key.match(/([a-z]+)-?(\d+)?/)
        if (match) {
          const [, prefix, shade] = match
          // 접두사가 있는 경우 그룹화합니다.
          if (shade) {
            acc[prefix] = acc[prefix] || {}
            acc[prefix][key] = colors[key]
          } else {
            // 'others' 그룹을 임시로 다른 곳에 저장합니다.
            acc.tempOthers = acc.tempOthers || {}
            acc.tempOthers[key] = colors[key]
          }
        }
        return acc
      }, {})

      // 'others' 그룹을 최종 객체에 추가합니다.
      groupedColors['others'] = groupedColors.tempOthers
      // 임시 'tempOthers' 프로퍼티를 삭제합니다.
      delete groupedColors.tempOthers

      return this.convertObjectToOrderedMap(groupedColors, order)
    },

    selectedColorItems () {
      return this.data[this.selectedProp]
    },

    selectedPropClassPrefix () {
      const map = {
        backgroundColor: 'bg',
        textColor: 'text',
        borderColor: 'border'
      }

      return map[this.selectedProp]
    }
  },

  methods: {
    convertObjectToOrderedMap (obj, order) {
      const map = new Map()

      order.forEach(key => {
        if (key in obj) {
          map.set(key, obj[key])
        }
      })

      return Object.fromEntries(map)
    },

    tileStyle (value) {
      if (this.selectedProp === 'backgroundColor') {
        return {
          backgroundColor: value
        }
      }

      if (this.selectedProp === 'borderColor') {
        return {
          border: `2px solid ${value}`
        }
      }
    }
  }
}
</script>
