<template>
  <section class="max-w-full mb-12">
    <h1 class="flex items-center mb-2 text-3xl text-gray-800 dark:text-gray-500">
      <span>{{ title }}</span>
      <a v-if="title === 'Colors'"
        href="https://uicolors.app/create"
        class="ml-2 text-2xl text-gray-500 underline dark:text-gray-400"
        target="_blank"
      >
        Tailwind CSS Color Generator
      </a>
    </h1>
    <div class="p-6 bg-white border border-gray-300 rounded dark:bg-gray-900 dark:border-gray-900">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
