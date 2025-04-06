var filterAll = document.getElementById("filter-all");
var filterOriginal = document.getElementById("filter-original");
var filterContributed = document.getElementById("filter-contributed");

var games = document.getElementsByClassName("game-cover");

const activeClassName = "btn btn-primary";
const defaultClassName = "btn btn-outline-primary";

const allGames = "all";
const originalGames = "original";
const contributedGames = "contributed";

filterAll.onclick = function() 
{
	filterAll.className = activeClassName;
	filterOriginal.className = filterContributed.className = defaultClassName;

	filterGame(allGames);
};

filterOriginal.onclick = function() 
{	
	filterOriginal.className = activeClassName;
	filterContributed.className = filterAll.className = defaultClassName;

	filterGame(originalGames);
};

filterContributed.onclick = function() 
{
	filterContributed.className = activeClassName;
	filterAll.className = filterOriginal.className = defaultClassName;

	filterGame(contributedGames);
};

function filterGame(filter)
{
	for (let i = 0; i < games.length; i++) {
		const game = games[i];

		if (game.dataset.gameType == filter || filter == allGames)
			game.style.display = "block";
		else
			game.style.display = "none";
	}
}