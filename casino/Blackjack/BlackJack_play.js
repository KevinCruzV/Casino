// var carte = new Object();
// Valcarte =  ["2","3","4","5","6","7","8","9","10","Valet","Dame","Roi","As"];
// Symbolecarte = ["pique","coeur","trefle","carreau"];
// var deck = [];
var MainJoueur = new Array();
var Valcarte = new Array();
var Symbolecarte = new Array();
var MainOrdi = new Array();
var Deck = new Array();






// Je me suis inspirer de https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript pour une partie du code initdeck
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
                "Valeur" : val,
                "Image": "../Blackjack/cartes/" + Valcarte[j] + Symbolecarte[i] + ".gif"
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

function deplaceCarte(personne, main){

    let img = document.createElement("img");
    for(let i = 0; i < main.length; i++){

        img.src = main[i].Image
        personne.appendChild(img);
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
    let cache = document.createElement("img");
    cache.classList.add('carteCache');
    for (let i = 0; i < 2; i++){

        PickCard(unDeck, MainDuJoueur);
        deplaceCarte(joueur,MainDuJoueur);
        PickCard(unDeck, MainBanque);
        // deplaceCarte(croupier,MainBanque);

    }

    deplaceCarte(croupier,MainBanque);
    cache.src = "../Blackjack/cartes/cache.png";
    croupier.appendChild(cache);


}

// function envoie(){
//     let pseudo = document.getElementById("text").value;
//     let joueur1 = document.getElementById("joueur1");
//     joueur1.innerHTML = pseudo;
//     document.getElementById("cache").style.display="none";
// }


//   Utilisation du Js    \\
var Deck;
var jouer = document.querySelector("#jouer");
var tirer = document.querySelector("#tirer");
// var valider = document.getElementsByClassName("valider");
//  var valider = document.querySelector(".valider")
var secoucher = document.querySelector("#rester");
var joueur = document.querySelector("#joueur");
var croupier = document.querySelector("#croupier");
var tapis = document.querySelector(".tapis");
var carteCache = document.querySelector(".carteCache");
var button = document.getElementsByTagName(".tapis button:active");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var draw = document.querySelector(".draw");



// valider.addEventListener('click', () => {
//     envoie();
// });



Deck=initdeck();
console.log("Deck : ", Deck);
Distrib(Deck, MainOrdi, MainJoueur);
console.log("main du Joueur : ", MainJoueur);
console.log("main de la Banque : ", MainOrdi);


tirer.addEventListener('click', () => {
    PickCard(Deck, MainJoueur);
    deplaceCarte(joueur, MainJoueur);

    console.log("Deck : ", Deck);
    console.log("Vous avez maintenant : ", MainJoueur);

    let sommeJ = SommeCarte(MainJoueur);

    if(sommeJ > 21){
        console.log("Perdu ! Vous avez plus de 21.");
        win.parentNode.removeChild(win);
        draw.parentNode.removeChild(draw);
        lose.style.visibility = "visible";
        document.body.style.background = "#756A6B";
        tapis.style.background = "#756A6B";
        tirer.style.background = "#756A6B";
        secoucher.style.background = "#756A6B";
        carteCache.parentNode.removeChild(carteCache);
        deplaceCarte(croupier,MainOrdi);

        
        return 0;
    };
    
});

secoucher.addEventListener('click', () => {

    let sommeJ = SommeCarte(MainJoueur);
    let sommeB = SommeCarte(MainOrdi);
    let img = document.createElement("img");
    img.classList.add('carteCache');

    while(sommeB < 17){
        PickCard(Deck, MainOrdi);
        img.src = "../Blackjack/cartes/cache.png";
        croupier.appendChild(img);
        console.log("La banque a maintenant : ", MainOrdi);
        sommeB = SommeCarte(MainOrdi);
    };

    if(sommeB > 21){
        console.log(" Gagné ! la banque à plus de 21.");
        lose.parentNode.removeChild(lose);
        draw.parentNode.removeChild(draw);
        win.style.visibility = "visible";
        document.body.style.background = "#756A6B";
        tapis.style.background = "#756A6B";
        tirer.style.background = "#756A6B";
        secoucher.style.background = "#756A6B";
        carteCache.parentNode.removeChild(carteCache);
        deplaceCarte(croupier,MainOrdi);

    };

    if(BlackJack(MainOrdi) && BlackJack(MainJoueur)){

        console.log("Egalité ! Vous avez tout les deux Black Jack.");
        carteCache.parentNode.removeChild(carteCache);
        deplaceCarte(croupier,MainOrdi);
        lose.parentNode.removeChild(lose);
        win.parentNode.removeChild(win);
        draw.style.visibility = "visible";
        document.body.style.background = "#756A6B";
        tapis.style.background = "#756A6B";
        tirer.style.background = "#756A6B";
        secoucher.style.background = "#756A6B";
        return 0;

    }else if(BlackJack(MainOrdi) && !BlackJack(MainJoueur)){

        console.log("Black Jack pour la Banque. Perdu !");
        carteCache.parentNode.removeChild(carteCache);
        deplaceCarte(croupier,MainOrdi);
        win.parentNode.removeChild(win);
        draw.parentNode.removeChild(draw);
        lose.style.visibility = "visible";
        document.body.style.background = "#756A6B";
        tapis.style.background = "#756A6B";
        tirer.style.background = "#756A6B";
        secoucher.style.background = "#756A6B";
        return 0;

    }else if (BlackJack(MainJoueur) && !BlackJack(MainOrdi)){

        console.log("Black Jack pour le Joueur. C'est gagné !");
        lose.parentNode.removeChild(lose);
        draw.parentNode.removeChild(draw);
        win.style.visibility = "visible";
        document.body.style.background = "#756A6B";
        tapis.style.background = "#756A6B";
        tirer.style.background = "#756A6B";
        secoucher.style.background = "#756A6B";
        carteCache.parentNode.removeChild(carteCache);
        deplaceCarte(croupier,MainOrdi);
    

        return 0;

    }else if (!BlackJack(MainOrdi) && !BlackJack(MainOrdi)){

        if(sommeJ < sommeB && sommeB < 22 ){

            console.log("La Banque a un plus grand jeu que vous. Perdu !");
            win.parentNode.removeChild(win);
            draw.parentNode.removeChild(draw);
            lose.style.visibility = "visible";
            document.body.style.background = "#756A6B";
            tapis.style.background = "#756A6B";
            tirer.style.background = "#756A6B";
            secoucher.style.background = "#756A6B";
            // deplaceCarte(croupier,MainOrdi);



        }else if (sommeJ > sommeB){

            console.log("C'est Gagné ! Vous avez un plus gros jeu");
            lose.parentNode.removeChild(lose);
            draw.parentNode.removeChild(draw);
            win.style.visibility = "visible";
            document.body.style.background = "#756A6B";
            tapis.style.background = "#756A6B";
            tirer.style.background = "#756A6B";
            secoucher.style.background = "#756A6B";
            carteCache.parentNode.removeChild(carteCache);
            deplaceCarte(croupier,MainOrdi);



        }else if(sommeJ == sommeB){

            console.log(" C'est une égalité ! Vos points sont égaux");
            lose.parentNode.removeChild(lose);
            win.parentNode.removeChild(win);
            draw.style.visibility = "visible";
            document.body.style.background = "#756A6B";
            tapis.style.background = "#756A6B";
            tirer.style.background = "#756A6B";
            secoucher.style.background = "#756A6B";
            carteCache.parentNode.removeChild(carteCache);
            deplaceCarte(croupier,MainOrdi);
        };

        return 0;

    };
})