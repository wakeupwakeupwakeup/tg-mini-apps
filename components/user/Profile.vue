<script lang="ts" setup>
const userStore = useUserStore();
const { username, balance, avatar, gamesStats } = storeToRefs(userStore);
</script>

<template>
	<UICard class="flex gap-4">
		<NuxtImg
			:src="avatar ?? '/images/avatar.jpg'"
			width="64"
			height="64"
			class="rounded-md"
		/>
		<div class="flex flex-col flex-1 justify-between">
			<div class="flex justify-between items-center">
				<span class="font-bold text-lg">{{ username ?? "unknown" }}</span>
				<span class="inline-flex items-center gap-1.5"
					><SvgoTgStar class="w-5 h-5" />Stars: {{ balance }}</span
				>
			</div>
			<div class="flex justify-between items-center">
				<span>Total games: {{ gamesStats.totalGames }}</span>
				<span>Wins: {{ gamesStats.totalWins }}</span>
			</div>
		</div>
	</UICard>
</template>
