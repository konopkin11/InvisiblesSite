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
let clickerAmountLeft = 0;
let starttime = 0;
let totalTime = 120;
let f = null;
const func = () => {
clearInterval(f);
}
 f = setInterval(()=>{
  if(starttime>totalTime){
    alert("Вы проиграли. Счет: " + score);
    window.location.href = "../finalScene/index.html";
    func();
  }else{
    document.getElementById("time").innerHTML = "Время: " + (120-starttime);
    starttime +=1;
  }
}, 1000);
letterLeft = mySmallAlphabet.charAt(Math.floor(Math.random() * mySmallAlphabet.length));
document.getElementById("gameNameLeft").innerHTML = "Начинаются на букву  " + letterLeft;
animals.forEach(animal => {
  if (animal.name.startsWith(letterLeft)) {
    totalAmountLeft += 1;
  }
});


let score = 0;
localStorage.setItem("score", localStorage.getItem("score") || 0);

let index = 0;
let center = document.getElementById('center');
let left = document.getElementById('left');
let img =null;
function showNextImage() {
  if (index >= animals.length) return;
  img = document.createElement('img');

  index += 1;
  img.src = "../assets/" + animals[index].fileName;
  img.className = 'draggable';

  console.log(animals[index].fileName)
  img.style.maxWidth = '150px';
  img.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('text/plain', animals[index].name);
  });

  img.addEventListener('dragend', function (event) {
    event.preventDefault();
  });
  center.appendChild(img);
  
}

window.onkeydown = function (event) {
  if (center.firstChild) {
    
   if (event.key === 'ArrowDown') {
    event.preventDefault();
      if ( animals[index].name.startsWith(letterLeft)) {
        alert("Вы проиграли. Счет: " + score);
        window.location.href = "../finalScene/index.html";

      }
      center.removeChild(center.firstChild);
      showNextImage();
    }
 
  }
};

window.onload = ()=>{
  showNextImage();
  let basket = document.getElementById('left');
  basket.addEventListener('dragover', function (event) {
    event.preventDefault();
  });

  basket.addEventListener('drop', function (event) {
    if (animals[index].name.includes(letterLeft)) {
      score += 20;
      document.getElementById("score").innerHTML = " Cчет: " + score;
      clickerAmountLeft += 1;
      localStorage.setItem("score", score);
      if (clickerAmountLeft == totalAmountLeft) {
        alert("Вы выиграли!" + "Cчет: " + score);
        document.getElementById("score").innerHTML = " Cчет: " + score;
        window.location.href = "../finalScene/index.html";
      }
    } else {
      alert("Вы проиграли. Счет: " + score);
      window.location.href = "../finalScene/index.html"; //todo отдельная страница финала
    }
    showNextImage();
    event.preventDefault();
    let name = event.dataTransfer.getData('text/plain');
    left.appendChild(center.firstChild);
    //img.parentNode.removeChild(img);

  });
}