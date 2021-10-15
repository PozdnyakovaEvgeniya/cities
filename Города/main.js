let input_city = document.querySelector('.input_city');
let send_city = document.querySelector('.send_city');
let results = document.querySelector('.results');
let messages = document.querySelector('.messages');
let command = document.querySelector('.commands');
let start = document.querySelector('.start');
let finish = document.querySelector('.finish');
let microphone = document.querySelector('.microphone');
let microphone_icon = document.querySelector('.microphone img');
let voices_list = document.querySelector('.voices_list');
let voices = [];

let city, usedCities, firstLetter, game;
let step = 0;
let commands = ['новая игра', 'сдаться'];
let allCities = {
  'а': ['Абакан', 'Азов', 'Александров', 'Алексин', 'Альметьевск', 'Алушта', 'Анапа', 'Ангарск', 'Арзамас', 'Армавир', 'Артем', 'Архангельск', 'Астрахань', 'Асбест', 'Ачинск'],
  'б': ['Барнаул', 'Бийск', 'Благовещенск', 'Братск', 'Брянск'],
  'в': ['Вичуга', 'Вологда', 'Воронеж', 'Волгоград', 'Владивосток'],
  'г': ['Геленджик', 'Глазов', 'Горно-Алтайск', 'Грозный', 'Гусь-Хрустальный'],
  'д': ['Дербент', 'Дзержинск', 'Дмитров', 'Долгопрудный', 'Домодедово'],
  'е': ['Евпатория', 'Ейск', 'Екатеринбург', 'Елец', 'Ессентуки'],
  'ж': ['Железногорск', 'Жигулевск', 'Жуковский'],
  'з': ['Заречный', 'Зеленогорск', 'Зеленодольск', 'Златоуст'],
  'и': ['Иваново', 'Ивантеевка', 'Ижевск', 'Иркутск', 'Ишим'],
  'к': ['Казань', 'Калининград', 'Калуга', 'Кемерово', 'Киров', 'Кисловодск', 'Клинцы', 'Ковров', 'Комсомольск-на-Амуре', 'Кострома', 'Краснодар', 'Красноярск', 'Курган', 'Курск', 'Кызыл'],
  'л': ['Лениногорск', 'Липецк', 'Лобня', 'Лысьва', 'Люберцы'],
  'м': ['Магадан', 'Магнитогорск', 'Махачкала', 'Москва', 'Мурманск'],
  'н': ['Нефтеюганск', 'Нижневартовск', 'Новокузнецк', 'Новосибирск', 'Норильск'],
  'о': ['Обнинск', 'Омск', 'Орел', 'Оренбург', 'Орск'],
  'п': ['Пенза', 'Пермь', 'Подольск', 'Псков', 'Пушкино'],
  'р': ['Раменское', 'Ржев', 'Ростов-на-Дону', 'Рыбинск', 'Рязань'],
  'с': ['Самара', 'Саратов', 'Севастополь', 'Симферополь', 'Сочи'],
  'т': ['Таганрог', 'Тамбов', 'Тверь', 'Тольятти', 'Тула'],
  'у': ['Улан-Удэ', 'Ульяновск', 'Уссурийск', 'Уфа', 'Ухта'],
  'ф': ['Феодосия', 'Фрязино'],
  'х': ['Хабаровск', 'Ханты-Мансийск', 'Хасавюрт', 'Химки'],
  'ц': ['Цивильск', 'Цимлянск', 'Циолковский'],
  'ч': ['Чайковский', 'Чебоксары', 'Челябинск', 'Череповец', 'Чита'],
  'ш': ['Шадринск', 'Шахты'],
  'щ': ['Щекино', 'Щелково'],
  'э': ['Электросталь', 'Элиста', 'Энгельс'],
  'ю': ['Южно-Сахалинск', 'Юрга'],
  'я': ['Якутск', 'Ялта', 'Ярославль']
};

 let synth = window.speechSynthesis;
 populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
let SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

let commandsList = Object.values(commands);
for (let key in allCities) {
  for (let city of allCities[key]) {
    commandsList.push(city);
  }
}
let grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commandsList.join(' | ') + ' ;';

let recognition = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.lang = 'ru-RU';
recognition.continuous = true;
recognition.interimResults = true;


recognition.onend = function() {
  if (microphone.classList.contains('on')) {
    recognition.start();
  }
};

recognition.start(); 
startGame();

microphone.addEventListener('click', function() {
  if (this.classList.contains('on')) {
    recognition.stop();
    microphone_icon.src = 'img/microphone_on.png';
    microphone_icon.alt = 'microphone_turnon';
  } else {  
    recognition.start();
    microphone_icon.alt = 'microphone_turnoff';  
    microphone_icon.src = 'img/microphone_off.png';
  }
  this.classList.toggle('on');
});

recognition.onresult = function(event) {
  let last = event.results.length - 1;
  let message = getObjects(event.results[last][0].transcript);
  if (isInObj(message, commands)) {
    if (message == 'новая игра' && game == 'off') {
      startGame();
    } else if (message == 'сдаться' && game == 'on' && step % 2 == 0) {
      stopGame();
    }
  } else if (isInObj(message, allCities) && game == 'on' && step % 2 == 0) {
    input_city.value = message;
    playerStep();
  }
};

