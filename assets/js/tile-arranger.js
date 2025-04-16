document.body.innerHTML +=
`<div id="sizer">
	<div class="d-block d-sm-none d-md-none d-lg-none d-xl-none" data-size="2"></div>
	<div class="d-none d-sm-block d-md-none d-lg-none d-xl-none" data-size="2"></div>
	<div class="d-none d-sm-none d-md-block d-lg-none d-xl-none" data-size="3"></div>
	<div class="d-none d-sm-none d-md-none d-lg-block d-xl-none" data-size="4"></div>
	<div class="d-none d-sm-none d-md-none d-lg-none d-xl-block" data-size="5"></div>
</div>`;

var sizer = document.getElementById("sizer");
var tiles = document.getElementsByClassName("tile");

var currentGridWidth;

function onWindowResize()
{
	const gridWidth = getCurrentGridWidth();
	if (currentGridWidth == gridWidth)
		return;

	var traveledWidth = 0;

	for (let i = 0; i < tiles.length; i++)
	{
		const className = tiles[i].className;

		if(className.includes("square"))
		{
			traveledWidth += 1;
		}
		else if (className.includes("rectangle"))
		{
			if ((traveledWidth % gridWidth + 2) > gridWidth)
			{
				tiles[i].parentElement.insertBefore(tiles[i], tiles[i - 1]);
			}
			traveledWidth += 2;
		}
	}

	currentGridWidth = gridWidth;
}

function getCurrentGridWidth()
{
	for (const child of sizer.children)
	{
		if(child.checkVisibility())
			return child.dataset.size;
	}
}

window.onresize = onWindowResize;
onWindowResize();