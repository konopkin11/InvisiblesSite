const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const playButton = document.getElementById('playButton');
const playButton2 = document.getElementById('playButton2');
const playButton3 = document.getElementById('playButton3');
const changeNameButton = document.getElementById('changeNameButton');
const ratingDisplay = document.getElementById('ratingDisplay');
let players = {};
// Добавляем игрока и его рейтинг в объект


// Сохраняем объект в localStorage
function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
    
}
function addPlayer(name, rating) {
    players[name] = rating;
    savePlayers();
}
// Загружаем объект из localStorage
function loadPlayers() {
    const loadedPlayers = localStorage.getItem('players');
    if (loadedPlayers) {
        players = JSON.parse(loadedPlayers);
    }
}
// Получаем рейтинг игрока
function getPlayerRating(name) {
    return players[name];
}

function displayPlayers() {
    const sortable = Object.fromEntries(
        Object.entries(players).sort(([,a],[,b]) => b-a)
    );
    let table = '<table><tr><th>Имя игрока</th><th>Рейтинг</th></tr>';
    for (let name in sortable) {
        table += `<tr><td>${name}</td><td>${players[name]}</td></tr>`;
    }
    table += '</table>';
    ratingDisplay.innerHTML = table;
}

loadPlayers();
displayPlayers();

// Проверяем, есть ли имя в localStorage
const savedName = localStorage.getItem('user_name');
if (savedName) {
    playButton.style.display = 'block';
    playButton2.style.display = 'block';
    playButton3.style.display = 'block';
    changeNameButton.style.display = 'block';
    nameForm.style.display ='none';
}else{
    nameForm.style.display ='block';
}

nameForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const enteredName = nameInput.value;
    localStorage.setItem('user_name', enteredName);
    playButton.style.display = 'block';
    playButton2.style.display = 'block';
    playButton3.style.display = 'block';
    changeNameButton.style.display = 'block';
    nameForm.style.display ='none';
    localStorage.setItem('score', 0);
});

playButton.addEventListener('click', function () {

    window.location.href = "game/index.html";
});
playButton2.addEventListener('click', function () {

    window.location.href = "game_level2/index.html";
});
playButton3.addEventListener('click', function () {

    window.location.href = "game_level3/index.html";
});
changeNameButton.addEventListener('click', function () {
    // Действие при нажатии кнопки "Сменить имя"
    localStorage.removeItem('user_name');
    playButton.style.display = 'none';
    playButton2.style.display = 'none';
    playButton3.style.display = 'none';
    changeNameButton.style.display = 'none';
    nameForm.style.display ='block';
});