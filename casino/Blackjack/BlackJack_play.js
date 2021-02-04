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
        somme += main[i]["Valeur"];
    }
    return somme;
}

function BlackJack(main){
    let a = 11;
    let b = 10;
    carte1 = main[0]["Valeur"];
    carte2 = main[1]["Valeur"];
    if (carte1 == a && carte2 == b || carte1 == b && carte2 == a ){
        return true;
    }
    

}


// function Win(MainJ, MainB){
//     sommeJ = SommeCarte(MainJ)
//     sommeO = SommeCarte(MainB)
//     switch (sommeJ){

//         case sommeJ == 21 :
//             alert("Vous avez gagné !");
//             break; 
//         case sommeJ > 21 :
//             alert("Vous avez perdu");
//             break;
//         default :
//             console.log("continue");
//             alert("ERROR"); 
//             break;   
//     }

//     switch (sommeO){

//         case sommeJ == 21 :
//             alert("Vous avez perdu !");
//             break; 
//         case sommeJ > 21 :
//             alert("Vous avez gagné !");
//             break;
//         default :
//             console.log("continue");
//             alert("Error");
//             break;      
//     }
// }

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
var secoucher = document.querySelector("#rester");

Deck=initdeck();
console.log("Deck : ",Deck);
 Distrib(Deck, MainOrdi, MainJoueur);
 console.log("main du Joueur : ", MainJoueur);
 console.log("main de la Banque : ", MainOrdi);


tirer.addEventListener('click', () => {

    PickCard(Deck,MainJoueur);

    console.log("Deck : ",Deck);
    console.log("Vous avez maintenant : ", MainJoueur);

    let sommeJ = SommeCarte(MainJoueur);

    if(sommeJ > 21){
        console.log("Perdu ! Vous avez plus de 21. ");
    };
    
});

secoucher.addEventListener('click', () => {

    let sommeJ = SommeCarte(MainJoueur);
    let sommeB = SommeCarte(MainOrdi);

    while(sommeB < 17){
        PickCard(Deck, MainOrdi);
        console.log("La banque a maintenant : ", MainOrdi);
        sommeB = SommeCarte(MainOrdi);
    };

    if(sommeB > 21){
        console.log(" Gagné ! la banque à plus de 21.");
    };

    if(BlackJack(MainOrdi) && BlackJack(MainJoueur)){

        console.log("Egalité ! Vous avez tout les deux Black Jack.");

    }else if(BlackJack(MainOrdi) && !BlackJack(MainJoueur)){

        console.log("Black Jack pour la Banque. Perdu !");

    }else if (BlackJack(MainJoueur) && !BlackJack(MainOrdi)){

        console.log("Black Jack pour le Joueur. C'est gagné !");

    }else if (!BlackJack(MainOrdi) && !BlackJack(MainOrdi)){

        if(sommeJ < sommeB && sommeB < 22 ){

            console.log("La Banque a un plus grand jeu que vous. Perdu !");

        }else if (sommeJ > sommeB){

            console.log("C'est Gagné ! Vous avez un plus gros jeu");

        }else if(sommeJ == sommeB){

            console.log(" C'est une égalité ! Vos points sont égaux");

        };

    };
})