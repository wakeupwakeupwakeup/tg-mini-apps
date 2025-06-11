<script lang="ts" setup>
const {
	stroke = RED_COLOR,
	strokeWidth = SHAPE_STROKE,
	fill = "none",
} = defineProps<{
	stroke?: string;
	strokeWidth?: number;
	fill?: string;
}>();
</script>

<template>
	<g
		:transform="`translate(${SHAPE_SIZE / 2 - SHAPE_SIZE}, ${-SHAPE_SIZE / 2})`"
	>
		<circle
			cx="0"
			cy="0"
			:r="(SHAPE_SIZE / 2) * SHAPE_FACTOR"
			:stroke="stroke"
			:stroke-width="strokeWidth"
			:fill="fill"
			stroke-linecap="round"
			:stroke-dasharray="2 * Math.PI * ((SHAPE_SIZE / 2) * SHAPE_FACTOR)"
			:stroke-dashoffset="-(2 * Math.PI * ((SHAPE_SIZE / 2) * SHAPE_FACTOR))"
			transform="rotate(-90)"
			style="animation: drawCircle 0.25s ease forwards"
		/>
	</g>
</template>

<style>
@keyframes drawCircle {
	to {
		stroke-dashoffset: 0;
	}
}
</style>
