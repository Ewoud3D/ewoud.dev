// Fixes the toggler animation Firefox

var icons = document.getElementsByClassName("toggler-icon");

window.addEventListener("load", () =>
{
	for (const icon of icons) {
		icon.classList.add("toggler-animation");
	}
}); 