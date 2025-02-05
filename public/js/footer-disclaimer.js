UpdateYear();

function UpdateYear()
{
	var disclaimer = document.getElementById("footer-disclaimer");
	disclaimer.innerHTML = disclaimer.innerHTML.replace("2025", new Date().getFullYear());
}