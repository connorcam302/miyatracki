<div class="fire">
	<div class="flames">
		<div class="flame" />
		<div class="flame" />
		<div class="flame" />
		<div class="flame" />
	</div>
</div>

<style lang="scss">
	$black: #111217;
	$brownl: #70392f;
	$brownd: #612e25;
	$yellow: #ffdc01;
	$orange: #fdac01;
	$red: #f73b01;
	$animationtime: 2.5s;

	.fire {
		position: relative;
		margin-left: 2px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 40px;
		height: 40px;
		overflow: hidden;
		.flames {
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 60%;
			height: 60%;
			transform: translateX(-50%) rotate(45deg);
			.flame {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 25%;
				height: 25%;
				background-color: $yellow;
				border-radius: 5px;
				&:nth-child(2n + 1) {
					animation: flameodd $animationtime ease-in infinite;
				}
				&:nth-child(2n) {
					animation: flameeven $animationtime ease-in infinite;
				}
				&:nth-child(1) {
					animation-delay: 0s;
				}
				&:nth-child(2) {
					animation-delay: calc($animationtime / 4);
				}
				&:nth-child(3) {
					animation-delay: calc($animationtime / 4) * 2;
				}
				&:nth-child(4) {
					animation-delay: calc($animationtime / 4) * 3;
				}
			}
		}
	}

	@keyframes flameodd {
		0%,
		100% {
			width: 0%;
			height: 0%;
		}
		25% {
			width: 100%;
			height: 100%;
		}
		0% {
			background-color: $yellow;
			z-index: 1000000;
		}
		40% {
			background-color: $orange;
			z-index: 1000000;
		}
		100% {
			background-color: $red;
			z-index: -10;
		}
		0% {
			right: 0;
			bottom: 0;
		}
		25% {
			right: 1%;
			bottom: 2%;
		}
		100% {
			right: 150%;
			bottom: 100%;
		}
	}

	@keyframes flameeven {
		0%,
		100% {
			width: 0%;
			height: 0%;
		}
		25% {
			width: 100%;
			height: 100%;
		}
		0% {
			background-color: $yellow;
			z-index: 1000000;
		}
		40% {
			background-color: $orange;
			z-index: 1000000;
		}
		100% {
			background-color: $red;
			z-index: -10;
		}
		0% {
			right: 0;
			bottom: 0;
		}
		25% {
			right: 2%;
			bottom: 1%;
		}
		100% {
			right: 150%;
			bottom: 100%;
		}
	}
</style>
