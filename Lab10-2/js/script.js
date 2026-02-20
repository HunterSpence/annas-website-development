// Кастомный селектор
function $(id) {
  return document.getElementById(id);
}

// Запись событий в лог с временной меткой
function zapisat_v_log(tekst) {
  var log = $('log');
  var zapis = document.createElement('div');
  var vremya = new Date();
  var chasy = String(vremya.getHours()).padStart(2, '0');
  var minuty = String(vremya.getMinutes()).padStart(2, '0');
  var sekundy = String(vremya.getSeconds()).padStart(2, '0');
  zapis.textContent = '[' + chasy + ':' + minuty + ':' + sekundy + '] ' + tekst;
  log.insertBefore(zapis, log.firstChild);
}

// Экранирование HTML-символов
function ekraniruy_html(s) {
  return s.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
}

// Получаем все элементы через кастомный селектор
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

// Обработчики для knopka1 и knopka2
knopka1.onclick = function() {
  zapisat_v_log('Клик на Кнопка 1');
};

knopka2.onclick = function() {
  zapisat_v_log('Клик на Кнопка 2');
};

// Обработчики onmousedown и onmouseup для кнопки переноса
btn_perenesti.onmousedown = function() {
  zapisat_v_log('Нажата кнопка мыши (onmousedown) на "Перенести"');
};

btn_perenesti.onmouseup = function() {
  zapisat_v_log('Отпущена кнопка мыши (onmouseup) на "Перенести"');
};

// Обработчики onfocus и onblur для текстовых полей
pole1.onfocus = function() {
  zapisat_v_log('Фокус на Поле 1 (onfocus)');
};

pole1.onblur = function() {
  zapisat_v_log('Потеря фокуса с Поля 1 (onblur)');
};

pole2.onfocus = function() {
  zapisat_v_log('Фокус на Поле 2 (onfocus)');
};

pole2.onblur = function() {
  zapisat_v_log('Потеря фокуса с Поля 2 (onblur)');
};

// Throttled onmousemove для зоны
var posledneye_vremya = 0;
zona.onmousemove = function(e) {
  var teper = Date.now();
  if (teper - posledneye_vremya >= 250) {
    var x = e.clientX;
    var y = e.clientY;
    zapisat_v_log('onmousemove в зоне: x=' + x + ', y=' + y);
    posledneye_vremya = teper;
  }
};

// onmouseleave для зоны
zona.onmouseleave = function() {
  zapisat_v_log('Курсор покинул зону (onmouseleave)');
};

// Логика переноса текста между полями
btn_perenesti.onclick = function() {
  if (chek_perenos.checked) {
    pole2.value = pole1.value;
    zapisat_v_log('Текст перенесён из Поля 1 в Поле 2');
  } else {
    pole1.value = pole2.value;
    zapisat_v_log('Текст перенесён из Поля 2 в Поле 1');
  }
};

// Функция для отображения HTML с тегами форматирования
function pokazat_html(otkr, zakr, tip) {
  var tekst = pole1.value;
  var ekranirovanniy = ekraniruy_html(tekst);
  vyvod_html.innerHTML = otkr + ekranirovanniy + zakr;
  zapisat_v_log('Применено форматирование: ' + tip);
}

// Обработчики для кнопок форматирования
btn_zhir.onclick = function() {
  pokazat_html('<b>', '</b>', 'жирный (b)');
};

btn_kursiv.onclick = function() {
  pokazat_html('<i>', '</i>', 'курсив (i)');
};

btn_podcherk.onclick = function() {
  pokazat_html('<u>', '</u>', 'подчёркнутый (u)');
};

// Счётчик для динамических элементов
var schetchik = 0;

// Создание нового динамического элемента
btn_noviy.onclick = function() {
  schetchik++;
  var noviy_elem = document.createElement('div');
  noviy_elem.className = 'dyn';
  noviy_elem.textContent = 'Элемент #' + schetchik;
  
  var nomer = schetchik; // Сохраняем для замыкания
  
  noviy_elem.onclick = function() {
    zapisat_v_log('Клик на Элемент #' + nomer);
  };
  
  noviy_elem.onmousedown = function() {
    zapisat_v_log('Нажата кнопка мыши на Элементе #' + nomer);
  };
  
  noviy_elem.onmouseup = function() {
    zapisat_v_log('Отпущена кнопка мыши на Элементе #' + nomer);
  };
  
  noviy_elem.onmouseleave = function() {
    zapisat_v_log('Курсор покинул Элемент #' + nomer);
  };
  
  zona.appendChild(noviy_elem);
  zapisat_v_log('Создан новый элемент #' + schetchik);
};
