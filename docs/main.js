let sound = document.querySelector('.sound');
let sound_icon = document.querySelector('.sound img');
let start = document.querySelector('.start');
let input_name = document.querySelector('input.input_name');
let avatars = document.querySelectorAll('.avatars input');
let new_game = document.querySelector('.new_game');
let main_content = document.querySelector('.main_content');
let results_img = document.querySelector('.city')
let results = document.querySelector('.results span');
let messages_img = document.querySelector('.avatar')
let messages = document.querySelector('.messages span');
let input_cities_group = document.querySelector('.input_cities_group');
let input_city = document.querySelector('.input_city');
let microphone = document.querySelector('.microphone');
let microphone_icon = document.querySelector('.microphone img');
let send_city = document.querySelector('.send_city');
let finish = document.querySelector('.finish');
let is_end = document.querySelector('.is_end');
let yes = document.querySelector('.yes');
let no = document.querySelector('.no');
let end = document.querySelector('.end');
let end_img = document.querySelector('.end img')
let final_results = document.querySelector('.final_results');
let to_new_game = document.querySelector('.to_new_game');
let voices_list = document.querySelector('.voices_list');
let voices = [];

let city, usedCities, firstLetter;
let step = 0;
let allCities = {
  'а': ['Абаза', 'Абакан', 'Абдулино', 'Абинск', 'Агидель', '	Агрыз', 'Адыгейск', 'Азнакаево', 'Азов', 'Ак-Довурак', 'Аксай', 'Алагир', 'Алапаевск', 'Алатырь', 'Алдан', 'Алейск', 'Александров', 'Александровск', 'Александровск-Сахалинский', 'Алексеевка', 'Алексин', 'Алзамай', 'Алупка', 'Алушта', 'Альметьевск', 'Амурск', 'Анадырь', 'Анапа', 'Ангарск', 'Андреаполь', 'Анжеро-Судженск', 'Анива', 'Апатиты', 'Апрелевка', 'Апшеронск', 'Арамиль', 'Аргун', 'Ардатов', 'Ардон', 'Арзамас', 'Аркадак', 'Армавир', 'Армянск', 'Арсеньев', 'Арск', 'Артём', 'Артёмовск', 'Артёмовский', 'Архангельск', 'Асбест', 'Асино', 'Астрахань', 'Аткарск', 'Ахтубинск', 'Ачинск', 'Аша'],
  'б': ['Бабаево', 'Бабушкин', 'Бавлы', 'Багратионовск', 'Байкальск', 'Баймак', 'Бакал', 'Баксан', 'Балабаново', 'Балаково', 'Балахна', 'Балашиха', 'Балашов', 'Балей', 'Балтийск', 'Барабинск', 'Барнаул', 'Барыш', 'Батайск', 'Бахчисарай', 'Бежецк', 'Белая Калитва', 'Белая Холуница', 'Белгород', 'Белебей', 'Белёв', 'Белинский', 'Белово', 'Белогорск', 'Белозерск', 'Белокуриха', 'Беломорск', 'Белоозёрский', 'Белорецк', 'Белореченск', 'Белоусово', 'Белоярский', 'Белый', 'Бердск', 'Березники', 'Берёзовский', 'Беслан', 'Бийск', 'Бикин', 'Бирск', 'Бирюсинск', 'Бирюч', 'Благовещенск', 'Благодарный', 'Бобров', 'Богданович', 'Богородицк', 'Богородск', 'Боготол', 'Богучар', 'Бодайбо', 'Бокситогорск', 'Болгар', 'Бологое', 'Болотное', 'Болохово', 'Болхов', 'Большой Камень', 'Бор', 'Борзя', 'Борисоглебск', 'Боровичи', 'Боровск', 'Бородино', 'Братск', 'Бронницы', 'Брянск', 'Бугульма', 'Бугуруслан', 'Будённовск', 'Бузулук', 'Буинск', 'Буй', 'Буйнакск', 'Бутурлиновка'],
  'в': ['Вичуга', 'Владивосток', 'Волгоград', 'Вологда', 'Воронеж'], 
  'г': ['Геленджик', 'Глазов', 'Горно-Алтайск', 'Грозный', 'Гусь-Хрустальный'],
  'д': ['Дербент', 'Дзержинск', 'Дмитров', 'Долгопрудный', 'Домодедово'],
  'е': ['Евпатория', 'Ейск', 'Екатеринбург', 'Елец', 'Ессентуки'],
  'ж': ['Железногорск', 'Жигулевск', 'Жуковский'],
  'з': ['Заречный', 'Звенигород', 'Зеленогорск', 'Зеленодольск', 'Златоуст'],
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

let citiesList = [];
let grammar, recognition, speechRecognitionList;

if (SpeechRecognition != undefined) {
  for (let key in allCities) {
    for (let city of allCities[key]) {
      citiesList.push(city);
    }
  }
  grammar = '#JSGF V1.0; grammar cities; public <city> = ' + citiesList.join(' | ') + ' ;';

  recognition = new SpeechRecognition();
  speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);

  recognition.grammars = speechRecognitionList;
  recognition.lang = 'ru-RU';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = function() {
    microphone.classList.add('active');
  }

  recognition.onend = function() {
    microphone.classList.remove('active');
  }

  microphone.addEventListener('mousedown', function() {
    recognition.start();
  });

  microphone.addEventListener('touchstart', function() {
    recognition.start();
  });

  microphone.addEventListener('mouseup', function() {
    recognition.stop();
  });

  microphone.addEventListener('touchend', function() {
    recognition.stop();
  });

  recognition.onresult = function(event) {
    let last = event.results.length - 1;
    let message = getObjects(event.results[last][0].transcript);
    if (message != null) {
      input_city.value = message;
      playerStep();
    }
  };
} else {
  microphone.classList.add('passive');
}

