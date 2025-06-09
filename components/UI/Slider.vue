<script lang="ts" setup>
const { min = 0, max = 100 } = defineProps<{
	min?: number;
	max?: number;
}>();

const value = defineModel<number>({ default: 0 });
const trackStyle = computed(() => {
	const percent = ((value.value - min) / (max - min)) * 100;
	return {
		background: `linear-gradient(to right, #d1ddff ${percent}%, #CEDCFF42 ${percent}%)`,
	};
});
</script>

<template>
	<div class="flex items-center gap-8">
		<input
			v-model="value"
			type="range"
			:min="min"
			:max="max"
			:style="trackStyle"
			class="slider"
		/>
		<span
			class="bg-[#CEDCFF]/20 px-5 py-1.5 rounded-md w-full max-w-20 font-medium text-center"
			>{{ value }}</span
		>
	</div>
</template>

<style>
.slider {
	@apply flex-1 rounded-full outline-none focus:outline-none;
	-webkit-appearance: none;
	appearance: none;
	height: 6px;
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: #d1ddff;
	border: 3px solid #282c34;
	cursor: pointer;
	box-shadow: 0 0 2px #0003;
	transition:
		background 0.3s,
		border 0.3s;
}

.slider::-ms-thumb,
.slider::-moz-range-thumb {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: #d1ddff;
	border: 3px solid #282c34;
	cursor: pointer;
	box-shadow: 0 0 2px #0003;
	transition:
		background 0.3s,
		border 0.3s;
}
</style>
