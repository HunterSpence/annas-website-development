// Custom selector function
function $(id) {
  return document.getElementById(id);
}

// Log function with timestamp
function zapisat_v_log(text) {
  const logDiv = $('log');
  const zapisiDiv = document.createElement('div');
  const vremya = new Date();
  const chasi = String(vremya.getHours()).padStart(2, '0');
  const minuti = String(vremya.getMinutes()).padStart(2, '0');
  const sekundi = String(vremya.getSeconds()).padStart(2, '0');
  const millisekundi = String(vremya.getMilliseconds()).padStart(3, '0');
  const vremyaStrok = `${chasi}:${minuti}:${sekundi}.${millisekundi}`;
  
  zapisiDiv.textContent = `[${vremyaStrok}] ${text}`;
  logDiv.insertBefore(zapisiDiv, logDiv.firstChild);
}

// HTML escape function
function ekraniruy_html(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Get element references
const knopka1 = $('knopka1');
const knopka2 = $('knopka2');
const chek_perenos = $('chek_perenos');
const btn_perenesti = $('btn_perenesti');
const btn_zhir = $('btn_zhir');
const btn_kursiv = $('btn_kursiv');
const btn_podcherk = $('btn_podcherk');
const btn_noviy = $('btn_noviy');
const pole1 = $('pole1');
const pole2 = $('pole2');
const vyvod_html = $('vyvod_html');
const zona = $('zona');

// Button click handlers
knopka1.onclick = function() {
  zapisat_v_log('Нажата Кнопка 1');
};

knopka2.onclick = function() {
  zapisat_v_log('Нажата Кнопка 2');
};

// Transfer button mousedown/mouseup
btn_perenesti.onmousedown = function() {
  zapisat_v_log('Нажата кнопка мыши на "Перенести текст"');
};

btn_perenesti.onmouseup = function() {
  zapisat_v_log('Отпущена кнопка мыши на "Перенести текст"');
};

// Transfer button click handler
btn_perenesti.onclick = function() {
  if (chek_perenos.checked) {
    // Transfer from pole1 to pole2
    pole2.value = pole1.value;
    zapisat_v_log('Текст перенесён из поля 1 в поле 2');
  } else {
    // Transfer from pole2 to pole1
    pole1.value = pole2.value;
    zapisat_v_log('Текст перенесён из поля 2 в поле 1');
  }
};

// Textarea focus/blur handlers
pole1.onfocus = function() {
  zapisat_v_log('Поле 1 получило фокус');
};

pole1.onblur = function() {
  zapisat_v_log('Поле 1 потеряло фокус');
};

pole2.onfocus = function() {
  zapisat_v_log('Поле 2 получило фокус');
};

pole2.onblur = function() {
  zapisat_v_log('Поле 2 потеряло фокус');
};

// Throttled mousemove for zona
let posledneye_vremya_mousemove = 0;

zona.onmousemove = function(e) {
  const teper = Date.now();
  if (teper - posledneye_vremya_mousemove >= 250) {
    const x = e.offsetX;
    const y = e.offsetY;
    zapisat_v_log(`Мышь в зоне: x=${x}, y=${y}`);
    posledneye_vremya_mousemove = teper;
  }
};

zona.onmouseleave = function() {
  zapisat_v_log('Мышь покинула зону');
};

// HTML formatting function
function pokazat_html(otkr, zakr, tip) {
  const tekst = pole1.value;
  const ekranirovanniy = ekraniruy_html(tekst);
  const s_tegami = otkr + ekranirovanniy + zakr;
  vyvod_html.innerHTML = s_tegami;
  zapisat_v_log(`Применено форматирование: ${tip}`);
}

// Format button handlers
btn_zhir.onclick = function() {
  pokazat_html('<b>', '</b>', 'жирный');
};

btn_kursiv.onclick = function() {
  pokazat_html('<i>', '</i>', 'курсив');
};

btn_podcherk.onclick = function() {
  pokazat_html('<u>', '</u>', 'подчёркнутый');
};

// Dynamic element creation with counter
let schetchik = 0;

btn_noviy.onclick = function() {
  schetchik++;
  const noviy_elem = document.createElement('div');
  noviy_elem.className = 'dyn';
  noviy_elem.textContent = `Элемент ${schetchik}`;
  
  // Add event handlers to the new element
  noviy_elem.onclick = function() {
    zapisat_v_log(`Клик по элементу ${schetchik}`);
  };
  
  noviy_elem.onmousedown = function() {
    zapisat_v_log(`Нажата кнопка мыши на элементе ${schetchik}`);
  };
  
  noviy_elem.onmouseup = function() {
    zapisat_v_log(`Отпущена кнопка мыши на элементе ${schetchik}`);
  };
  
  noviy_elem.onmouseleave = function() {
    zapisat_v_log(`Мышь покинула элемент ${schetchik}`);
  };
  
  zona.appendChild(noviy_elem);
  zapisat_v_log(`Создан элемент ${schetchik}`);
};

// Initial log message
zapisat_v_log('Страница загружена. Все обработчики событий готовы.');
