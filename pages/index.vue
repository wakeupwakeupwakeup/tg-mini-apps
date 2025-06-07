<script lang="ts" setup></script>

<template>
  <div class="flex flex-col gap-6 mt-6">
    <UICard class="flex gap-4">
      <NuxtImg
        src="/images/avatar.jpg"
        width="64"
        height="64"
        class="rounded-md"
      />
      <div class="flex flex-col flex-1 justify-between">
        <div class="flex justify-between items-center">
          <span>John Doe</span>
          <span class="inline-flex items-center gap-1.5"
            ><SvgoTgStar />Stars: 150</span
          >
        </div>
        <div class="flex justify-between items-center">
          <span>Total games: 24</span>
          <span>Wins: 12</span>
        </div>
      </div>
    </UICard>
    <h1 class="text-xl text-center">Playing with a friend</h1>
    <UICard class="flex flex-col gap-2">
      <div class="flex flex-col text-center">
        <h2 class="font-bold">Endless Tic Tac Toe</h2>
        <p class="text-xs">Victory condition</p>
      </div>
      <div class="gap-6 grid grid-cols-2">
        <UIButton label="Start X5" class="violet-gradient" />
        <UIButton label="Start X6" class="orange-gradient" />
      </div>
    </UICard>
    <UICard class="flex flex-col gap-4">
      <div class="flex flex-col text-center">
        <h2 class="font-bold">Dot</h2>
        <p class="text-xs">Enter the field size</p>
      </div>
      <UISlider />
      <UIButton label="Start" class="text-[#282C34] pink-gradient" />
    </UICard>
    <UICard class="flex flex-col gap-4">
      <div class="flex flex-col text-center">
        <h2 class="font-bold">Blot</h2>
        <p class="text-xs">Select the field size</p>
      </div>
      <div class="gap-4 grid grid-cols-3">
        <div class="flex flex-col gap-0.5 text-center">
          <UIButton label="Small" />
          <span class="text-xs">~300 cells</span>
        </div>
        <div class="flex flex-col gap-0.5 text-center">
          <UIButton label="Medium" />
          <span class="text-xs">~ 500 cells</span>
        </div>
        <div class="flex flex-col gap-0.5 text-center">
          <UIButton label="Big" />
          <span class="text-xs">~ 900 cells</span>
        </div>
      </div>
      <UIButton label="Start" class="text-[#282C34] green-gradient" />
    </UICard>
  </div>
</template>
