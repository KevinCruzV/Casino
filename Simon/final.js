const vert = document.getElementById("topleft");
const rose = document.getElementById("topright");
const orange = document.getElementById("bottomleft");
const bleu = document.getElementById("bottomright");
const go = document.getElementById("start");
const score = document.getElementById("score");
const STRICT_MODE = document.getElementById("strict");
const onoff = document.getElementById("on");


const TIME_BY_ROUND_IN_MS = 750;
let compteur = 0;
let CONFIRM_STRICT_MODE = false;
let CONFIRM_ONOFF = false;
let userPlayed = false;
let COULEUR_GEN_PAR_ORDI = []; // suite de couleur que l'ordi a choisit aleatoirement
let COULEUR_GEN_PAR_JOUEUR = []; // suite de couleur que le joueur a choisit
const colorsBtn = [vert, rose, orange, bleu];

score.innerHTML = "score :" + compteur;

STRICT_MODE.addEventListener("click", () => {
  CONFIRM_STRICT_MODE = true;
});

onoff.addEventListener("click", () => {
  CONFIRM_ONOFF = true;
});

const hasard = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const blink = (btn) => {
  // On ajoute la classe blanc au bouton en question
  btn.classList.add("blanc");
  //
  setTimeout(() => {
    // Au bout de 750 ms on enlève la classe blanche pour retrouver la couleur initiale
    btn.classList.remove("blanc");
  }, TIME_BY_ROUND_IN_MS);
};






const delay = (ms) => { return new Promise((res) => setTimeout(res, ms)); } ////////////


var COULEUR_GEN = 1;

 const computerPlay = async (couleur) => {       // permet de faire clignoter une ou plusieurs couleur aleatoire.
    //  COULEUR_GEN = 1;                    // si couleurgen = 1 alors une couleur clignote. si couleurgen = 2, 2 couleur clignote
     let i = 0;
  // On calcule un nb random entre 0 et 3
    for (let i = 0; i < couleur; i += 1) {
      await delay(TIME_BY_ROUND_IN_MS);     ///////////////////////////////////////////:
      const index = hasard(4);
      blink(colorsBtn[index]);
      COULEUR_GEN_PAR_ORDI.push(index);      // on ajoute la ou les couleurs choisi par l ordi a la liste 
      
    }
    // Quand la machine joue, ça remet userPlayed à false pour que l'user puisse clicker à nouveau
  userPlayed = false;

  };  

 go.addEventListener("click", computerPlay);

const userPlay = (event) => {
  if (userPlayed) {
    // On check si le user a déjà joué (pour pas qu'il click 2 fois de suite)
    // S'il a déjà clické sur ce tour, s'il s'amuse à reclicker ça ne fera rien 
    return;
  }
  const colorBtn = event.target;     // on recupere la couleur que le joueur a click
  const index = colorsBtn.indexOf(colorBtn);

  blink(colorBtn);
  COULEUR_GEN_PAR_JOUEUR.push(index);    // on ajoute cette couleur a la liste
  userPlayed = true;
  goToNextRound(COULEUR_GEN);
};

vert.addEventListener("click", userPlay);

rose.addEventListener("click", userPlay);

orange.addEventListener("click", userPlay);

bleu.addEventListener("click", userPlay);

const goToNextRound = () => {
  let i = 0;
  for(let i = 0; i < COULEUR_GEN_PAR_ORDI.lenght; i++) {
    if(COULEUR_GEN_PAR_ORDI[i] == COULEUR_GEN_PAR_JOUEUR[i]) {
      compteur += 1;         // si le joueur reussu score prend + 1
      couleur += 1;      // l'ordi va generer 2 couleur aleatoire
      COULEUR_GEN_PAR_ORDI.remove[i];
      COULEUR_GEN_PAR_JOUEUR.remove[i];
      computerPlay(couleur);
    } else if (!STRICT_MODE) {         //si strict mode pas activer et le joueur perd, il recomence le tour et garde son score
      COULEUR_GEN_PAR_ORDI.remove[i];
      COULEUR_GEN_PAR_JOUEUR.remove[i];
      computerPlay(couleur);
    } else {                   // si strict mode activer et le joueur perd, il recommence au tour 1 et score = 0
      compteur += 0;
      COULEUR_GEN = 1;
      COULEUR_GEN_PAR_ORDI.remove[i];
      COULEUR_GEN_PAR_JOUEUR.remove[i];
      computerPlay(couleur);
    }
  }
};



