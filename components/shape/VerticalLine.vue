<script lang="ts" setup>
const {
	size = SHAPE_SIZE,
	stroke = SHAPE_LINE_COLOR,
	isActive = false,
	strokeWidth = SHAPE_STROKE,
	onClick = () => {},
} = defineProps<{
	size?: number;
	stroke?: string;
	strokeWidth?: number;
	onClick?: () => void;
	isActive?: boolean;
}>();
</script>

<template>
	<g
		:transform="`translate(${SHAPE_SIZE / 2 - SHAPE_SIZE}, ${-SHAPE_SIZE / 2})`"
	>
		<line
			x1="0"
			y1="0"
			x2="0"
			:y2="size"
			stroke="transparent"
			stroke-width="10"
			style="cursor: pointer"
			@click="onClick"
		/>
		<line
			x1="0"
			y1="0"
			x2="0"
			:y2="size"
			:stroke="stroke"
			:stroke-width="isActive ? SHAPE_LINE_WIDTH : strokeWidth"
			stroke-linecap="round"
			style="transition: all 0.2s ease"
		/>
	</g>
</template>
