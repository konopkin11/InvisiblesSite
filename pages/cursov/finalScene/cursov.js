let players = {};
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

loadPlayers();

document.getElementById('title').innerHTML = "Игра окончена. Счет: " + localStorage.getItem('score');
const savedName = localStorage.getItem('user_name');
const currentRating = localStorage.getItem('score');

addPlayer(savedName, currentRating);
localStorage.setItem('score', 0)


