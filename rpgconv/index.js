import * as ScenarioProperty from "./ScenarioProperty.js";
// ★★★
import jsondata from "./index.json" with { type: "json" };
// ★★★

// ========================================
// 定数を定義
// ========================================
const RPGCONV_IMG_ID = "rpgconv-img";
const RPGCONV_IMG_ELEM = document.getElementById(RPGCONV_IMG_ID);
const RPGCONV_TEXT_ID = "rpgconv-text";
const RPGCONV_TEXT_ELEM = document.getElementById(RPGCONV_TEXT_ID);
const RPGCONV_SELECT_ID = "slide-current-num";
const RPGCONV_SELECT_ELEM = document.getElementById(RPGCONV_SELECT_ID);
const RPGCONV_START_BTN_DIV_ID = "rpgconv-start-btn-div"
const RPGCONV_START_BTN_DIV_ELEM = document.getElementById(RPGCONV_START_BTN_DIV_ID);
const RPGCONV_NEXT_BTN_ID = "rpgconv-next-btn";
const RPGCONV_NEXT_BTN_ELEM = document.getElementById(RPGCONV_NEXT_BTN_ID);
const RPGCONV_JUMP_BTN_ID = "rpgconv-jump-sw";
const RPGCONV_JUMP_BTN_ELEM = document.getElementById(RPGCONV_JUMP_BTN_ID);
const RPGCONV_TXT_SW_ID = "rpgconv-textbox-sw";
const RPGCONV_TXT_SW_ELEM = document.getElementById(RPGCONV_TXT_SW_ID);
const RPGCONV_ANIME_SW_ID = "rpgconv-animation-sw";
const RPGCONV_ANIME_SW_ELEM = document.getElementById(RPGCONV_ANIME_SW_ID);
const DOT_SPAN_CLASS_NAME = "dot-span";
const IMAGE_FADEOUT_CSS = "image-fadeout-animation";
const RPGCONV_ANIMATION_ID = "rpgconv-anime-area";
const RPGCONV_AUTO_SW_ID = "rpgconv-auto-sw";
const RPGCONV_AUTO_SW_ELEM = document.getElementById(RPGCONV_AUTO_SW_ID);
const RPGCONV_END_AREA_ID = "rpgconv-end-area";
const RPGCONV_END_AREA_ELEM = document.getElementById(RPGCONV_END_AREA_ID);
const END_SHOW_CSS = "end-show-animation";
const RPGCONV_REFRESH_BTN_ID = "rpgconv-refresh-btn";
const RPGCONV_REFRESH_BTN_ELEM = document.getElementById(RPGCONV_REFRESH_BTN_ID);
const RPGCONV_AUDIO_SW_ID = "rpgconv-audio-sw";
const RPGCONV_AUDIO_SW_ELEM = document.getElementById(RPGCONV_AUDIO_SW_ID);
const RPGCONV_SOUND_AREA_ID = "rpgconv-sound-area";
const RPGCONV_SOUND_AREA_ELEM = document.getElementById(RPGCONV_SOUND_AREA_ID);
// 文字表示の遅延時間
const DELAY_MS = 50;

// シナリオクラスを定義
let scenario = new ScenarioProperty.ScenarioProperty();
// 自動起動時のIDを格納する
let interval_id;
    

// ========================================
// 関数を定義
// ========================================
// サーバからシナリオデータを受け取る
function getScenarioData(){
    var slide_num;
    let image_arr = [];
    var text_arr = [];
    var sound_arr = [];
    var bgm_arr = [];

    // キーワードからインデックスを取得する
    let json_index = String(location.search).substring(1);

    // JSOnデータをオブジェクトに格納する
    scenario.setSlideNum(jsondata.list[json_index].slide_num);
    scenario.setImageArr(jsondata.list[json_index].image_arr);
    scenario.setTextArr(jsondata.list[json_index].text_arr);
    scenario.setSoundArr(jsondata.list[json_index].sound_arr);

    // ★★★
    // scenario.setSlideNum(10);
    // scenario.setImageArr(
    //     [
    //         "img/black_back.png",
    //         "img/black_back.png",
    //         "img/black_back.png",
    //         "img/black_back.png",
    //         "img/back1.png",
    //         "img/back1.png",
    //         "img/back1.png",
    //         "img/back2.png",
    //         "img/back2.png",
    //         "img/back2.png",
    //     ]
    // );
    // scenario.setTextArr(
    //     [
    //         "テキストテキストテキストテキストテキスト0",
    //         "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト\nテキストテキストテキストテキストテキストテキストテキスト1",
    //         "テキストテキストテキストテキストテキスト2",
    //         "テキストテキストテキストテキストテキスト3",
    //         "テキストテキストテキストテキストテキスト4",
    //         "テキストテキストテキストテキストテキスト5",
    //         "テキストテキストテキストテキストテキスト6",
    //         "テキストテキストテキストテキストテキスト7",
    //         "テキストテキストテキストテキストテキスト8",
    //         "テキストテキストテキストテキストテキスト9",
    //     ]
    // );
    // ★★★

    return;
}