sound.addEventListener('click', function() {
  this.classList.toggle('on');
  if (this.classList.contains('on')) {
    sound_icon.src = 'img/sound_on.png';
    sound_icon.alt = 'sound_on';
  } else {
    sound_icon.src = 'img/sound_off.png';
    sound_icon.alt = 'sound_off';
  }
});

let player_name, player_avatar;

new_game.addEventListener('click', function() {
  player_name = input_name.value;
  for (let avatar of avatars) {
    if (avatar.checked) {
      player_avatar = avatar.value;
    }
  }
  startGame();
});

send_city.addEventListener('click', function() {
  if (isInObj(standardizeCity(input_city.value), allCities)) {
    input_city.value = standardizeCity(input_city.value);
    playerStep();
  }
});

input_city.addEventListener('keypress', function(event) {
  if (event.code == 'Enter' && isInObj(standardizeCity(input_city.value), allCities)) {
    input_city.value = standardizeCity(input_city.value);
    playerStep();
  }
});

finish.addEventListener('click', stopGame);

yes.addEventListener('click', function() {
  is_end.classList.add('passive');
  finalGame();
});

no.addEventListener('click', function() {
  is_end.classList.add('passive');
  main_content.classList.remove('passive');
})

to_new_game.addEventListener('click', function() {
  step++;
  startGame();
});

function startGame() {
  usedCities = [];
  firstLetter = '';
  results_img.src = 'cities/Россия.png';
  results.innerHTML = 'Города России';
  messages_img.src = ['avatar/player' + player_avatar + '.png', 'avatar/computer.png'][step % 2];
  messages_img.alt = ['player', 'computer'][step % 2];
  messages.innerHTML = [player_name, 'Компьютер'][step % 2] + ' ходит';
  start.classList.add('passive');
  end.classList.add('passive');
  main_content.classList.remove('passive');
  if (step % 2 != 0) {
    input_cities_group.classList.add('passive');
    computerStep();
  } else {
    input_cities_group.classList.remove('passive');
  }
}

