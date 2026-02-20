// DOM Elements
const textarea1 = document.getElementById('textarea1');
const textarea2 = document.getElementById('textarea2');
const transferToggle = document.getElementById('transferToggle');
const transferBtn = document.getElementById('transferBtn');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const underlineBtn = document.getElementById('underlineBtn');
const formattedText = document.getElementById('formattedText');
const createBtn = document.getElementById('createBtn');
const dynamicContainer = document.getElementById('dynamicContainer');
const eventLog = document.getElementById('eventLog');
const clearLogBtn = document.getElementById('clearLogBtn');

// Logging function
function logEvent(eventType, element) {
  const timestamp = new Date().toLocaleTimeString('ru-RU');
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = `[${timestamp}] ${eventType}`;
  eventLog.insertBefore(entry, eventLog.firstChild);
  
  // Keep only last 20 entries
  while (eventLog.children.length > 20) {
    eventLog.removeChild(eventLog.lastChild);
  }
}

// Transfer text between textareas
transferBtn.addEventListener('click', function() {
  logEvent('onclick на кнопке переноса', this);
  
  if (transferToggle.checked) {
    // Right to left
    textarea1.value = textarea2.value;
  } else {
    // Left to right
    textarea2.value = textarea1.value;
  }
});

// Textarea 1 events
textarea1.addEventListener('focus', function() {
  logEvent('onfocus на первую область', this);
});

textarea1.addEventListener('blur', function() {
  logEvent('onblur на первую область', this);
});

textarea1.addEventListener('mousedown', function() {
  logEvent('onmousedown на первую область', this);
});

textarea1.addEventListener('mousemove', function() {
  // Throttle mousemove logging
  this.dataset.lastMove = Date.now();
});

textarea1.addEventListener('mouseleave', function() {
  logEvent('onmouseleave первую область', this);
});

textarea1.addEventListener('mouseup', function() {
  logEvent('onmouseup на первую область', this);
});

// Textarea 2 events
textarea2.addEventListener('focus', function() {
  logEvent('onfocus на вторую область', this);
});

textarea2.addEventListener('blur', function() {
  logEvent('onblur на вторую область', this);
});

textarea2.addEventListener('mousedown', function() {
  logEvent('onmousedown на вторую область', this);
});

textarea2.addEventListener('mousemove', function() {
  this.dataset.lastMove = Date.now();
});

textarea2.addEventListener('mouseleave', function() {
  logEvent('onmouseleave вторую область', this);
});

textarea2.addEventListener('mouseup', function() {
  logEvent('onmouseup на вторую область', this);
});

// Formatting buttons
boldBtn.addEventListener('click', function() {
  logEvent('onclick на кнопку "Жирный"', this);
  const text = textarea1.value || 'Образец текста';
  formattedText.innerHTML = `<b>${text}</b>`;
});

boldBtn.addEventListener('focus', function() {
  logEvent('onfocus на кнопку "Жирный"', this);
});

boldBtn.addEventListener('blur', function() {
  logEvent('onblur на кнопку "Жирный"', this);
});

italicBtn.addEventListener('click', function() {
  logEvent('onclick на кнопку "Курсив"', this);
  const text = textarea1.value || 'Образец текста';
  formattedText.innerHTML = `<i>${text}</i>`;
});

italicBtn.addEventListener('focus', function() {
  logEvent('onfocus на кнопку "Курсив"', this);
});

italicBtn.addEventListener('blur', function() {
  logEvent('onblur на кнопку "Курсив"', this);
});

underlineBtn.addEventListener('click', function() {
  logEvent('onclick на кнопку "Подчёркнутый"', this);
  const text = textarea1.value || 'Образец текста';
  formattedText.innerHTML = `<u>${text}</u>`;
});

underlineBtn.addEventListener('focus', function() {
  logEvent('onfocus на кнопку "Подчёркнутый"', this);
});

underlineBtn.addEventListener('blur', function() {
  logEvent('onblur на кнопку "Подчёркнутый"', this);
});

// Create dynamic element
createBtn.addEventListener('click', function() {
  logEvent('onclick на кнопку "Создать элемент"', this);
  
  const element = document.createElement('div');
  element.className = 'dynamic-element';
  element.textContent = `Элемент #${dynamicContainer.children.length + 1}`;
  
  element.addEventListener('click', function() {
    logEvent('onclick на динамический элемент', this);
    this.remove();
  });
  
  element.addEventListener('mousedown', function() {
    logEvent('onmousedown на динамический элемент', this);
  });
  
  element.addEventListener('mouseup', function() {
    logEvent('onmouseup на динамический элемент', this);
  });
  
  dynamicContainer.appendChild(element);
});

createBtn.addEventListener('focus', function() {
  logEvent('onfocus на кнопку "Создать"', this);
});

createBtn.addEventListener('blur', function() {
  logEvent('onblur на кнопку "Создать"', this);
});

// Clear log
clearLogBtn.addEventListener('click', function() {
  logEvent('onclick на кнопку "Очистить"', this);
  eventLog.innerHTML = '';
});

// Initial event
window.addEventListener('load', function() {
  logEvent('⚡ Страница загружена', document);
});
