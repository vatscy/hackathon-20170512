$(function() {
  var id = location.hash.substr(1);
  if (!id || isNaN(id)) {
    alert('このトイレは現在存在しません。');
    location.href = '/list.html';
    return;
  }
  $.ajax({
    type: 'GET',
    url: 'https://gxl6xlv440.execute-api.ap-northeast-1.amazonaws.com/dev/toilet',
    data: {
      id: id
    },
    dataType: 'json'
  })
  .done(function (data) {
    document.title = data.name + ' - 新宿区/ [トイレの食べログ]';
    $('#toilet-name').text(data.name);
    $('#pillow-word').text(data.pillow_word);
    $('#mainphoto-view').append('<li class="mainphoto-box"><img alt="メイン写真" class="mainphoto-image" src="/img/' + data.id + '/catch.jpg"></li>');
    $('#toilet-address').text(data.address);

    var eva = data.evaluation || 0;
    var scoreClass = 'score' + (eva < 1 ? 0 : ((Math.floor(eva * 10 / 5)) * 5));
    var $rating = $('#toilet-rating');
    $rating.append('<dt class="total">総合点数</dt><dd id="toilet-total-score" class="' + scoreClass + '"><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><b>' + eva.toFixed(2) + '</b></dd>');
    $rating.append('<dt class="dinner">夜の点数</dt><dd>' + eva.toFixed(2) + '</dd>');
    $rating.append('<dt class="lunch">昼の点数</dt><dd>' + eva.toFixed(2) +'</dd>');
    $rating.append('<dt class="rvw">口コミ</dt><dd><span class="count">43</span><span class="unit">万件</span></dd>');

    var info = data.information;
    var $infoBasic = $('#toilet-info-basic');
    function tf(isPresent) {
      return isPresent ? 'あり': '-';
    }
    $infoBasic.append('<tr><th>営業時間</th><td><p>'+ info.time +'</p></td></tr>');
    $infoBasic.append('<tr><th>洋式トイレ</th><td><p>'+ tf(info.style_western) + '</p></td></tr>');
    $infoBasic.append('<tr><th>和式トイレ</th><td><p>'+ tf(info.style_japan) + '</p></td></tr>');
    $infoBasic.append('<tr><th>ウォシュレット</th><td><p>'+ tf(info.washlet) + '</p></td></tr>');
    $infoBasic.append('<tr><th>多目的トイレ</th><td><p>'+ tf(info.multipurpose) + '</p></td></tr>');
    $infoBasic.append('<tr><th>パウダールーム</th><td><p>'+ tf(info.powder_room) + '</p></td></tr>');
    $infoBasic.append('<tr><th>おむつ交換設備</th><td><p>'+ tf(info.diaper_change_space) + '</p></td></tr>');
    $infoBasic.append('<tr><th>車椅子対応</th><td><p>'+ tf(info.wheelchair) + '</p></td></tr>');
  })
  .fail(function () {
    console.log('fail');
    console.log(arguments);
    alert('このトイレは現在存在しません。');
    location.href = '/list.html';
    return;
  });
});
