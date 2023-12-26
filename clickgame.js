let score = 0;

// ボタン要素とスコア表示要素を取得
const BUTTON = document.getElementById("clickBtn");
const SCORE = document.getElementById("score");

// ボタンがクリックされたときの処理
BUTTON.addEventListener("click", function () {
    // スコアを1増やす
    score++;
    // スコア表示を更新
    SCORE.textContent = score;
});