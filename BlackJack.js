// var carte = new Object();
// Valcarte =  ["2","3","4","5","6","7","8","9","10","Valet","Dame","Roi","As"];
// Symbolecarte = ["pique","coeur","trefle","carreau"];
// var deck = [];
var MainJoueur = new Array();
MainJoueur = [];
var MainOrdi = new Array();
Main = [];


// Je me suis inspirer de https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript
function initdeck (){
    var carte = new Object();
    var Valcarte = new Array();
    var Symbolecarte = new Array();
    Valcarte =  ["2","3","4","5","6","7","8","9","10","Valet","Dame","Roi","As"];
    Symbolecarte = ["pique","coeur","trefle","carreau"];
    var deck = [];

    for (let i = 0; i < Symbolecarte.length; i++){
        for (let j = 0; j < Valcarte.length; j++){
            if (Valcarte[j] == "Valet" || Valcarte[j] == "Dame" || Valcarte[j] == "Roi"){

                Valcarte[j] == "10";
            }

            if(Valcarte[j] == "As"){

                Valcarte[j] == '11';

            }

            carte = {
                "Symbole" : Symbolecarte[i],
                "Valeur" : parseInt(Valcarte[j])
            }

            deck.push(carte);
        }

    }
  
    return deck;
}

// https://sciences-du-numerique.fr/programmation-en-javascript/tirer-un-nombre-au-hasard/5 (Pour m'aider avec le math.floor)
function hasard(max){
	return 1+Math.floor(Math.random()*max);
}


function MixDeck(deck){

    for(i = 0; i < deck.length; i++){
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



function Win(joueur, ordi){
    var sommeJ = 0;
    var sommeO = 0;

    for(i = 0; i < joueur.length; i++){
        sommeJ += joueur[i];
    }

    for(j = 0; j < ordi.Length; i++){
        sommeO += ordi[j]; 
    }

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
    }
    


}


function blackjack(MainJoueur, MainOrdi){
    var Deck = initdeck();
    MixDeck(Deck);
    for (i = 0; i < 2; i ++){
        PickCard(Deck, MainJoueur);
        PickCard(Deck, MainOrdi)
    }
    

}