// エンド表示をする
function showEndArea() {
    // アニメーションを設定する
    RPGCONV_END_AREA_ELEM.style.animation = END_SHOW_CSS + " 2s";
    RPGCONV_END_AREA_ELEM.style.animationFillMode = "forwards";

    return;
}

// テキスト表示スイッチを変更する
function changeTextSwitch(bool) {
    // 引数をもとに変更する
    RPGCONV_TXT_SW_ELEM.checked = bool;

    return;
}

// アニメーション表示スイッチを変更する
function changeAnimeSwitch(bool) {
    // 引数をもとに変更する
    RPGCONV_ANIME_SW_ELEM.checked = bool;

    return;
}

// 自動スイッチを変更する
function changeAutoSwitch(bool) {
    // 引数をもとに変更する
    RPGCONV_AUTO_SW_ELEM.checked = bool;

    return;
}

// 現在のスライド番号を取得
function getSlideNum() {
    return RPGCONV_SELECT_ELEM.value;
}

// 画面読み込み時の画像表示エリアの処理
function initialSlide() {
    // 画像ソースを指定する
    scenario.setImageSrc(RPGCONV_IMG_ID, 0)

    // テキストを指定する
    scenario.setTextSrc(RPGCONV_TEXT_ID, 0)

    // スライド番号リストに追加する
    for(let i = 0; i < scenario.getSlideNum(); i++) {
        // オプションインスタンスを生成する
        let option = document.createElement("option");

        // オプションにプロパティを設定する
        if (i == 0) {
            option.text = "表紙"
        } else {
            option.text = "ページ：" + i;
        }
        option.value = i;

        // オプションを追加する
        RPGCONV_SELECT_ELEM.appendChild(option);
    }
}

// スライド変更
function changeSlide(do_anime_bool_, do_audio_bool_, current_slide_num_, next_slide_num_) {
    // スライドが0（サムネ）の時の処理
    if( current_slide_num_ == 0 ) {
        // テキスト表示スイッチをonにする
        changeTextSwitch(true);

        // テキストを表示する
        RPGCONV_TEXT_ELEM.style.display = "block"; 

        // スタートボタン要素を非表示にする
        RPGCONV_START_BTN_DIV_ELEM.style.display = "none";
    }

    // 最後のスライドの場合は次へボタンを無効化する
    if( Number(current_slide_num_) + 1 == scenario.getSlideNum()) {
        // 自動スイッチOFF
        changeAutoSwitch(false);
        changeAutoSWFalse();

        // ボタン要素を無効にする
        RPGCONV_NEXT_BTN_ELEM.style.visibility = "hidden";
        RPGCONV_JUMP_BTN_ELEM.style.visibility = "hidden";
        RPGCONV_AUTO_SW_ELEM.disabled = true;

        // 終了エリアを表示する
        showEndArea();
        return;
    }
    // スタートボタンが非表示になっていなければ非表示にする
    if( RPGCONV_START_BTN_DIV_ELEM.style.display != "none" ){
        RPGCONV_START_BTN_DIV_ELEM.style.display = "none"
    }

    // スライドの要素を変更する
    if(do_anime_bool_) {
        // アニメーションSWがONのときはアニメーションをする
        scenario.animationImage(
            RPGCONV_IMG_ID, 
            RPGCONV_ANIMATION_ID, 
            IMAGE_FADEOUT_CSS, 
            current_slide_num_, 
            next_slide_num_, 
            2,
            RPGCONV_TEXT_ELEM);
        scenario.animationText(
            RPGCONV_TEXT_ID, 
            DOT_SPAN_CLASS_NAME, 
            next_slide_num_, 
            DELAY_MS);
        
        // 音再生にチェックがついているときは再生する
        if(do_audio_bool_) {
            scenario.animationSound(
                RPGCONV_SOUND_AREA_ID,
                next_slide_num_);
        }
    } else {
        // アニメーションSWがOFFのときはアニメーションをしない
        scenario.setImageSrc(RPGCONV_IMG_ID, next_slide_num_);
        scenario.setTextSrc(RPGCONV_TEXT_ID, next_slide_num_);
    }
}

