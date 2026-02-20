// Custom selector function
function $(id) {
  return document.getElementById(id);
}

// Log function with timestamp
function zapisat_v_log(text) {
  var log = $('log');
  var zapis = document.createElement('div');
  var vremya = new Date();
  var chasy = String(vremya.getHours()).padStart(2, '0');
  var minuty = String(vremya.getMinutes()).padStart(2, '0');
  var sekundy = String(vremya.getSeconds()).padStart(2, '0');
  var vremya_str = chasy + ':' + minuty + ':' + sekundy;
  zapis.textContent = '[' + vremya_str + '] ' + text;
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

// Button 1 click
knopka1.onclick = function() {
  zapisat_v_log('Кнопка 1: onclick');
};

// Button 2 click
knopka2.onclick = function() {
  zapisat_v_log('Кнопка 2: onclick');
};

// Transfer button mousedown/mouseup
btn_perenesti.onmousedown = function() {
  zapisat_v_log('Кнопка "Перенести": onmousedown');
};

btn_perenesti.onmouseup = function() {
  zapisat_v_log('Кнопка "Перенести": onmouseup');
};

// Field 1 focus/blur
pole1.onfocus = function() {
  zapisat_v_log('Поле 1: onfocus');
};

pole1.onblur = function() {
  zapisat_v_log('Поле 1: onblur');
};

// Field 2 focus/blur
pole2.onfocus = function() {
  zapisat_v_log('Поле 2: onfocus');
};

pole2.onblur = function() {
  zapisat_v_log('Поле 2: onblur');
};

// Zone mousemove (throttled at 250ms)
var posledneye_vremya_mousemove = 0;

zona.onmousemove = function(e) {
  var teper = Date.now();
  if (teper - posledneye_vremya_mousemove >= 250) {
    var x = e.clientX;
    var y = e.clientY;
    zapisat_v_log('Зона: onmousemove, x=' + x + ', y=' + y);
    posledneye_vremya_mousemove = teper;
  }
};

// Zone mouseleave
zona.onmouseleave = function() {
  zapisat_v_log('Зона: onmouseleave');
};

// Transfer button click - transfer text between fields
btn_perenesti.onclick = function() {
  if (chek_perenos.checked) {
    pole2.value = pole1.value;
    zapisat_v_log('Текст перенесён из поля 1 в поле 2');
  } else {
    pole1.value = pole2.value;
    zapisat_v_log('Текст перенесён из поля 2 в поле 1');
  }
};

// HTML output function
function pokazat_html(otkryvayushchiy, zakryvayushchiy, tip) {
  var tekst = pole1.value;
  var ekranirovannyy = ekraniruy_html(tekst);
  var html = otkryvayushchiy + ekranirovannyy + zakryvayushchiy;
  vyvod_html.innerHTML = html;
  zapisat_v_log('Вывод HTML с тегом <' + tip + '>');
}

// Bold button
btn_zhir.onclick = function() {
  pokazat_html('<b>', '</b>', 'b');
};

// Italic button
btn_kursiv.onclick = function() {
  pokazat_html('<i>', '</i>', 'i');
};

// Underline button
btn_podcherk.onclick = function() {
  pokazat_html('<u>', '</u>', 'u');
};

// Counter for dynamic elements
var schetchik = 0;

// Create new element button
btn_noviy.onclick = function() {
  schetchik++;
  var novyy_element = document.createElement('div');
  novyy_element.className = 'dyn';
  novyy_element.textContent = 'Элемент ' + schetchik;
  
  // Add event handlers to the new element
  novyy_element.onclick = function() {
    zapisat_v_log('Элемент ' + schetchik + ': onclick');
  };
  
  novyy_element.onmousedown = function() {
    zapisat_v_log('Элемент ' + schetchik + ': onmousedown');
  };
  
  novyy_element.onmouseup = function() {
    zapisat_v_log('Элемент ' + schetchik + ': onmouseup');
  };
  
  novyy_element.onmouseleave = function() {
    zapisat_v_log('Элемент ' + schetchik + ': onmouseleave');
  };
  
  zona.appendChild(novyy_element);
  zapisat_v_log('Создан элемент ' + schetchik);
};
