// var carte = new Object();
// Valcarte =  ["2","3","4","5","6","7","8","9","10","Valet","Dame","Roi","As"];
// Symbolecarte = ["pique","coeur","trefle","carreau"];
// var deck = [];
var MainJoueur = new Array();
var Valcarte = new Array();
var Symbolecarte = new Array();
var MainOrdi = new Array();
var Deck = new Array();



// Je me suis inspirer de https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript
function initdeck (){
    let deck = [];
    let carte = new Object();
    Valcarte =  ["2","3","4","5","6","7","8","9","10","Valet","Dame","Roi","As"];
    Symbolecarte = ["pique","coeur","trefle","carreau"];
    for (let i = 0; i < Symbolecarte.length; i++){
        for (let j = 0; j < Valcarte.length; j++){

            let val = parseInt(Valcarte[j]);

            if (Valcarte[j] == "Valet" || Valcarte[j] == "Dame" || Valcarte[j] == "Roi"){
                val = 10;
            }
 
            if(Valcarte[j] == "As"){
                val = 11;
            }

            carte = {
                "Nom" : Valcarte[j],
                "Symbole" : Symbolecarte[i],
                "Valeur" : val
            }

            deck.push(carte);
        }

    }
  
    return deck;
}

// https://sciences-du-numerique.fr/programmation-en-javascript/tirer-un-nombre-au-hasard/5 (Pour m'aider avec le math.floor)
function hasard(max){
    let min = 0;
	return Math.floor(Math.random() * (max - min)) + min; 
}


function MixDeck(deck){

    for(let i = 0; i < deck.length; i++){
        let rand = hasard(deck.length);
        let temp = deck[i];
        deck[i] = deck[rand];
        deck[rand] = temp;
    }
    return deck;
}



function PickCard (deck, Main){
    let rand = hasard(deck.length);
    Main.push(deck[rand])
    deck.splice(rand,1);

}

function SommeCarte(main){
    let somme = 0;
    for(let i = 0; i < main.length; i++){
        somme += main["Valeur"];
    }
    return somme;
}

function BlackJack(main){
    let a;
    let b;
    for(let i = 0;)

}


function Win(MainJ, MainB){
    sommeJ = SommeCarte(MainJ)
    sommeO = SommeCarte(MainB)
    switch (sommeJ){

        case sommeJ == 21 :
            alert("Vous avez gagné !");
            break; 
        case sommeJ > 21 :
            alert("Vous avez perdu");
            break;
        default :
            console.log("continue");
            alert("ERROR"); 
            break;   
    }

    switch (sommeO){

        case sommeJ == 21 :
            alert("Vous avez perdu !");
            break; 
        case sommeJ > 21 :
            alert("Vous avez gagné !");
            break;
        default :
            console.log("continue");
            alert("Error");
            break;      
    }
}

function Distrib(unDeck, MainDuJoueur, MainBanque){
    
    for (let i = 0; i < 2; i ++){
        PickCard(unDeck, MainDuJoueur);
        PickCard(unDeck, MainBanque);
    }
}


var Deck=initdeck();

//   Utilisation du Js    \\

var jouer = document.querySelector("#jouer");
var tirer = document.querySelector("#tirer");
var secoucher = document.querySelector("#secoucher");

Deck=initdeck();
MixDeck(Deck);
console.log(Deck);
Distrib(Deck, MainOrdi, MainJoueur);
console.log(MainJoueur);
console.log(MainOrdi);


tirer.addEventListener('click', () => {
    PickCard(Deck,MainJoueur);
    console.log(Deck);
    console.log(MainJoueur);

})

tirer.addEventListener('click', () => {
 
})