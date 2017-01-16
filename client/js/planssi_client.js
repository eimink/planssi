var activeElement;

function fadeIn(target) {
	var element = document.getElementById(target);
	activeElement = element;
	element.style.animation = "fadeIn 1.0s";
	element.style.webkitAnimation = "fadeIn 1.0s";
	element.style.display = "block"; 	
	element.style.animationFillMode = "forwards";
};

function fadeOut(target) {
	var element = document.getElementById(target);
	activeElement = element;
	element.style.animation = "fadeOut 1.0s";
	element.style.webkitAnimation ="fadeOut 1.0s";
	element.style.animationFillMode = "forwards";
};

function setTitleBarContent(r1,r2) {
	title_bar_low_row1.innerHTML=r1;
	title_bar_low_row2.innerHTML=r2;
}

function setPlanssiContent(r1,r2,r3,r4,r5,r6) {
	row1.innerHTML=r1;
	row2.innerHTML=r2;
	row3.innerHTML=r3;
	row4.innerHTML=r4;
	row5.innerHTML=r5;
	row6.innerHTML=r6;
}
