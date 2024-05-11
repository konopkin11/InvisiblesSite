const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const playButton = document.getElementById('playButton');
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
    changeNameButton.style.display = 'block';
    nameForm.style.display ='none';
});

playButton.addEventListener('click', function () {
    localStorage.setItem('score', 0);
    window.location.href = "game/index.html";
});

changeNameButton.addEventListener('click', function () {
    // Действие при нажатии кнопки "Сменить имя"
    localStorage.removeItem('user_name');
    playButton.style.display = 'none';
    changeNameButton.style.display = 'none';
    nameForm.style.display ='block';
});