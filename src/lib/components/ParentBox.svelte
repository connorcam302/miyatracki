<div id="content" class="flex flex-wrap justify-center h-full w-full">
	<div class="rounded-[48px] bg-stone-700 py-5 px-5 m-2 bg-opacity-[.30] w-max">
		<div class="opacity-90 text-stone-200 flex flex-wrap justify-center">
			<slot />
		</div>
	</div>
</div>

<style>
	#content {
		transition: height 0.3s ease;
		height: auto;
	}
</style>
