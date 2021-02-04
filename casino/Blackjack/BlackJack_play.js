// var carte = new Object();
// Valcarte =  ["2","3","4","5","6","7","8","9","10","Valet","Dame","Roi","As"];
// Symbolecarte = ["pique","coeur","trefle","carreau"];
// var deck = [];
var MainJoueur = new Array();
var Valcarte = new Array();
var Symbolecarte = new Array();
var MainOrdi = new Array();
var Deck = new Array();
var ListeImage = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];





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



function PickCard (deck, Main, Personne){
    let divJ = document.getElementById("joueur");
    let divC = document.getElementById("croupier")
    let rand = hasard(deck.length);
    Main.push(deck[rand])
    // deplaceCarte(ListeImage,rand,Personne);
    deck.splice(rand,1);

}


function SommeCarte(main){
    let somme = 0;
    for(let i = 0; i < main.length; i++){
        somme += main[i]["Valeur"];
    }
    return somme;
}

function deplaceCarte(listeim,num,personne){

    let img = document.createElement("img");

    for(let i = 0; i < listeim.length; i++){

        if (num == listeim[i]){

            switch(Listeim[i]){

                case listeim[i] == 1 :

                    img.src = "../Blackjack/cartes/Ac.gif";
                    personne.appendChild(img);
                    break;

                case listeim[i] == 2 :

                    img.src = "../Blackjack/cartes/Ad.gif";
                    personne.appendChild(img);
                    break;
    
                case listeim[i] == 3 :

                    img.src = "../Blackjack/cartes/Ah.gif";
                    personne.appendChild(img);
                    break;

                case listeim[i] == 4 :

                    img.src = "../Blackjack/cartes/As.gif";
                    personne.appendChild(img);
                    break;
                    
                case listeim[i] == 5 :

                    img.src = "../Blackjack/cartes/2c.gif";
                    personne.appendChild(img);
                    break;

                case listeim[i] == 6 :

                    img.src = "../Blackjack/cartes/Ah.gif";
                    personne.appendChild(img);
                    break;                                                                                

            }
        }
    }
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

function Distrib(unDeck, MainDuJoueur, MainBanque){
    
    for (let i = 0; i < 2; i ++){

        PickCard(unDeck, MainDuJoueur);
        PickCard(unDeck, MainBanque);

    }
}




//   Utilisation du Js    \\
var Deck;
var jouer = document.querySelector("#jouer");
var tirer = document.querySelector("#tirer");
var secoucher = document.querySelector("#rester");
var joueur = document.querySelector("#joueur");
var croupier = document.querySelector("#croupier");

Deck=initdeck();
console.log("Deck : ", Deck);
Distrib(Deck, MainOrdi, MainJoueur);
console.log("main du Joueur : ", MainJoueur);
console.log("main de la Banque : ", MainOrdi);


tirer.addEventListener('click', () => {
    let img = document.createElement("img");
    PickCard(Deck, MainJoueur);

    console.log("Deck : ", Deck);
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