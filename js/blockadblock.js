function detectAdBlock() {
    // fetch("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
    //     method: "HEAD",
    //     mode: "no-cors",
    //     cache: "no-store"
    // })
    // .then()
    // .catch(err => {
    //     // TO DO
    //     console.error('エラー', err);
    //     // location.href="/html/adblockError.html";
	// }
    // )

    try{
        const url = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        fetch(url, {
            method: "HEAD",
            mode: "no-cors",
            cache: "no-store"
        })
    }
    catch(err){
        console.error('エラー', err);
    }

}

// window.addEventListener("load", detectAdBlock);
window.onload = detectAdBlock;