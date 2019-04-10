/*function bougerVoiture(event) {
	var codeTouche = event.keyCode;
	var X = voiture.style.left;
	var Y = voiture.style.top;
	var lx = X.length;
	var ly = Y.length;
	var nbX = X.slice(0,lx-2);
	var nbY = Y.slice(0,ly-2);
	console.log(nbY);
	if (codeTouche == 40) {
		voiture.src = "voiture_b.png";
		voiture.style.top = (Number(nbY) + 10) + "px";
	}
	if (codeTouche == 38) {
		voiture.src = "voiture_h.png";
		voiture.style.top = (Number(nbY) - 10) + "px";
	}
	if (codeTouche == 37) {
		voiture.src = "voiture_g.png";
		voiture.style.left = (Number(nbX) - 10) + "px";
	}
	if (codeTouche == 39) {
		voiture.src = "voiture_d.png";
		voiture.style.left = (Number(nbX) + 10) + "px";
	}
}

var voiture = document.getElementById("voiture");
voiture.style.top = "100px";
voiture.style.left = "200px";
var b = document.body;
b.addEventListener('keydown',bougerVoiture);
*/


function Case(xx,yy,ori){
	this.x = xx;
	this.y = yy;
	this.coor = (this.x+""+this.y);
	this.orientation = ori;
}
function Grille(){
	this.nbCases = 0;
}
function AjoutCase(event){
	var codeTouche = event.keyCode;
	var alea = Math.random() * (3 - 0) + 0;
	var id = alea*10;
	cChiant(12,"h")
}
function cChiant(n,ori){
	if(ori = "h"){
		if(n = 1){document.getElementById("01").src = "droite.png";}
		else{if(n = 2){document.getElementById("02").src = "droite.png";}
			else{if(n = 3){document.getElementById("03").src = "droite.png";}
				else{if(n = 4){document.getElementById("04").src = "droite.png";}

					else{if(n = 11){document.getElementById("11").src = "droite.png";}
						else{if(n = 12){document.getElementById("12").src = "droite.png";}
							else{if(n = 13){document.getElementById("13").src = "droite.png";}
								else{if(n = 14){document.getElementById("14").src = "droite.png";}

									else{if(n = 21){document.getElementById("21").src = "droite.png";}
										else{if(n = 22){document.getElementById("22").src = "droite.png";}
											else{if(n = 23){document.getElementById("23").src = "droite.png";}
												else{if(n = 24){document.getElementById("24").src = "droite.png";}
	}}}}}}}}}}}											
	}
}



var table = new Grille();
var b = document.body;
b.addEventListener('keydown',AjoutCase);