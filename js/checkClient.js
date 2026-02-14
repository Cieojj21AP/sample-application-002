(async () => {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
    const path = isMobile ? "/html/spbody.html" : "/html/pcbody.html";

    const html = await fetch(path).then(res => res.text());
    document.getElementById("app").innerHTML = html;
})();