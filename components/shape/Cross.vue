<script lang="ts" setup>
const { stroke = BLUE_COLOR, strokeWidth = SHAPE_STROKE } = defineProps<{
	stroke?: string;
	strokeWidth?: number;
}>();
</script>

<template>
	<g
		:transform="`translate(${SHAPE_SIZE / 2 - SHAPE_SIZE}, ${-SHAPE_SIZE / 2})`"
	>
		<line
			:x1="-(SHAPE_SIZE / 2) * SHAPE_FACTOR"
			:y1="-(SHAPE_SIZE / 2) * SHAPE_FACTOR"
			:x2="(SHAPE_SIZE / 2) * SHAPE_FACTOR"
			:y2="(SHAPE_SIZE / 2) * SHAPE_FACTOR"
			:stroke="stroke"
			:stroke-width="strokeWidth"
			stroke-linecap="round"
			pathLength="1"
			style="
				stroke-dasharray: 1;
				stroke-dashoffset: 1;
				animation: drawLine1 0.25s ease forwards;
			"
		/>
		<line
			:x1="(SHAPE_SIZE / 2) * SHAPE_FACTOR"
			:y1="-(SHAPE_SIZE / 2) * SHAPE_FACTOR"
			:x2="-(SHAPE_SIZE / 2) * SHAPE_FACTOR"
			:y2="(SHAPE_SIZE / 2) * SHAPE_FACTOR"
			:stroke="stroke"
			:stroke-width="strokeWidth"
			stroke-linecap="round"
			pathLength="1"
			style="
				stroke-dasharray: 1;
				stroke-dashoffset: 1;
				animation: drawLine2 0.25s ease forwards 0.25s;
			"
		/>
	</g>
</template>

<style>
@keyframes drawLine1 {
	to {
		stroke-dashoffset: 0;
	}
}
@keyframes drawLine2 {
	to {
		stroke-dashoffset: 0;
	}
}
</style>