send_city.addEventListener('click', function() {
  if (game == 'on' && isInObj(standardizeCity(input_city.value), allCities)) {
    input_city.value = standardizeCity(input_city.value);
    playerStep();
  }
});

input_city.addEventListener('keypress', function(event) {
  if (event.code == 'Enter' && game == 'on' && isInObj(standardizeCity(input_city.value), allCities)) {
    input_city.value = standardizeCity(input_city.value);
    playerStep();
  }
});

start.addEventListener('click', startGame);

finish.addEventListener('click', stopGame);

function playerStep() {
  city = input_city.value;
  input_city.value = '';
  if (!isInObj(city, usedCities) && (firstLetter == '' || isInObj(city, allCities[firstLetter]))) {
    finishStep();
  } else if (firstLetter !== undefined && !isInObj(city, allCities[firstLetter])) {
    messages.innerHTML = 'Вы должны назвать город на букву ' + firstLetter.toUpperCase() + '. Игрок ходит.';
    speak();
  } else if (isInObj(city, usedCities)) {
    messages.innerHTML = 'Такой город уже был. Игрок ходит.';
    speak();
  } 
}

function computerStep() {
  finish.classList.remove('active');
  if (firstLetter == '') {
    let key = Object.keys(allCities)[getRandomInt(0, Object.keys(allCities).length - 1)];
    city = allCities[key][getRandomInt(0, allCities[key].length - 1)];
    setTimeout(finishStep, getRandomInt(3000, 15000));
  } else {
    let arr = getDiff(allCities[firstLetter], usedCities);
    if (arr.length == 0) {      
      setTimeout(function() {
        stopGame();
      }, 20000);
    } else {
      city = arr[getRandomInt(0, arr.length - 1)];
      setTimeout(finishStep, getRandomInt(3000, 15000));
    }
  }    
}

function startGame() {
  game = 'on';
  usedCities = [];
  firstLetter = '';
  results.innerHTML = '';
  start.classList.remove('active');  
  messages.innerHTML = ['Игрок', 'Компьютер'][step % 2] + ' ходит';
  if (step % 2 != 0) {
    computerStep();
  }
}

function stopGame() {
  messages.innerHTML = ['Вы проиграли!', 'Сдаюсь. Вы победили!'][step % 2];
  finish.classList.remove('active');
  step++;
  game = 'off';
  start.classList.add('active');
  speak();
}

function finishStep() {
  step++;
  results.innerHTML = city;
  messages.innerHTML = ['Игрок', 'Принято. Компьютер'][step % 2] + ' ходит.';
  firstLetter = findFirstLetter(city);
  usedCities.push (city);
  speak();
  if (step % 2 != 0) {
    computerStep();
  } else {
    finish.classList.add('active');
  }
}

function getObjects(speechResult) {
  for (let i = 0; i < commandsList.length; i++) {
    if (speechResult.indexOf(commandsList[i]) !== -1) {
      let object = commandsList[i];
      return object;
    }
  }
  return null;
}

function isInObj(elem, obj) {
  for (let key in obj) {
    if (typeof obj[key] == 'object' && isInObj(elem, obj[key])) {
      return true;
    } else if (typeof obj[key] != 'object' && elem == obj[key]) {
      return true;
    }
  }  
  return false;  
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
} 

function getDiff(arr1, arr2) {
  let result = [];
  for (let elem of arr1) {
    if (!isInObj(elem, arr2)) {
      result.push(elem);
    }
  }
  return result;
}

function standardizeCity(str) {
  let arr = str.split('');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == ' ' || arr[i] == '_') {
      arr[i] = '-';
    }
  }
  str = arr.join('');
  for (let key in allCities) {
    for (let elem of allCities[key]) {
      if (str.toLowerCase() == elem.toLowerCase()) {
        return elem;
      }
    }
  }
}

function findFirstLetter(elem) {
  for (let i = elem.length - 1; i >= 0; i--) {
    if (elem[i] == 'й') {
      return 'и';
    } else if (isInObj(elem[i], Object.keys(allCities))) {
      return elem[i];
    }
  }
}

function populateVoiceList() {
  voices = synth.getVoices();
  let selectedIndex =
  voices_list.selectedIndex < 0 ? 0 : voices_list.selectedIndex;
  voices_list.innerHTML = '';

  for(i = 0; i < voices.length ; i++) {
    let option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voices_list.appendChild(option);
  }
  voices_list.selectedIndex = selectedIndex;
}

function speak() {
  if (messages.innerHTML == 'Игрок ходит.') {
    let utterThis = new SpeechSynthesisUtterance(results.innerHTML);
    let selectedOption = voices_list.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = 0.2;
    utterThis.rate = 1.5;
    synth.speak(utterThis);
  } else {
    let utterThis = new SpeechSynthesisUtterance(messages.innerHTML);
    let selectedOption = voices_list.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = 0.2;
    utterThis.rate = 1.5;
    synth.speak(utterThis);
  }
}