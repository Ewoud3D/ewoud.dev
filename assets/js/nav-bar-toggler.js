// Fixes the toggler animation Firefox

var icons = document.getElementsByClassName("toggler-icon");

window.onload = (event) =>
{
	for (const icon of icons) {
		icon.classList.add("toggler-animation");
	}
};