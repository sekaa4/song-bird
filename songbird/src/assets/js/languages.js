export const languages = {
  en: {
    titleName: 'SongBird',
    linkAbout: 'About',
    linkQuiz: 'Quiz',
    linkResult: 'Result',
    linkGallery: 'Gallery',
    aboutTitle: 'Welcome to the quiz!',
    aboutText: 'In this quiz you have to choose the birds according to their singing',
    digital: 'Digital 2022',
    aboutList1: 'at the beginning of the game you will have 0 points;',
    aboutList2: 'when you click on the answer option with the name of the bird, information about it will be displayed in the block with the description of the bird;',
    aboutList3: 'if the correct answer is given on the first attempt, the score increases by 5 points;',
    aboutList4: 'if the correct answer is selected, the name and image of the bird will be displayed in the question block, keep in mind that each subsequent attempt gives one point less, if the correct answer is given only on the last attempt, you will get 0 points;',
    aboutList5: 'points for all questions are summed up;',
    aboutList6: 'if the correct answer is given, the "Next" button is activated and it is possible to move on to the next question;',
    aboutList7: 'after the last question, a page with the results of the game is displayed;',
    aboutButton: 'Start the Quiz',
    score: 'Score: ',
    item1: 'Training',
    item2: 'Sparrows',
    item3: 'Forest birds',
    item4: 'Song birds',
    item5: 'Birds of prey',
    item6: 'Seabirds',
    nextQuestion: 'Next Level',


    spanListen: 'Listen to the player.',
    spanChoose: 'Select a bird from the list.',
    cancelButton: 'Cancel',
    finish: 'Complete the Quiz',
    finishText: 'This is the last question, the transition will be performed automatically, after 5 seconds, after the correct answer or after pressing the button, to cancel the automatic transition, click "Cancel transition"',

    h1Win: 'Congratulations!',
    h1Lose: `You haven't taken the Quiz yet, you can do it right now`,
    pWin() {
      return `You passed the quiz and scored ${languages.result}`;
    },
    pLose() {
      return `You passed the quiz and scored ${languages.result} out of 30 possible points, but it could have been better, you can try to take the Quiz again, now it will be easier to do it! Good luck!`;
    },
    buttonResult: 'Start the Quiz',
  },
  ru: {
    titleName: 'Пение птиц',
    linkAbout: 'Об Викторине',
    linkQuiz: 'Викторина',
    linkResult: 'Результат',
    linkGallery: 'Галлерея',
    aboutTitle: 'Добро пожаловать на викторину!',
    aboutText: 'В данной викторине вам предстоит выбирать птиц согласно их пения',
    digital: 'Выпуск 2022',
    aboutList1: 'в начале игры у вас будет 0 баллов;',
    aboutList2: 'при нажатии по варианту ответа с названием птицы, в блоке с описанием птицы будет выведена информация о ней;',
    aboutList3: 'если дан правильный ответ с первой попытки, счёт увеличивается на 5 баллов;',
    aboutList4: 'если выбран правильный ответ, в блоке с вопросом будет выведено название и изображение птицы, учитывайте, что каждая следующая попытка даёт на один балл меньше, если правильный ответ дан только с последней попытки, вы получите 0 баллов;',
    aboutList5: 'баллы за все вопросы суммируются;',
    aboutList6: 'если дан правильный ответ, активируется кнопка "Дальше" и появляется возможность перейти к следующему вопросу;',
    aboutList7: 'после последнего вопроса выводится страница с результатами игры;',
    aboutButton: 'Начать Викторину',
    score: 'Счёт:',
    item1: 'Разминка',
    item2: 'Воробьиные',
    item3: 'Лесные птицы',
    item4: 'Певчие птицы',
    item5: 'Хищные птицы',
    item6: 'Морские птицы',
    nextQuestion: 'Следующий вопрос',

    spanListen: 'Послушайте плеер.',
    spanChoose: 'Выберите птицу из списка.',
    cancelButton: 'Отмена перехода',
    finish: 'Завершить Викторину',
    finishText: 'Это последний вопрос, переход будет выполнен автоматически, спустя 5 сек, после правильного ответа или после нажатия на кнопку, для отмены автоматического перехода, нажмите "Отмена перехода"',

    h1Win: 'Поздравляем!',
    h1Lose: 'Вы ещё не проходили Викторину, вы можете это сделать прямо сейчас',
    pWin() {
      return `Вы прошли викторину и набрали ${languages.result}`;
    },
    pLose() {
      return `Вы прошли викторину и набрали ${languages.result} из 30 возможных баллов, но могло бы быть и лучше, можете попробовать пройти Викторину ещё раз, теперь это будет сделать проще! Удачи!`;
    },
    buttonResult: 'Начать Викторину',
  },
};
