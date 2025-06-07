<script lang="ts" setup></script>

<template>
  <header class="flex justify-center items-center p-4">
    <span class="relative text-2xl">
      <span class="text-violet-700">Tic</span>
      <span class="text-green-500">Tac</span>
      <span class="text-red-700">Toe</span>
      <span class="right-0 -bottom-2 absolute text-yellow-500 text-xs"
        >beta-version</span
      >
    </span>
  </header>
  <main>
    <slot />
  </main>
</template>
