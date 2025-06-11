<script lang="ts" setup>
const {
	stroke = WINLINE_COLOR,
	strokeWidth = WINLINE_STROKE,
	x = 0,
	y = 0,
	size = 0,
} = defineProps<{
	stroke?: string;
	strokeWidth?: number;
	x?: number;
	y?: number;
	size?: number;
}>();
</script>

<template>
	<line
		:x1="x"
		:y1="y"
		:x2="size"
		:y2="strokeWidth"
		:stroke="stroke"
		:stroke-width="WINLINE_STROKE"
		stroke-linecap="round"
		style="
			stroke-dasharray: 1000;
			stroke-dashoffset: 1000;
			animation: drawWinLine 3s ease forwards;
			pointer-events: none;
		"
	/>
</template>

<style>
@keyframes drawWinLine {
	from {
		stroke-dashoffset: 1000;
	}
	to {
		stroke-dashoffset: 0;
	}
}
</style>
