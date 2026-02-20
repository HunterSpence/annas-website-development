// ============================================
// SECTION 1: Event Handler Functions
// ============================================

let eventCount = 0;

function logEvent(eventName, description) {
    eventCount++;
    const logContent = document.getElementById('eventLogContent');
    const timestamp = new Date().toLocaleTimeString();

    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.innerHTML = `<span class="log-number">#${eventCount}</span>
                          <span class="log-time">[${timestamp}]</span>
                          <span class="log-event">${eventName}</span>: ${description}`;

    logContent.insertBefore(logEntry, logContent.firstChild);

    // Keep only last 15 entries
    while (logContent.children.length > 15) {
        logContent.removeChild(logContent.lastChild);
    }
}

function handleClick() {
    logEvent('onclick', 'Кнопка была нажата');
    console.log('Событие: onclick');
}

function handleMouseDown() {
    logEvent('onmousedown', 'Кнопка мыши нажата');
    console.log('Событие: onmousedown');
}

function handleMouseMove() {
    logEvent('onmousemove', 'Мышь перемещается над кнопкой');
    console.log('Событие: onmousemove');
}

function handleMouseLeave() {
    logEvent('onmouseleave', 'Мышь покинула область кнопки');
    console.log('Событие: onmouseleave');
}

function handleMouseUp() {
    logEvent('onmouseup', 'Кнопка мыши отпущена');
    console.log('Событие: onmouseup');
}

// ============================================
// SECTION 2: Focus and Blur Events
// ============================================

function handleFocus() {
    const focusLog = document.getElementById('focusLog');
    focusLog.textContent = 'onfocus: Поле ввода сейчас в фокусе (активно)';
    focusLog.className = 'focus-log focused';
    console.log('Событие: onfocus');
}

function handleBlur() {
    const focusLog = document.getElementById('focusLog');
    focusLog.textContent = 'onblur: Поле ввода потеряло фокус (неактивно)';
    focusLog.className = 'focus-log blurred';
    console.log('Событие: onblur');
}

// ============================================
// SECTION 3: Text Transfer with Checkbox
// ============================================

function transferText() {
    const checkbox = document.getElementById('transferCheckbox');
    const sourceInput = document.getElementById('sourceInput');
    const destInput = document.getElementById('destInput');

    if (checkbox.checked) {
        // Transfer text from source to destination
        destInput.value = sourceInput.value;
        console.log('Текст перенесён:', sourceInput.value);
    } else {
        // Clear destination when unchecked
        destInput.value = '';
        console.log('Назначение очищено');
    }
}

// ============================================
// SECTION 4: Text Formatting Display
// ============================================

function updateFormattedText() {
    const inputText = document.getElementById('formatInput').value;

    // Update each formatted version
    document.getElementById('boldText').textContent = inputText;
    document.getElementById('italicText').textContent = inputText;
    document.getElementById('underlineText').textContent = inputText;
    document.getElementById('combinedText').textContent = inputText;

    console.log('Форматированный текст обновлён:', inputText);
}

// ============================================
// Page Load Handler
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Лабораторная работа 10 - JavaScript загружен успешно');
    console.log('Все обработчики событий готовы');

    // Initialize event log
    logEvent('Система', 'Страница загружена и готова');
});
