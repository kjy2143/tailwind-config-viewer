<template>
  <div>
    <StickySectionHeader id="section-spacing">
      <div class="md:flex">
        <ButtonGroup class="mb-2 md:mb-0">
          <Button
            class="w-full sm:w-32"
            :selected="selectedProp === 'p'"
            @click="selectedProp = 'p'"
          >
            Padding
          </Button>
          <Button
            class="w-full sm:w-32"
            :selected="selectedProp === 'm'"
            @click="selectedProp = 'm'">Margin</Button>
          <Button
            class="w-full sm:w-auto"
            :selected="selectedProp === '-m'"
            @click="selectedProp = '-m'">Negative Margin</Button>
        </ButtonGroup>
        <Select
          class="w-full md:w-32 md:ml-2"
          :options="$options.dimensionOptions"
          v-model="dimensionProp"
        />
      </div>
    </StickySectionHeader>
    <div class="mt-6 space-y-6 overflow-x-auto text-gray-800 bg-white dark:bg-gray-700 dark:text-gray-400">
      <table class="min-w-full text-sm text-left whitespace-nowrap">
        <thead class="tracking-wider border-b-2 table-fixed dark:border-gray-600">
          <tr>
            <th scope="col" class="px-6 py-4 w-28">Name</th>
            <th scope="col" class="px-6 py-4 w-28">Size</th>
            <th scope="col" class="px-6 py-4 w-28">Pixels</th>
            <th scope="col" class="px-6 py-4">Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr
        v-for="({value, prop}) in spacing"
        :key="prop"
class="border-b dark:border-gray-600"
      >
<th scope="row" class="px-6 py-4">{{`${selectedProp}${dimensionProp ? dimensionProp : ''}-${prop}`}}</th>
            <td class="px-6 py-4">{{value.rem}}</td>
            <td class="px-6 py-4">{{value.px}}px</td>
            <td class="px-6 py-4">
        <div
          class="h-4 mb-2 bg-gray-500"
          :style="{
            width: value.rem,
          }"
        />
        </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { remToPx } from '@/utils'
import ButtonGroup from '../../ButtonGroup'
import Button from '../../Button'
import Select from '../../Select'
import StickySectionHeader from '../../StickySectionHeader'

export default {
  components: {
    ButtonGroup,
    Button,
    Select,
    StickySectionHeader
  },

  props: {
    data: {
      type: Object,
      required: true
    },
    config: {
      type: Object
    }
  },

  data () {
    return {
      selectedProp: 'p',
      dimensionProp: ''
    }
  },

  dimensionOptions: {
    '': 'All',
    't': 'Top',
    'r': 'Right',
    'b': 'Bottom',
    'l': 'Left',
    'x': 'Horizontal',
    'y': 'Vertical'
  },

  computed: {
    spacing () {
      const spacing = Object.keys(this.data)
        .sort((keyA, keyB) => {
          const aInPx = this.data[keyA].indexOf('rem') !== -1 ? remToPx(this.data[keyA], this.config) : parseFloat(this.data[keyA])
          const bInPx = this.data[keyB].indexOf('rem') !== -1 ? remToPx(this.data[keyB], this.config) : parseFloat(this.data[keyB])
          return aInPx - bInPx
        })
        .map(key => {
          return {
            prop: key,
            value: {
              rem: this.data[key],
              px: this.data[key].indexOf('rem') !== -1 ? remToPx(this.data[key], this.config) : parseFloat(this.data[key])
            }
          }
        })

      return spacing
    }
  }
}
</script>
