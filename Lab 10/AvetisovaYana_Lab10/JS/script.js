function $(selector) {
  return document.querySelector(selector);
}

const blok_log = $("#log");

function zapisat_v_log(text) {
  const vremya = new Date().toLocaleTimeString();
  const stroka = document.createElement("div");
  stroka.textContent = "[" + vremya + "] " + text;
  blok_log.prepend(stroka);
}

function ekraniruy_html(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const knopka1 = $("#knopka1");
const knopka2 = $("#knopka2");

const chek_perenos = $("#chek_perenos");
const btn_perenesti = $("#btn_perenesti");

const btn_zhir = $("#btn_zhir");
const btn_kursiv = $("#btn_kursiv");
const btn_podcherk = $("#btn_podcherk");

const btn_noviy = $("#btn_noviy");

const pole1 = $("#pole1");
const pole2 = $("#pole2");

const vyvod_html = $("#vyvod_html");
const zona = $("#zona");

knopka1.onclick = function () {
  zapisat_v_log("onclick: нажали «Кнопка 1»");
};

knopka2.onclick = function () {
  zapisat_v_log("onclick: нажали «Кнопка 2»");
};

btn_perenesti.onmousedown = function () {
  zapisat_v_log("onmousedown: нажали (удерживаем) кнопку «Переписать текст»");
};

btn_perenesti.onmouseup = function () {
  zapisat_v_log("onmouseup: отпустили кнопку «Переписать текст»");
};

pole1.onfocus = function () {
  zapisat_v_log("onfocus: фокус в окошке ввода 1");
};

pole1.onblur = function () {
  zapisat_v_log("onblur: фокус ушёл из окошка ввода 1");
};

pole2.onfocus = function () {
  zapisat_v_log("onfocus: фокус в окошке ввода 2");
};

pole2.onblur = function () {
  zapisat_v_log("onblur: фокус ушёл из окошка ввода 2");
};

let posledniy_log_dvizheniya = 0;

zona.onmousemove = function (e) {
  const seychas = Date.now();
  if (seychas - posledniy_log_dvizheniya >= 250) {
    posledniy_log_dvizheniya = seychas;
    zapisat_v_log("onmousemove: движение в зоне (x=" + e.offsetX + ", y=" + e.offsetY + ")");
  }
};

zona.onmouseleave = function () {
  zapisat_v_log("onmouseleave: курсор вышел из зоны");
};

btn_perenesti.onclick = function () {
  if (chek_perenos.checked) {
    pole2.value = pole1.value;
    zapisat_v_log("Перенос: окошко 1 → окошко 2 (чекбокс включён)");
  } else {
    pole1.value = pole2.value;
    zapisat_v_log("Перенос: окошко 2 → окошко 1 (чекбокс выключен)");
  }
};

function pokazat_html(obertka_otkryt, obertka_zakryt, tip) {
  const bezopasniy_text = ekraniruy_html(pole1.value);
  vyvod_html.innerHTML = obertka_otkryt + bezopasniy_text + obertka_zakryt;
  zapisat_v_log("Вывод HTML: применили «" + tip + "» к тексту из окошка 1");
}

btn_zhir.onclick = function () {
  pokazat_html("<b>", "</b>", "жирный");
};

btn_kursiv.onclick = function () {
  pokazat_html("<i>", "</i>", "курсив");
};

btn_podcherk.onclick = function () {
  pokazat_html("<u>", "</u>", "подчёркнутый");
};

let schetchik = 0;

btn_noviy.onclick = function () {
  schetchik += 1;
  const nomer = schetchik;

  const el = document.createElement("div");
  el.className = "dyn";
  el.textContent = "Новый элемент " + nomer;

  el.onclick = function () {
    zapisat_v_log("onclick: клик по «Новый элемент " + nomer + "»");
  };

  el.onmousedown = function () {
    zapisat_v_log("onmousedown: нажали «Новый элемент " + nomer + "»");
  };

  el.onmouseup = function () {
    zapisat_v_log("onmouseup: отпустили «Новый элемент " + nomer + "»");
  };

  el.onmouseleave = function () {
    zapisat_v_log("onmouseleave: курсор ушёл с «Новый элемент " + nomer + "»");
  };

  zona.appendChild(el);
  zapisat_v_log("Создан: «Новый элемент " + nomer + "»");
};
