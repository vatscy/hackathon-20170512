$(function() {
  $.ajax({
    type: 'GET',
    url: 'https://gxl6xlv440.execute-api.ap-northeast-1.amazonaws.com/dev/listtoilet',
    dataType: 'json'
  })
  .done(function (result) {
    var data = result.data;
    var $list = $('#toilets-list');
    for (var i = 0, len = data.length; i < len; i++) {
      var toilet = data[i];
      $list.append('<section class="list-rst js-bookmark js-done"><div class="list-rst__overview"><a href="/detail.html?t='
        + toilet.id
        + '"><div class="list-rst__header"><h1 class="list-rst__rst-name">'
        + toilet.name
        + '</h1><p class="list-rst__area-genre">新宿 / 洋式、ウォシュレット</p><div class="list-rst__rate"><p class="sptb-rating sptb-rating--lg sptb-rating--val'
        + (toilet.evaluation >= 1 ? ((Math.floor(toilet.evaluation * 10 / 5)) * 5) : 0)
        + '"><i class="sptb-rating__star"></i><b class="sptb-rating__val">'
        + toilet.evaluation.toFixed(2)
        + '</b></p><p class="list-rst__rvw-count"><i class="list-rst__rvw-count-icon gly-b-review">口コミ数</i><b class="list-rst__rvw-count-val">191</b></p></div><div class="js-bookmark-btn"><p class="list-rst__bookmark list-rst__bookmark--default js-login">行った・行きたいを編集</p></div></div><div class="list-rst__photo js-lazy-images"><div class="list-rst__photo-item"><div class="list-rst__photo-inner"><div class="list-rst__photo-frame"><img class="list-rst__photo-img js-lazyload-image is-loaded" src="/img/'
        + toilet.id
        + '/1.jpg"></div></div><div class="list-rst__photo-inner"><div class="list-rst__photo-frame"><img class="list-rst__photo-img js-lazyload-image is-loaded" src="/img/'
        + toilet.id
        + '/2.jpg"></div></div></div><p class="list-rst__pr-text">'
        + toilet.pillow_word
        + '</p><ul class="list-rst__subdata"><li class="list-rst__subdata-item"><span class="list-rst__subdata-subject list-rst__subdata-subject--holiday"></span><span class="list-rst__subdata-text">'
        + toilet.information.time
        + '</span></li><li class="list-rst__subdata-item"><span class="list-rst__subdata-subject list-rst__subdata-subject--distance"></span><span class="list-rst__subdata-text">'
        + toilet.address
        + '</span></li></ul></div></a></div></section>');
    }
  })
  .fail(function () {
    console.log('fail');
    console.log(arguments);
    alert('只今サーバーメンテナンス中です。');
  });
});
