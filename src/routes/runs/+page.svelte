<script>
	import PlusIcon from 'virtual:icons/iconoir/plus-circle-solid';
	import { Modals, closeModal, openModal, modals } from 'svelte-modals';
	import { fade } from 'svelte/transition';
	import Modal from '$lib/components/CreateRunModal.svelte';

	function handleOpen() {
		openModal(Modal, {
			title: `Alert #${$modals.length + 1}`,
			message: 'This is an alert',
			onOpenAnother: () => {
				handleOpen();
			}
		});
	}
</script>

<div class>
    <button on:click={handleOpen}>
		<div class="rounded-[40px] bg-stone-600 p-4 m-2 bg-opacity-[.30] min-w-[70px]">
			<div class="flex gap-2 items-center">
				<PlusIcon />
				Create Run
			</div>
		</div>
	</button>
</div>

<Modals>
	<div slot="backdrop" class="backdrop" transition:fade on:click={closeModal} />
</Modals>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
