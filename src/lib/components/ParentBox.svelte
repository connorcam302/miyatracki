<div id="content" class="flex flex-wrap justify-center h-full w-full">
	<div id="box" class="rounded-[48px] bg-stone-700 py-5 px-5 m-2 bg-opacity-[.30] w-max">
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

	#box {
		box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.05), 0px 1px 1px 0px rgba(0, 0, 0, 0.05),
			0px 2px 2px 0px rgba(0, 0, 0, 0.05), 0px 4px 4px 0px rgba(0, 0, 0, 0.05),
			0px 8px 8px 0px rgba(0, 0, 0, 0.05), 0px 16px 16px 0px rgba(0, 0, 0, 0.05);
	}
</style>
