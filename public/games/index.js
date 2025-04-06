var filterAll = document.getElementById("filter-all");
var filterOriginal = document.getElementById("filter-original");
var filterContributed = document.getElementById("filter-contributed");

const activeClassName = "btn btn-primary";
const defaultClassName = "btn btn-outline-primary";

filterAll.onclick = function() 
{
	filterAll.className = activeClassName;
	filterOriginal.className = filterContributed.className = defaultClassName;
};

filterOriginal.onclick = function() 
{	
	filterOriginal.className = activeClassName;
	filterContributed.className = filterAll.className = defaultClassName;
};

filterContributed.onclick = function() 
{
	filterContributed.className = activeClassName;
	filterAll.className = filterOriginal.className = defaultClassName;
};