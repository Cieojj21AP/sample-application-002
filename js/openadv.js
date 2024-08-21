// 広告タブを開く
function tabopenAdv() {
    const iframe = document.documentElement.querySelector("iframe");
    // null か空文字なら false と判定してくれる
    if (!iframe) {
        return;
    }
    iframe.click();
}

// リンククリックで関数を実行
document.getElementById("openXLandau").addEventListener("click", tabopenAdv);