window.addEventListener("load", addAnimations, true);
function addAnimations()
{
    const cardIcons = document.getElementsByClassName("card-icon");
    for (let i = 0; i < cardIcons.length; i++)
        cardIcons[i].classList.add("card-icon-animation");
}