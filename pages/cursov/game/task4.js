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

let letter = "";
let totalAmount = 0;
let clickerAmount = 0;
window.onload = async function () {
  letter = alphabet.charAt(Math.floor(Math.random() * mySmallAlphabet.length));
  document.getElementById("gameName").innerHTML = "Нажмите на слова на букву " + letter;
  animals.forEach(animal => {
    if (animal.name.startsWith(letter)) {
      totalAmount += 1;
    }
  });


  let score = 0;
  localStorage.setItem("score", 0);
  for (let i = 0; i < animals.length; i++) {
    let img = document.createElement('img');
    img.src = "../assets/" + animals[i].fileName;
    img.className = 'falling';
    img.style.maxWidth = '150px';
    img.style.left = (Math.random() * window.innerWidth -50)+ 'px';

    img.style.animationDuration = Math.max(5, Math.random() * 10) + 's';
    //подсказка
    if(animals[i].name.startsWith(letter)){
      img.style.border = '2px solid red';
    }

    //
    img.onclick = function () {
      this.parentNode.removeChild(this);
      if (animals[i].name.startsWith(letter)) {
        score += 10;
        document.getElementById("score").innerHTML = " Cчет: " + score;
        clickerAmount += 1;
        localStorage.setItem("score", score);
        if (clickerAmount == totalAmount) {
          alert("Вы выиграли!" + "Cчет: " + score);
          document.getElementById("score").innerHTML = " Cчет: " + score;
          window.location.href = "../game_level2/index.html";
        }
      } else {
        alert("Вы проиграли. Счет: " + score);
        window.location.href = "../finalScene/index.html"; //todo отдельная страница финала
      }

    };
    img.addEventListener('animationend', () => {
      if (!animals[i].name.startsWith(letter)) {
        img.parentNode.removeChild(img);
      } else {
        alert("Вы проиграли. Счет: "+ score);
        window.location.href = "../finalScene/index.html"; //todo отдельная страница финала

      }

    });
    document.body.appendChild(img);
    //sleep for 2 secs
    await sleep(1000);
  }

}