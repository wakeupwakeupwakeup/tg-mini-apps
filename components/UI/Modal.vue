<script lang="ts" setup>
const show = defineModel<boolean>("show");
const trigger = useTemplateRef("trigger");
const modal = useTemplateRef("modal");

const { top } = useScreenSafeArea();

function handleOpen() {
	show.value = !show.value;
}
function handleClose() {
	show.value = false;
}
onClickOutside(
	modal,
	() => {
		handleClose();
	},
	{
		ignore: [trigger],
	},
);
onKeyStroke("Escape", () => {
	handleClose();
});
</script>

<template>
	<div>
		<div ref="trigger">
			<slot name="trigger" :open="handleOpen" />
		</div>
		<Teleport to="#teleports">
			<Transition name="modal">
				<div
					v-if="show"
					class="z-10 fixed inset-0 flex justify-center items-center backdrop-blur-sm"
					:style="{ marginTop: `calc(${top} + 64px)` }"
				>
					<div ref="modal" class="relative modal">
						<main v-if="$slots.default">
							<slot :close="handleClose" />
						</main>
					</div>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<style>
.modal-enter-active,
.modal-leave-active {
	transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
	opacity: 0;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
	transition: transform 0.3s ease;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
	transform: translateY(-20px);
}
</style>
