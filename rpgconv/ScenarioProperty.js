// シナリオクラス
export class ScenarioProperty {
    slide_num;
    image_arr;
    text_arr;
    sound_arr;
    bgm_arr;
    icon_arr;

    constructor() {
        this.slide_num = 0;
        this.image_arr = [];
        this.text_arr = [];
        this.sound_arr = [];
        this.bgm_arr = [];
        this.icon_arr = [];
    }

    setSlideNum(slide_num_) {
        this.slide_num = slide_num_;
    }

    getSlideNum() {
        return this.slide_num;
    }

    setImageArr(image_arr_) {
        this.image_arr = image_arr_;
    }

    getImageArr() {
        return this.image_arr;
    }

    setTextArr(text_arr_) {
        this.text_arr = text_arr_;
    }

    getTextArr() {
        return this.text_arr;
    }

    setSoundArr(sound_arr_) {
        this.sound_arr = sound_arr_;
    }

    getSoundArr() {
        return this.sound_arr;
    }

    setBgmArr(bgm_arr_) {
        this.bgm_arr = bgm_arr_;
    }

    getBgmArr() {
        return this.bgm_arr;
    }

    setIconArr(icon_arr_) {
        this.icon_arr = icon_arr_;
    }

    getIconArr() {
        return this.icon_arr;
    }

    // IDもとに画像を設定する
    setImageSrc(elemid, num) {
        // IDから要素を取得する
        let rpgconv_img_elem = document.getElementById(elemid);

        // 画像をソースに設定する
        rpgconv_img_elem.src = this.image_arr[num];

        return;
    }

    // IDもとにテキストを設定する
    setTextSrc(elemid, num) {
        // IDから要素を取得する
        let rpgconv_text_elem = document.getElementById(elemid);

        // 画像をソースに設定する
        rpgconv_text_elem.innerText = this.text_arr[num];

        return;
    }

    // IDもとにアイコン画像を設定する
    setIconSrc(elemid, num) {
        // IDから要素を取得する
        let rpgconv_icon_img_elem = document.getElementById(elemid);

        // 画像をソースに設定する
        rpgconv_icon_img_elem.src = this.icon_arr[num];

        return;
    }

    // テキスト表示が完了したらピリオドを点滅させる
    flashNextTextarea(elemid, dotspan_class_, whole_delay_ms) {
        // テキストを表示する要素を取得
        let text_area_elem = document.getElementById(elemid);

        // ピリオド要素を追加する
        let next_text = document.createElement("span");
        next_text.innerText = ' ▶';
        next_text.style.opacity = 0;
        next_text.className = dotspan_class_;
        next_text.style.color = "yellow";
        next_text.style.fontWeight = "bold";
        text_area_elem.appendChild(next_text);

        // ピリオド要素のspanタグを取得する
        let next_span_tag = text_area_elem.getElementsByClassName(dotspan_class_);
        // 透明度を変更して点滅させる
        for( let i = 0; i < 3; i++) {
            (function (index) {
                setTimeout(function () {
                    next_span_tag[0].style.opacity = 0;
                }, whole_delay_ms + index * 500 + 250);
                setTimeout(function () {
                    next_span_tag[0].style.opacity = 1;
                }, whole_delay_ms + index * 500 + 500);
            })(i);            
        }

        return;
    }
    
    // IDもとにテキストを設定する＋アニメーションつき
    animationText(elemid, dotspan_class, num, delay_ms) {
        // 表示するテキストを取得する
        let text = this.text_arr[num];
        // テキストを表示する要素を取得
        let text_area_elem = document.getElementById(elemid);

        // 要素内を初期化する
        text_area_elem.innerHTML = '';

        // 表示するテキストを一文字ずつspanで囲む
        for( let i = 0; i < text.length; i++) {
            let textspan = document.createElement("span");
            textspan.innerText = text[i];
            textspan.style.opacity = 0;
            text_area_elem.appendChild(textspan);
        }

        // spanタグの要素をすべて取得する
        let span_tag = text_area_elem.getElementsByTagName("span");
        // spanタグの透明度をひとつずつ１に変更する
        for( let j = 0; j < span_tag.length; j++) {
            (function (index) {
                setTimeout(function () {
                    span_tag[index].style.opacity = 1;
                }, index * delay_ms); // 遅延時間を調整
            })(j);
        }

        // 表示が完了したら次へを点滅させる
        this.flashNextTextarea(elemid, dotspan_class, (span_tag.length - 1) * delay_ms);

        return;
    }

    // IDもとに画像を設定する＋アニメーションつき
    animationImage(elemid, anime_css, anime_css_name, current_slide_num, next_slide_num, time, txt_area_elem) {
        // IDから要素を取得する
        let rpgconv_img_elem = document.getElementById(elemid);
        let rpgconv_anime_elem = document.getElementById(anime_css);

        // 設定前と設定後の画像を比較して同じファイルなら設定しない
        if(this.image_arr[current_slide_num] == this.image_arr[next_slide_num]) {
            return;
        }
        else {
            // 画像要素にアニメーションを付与する
            rpgconv_anime_elem.style.animation = anime_css_name + " " + String(time) + "s 1";
            
            // アニメーション中はテキストボックスを非表示にする
            txt_area_elem.style.display = "none";
            setTimeout(() => {
                txt_area_elem.style.display = "block";
            }, time * 2.5 * 1000);

            // 画像要素のソースを設定する
            // アニメーションの暗転している間に変更する
            setTimeout(() => {
                rpgconv_img_elem.src = this.image_arr[next_slide_num];                
            }, time / 2 * 1000);

            // アニメーションが完了したら削除する
            setTimeout(() => {
                rpgconv_anime_elem.style.animation = null;                
            }, time * 1000);

            return;
        }
    }

    // IDをもとに音声ファイルソースを設定する＋再生する
    animationSound(elemid, num) {
        // IDから要素を取得する
        let rpgconv_sound_elem = document.getElementById(elemid);

        // 音声が設定されていなければ設定しない
        if(this.sound_arr[num].length == 0) {
            return;
        }
        else {
            // 音声要素にファイルを設定する
            rpgconv_sound_elem.src = this.sound_arr[num];

            // 音声を再生する
            rpgconv_sound_elem.play();

            return;
        }
    }
}