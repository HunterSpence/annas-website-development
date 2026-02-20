// Custom selector function
function $(id) {
  return document.getElementById(id);
}

// Log function with timestamp
function zapisat_v_log(text) {
  var log = $('log');
  var zapis = document.createElement('div');
  var vremya = new Date();
  var chas = String(vremya.getHours()).padStart(2, '0');
  var minuta = String(vremya.getMinutes()).padStart(2, '0');
  var sekunda = String(vremya.getSeconds()).padStart(2, '0');
  zapis.textContent = '[' + chas + ':' + minuta + ':' + sekunda + '] ' + text;
  log.insertBefore(zapis, log.firstChild);
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

// Get all element references
var knopka1 = $('knopka1');
var knopka2 = $('knopka2');
var chek_perenos = $('chek_perenos');
var btn_perenesti = $('btn_perenesti');
var btn_zhir = $('btn_zhir');
var btn_kursiv = $('btn_kursiv');
var btn_podcherk = $('btn_podcherk');
var btn_noviy = $('btn_noviy');
var pole1 = $('pole1');
var pole2 = $('pole2');
var vyvod_html = $('vyvod_html');
var zona = $('zona');

// Button click events
knopka1.onclick = function() {
  zapisat_v_log('Клик по Кнопка 1');
};

knopka2.onclick = function() {
  zapisat_v_log('Клик по Кнопка 2');
};

// Transfer button mousedown/mouseup
btn_perenesti.onmousedown = function() {
  zapisat_v_log('onmousedown: Перенести текст нажата');
};

btn_perenesti.onmouseup = function() {
  zapisat_v_log('onmouseup: Перенести текст отпущена');
};

// Focus/blur events for textareas
pole1.onfocus = function() {
  zapisat_v_log('onfocus: Поле 1 получило фокус');
};

pole1.onblur = function() {
  zapisat_v_log('onblur: Поле 1 потеряло фокус');
};

pole2.onfocus = function() {
  zapisat_v_log('onfocus: Поле 2 получило фокус');
};

pole2.onblur = function() {
  zapisat_v_log('onblur: Поле 2 потеряло фокус');
};

// Throttled mousemove in dynamic zone
var posledneye_vremya_move = 0;
zona.onmousemove = function(e) {
  var teper = Date.now();
  if (teper - posledneye_vremya_move >= 250) {
    var x = e.offsetX;
    var y = e.offsetY;
    zapisat_v_log('onmousemove: x=' + x + ', y=' + y);
    posledneye_vremya_move = teper;
  }
};

zona.onmouseleave = function() {
  zapisat_v_log('onmouseleave: курсор покинул зону');
};

// Transfer text between textareas
btn_perenesti.onclick = function() {
  if (chek_perenos.checked) {
    pole2.value = pole1.value;
    zapisat_v_log('Текст перенесён: Поле 1 → Поле 2');
  } else {
    pole1.value = pole2.value;
    zapisat_v_log('Текст перенесён: Поле 2 → Поле 1');
  }
};

// HTML formatting function
function pokazat_html(open, close, tip) {
  var tekst = pole1.value;
  var ekranirovanniy = ekraniruy_html(tekst);
  var rezultat = open + ekranirovanniy + close;
  vyvod_html.innerHTML = rezultat;
  zapisat_v_log('Применено форматирование: ' + tip);
}

// Format buttons
btn_zhir.onclick = function() {
  pokazat_html('<b>', '</b>', 'жирный');
};

btn_kursiv.onclick = function() {
  pokazat_html('<i>', '</i>', 'курсив');
};

btn_podcherk.onclick = function() {
  pokazat_html('<u>', '</u>', 'подчёркнутый');
};

// Dynamic element creation
var schetchik = 0;
btn_noviy.onclick = function() {
  schetchik++;
  var noviy_elem = document.createElement('div');
  noviy_elem.className = 'dyn';
  noviy_elem.textContent = 'Элемент №' + schetchik;
  
  noviy_elem.onclick = function() {
    zapisat_v_log('Клик по элементу №' + schetchik);
  };
  
  noviy_elem.onmousedown = function() {
    zapisat_v_log('onmousedown: элемент №' + schetchik);
  };
  
  noviy_elem.onmouseup = function() {
    zapisat_v_log('onmouseup: элемент №' + schetchik);
  };
  
  noviy_elem.onmouseleave = function() {
    zapisat_v_log('onmouseleave: элемент №' + schetchik);
  };
  
  zona.appendChild(noviy_elem);
  zapisat_v_log('Создан новый элемент №' + schetchik);
};
