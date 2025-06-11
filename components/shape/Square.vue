<script lang="ts" setup>
const {
	size = SHAPE_SIZE,
	stroke = SHAPE_LINE_COLOR,
	strokeWidth = SHAPE_LINE_THIN,
	fill = FIELD_COLOR,
	x = -SHAPE_SIZE / 2,
	y = -SHAPE_SIZE / 2,
	onClick = () => {},
} = defineProps<{
	size?: number;
	stroke?: string;
	strokeWidth?: number;
	fill?: string;
	x?: number;
	y?: number;
	onClick?: () => void;
}>();
</script>

<template>
	<rect
		:x="x"
		:y="y"
		:width="size"
		:height="size"
		:stroke="stroke"
		:stroke-width="strokeWidth"
		:fill="fill"
		stroke-linejoin="round"
		style="cursor: pointer"
		@click="onClick"
	/>
</template>
