// Helper function
const $ = id => document.getElementById(id);

// Event tracking
let eventLog = [];
const maxEvents = 5;

function logEvent(evt) {
    eventLog.unshift(evt);
    if (eventLog.length > maxEvents) eventLog.pop();
    $('event-log').querySelector('span').textContent = eventLog.join(' | ');
}

// 1. onclick event
$('btn-click').onclick = () => {
    logEvent('✓ Нажата кнопка');
    alert('Кнопка успешно нажата!');
};

// 2. onmousedown, onmousemove, onmouseleave, onmouseup events
const btn = $('btn-mouse');
btn.onmousedown = () => logEvent('⬇ Нажата мышь');
btn.onmouseup = () => logEvent('⬆ Отпущена мышь');
btn.onmousemove = () => logEvent('→ Движение мыши');
btn.onmouseleave = () => logEvent('← Мышь ушла');

// 3. onfocus and onblur events
const input = $('input-focus');
input.onfocus = () => logEvent('◉ Фокус получен');
input.onblur = () => logEvent('○ Фокус потерян');

// 4. Checkbox text transfer between textareas
$('transfer-check').onchange = function() {
    const fromText = $('from-text').value;
    $('to-text').value = this.checked ? fromText : '';
};

// 5. Bold, Italic, Underline formatting
document.querySelectorAll('.format-btn').forEach(btn => {
    btn.onclick = function() {
        const text = $('format-input').value || 'Текст';
        const format = this.dataset.format;
        let output = '';
        
        if (format === 'bold') output = `<strong>${text}</strong>`;
        if (format === 'italic') output = `<em>${text}</em>`;
        if (format === 'underline') output = `<u>${text}</u>`;
        
        $('format-output').innerHTML = output;
    };
});

// 6. Dynamic element creation
let elementCount = 0;
$('btn-create').onclick = function() {
    elementCount++;
    const el = document.createElement('div');
    el.className = 'dynamic-element';
    el.textContent = `Элемент ${elementCount}`;
    el.style.cursor = 'pointer';
    el.onclick = function() {
        this.remove();
        elementCount--;
    };
    $('elements-zone').appendChild(el);
};

// Initialize: add sample text to textarea
document.addEventListener('DOMContentLoaded', () => {
    logEvent('📄 Страница загружена');
});
