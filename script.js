function loadLanguage(language) {
    fetch(`/lang/${language}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки файла языка');
            }
            return response.json();
        })
        .then(data => {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                if (data[key]) {
                    element.innerHTML = data[key];
                }
            });
        })
        .catch(error => console.error('Error loading language file:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const langSelector = document.getElementById('language-selector');
    
    // Загружаем язык по умолчанию
    loadLanguage(langSelector.value);
    
    // Переключаем язык при изменении в селекторе
    langSelector.addEventListener('change', (event) => {
        loadLanguage(event.target.value);
    });
});