// 画像表示エリアの更新：次へ
function nextSlide() {
    let current_slide_num = getSlideNum();
    let next_slide_num;
    let do_anime_bool = RPGCONV_ANIME_SW_ELEM.checked;
    let do_audio_bool = RPGCONV_AUDIO_SW_ELEM.checked;

    // スライドを１つ進める
    next_slide_num = Number(current_slide_num) + 1;

    // スライド変更
    changeSlide(do_anime_bool, do_audio_bool, current_slide_num, next_slide_num);

    // プルダウンを現在のスライド番号に変更する
    RPGCONV_SELECT_ELEM.value = next_slide_num;
}

// 自動スイッチON時の処理
function changeAutoSWTrue() {
    // スイッチがONの時は自動で進む
    interval_id = setInterval(() => {
        // スライドを1つ進める
        nextSlide();
    }, DELAY_MS * 110 + 1500);

    // 次へボタンを無効にする
    RPGCONV_NEXT_BTN_ELEM.disabled = true;
    RPGCONV_IMG_ELEM.style.pointerEvents = "none";
}

// 自動スイッチOFF時の処理
function changeAutoSWFalse() {
    // スイッチがOFFの時はキャンセルする
    clearInterval(interval_id);

    // 次へボタンを有効にする
    RPGCONV_NEXT_BTN_ELEM.disabled = false;
    RPGCONV_IMG_ELEM.style.pointerEvents = "auto";
}

// 特定のスライドにジャンプ
function jumpSlide() {
    let current_slide_num = 0;
    let next_slide_num = getSlideNum();
    let do_auto_bool = RPGCONV_AUTO_SW_ELEM.checked;
    let do_anime_bool = RPGCONV_ANIME_SW_ELEM.checked;
    let do_audio_bool = RPGCONV_AUDIO_SW_ELEM.checked;

    // 自動SWがONのときはOFFに変更する
    if(do_auto_bool){
        changeAutoSwitch(false);
        changeAutoSWFalse();
    }

    // 対象のスライドにジャンプする
    changeSlide(do_anime_bool, do_audio_bool, current_slide_num, next_slide_num);
}

// ========================================
// ページ読み込み時
// ========================================
// ページ読み込み時に実行したい処理
window.onload = function() {
    // シナリオデータを受け取る
    // scenario = getScenarioData();
    getScenarioData();

    // 最初のスライド処理
    initialSlide();
    // initialSlide(scenario);

    // アニメーションSWをONにする
    changeAnimeSwitch(true);
}

// ========================================
// イベントリスナー
// ========================================
// スタートボタンクリック時の処理
RPGCONV_START_BTN_DIV_ELEM.addEventListener('click', () => {
    // スライドを1つ進める
    nextSlide();
});

// 次へボタンクリック時の処理
RPGCONV_NEXT_BTN_ELEM.addEventListener('click', () => {
    // スライドを1つ進める
    nextSlide();

    // 一定時間無効にする
    RPGCONV_NEXT_BTN_ELEM.disabled = true;
    window.setTimeout(function(){
        // ボタン要素を有効にする
        RPGCONV_NEXT_BTN_ELEM.disabled = false;
    }, 1000);
});

// 画像クリック時の処理
RPGCONV_IMG_ELEM.addEventListener('click', () => {
    // スライドを1つ進める
    nextSlide();

    // 一定時間無効にする
    RPGCONV_IMG_ELEM.style.pointerEvents = "none";
    window.setTimeout(function(){
        // ボタン要素を有効にする
        RPGCONV_IMG_ELEM.style.pointerEvents = "auto";
    }, 2000);
});

// テキスト表示スイッチ変更時の処理
RPGCONV_TXT_SW_ELEM.addEventListener('change', () => {
    if(RPGCONV_TXT_SW_ELEM.checked) {
        // スイッチがONの時は表示する
        RPGCONV_TEXT_ELEM.style.display = "block";
    }
    else {
        // スイッチがOFFの時は非表示する
        RPGCONV_TEXT_ELEM.style.display = "none";
    }
});

// 自動スイッチ変更時の処理
RPGCONV_AUTO_SW_ELEM.addEventListener('change', () => {
    if(RPGCONV_AUTO_SW_ELEM.checked) {
        // スイッチがON時の処理
        changeAutoSWTrue();
    }
    else {
        // スイッチOFF時の処理
        changeAutoSWFalse();
    }
});

// 更新ボタンクリック時の処理
RPGCONV_REFRESH_BTN_ELEM.addEventListener('click', () => {
    // リロードする
    document.location.reload();
});

// ジャンプボタンクリック時の処理
RPGCONV_JUMP_BTN_ELEM.addEventListener('click', () => {
    // ジャンプ処理
    jumpSlide();
    
    // 一定時間無効にする
    RPGCONV_JUMP_BTN_ELEM.disabled = true;
    window.setTimeout(function(){
        // ボタン要素を有効にする
        RPGCONV_JUMP_BTN_ELEM.disabled = false;
    }, 1000);
});