function playerStep() {
  city = input_city.value;
  input_city.value = '';
  if (!isInObj(city, usedCities) && (firstLetter == '' || isInObj(city, allCities[firstLetter]))) {
    finishStep();
  } else if (firstLetter !== undefined && !isInObj(city, allCities[firstLetter])) {
    messages.innerHTML = 'Вы должны назвать город на букву ' + '"' + firstLetter.toUpperCase() + '"' + '. Игрок ходит.';
    speak(messages.innerHTML);
  } else if (isInObj(city, usedCities)) {
    messages.innerHTML = 'Такой город уже был. Игрок ходит.';
    speak(messages.innerHTML);
  } 
}

function computerStep() {
  if (firstLetter == '') {
    let key = Object.keys(allCities)[getRandomInt(0, Object.keys(allCities).length - 1)];
    city = allCities[key][getRandomInt(0, allCities[key].length - 1)];
    setTimeout(function() {
      finishStep(); 
    }, getRandomInt(3000, 15000));
  } else {
    let arr = getDiff(allCities[firstLetter], usedCities);
    if (arr.length == 0) {      
      setTimeout(function() {
        main_content.classList.add('passive');
        finalGame();
      }, 20000);
    } else {
      city = arr[getRandomInt(0, arr.length - 1)];
      setTimeout(function () {
        finishStep();
      }, getRandomInt(3000, 15000));
    }
  }    
}

function finishStep() {
  step++;
  results_img.src = 'cities/' + city + '.png';
  results.innerHTML = city;
  messages_img.src = ['avatar/player' + player_avatar + '.png', 'avatar/computer.png'][step % 2];
  messages_img.alt = ['player', 'computer'][step % 2];
  messages.innerHTML = [player_name, 'Принято. Компьютер'][step % 2] + ' ходит.';
  firstLetter = findFirstLetter(city);
  usedCities.push (city);
  if (step % 2 == 0) {
    speak(results.innerHTML);
    input_cities_group.classList.remove('passive');
  } else {
    speak(messages.innerHTML);
    input_cities_group.classList.add('passive');
    computerStep();
  }
}

function stopGame() {
  is_end.classList.remove('passive');
  main_content.classList.add('passive');
}

function finalGame() {
  end.classList.remove('passive');
  end_img.src = ['avatar/computer.png', 'avatar/player' + player_avatar + '.png'][step % 2];
  end_img.alt = ['computer', 'player'][step % 2];
  final_results.innerHTML = ['Сожалею, Вы проиграли. Компьютер выиграл!', 'Поздравляю! Вы победили!'][step % 2];
  speak(final_results.innerHTML);
}

function getObjects(speechResult) {
  for (let i = 0; i < citiesList.length; i++) {
    if (speechResult.indexOf(citiesList[i]) !== -1) {
      let object = citiesList[i];
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

function standardizeElem(elem) {
  let arr = elem.split('');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == ' ' || arr[i] == '_' || arr[i] == '-') {
      arr[i] = '';
    } else if (arr[i] == 'ё') {
      arr[i] = 'е';
    }
  }
  elem = arr.join('').toLowerCase();
  return elem;
}

function standardizeCity(city) {
  for (let key in allCities) {
    for (let elem of allCities[key]) {
      if (standardizeElem(elem) == standardizeElem(city)) {
        return elem;
      }
    }
  }
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

  for(i = 0; i < voices.length ; i++) {
    if(voices[i].lang == 'ru-RU' || voices[i].lang == 'ru_RU') {
      let option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voices_list.appendChild(option);
    }
  }
}

function speak(message) {
  if (sound.classList.contains('on')) {
    let utterThis = new SpeechSynthesisUtterance(message);
    let selectedOption = voices_list.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = 0.2;
    utterThis.rate = 1;
    synth.speak(utterThis);
  }
}