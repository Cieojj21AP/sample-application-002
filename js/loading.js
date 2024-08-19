$(function () {
    function end_loading() {
    // フェードアウトする時間
      $('.loading').fadeOut(2000);
    }
    
    $(window).on('load', function () {
      setTimeout(function () {
        end_loading();
    // ローディング画面を表示する時間
      }, 3000)
    })
})