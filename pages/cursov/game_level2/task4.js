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

const animals = files.map(file => {
  let name = file.split(".")[0];
  let fileName = file;
  return { name, fileName };
});
shuffle(animals);

const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const mySmallAlphabet = "абвгд";


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let letterRight = "";
let letterLeft = "";
let totalAmountLeft = 0;
let totalAmountRight = 0;
let clickerAmountLeft = 0;
let clickerAmountRight = 0;
let starttime = 0;
let totalTime = 120;

setInterval(()=>{
  if(starttime>totalTime){
    alert("Вы проиграли. Счет: " + score);
    window.location.href = "../finalScene/index.html";
  }else{
    document.getElementById("time").innerHTML = "Время: " + (120-starttime);
    starttime +=1;
  }
}, 1000);

letterRight = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
letterLeft = mySmallAlphabet.charAt(Math.floor(Math.random() * mySmallAlphabet.length));
document.getElementById("gameNameLeft").innerHTML = "Начинаются на букву  " + letterLeft;
document.getElementById("gameNameRight").innerHTML = "Содержит букву  " + letterRight;
animals.forEach(animal => {
  if (animal.name.startsWith(letterLeft)) {
    totalAmountLeft += 1;
  }
  if (animal.name.includes(letterRight)) {
    totalAmountRight += 1;
  }
});

let score = 0;
localStorage.setItem("score", localStorage.getItem("score") || 0);

let index = 0;
let center = document.getElementById('center');
let left = document.getElementById('left');
let right = document.getElementById('right');

function showNextImage() {
  if (index >= animals.length) return;
  let img = document.createElement('img');

 
  index += 1;
  img.src = "../assets/" + animals[index].fileName;
  img.style.maxWidth = '150px';

  center.appendChild(img);
}
window.onkeydown = function (event) {
  if (center.firstChild) {
    console.log(animals[index].fileName)
    if (event.key === 'ArrowLeft') {
      left.appendChild(center.firstChild);

      if (animals[index].name.startsWith(letterLeft)) {
        score += 15;
        document.getElementById("score").innerHTML = " Cчет: " + score;
        clickerAmountLeft += 1;
        localStorage.setItem("score", score);
        if (clickerAmountLeft === totalAmountLeft && clickerAmountRight === totalAmountRight) {
          alert("Вы выиграли!" + "Cчет: " + score);
          document.getElementById("score").innerHTML = " Cчет: " + score;
          window.location.href = "../game_level3/index.html";
        }
      } else {
        alert("Вы проиграли. Счет: " + score);
        window.location.href = "../finalScene/index.html";
      }
      showNextImage();
    } else if (event.key === 'ArrowRight') {
      right.appendChild(center.firstChild);

      if (animals[index].name.includes(letterRight)) {
        score += 15;
        document.getElementById("score").innerHTML = " Cчет: " + score;
        clickerAmountRight += 1;
        localStorage.setItem("score", score);
        if (clickerAmountLeft == totalAmountLeft && clickerAmountRight == totalAmountRight) {
          alert("Вы выиграли!" + "Cчет: " + score);
          document.getElementById("score").innerHTML = " Cчет: " + score;
          window.location.href = "../game_level3/index.html";
        }
      } else {
        alert("Вы проиграли. Счет: " + score);
        window.location.href = "../finalScene/index.html";
      }

      showNextImage();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (animals[index].name.includes(letterRight) || animals[index].name.startsWith(letterLeft)) {
        alert("Вы проиграли. Счет: " + score);
        window.location.href = "../finalScene/index.html";

      }
      center.removeChild(center.firstChild);
      showNextImage();
    }
 
  }
};

window.onload = showNextImage;






