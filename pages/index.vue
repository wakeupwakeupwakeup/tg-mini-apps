<script lang="ts" setup></script>

<template>
	<div class="flex flex-col gap-6">
		<h1 class="text-xl text-center">Playing with a friend</h1>
		<UICard class="flex flex-col gap-2">
			<div class="flex flex-col text-center">
				<h2 class="font-bold">Endless Tic Tac Toe</h2>
				<p class="text-xs">Victory condition</p>
			</div>
			<div class="gap-6 grid grid-cols-2">
				<UIButton
					label="Start X5"
					variant="violet"
					@click="navigateTo('/games/xo')"
				/>
				<UIButton
					label="Start X6"
					variant="orange"
					@click="navigateTo('/games/xo')"
				/>
			</div>
		</UICard>
		<UICard class="flex flex-col gap-4">
			<div class="flex flex-col text-center">
				<h2 class="font-bold">Dot</h2>
				<p class="text-xs">Enter the field size</p>
			</div>
			<UISlider />
			<UIButton
				label="Start"
				variant="pink"
				@click="navigateTo('/games/dot')"
			/>
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
			<UIButton
				label="Start"
				variant="green"
				@click="navigateTo('/games/blot')"
			/>
		</UICard>
	</div>
</template>
