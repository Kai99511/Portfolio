//フィールドサイズ
const FIELD_COL = 10;
const FIELD_ROW = 20;

//ブロック一つのサイズ(ピクセル)
const BLOCK_SIZE = 30;

//キャンバスサイズ
const SCREEN_W = BLOCK_SIZE * FIELD_COL;
const SCREEN_H = BLOCK_SIZE * FIELD_ROW;

//テトロミノのサイズ
const TETRO_SIZE = 4;

let can = document.getElementById("can");
let con = can.getContext("2d");

can.width = SCREEN_W;
can.height = SCREEN_H;
can.style.border = '4px solid #555'

let tetro = [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
];

//テトロミノの座標
let tetro_x = 0;
let tetro_y = 0;

//フィールドの中身
let field = [];

init();
drawAll();

//初期化
function init() {
    for (let y = 0; y < FIELD_ROW; y++) {
        field[y] = [];
        for (let x = 0; x < FIELD_COL; x++) {
            field[y][x] = 0;
        }

    }
    //test
    field[5][8] = 1;
    field[19][0] = 1;
    field[19][9] = 1;
}


//ブロック一つ描画
function drawBlock(x, y) {
    let px = x * BLOCK_SIZE;
    let py = y * BLOCK_SIZE;

    con.fillStyle = "red";
    con.fillRect(px, py, BLOCK_SIZE, BLOCK_SIZE);
    con.strokeStyle = "black"
    con.strokeRect(px, py, BLOCK_SIZE, BLOCK_SIZE);

}

//全部描画
function drawAll() {
    con.clearRect(0, 0, SCREEN_W, SCREEN_H)

    for (let y = 0; y < FIELD_ROW; y++) {
        for (let x = 0; x < FIELD_COL; x++) {
            if (field[y][x]) {
                drawBlock(x, y)
            }
        }
    }

    for (let y = 0; y < TETRO_SIZE; y++) {
        for (let x = 0; x < TETRO_SIZE; x++) {
            if (tetro[y][x]) {
                drawBlock(tetro_x + x, tetro_y + y)
            }
        }
    }

}

//ブロックの衝突判定
function checkMove(mx, my) {
    for (let y = 0; y < TETRO_SIZE; y++) {
        for (let x = 0; x < TETRO_SIZE; x++) {
            let nx = tetro_x + mx + x;
            let ny = tetro_y + my + y;
            if (tetro[y][x]) {
                if (field[ny][nx] ||
                    ny < 0 ||
                    nx < 0 ||
                    ny >= FIELD_ROW ||
                    nx >= FIELD_COL) {
                    return false;
                }
            }
        }
    }
    return true;
}

//テトロミノ回転
function rotate() {
    let ntetro = [];
    for (let y = 0; y < TETRO_SIZE; y++) {
        ntetro[y] = [];
        for (let x = 0; x < TETRO_SIZE; x++) {
            ntetro[y][x] = tetro[TETRO_SIZE - x - 1][y];
        }
    }
    return ntetro;
}


//キーボード処理
document.onkeydown = function (e) {
    //onkeydown keycode 検索
    switch (e.key) {
        case 'ArrowLeft': // 左
            if (checkMove(-1, 0)) tetro_x--;
            break;
        case 'ArrowUp': // 上
            if (checkMove(0, -1)) tetro_y--;
            break;
        case 'ArrowRight': // 右
            if (checkMove(1, 0)) tetro_x++;
            break;
        case 'ArrowDown': // 下
            if (checkMove(0, 1)) tetro_y++;
            break;
        case ' ': // スペース
            tetro = rotate();
            break;
    }

    drawAll();
}



