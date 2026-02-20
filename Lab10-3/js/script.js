const textarea1 = document.getElementById('textarea1');
const textarea2 = document.getElementById('textarea2');
const eventLog = document.getElementById('eventLog');
const checkbox = document.getElementById('transferDir');
const dynamicContainer = document.getElementById('dynamicContainer');
let logCount = 0;

function logEvent(eventName) {
  logCount++;
  const timestamp = new Date().toLocaleTimeString('ru-RU');
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = `${logCount}. [${timestamp}] ${eventName}`;
  eventLog.appendChild(entry);
  eventLog.scrollTop = eventLog.scrollHeight;
}

// Event handlers for event demo
document.getElementById('eventDemo').addEventListener('click', function() {
  this.style.background = '#2563eb';
  this.style.color = 'white';
  logEvent('onclick - нажата демонстрационная кнопка');
  setTimeout(() => { this.style.background = 'white'; this.style.color = '#2563eb'; }, 300);
});

document.getElementById('eventDemo').addEventListener('mousedown', function() {
  this.style.transform = 'scale(0.95)';
  logEvent('onmousedown - нажата кнопка мыши');
});

document.getElementById('eventDemo').addEventListener('mouseup', function() {
  this.style.transform = 'scale(1)';
  logEvent('onmouseup - отпущена кнопка мыши');
});

document.getElementById('eventDemo').addEventListener('mousemove', function(e) {
  logEvent(`onmousemove - позиция мыши: ${e.clientX}px, ${e.clientY}px`);
});

document.getElementById('eventDemo').addEventListener('mouseleave', function() {
  this.style.transform = 'scale(1)';
  logEvent('onmouseleave - мышь покинула область');
});

textarea1.addEventListener('focus', function() {
  logEvent('onfocus - фокус на первое текстовое поле');
});

textarea1.addEventListener('blur', function() {
  logEvent('onblur - потеря фокуса с первого поля');
});

textarea2.addEventListener('focus', function() {
  logEvent('onfocus - фокус на второе текстовое поле');
});

textarea2.addEventListener('blur', function() {
  logEvent('onblur - потеря фокуса со второго поля');
});

// Transfer text between textareas
function transferText() {
  const checked = checkbox.checked;
  if (checked && textarea1.value) {
    textarea2.value = textarea1.value;
    logEvent('Текст скопирован из поля 1 в поле 2');
  } else if (!checked && textarea2.value) {
    textarea1.value = textarea2.value;
    logEvent('Текст скопирован из поля 2 в поле 1');
  }
}

textarea1.addEventListener('input', transferText);
textarea2.addEventListener('input', transferText);

// HTML rendering buttons
document.getElementById('boldBtn').addEventListener('click', function() {
  const text = textarea1.value;
  if (text) {
    textarea2.value = '<b>' + text + '</b>';
    logEvent('Применено форматирование: жирный текст');
  }
});

document.getElementById('italicBtn').addEventListener('click', function() {
  const text = textarea1.value;
  if (text) {
    textarea2.value = '<i>' + text + '</i>';
    logEvent('Применено форматирование: курсив');
  }
});

document.getElementById('underlineBtn').addEventListener('click', function() {
  const text = textarea1.value;
  if (text) {
    textarea2.value = '<u>' + text + '</u>';
    logEvent('Применено форматирование: подчеркивание');
  }
});

// Dynamic element creation
document.getElementById('createBtn').addEventListener('click', function() {
  const newElement = document.createElement('div');
  newElement.className = 'dynamic-element';
  newElement.innerHTML = `Новый элемент #${dynamicContainer.children.length + 1}<br><button onclick="this.parentElement.remove()">Удалить</button>`;
  dynamicContainer.appendChild(newElement);
  logEvent('Создан новый динамический элемент');
});

logEvent('Страница загружена - готово к работе');
