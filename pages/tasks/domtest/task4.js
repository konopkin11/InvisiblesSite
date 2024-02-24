const questions = [
    {
      text: "А когда с человеком может произойти дрожемент?",
      comment: "Лексема «дрожемент» имплицирует состояние крайнего напряжения и страха: «У меня всегда дрожемент в ногах, когда копы подходят».",
      answers: [
        {text: "Когда он влюбляется", correct: false},
        {text: "Когда он идет шопиться", correct: false},
        {text: "Когда он слышит смешную шутку", correct: false},
        {text: "Когда он боится, пугается", correct: true}
      ]
    },
    {
      text: "Говорят, Антон заовнил всех. Это еще как понимать?",
      comment: "Термин «заовнить» заимствован из английского языка, он происходит от слова own и переводится как «победить», «завладеть», «получить».",
      answers: [
        {text: "Как так, заовнил? Ну и хамло. Кто с ним теперь дружить-то будет?", correct: false},
        {text: "Антон очень надоедливый и въедливый человек, всех задолбал", correct: false},
        {text: "Молодец, Антон, всех победил!", correct: true},
        {text: "Нет ничего плохого в том, что Антон тщательно выбирает себе друзей", correct: false}
      ]
    },
    {
      text: "А фразу «заскамить мамонта» как понимать?",
      comment: "Заскамить мамонта — значит обмануть или развести на деньги. Почему мамонта? Потому что мошенники часто выбирают в жертвы пожилых людей (древних, как мамонты), которых легко обвести вокруг пальца.",
      answers: [
        {text: "Разозлить кого-то из родителей", correct: false},
        {text: "Увлекаться археологией", correct: false},
        {text: "Развести недотепу на деньги", correct: true},
        {text: "Оскорбить пожилого человека", correct: false}
      ]
    },
    {
      text: "Кто такие бефефе?",
      comment: "Бефефе — это лучшие друзья. Этакая аббревиатура от английского выражения best friends forever.",
      answers: [
        {text: "Вши?", correct: false},
        {text: "Милые котики, такие милые, что бефефе", correct: false},
        {text: "Лучшие друзья", correct: true},
        {text: "Люди, которые не держат слово", correct: false}
      ]
    }
  ];
  
  const questionList = document.getElementById("questions-list");
  const resultContainer = document.querySelector(".result-container");
  const resultText = document.getElementById("result-text");
  
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let expandedQuestion;
  let currentQuestionItem;
  let answeredQuestions = new Array(questions.length).fill(false);
  let questionsAreOver = false;
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion(question, index) {
    const questionItem = document.createElement("div");
    currentQuestionItem = questionItem;
    questionItem.id = `question-${index}`;
    questionItem.classList.add("question");
    questionItem.textContent = `${index + 1}. ${question.text}`;
  
    const answers = document.createElement("div");
    answers.classList.add("answers");
    answers.id = `answers-${index}`;
  
    questionItem.addEventListener("click", () => selectAnswer(question, index, questionItem));
  
    questionList.appendChild(questionItem);
    questionList.appendChild(answers);
  }
  
  
  function selectAnswer(question, index, questionItem) {
    if (questionsAreOver) {
      hideCorrectAnswer();
      showCorrectAnswer(index);
    }
    if (index === currentQuestionIndex) {
      hideComment();
      expandQuestion(questionItem);
      const answers = question.answers.slice();
      shuffleArray(answers);
  
      for (const answer of answers) {
        const answerBlock = document.createElement("div");
        answerBlock.classList.add("answer-block");
        answerBlock.textContent = answer.text;
        answerBlock.dataset.correct = answer.correct;
        let answersForQuestion = document.getElementById(`answers-${index}`);
        answersForQuestion.appendChild(answerBlock);
  
        answerBlock.addEventListener("click", () => checkAnswer(answer.text, answer.correct, index));
      }
  
      currentQuestionIndex++;
    }
  }
  
  function checkAnswer(selectedAnswer, correctAnswer, questionIndex) {
    
    const answerBlocks = document.querySelectorAll(".answer-block");
    const selectedQuestion = document.querySelector(`#question-${questionIndex}`);
  
    for (const block of answerBlocks) {
      block.style.pointerEvents = "none";
      if (block.dataset.correct === "true") {
        block.style.transition = "transform 2s";
        block.style.transform = "scale(1.1)";
        block.style.marginRight = "5vh";
        block.style.marginLeft = "5vh";
        const tickMark = document.createElement("span");
        tickMark.classList.add("tick-mark");
        tickMark.innerHTML = "&#10004;"; // галочка
        block.appendChild(tickMark);
      } else {
        setTimeout(() => {
          block.style.transition = "transform 10s";
          block.style.transform = "translateX(20000%)";
        }, 1000);
      }
    }
  
    setTimeout(() => {
      let answersForQuestion = document.getElementById(`answers-${questionIndex}`);
      for (const block of answerBlocks) {
        answersForQuestion.removeChild(block);
      }
  
      // установка флага ответа на вопрос
      const marker = document.createElement("span");
      marker.classList.add("marker");
      marker.innerHTML = correctAnswer === true ? "&#10004;" : "&#10008;";
  
      selectedQuestion.appendChild(marker);
  
      if (correctAnswer === true) {
        selectedQuestion.style.background = "#c2f0c2";
        selectedQuestion.style.transition = "background 0.5s";
        answeredQuestions[questionIndex] = true;
        correctAnswers++;
      } else {
        selectedQuestion.style.background = "#ffb8b8";
        selectedQuestion.style.transition = "background 0.5s";
      }
  
      if (currentQuestionIndex === questions.length) {
        resultContainer.classList.remove("hidden");
        questionsAreOver = true;
        resultText.textContent = `Правильных ответов: ${correctAnswers} из ${questions.length}`;
      }
     
      showComment();
      displayQuestion(questions[currentQuestionIndex], currentQuestionIndex);
    }, 2000);
  }
  
  function showCorrectAnswer(questionId) {
    const answerItem = document.createElement("div");
    answerItem.classList.add("answer-block");
    answerItem.id = `correctAnswer-${questionId}`;
    answerItem.textContent = questions[questionId].answers.find(answer => answer.correct).text;
  
    let currentAnswerDiv = document.getElementById(`answers-${questionId}`);
    currentAnswerDiv.appendChild(answerItem);
  }
  
  function hideCorrectAnswer() {
    for (let i = 0; i < questions.length; i++) {
      let currentAnswerDiv = document.getElementById(`answers-${i}`);
      if (currentAnswerDiv.firstChild) {
        currentAnswerDiv.removeChild(currentAnswerDiv.firstChild);
      }
    }
  }
  
  function showComment() {
    if (answeredQuestions[currentQuestionIndex - 1]) {
      const commentItem = document.createElement("div");
      commentItem.classList.add("answer-block");
      commentItem.id = `comment-${currentQuestionIndex - 1}`;
      commentItem.textContent = questions[currentQuestionIndex - 1].comment;
  
      let currentAnswerDiv = document.getElementById(`answers-${currentQuestionIndex - 1}`);
      currentAnswerDiv.appendChild(commentItem);
    }
  }
  
  function hideComment() {
    if (currentQuestionIndex > 0 && answeredQuestions[currentQuestionIndex - 1]) {
      let currentAnswerDiv = document.getElementById(`answers-${currentQuestionIndex - 1}`);
      currentAnswerDiv.removeChild(currentAnswerDiv.firstChild);
    }
  }
  
  function expandQuestion(questionItem) {
    if (expandedQuestion) {
      expandedQuestion.style.width = "";
    }
    expandedQuestion = questionItem;
  }
  
  shuffleArray(questions);
  displayQuestion(questions[currentQuestionIndex], currentQuestionIndex);