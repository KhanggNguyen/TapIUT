// initialisation des variables
var b = document.body;
b.addEventListener('keydown',reponse); // initialise le bouton start
alert("rentrez votre nom");
var stop = false;// la partie n'est pas finie

var score = 0;// le score est de 0

var centi=0; // init du chrono
var secon=0;

var first=true;// c'est la première boucle
// le chrono
function chrono(){
	centi++;
	if (centi>9){centi=0;secon++}
	document.forsec.secc.value=" "+centi 
	document.forsec.seca.value=" "+secon
	compte=setTimeout('chrono()',100)
}

function rasee(){
	clearTimeout(compte)
	centi=0;
	secon=0;
	minu=0;
	document.forsec.secc.value=" "+centi
	document.forsec.seca.value=" "+secon
}

// les fonction du score
function refreshScore(n){
	document.getElementById("score").innerHTML = n;
}

function refreshMult(n){
	document.getElementById("multscr").innerHTML = n;
}

function refreshTapSec(n){
	document.getElementById("scorefinal").innerHTML = n;
}

//les fonctions de calcul
function calculScore(){
	return score*pallier(score);
}
function calculTapSec(){
	var res = score/(secon+(centi/10));
	return res.toFixed(2);
}
function pallier(scr){
	if(scr < 10){return 1;}
	if(scr < 30){return 2;}
	if(scr < 80){return 3;}
	if(scr < 150){return 4;}
	if(scr < 250){return 5;}
	if(scr < 400){return 10;}
}
// la fonction start
function start(n){
	first = true;
	ajoutCase();ajoutCase();ajoutCase();ajoutCase();ajoutCase();
	stop = false;
	chrono();
	rasee();
	refreshScore(0);
	refreshMult(1);
	refreshTapSec(0);
}

// fonction de rafraichissement du tableau
function descentAll(){

	document.getElementById("41").src = document.getElementById("31").src
	document.getElementById("42").src = document.getElementById("32").src
	document.getElementById("43").src = document.getElementById("33").src

	document.getElementById("31").src = document.getElementById("21").src
	document.getElementById("32").src = document.getElementById("22").src
	document.getElementById("33").src = document.getElementById("23").src

	document.getElementById("21").src = document.getElementById("11").src
	document.getElementById("22").src = document.getElementById("12").src
	document.getElementById("23").src = document.getElementById("13").src

	document.getElementById("11").src = document.getElementById("01").src
	document.getElementById("12").src = document.getElementById("02").src
	document.getElementById("13").src = document.getElementById("03").src

	document.getElementById("01").src = "vide.png"
	document.getElementById("02").src = "vide.png"
	document.getElementById("03").src = "vide.png"

}

function ajoutCase(){
	descentAll();
	var id = Math.floor((3)*Math.random()+1);
	if(id == 2){
		document.getElementById("02").src = "Z.png";
	}
	else{
		if(id == 3){
		document.getElementById("03").src = "E.png";
		}
		else{
			document.getElementById("01").src = "A.png";

		}
	}
}

function explosion(id){
	document.getElementById(id).src = "explosion.gif";
	document.getElementById(id).style.height = "100px";
	document.getElementById(id).style.width = "100px";
}

// le déroulement d'un appui sur une touche
function reponse(event) {
	if(first){
		chrono();
		first = false;
	}
	if(!stop){
		var essaye = document.getElementById("03").src;
		document.getElementById("03").src = "vide.png";
		var vide = document.getElementById("03").src;
		document.getElementById("03").src = essaye;

		var codeTouche = event.keyCode;

		var un = document.getElementById("41").src;
		var deux = document.getElementById("42").src;
		var trois = document.getElementById("43").src;

		var caseValid = 0;
		if(un != vide){ caseValid = 1;}
			else { if(deux != vide){caseValid = 2;}
				else { if(trois != vide){caseValid = 3;}
					}
				}

		var valTouche
		if (codeTouche == 65) {
			valTouche = 1;
		}
		if (codeTouche == 90) {
			valTouche = 2;
		}
		if (codeTouche == 69) {
			valTouche = 3;
		}

		if(caseValid != valTouche){
			clearTimeout(compte);
			if(valTouche == 1){ explosion("41");}
			if(valTouche == 2){ explosion("42");}
			if(valTouche == 3){ explosion("43");}
			refreshScore(calculScore(score));
			refreshMult(pallier(score));
			refreshTapSec(calculTapSec(score));
			stop = true;
			myVar = setInterval(function(){}, 1500);
			clearInterval(myVar);
			console.log(document.getElementById("nom").value);
			if(name != null){
				scoreRequest(score*pallier(score), document.getElementById("nom").value);

			}
			score = 0;
			
		}


		console.log(caseValid == valTouche);
		if(!stop){
			ajoutCase();
			score ++;
			refreshScore(calculScore(score));
			refreshMult(pallier(score));
			refreshTapSec(calculTapSec(score));
		}

	}
	else{
		 
	}
}

function myajax(url, callBack) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", url, true);
	httpRequest.addEventListener("load", function () {
		callBack(httpRequest);
	});
	httpRequest.send(null);
}

function score(){
	myajax("projet.php?s="+"", scoreReponse);
}

//envoyer une demande de score dans le php et envoyer les résultats dans le score réponse
function scoreRequest(score_var,name_var){
	myajax("projet.php?s="+score_var+"&&n="+name_var, scoreReponse);
}

//mettre les valeurs résultats dans un tableau et appeler un fonction afficher
function scoreReponse(http){
	var json = JSON.parse(http.responseText);
	var names = new Array();
	var scores = new Array();
	if(json != null){
		for(var i = 0; i<json.length; i++){
			names.push(json[i].Nom);
			scores.push(json[i].Score);
		}
		afficheScore(names, scores);
	}
}


function afficheScore(names, scores){
	viderScore();
	for(var i = 0; i < names.length; i++){
		var row = document.createElement("tr");

		var col_name = document.createElement("td");
		var node_name = document.createTextNode(names[i]);
		col_name.appendChild(node_name);
		row.appendChild(col_name);

		var col_score = document.createElement("td");
		var node_score = document.createTextNode(scores[i]);
		col_score.appendChild(node_score);
		row.appendChild(col_score);	

		divScore.appendChild(row);
	}
	

}

function viderScore(){
	while(divScore.firstChild){
		divScore.removeChild(divScore.firstChild);
	}
}


var divScore = document.getElementById("tabscore");
var divImg = document.getElementById("tabScore");
