function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}


const files = [
  "аист.jpg", "геккон.jpeg", "глухарь.jpg",
  "бобр.jpg", "барсук.jpg", "горилла.jpg",
  "акула.jpg", "гепард.jpg", "бабочка.png",
  "белка.jpg", "гиббон.jpg", "антилопа.jpeg",
  "вобла.jpg", "альпака.jpg", "динозавр.jpeg",
  "ворон.jpg", "бегемот.jpg", "анаконда.jpg",
  "дрозд.jpg", "верблюд.jpg", "водомерка.png",
  "дятел.jpg", "водожук.jpg", "двухвостка.jpg"
];
const simplifiedToFourColors = {
  "аист": "красный",
  "геккон": "зеленый",
  "глухарь": "синий",
  "бобр": "желтый",
  "барсук": "красный",
  "горилла": "синий",
  "акула": "желтый",
  "гепард": "красный",
  "бабочка": "зеленый",
  "белка": "желтый",
  "гиббон": "синий",
  "антилопа": "красный",
  "вобла": "желтый",
  "альпака": "зеленый",
  "динозавр": "красный",
  "ворон": "синий",
  "бегемот": "желтый",
  "анаконда": "зеленый",
  "дрозд": "красный",
  "верблюд": "желтый",
  "водомерка": "зеленый",
  "дятел": "синий",
  "водожук": "красный",
  "двухвостка": "желтый"
};
const animals = files.map(file => {
  let name = file.split(".")[0];
  let fileName = file;
  return { name, fileName };
});
shuffle(animals);
const colors = ["синий","желтый", "красный", "зеленый"]
const colorsToHEX= {
  "зеленый":"#008000",
  "желтый": "#ffff00",
  "синий":"#0000FF",
  "красный":"#ff0000"
}
const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const mySmallAlphabet = "абвгд";
let currentColor = colors[Math.floor(Math.random() * colors.length)]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let score =   new Number(localStorage.getItem('score', 0)) ;
document.getElementById("score").innerHTML = " Cчет: " + score;
let letter = "";
let totalAmount = 0;
let clickerAmount = 0;
let totalRounds= 0;

async function startRound() {
   letter = "";
   totalAmount = 0;
   clickerAmount = 0;
   totalRounds= 0;
   currentColor = colors[Math.floor(Math.random() * colors.length)]
  shuffle(animals);
  letter = alphabet.charAt(Math.floor(Math.random() * mySmallAlphabet.length));
  document.getElementById("gameName").innerHTML = "Цвет животного " + currentColor;
  animals.forEach(animal => {
    if (animal.name.startsWith(letter)) {
      totalAmount += 1;
    }
  });


  let currentRound = totalRounds+0;

  for (let i = 0; i < animals.length; i++) {
    let img = document.createElement('img');
    img.src = "../assets/" + animals[i].fileName;
    img.className = 'falling';
    img.style.maxWidth = '150px';
    img.style.left = (Math.random() * (window.innerWidth - 150))+ 'px';

    img.style.animationDuration = Math.max(5, Math.random() * 10) + 's';
    //подсказка

      img.style.border = '4px solid '+colorsToHEX[simplifiedToFourColors[animals[i].name]];


    //
    img.onclick = function () {
      this.parentNode.removeChild(this);
      if (simplifiedToFourColors[animals[i].name] === currentColor) {
        score += 10;
        localStorage.setItem('score', score);
        document.getElementById("score").innerHTML = " Cчет: " + score;
        clickerAmount += 1;
        localStorage.setItem("score", score);
        if (clickerAmount == totalAmount) {

          if(totalRounds===3){
            alert("Вы выиграли! " + "Cчет: " + score);
            document.getElementById("score").innerHTML = " Cчет: " + score;
            totalRounds+=1;
            window.location.href = "../game_level2/index.html";
          }
          else {
            var element = document.getElementsByTagName("img"), index;

            for (index = element.length - 1; index >= 0; index--) {
              element[index].parentNode.removeChild(element[index]);
            }

            totalRounds+=1;
            startRound();
            return;
          }

        }
      } else {
        alert("Вы проиграли. Счет: " + score);
        window.location.href = "../finalScene/index.html"; //todo отдельная страница финала
      }

    };

    img.addEventListener('animationend', () => {

      if(currentRound !== totalRounds){

        return;
      }

      if (simplifiedToFourColors[animals[i].name] !== currentColor) {
        img.parentNode.removeChild(img);
      } else {
        console.log(currentRound, totalRounds)
        alert("Вы проиграли. Счет: "+ score);
        window.location.href = "../finalScene/index.html"; //todo отдельная страница финала

      }

    });
    if(totalRounds === 3){
      return;
    }
    document.body.appendChild(img);
    //sleep for 2 secs
    await sleep(1000);
  }

}
window.onload = async function () {
  startRound();
}