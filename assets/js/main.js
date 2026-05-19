// テーマ・言語切り替え機能（ページ読み込み前に実行）
(function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const savedLang = localStorage.getItem('lang') || 'ja';
    document.documentElement.setAttribute('lang', savedLang);
})();

// モバイルメニューのトグル
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });

        // メニューリンクをクリックしたらメニューを閉じる
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
            });
        });
    }

    // スムーススクロール
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // テーマ切り替え機能
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) {
        console.error('テーマ切り替えボタンが見つかりません');
        return;
    }

    const themeIcon = themeToggle.querySelector('.theme-icon');
    const html = document.documentElement;

    // 保存されたテーマを読み込む
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // テーマ切り替えボタンのクリックイベント
    themeToggle.addEventListener('click', function () {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // テーマアイコンの更新
    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.textContent = '☀️';
            } else {
                themeIcon.textContent = '🌙';
            }
        }
    }

    // 言語切り替え機能
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const langLabel = langToggle.querySelector('.lang-label');
        const savedLang = localStorage.getItem('lang') || 'ja';
        html.setAttribute('lang', savedLang);
        updateLangLabel(savedLang);

        langToggle.addEventListener('click', function () {
            const currentLang = html.getAttribute('lang');
            const newLang = currentLang === 'ja' ? 'en' : 'ja';
            html.setAttribute('lang', newLang);
            localStorage.setItem('lang', newLang);
            updateLangLabel(newLang);
        });

        function updateLangLabel(lang) {
            if (langLabel) {
                langLabel.textContent = lang === 'ja' ? 'EN' : 'JA';
            }
        }
    }
});

