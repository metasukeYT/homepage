/**
 * サイドメニューの開閉を制御
 */
function toggleMenu() {
    const sideMenu = document.getElementById("side-menu");
    const overlay = document.getElementById("menu-overlay");

    if (sideMenu && overlay) {
        sideMenu.classList.toggle("open");
        overlay.classList.toggle("open");
    }
}

/**
 * 言語の切り替えを制御
 * @param {string} lang - 'ja' または 'en'
 */
function switchLang(lang) {
    // 1. class="lang" がついた要素をすべて取得
    const elements = document.querySelectorAll('.lang');

    elements.forEach(el => {
        // 2. data-ja または data-en の値を取得
        const translation = el.getAttribute(`data-${lang}`);
        
        // 3. 翻訳データが存在すれば、中身を書き換える
        if (translation) {
            el.textContent = translation;
        }
    });

    // 4. HTML全体の言語属性も更新（ブラウザや翻訳ツールへの通知用）
    document.documentElement.lang = lang;

    // 5. 言語切り替え後にメニューが開いていたら閉じる（オプション）
    const sideMenu = document.getElementById("side-menu");
    if (sideMenu && sideMenu.classList.contains("open")) {
        toggleMenu();
    }
}

// ページ読み込み時の初期化処理（必要に応じて）
window.addEventListener('DOMContentLoaded', () => {
    // 例: ブラウザの言語設定を見て自動で切り替える場合はここに追加
    // switchLang(navigator.language.startsWith('ja') ? 'ja' : 'en');
});
