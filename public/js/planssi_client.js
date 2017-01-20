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

function setContent(target, params) {
	console.dir(params);
	var element = document.getElementById(target);
	for (var i = 0; i < params.length; i++) {
		console.log(params[i].name);
		var elems = document.getElementsByName(params[i].name);
		for (var j = 0; j < elems.length; j++) {
			console.log(params[i].value);
			elems[j].innerHTML = params[i].value;
		}
	}
};

function setTitleBarContent(r1,r2) {
	title_bar_low_row1.innerHTML=r1;
	title_bar_low_row2.innerHTML=r2;
};

function setPlanssiContent(r1,r2,r3,r4,r5,r6) {
	row1.innerHTML=r1;
	row2.innerHTML=r2;
	row3.innerHTML=r3;
	row4.innerHTML=r4;
	row5.innerHTML=r5;
	row6.innerHTML=r6;
};
