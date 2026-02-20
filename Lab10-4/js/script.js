// Переменные состояния
let eventCount = 0;
let transferDirection = 'left-to-right';
let dynamicCount = 0;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('textarea1').addEventListener('input', handleTextareaInput);
  document.getElementById('textarea2').addEventListener('input', handleTextareaInput);
});

// === События мыши ===

function handleClick(event) {
  logEvent('onclick', 'Кнопка нажата!');
  event.target.style.transform = 'scale(0.95)';
  setTimeout(() => {
    event.target.style.transform = 'scale(1)';
  }, 200);
}

function handleMouseDown(event) {
  logEvent('onmousedown', 'Кнопка зажата');
  event.target.style.backgroundColor = '#2d5016';
  event.target.style.transform = 'scale(0.9)';
}

function handleMouseUp(event) {
  logEvent('onmouseup', 'Кнопка отпущена');
  event.target.style.backgroundColor = '';
  event.target.style.transform = 'scale(1)';
}

function handleMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  document.getElementById('mouseArea').textContent = `X: ${x}px, Y: ${y}px (onmousemove)`;
}

function handleMouseLeave(event) {
  logEvent('onmouseleave', 'Мышь ушла из области');
  document.getElementById('mouseArea').textContent = 'Наведи мышь сюда (onmousemove / onmouseleave)';
  document.getElementById('mouseArea').style.backgroundColor = '#fff3cd';
  setTimeout(() => {
    document.getElementById('mouseArea').style.backgroundColor = 'white';
  }, 500);
}

// === События фокуса ===

function handleFocus(event) {
  logEvent('onfocus', 'Поле в фокусе');
  event.target.style.backgroundColor = '#e8f5e9';
}

function handleBlur(event) {
  logEvent('onblur', 'Поле потеряло фокус');
  event.target.style.backgroundColor = 'white';
}

// === Передача текста ===

function updateTransferDirection() {
  const checkbox = document.getElementById('transferCheckbox');
  const label = document.getElementById('transferLabel');
  if (checkbox.checked) {
    transferDirection = 'right-to-left';
    label.textContent = 'Текст справа → налево';
  } else {
    transferDirection = 'left-to-right';
    label.textContent = 'Текст слева → направо';
  }
}

function handleTextareaInput(event) {
  const textarea1 = document.getElementById('textarea1');
  const textarea2 = document.getElementById('textarea2');
  
  if (transferDirection === 'left-to-right') {
    if (event.target === textarea1) {
      textarea2.value = textarea1.value;
    }
  } else {
    if (event.target === textarea2) {
      textarea1.value = textarea2.value;
    }
  }
}

function transferText() {
  const textarea1 = document.getElementById('textarea1');
  const textarea2 = document.getElementById('textarea2');
  
  if (transferDirection === 'left-to-right') {
    textarea2.value = textarea1.value;
  } else {
    textarea1.value = textarea2.value;
  }
  
  logEvent('onclick', 'Текст передан: ' + (transferDirection === 'left-to-right' ? '→' : '←'));
}

// === Форматирование текста ===

function renderAsHTML(format) {
  const textarea2 = document.getElementById('textarea2');
  const text = textarea2.value.trim();
  
  if (!text) {
    alert('Пожалуйста, введите текст в поле 2');
    return;
  }
  
  const outputBox = document.getElementById('outputBox');
  let formatted = text;
  
  switch(format) {
    case 'bold':
      formatted = '<b>' + text + '</b>';
      break;
    case 'italic':
      formatted = '<i>' + text + '</i>';
      break;
    case 'underline':
      formatted = '<u>' + text + '</u>';
      break;
  }
  
  outputBox.innerHTML = 'Результат: ' + formatted;
  logEvent('onclick', 'Применен формат: ' + format);
}

// === Динамическое создание элементов ===

function createDynamicElement() {
  dynamicCount++;
  const container = document.getElementById('dynamicElements');
  
  if (container.firstChild.textContent === 'Элементы появятся здесь...') {
    container.innerHTML = '';
  }
  
  const element = document.createElement('span');
  element.className = 'dynamic-element';
  element.textContent = 'Элемент ' + dynamicCount;
  element.style.animation = 'fadeIn 0.5s ease-in-out';
  
  container.appendChild(element);
  logEvent('onclick', 'Создан элемент #' + dynamicCount);
}

// === Журнал событий ===

function logEvent(eventType, message) {
  eventCount++;
  const eventLog = document.getElementById('eventLog');
  
  if (eventLog.firstChild.textContent.includes('пуст')) {
    eventLog.innerHTML = '';
  }
  
  const timestamp = new Date().toLocaleTimeString('ru-RU');
  const eventItem = document.createElement('div');
  eventItem.className = 'event-item ' + eventType;
  eventItem.textContent = '[' + timestamp + '] ' + eventType + ': ' + message;
  
  eventLog.insertBefore(eventItem, eventLog.firstChild);
  
  if (eventLog.children.length > 20) {
    eventLog.removeChild(eventLog.lastChild);
  }
}

function clearEventLog() {
  const eventLog = document.getElementById('eventLog');
  eventLog.innerHTML = '<div class="event-item" style="color: #999;">Журнал событий пуст. Взаимодействуй с элементами!</div>';
  eventCount = 0;
  logEvent('onclick', 'Журнал очищен');
}

// Добавляем анимацию для fade-in
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);
