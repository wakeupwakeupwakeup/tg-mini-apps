<script lang="ts" setup></script>

<template>
	<UIModal>
		<template #trigger="{ open }">
			<SvgoTon class="bg-[#0088CC] rounded-full w-9 h-9" @click="open" />
		</template>
		<template #default>
			<div class="flex flex-col gap-4 font-medium text-sm text-center">
				<h2 class="text-base">Hello, my friends!👋</h2>
				<div class="flex flex-col gap-2">
					<p>
						I am a simple crypto enthusiast who is in love with TON technology
						and everything connected with it. Recently, I created a small game
						using the amazing Cursor tool - this is my first experience in
						development, and I am very proud of the result! 🎮
					</p>
					<p>
						My game is a tribute to the TON ecosystem and an attempt to
						contribute to the development of the community. I put all my soul
						and enthusiasm into it, although I have no professional experience
						in programming.
					</p>
					<p>
						If you like my game and want to support my enthusiasm and further
						development of the project, I will be very grateful for any support
						in TON.
					</p>
					<ul class="list-disc list-inside">
						Every coin will help me:
						<li>Improve the game</li>
						<li>Add new features</li>
						<li>Make it even more interesting for the community</li>
					</ul>
					<p>
						Your support is not just a transfer of coins, it is a contribution
						to the development of the TON ecosystem and support for enthusiasts
						who believe in this project! 🌟
					</p>
				</div>
				<button
					class="flex justify-between items-center bg-gradient-to-r from-[#0088CC] to-[#53AE94] rounded-full text-base"
				>
					<SvgoTon class="w-10 h-10" />
					<span class="font-bold">For support</span>
					<SvgoUsdt class="w-10 h-10" />
				</button>
				<p>Thank you for being part of this amazing community! 🙏</p>
			</div>
		</template>
	</UIModal>
</template>
