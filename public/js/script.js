let isMenuOverLayVisible = false;
const menuButton = $(".js_menu_button");
const header = $("header");

$('.js_menu_button').click(function(){
  if (isMenuOverLayVisible === false) {
    menuButton.addClass("on");
    header.addClass("on");
    isMenuOverLayVisible = true;
    return;
  }

  menuButton.removeClass("on");
  menuButton.addClass("off");
  header.removeClass("on");
  header.addClass("off");
  isMenuOverLayVisible = false;
});

$('#slider').slider({　//スライドさせる部分の#ID名
  showControls: true, //　矢印を表示するか
  autoplay: true, //　自動再生するか
  showPosition: true,  //　ポジションを表示するか
  hoverPause: true, // Hover時に一時停止するか 
  wait: 5000,
  fade: 500,
  direction: "left"
});

$('.link_list a, .features-sub-section a').click(function() {
  var elmHash = $(this).attr('href');
  var pos = $(elmHash).offset().top;
  $('body, html').animate({scrollTop: pos}, 1000);
  return false;
})

var currentWidth = window.innerWidth;
var w = w = $(window).width();
var x = 767;
$(window).resize(function(){
  w = $(window).width();
  if (currentWidth == window.innerWidth) {
    return;
  }
  location.reload();
});

if (w <= x) {
  $('.accordion-point').on('click', function() {//タイトル要素をクリックしたら
    $('.accordion-box').slideUp(500);//クラス名.boxがついたすべてのアコーディオンを閉じる
      
    var findElm = $(this).parent().find('.accordion-box');//タイトル直後のアコーディオンを行うエリアを取得
    if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
      $(this).removeClass('close');//クラス名を除去    
    }else{//それ以外は
      $('.close').removeClass('close'); //クラス名closeを全て除去した後
      $(this).addClass('close');//クリックしたタイトルにクラス名closeを付与し
      $(findElm).slideDown(500);//アコーディオンを開く
    }
  });
}

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
	var scroll = $(window).scrollTop();
	if (scroll >= 200){//上から200pxスクロールしたら
		$('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
		$('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
	}else{
		if($('#page-top').hasClass('UpMove')){//すでに#page-topにUpMoveというクラス名がついていたら
			$('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
			$('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
		}
	}
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top a').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 1000);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});

$(window).scroll(function() {
  if(window.innerWidth >= 767) {
    $('section:not(:first-of-type), .features-point, .cv, .features-point-sub, .concept-article').each(function() {
      var elemPos = $(this).offset().top+100;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if(scroll >= elemPos - windowHeight) {
        if ($(this).hasClass('concept-article')) {
          $(this).addClass('fadeIn');
        } else {
          $(this).addClass('fadeUp');
        }
      }
    });
  }
});
