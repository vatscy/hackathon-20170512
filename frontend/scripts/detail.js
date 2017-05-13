$(function() {
  var id = location.search
    .substr(1)
    .split('&')
    .map(function(e) {
      var keyValue = e.split('=');
      return {
        key: keyValue[0],
        value: keyValue[1]
      };
    })
    .filter(function(e) {
      return e.key = 't';
    })[0]
    .value;
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
    .done(function(data) {
      document.title = data.name + ' - 新宿区/ [トイレの食べログ]';
      $('#toilet-name').text(data.name);
      $('#pillow-word').text(data.pillow_word);
      $('#mainphoto-view').append('<li class="mainphoto-box"><img alt="メイン写真" class="mainphoto-image" src="/img/' + data.id + '/catch.jpg"></li>');
      $('#toilet-address').text(data.address);
      var mapLink = 'https://maps.google.co.jp/maps?q=' + encodeURIComponent(data.address);
      $('#toilet-map-menu').attr('href', mapLink);
      $('#toilet-map-link-1').attr('href', mapLink);
      $('#toilet-map-link-2').attr('href', mapLink);
      $('#toilet-map-bar').attr('href', mapLink);

      var eva = data.evaluation || 0;
      var scoreClass = 'score' + (eva < 1 ? 0 : ((Math.floor(eva * 10 / 5)) * 5));
      var $rating = $('#toilet-rating');
      $rating.append('<dt class="total">総合点数</dt><dd id="toilet-total-score" class="' + scoreClass + '"><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span><b>' + eva.toFixed(2) + '</b></dd>');
      $rating.append('<dt class="dinner">夜の点数</dt><dd>' + eva.toFixed(2) + '</dd>');
      $rating.append('<dt class="lunch">昼の点数</dt><dd>' + eva.toFixed(2) + '</dd>');
      $rating.append('<dt class="rvw">口コミ</dt><dd><span class="count">43</span><span class="unit">万件</span></dd>');

      var $photoList = $('#toilet-photo-list');
      $photoList.append('<li class="rstdtl-rvw-photo__item"><img alt="" height="120" src="/img/' + id + '/1.jpg" width="120"></li>');
      $photoList.append('<li class="rstdtl-rvw-photo__item"><img alt="" height="120" src="/img/' + id + '/2.jpg" width="120"></li>');
      $photoList.append('<li class="rstdtl-rvw-photo__item"><img alt="" height="120" src="/img/' + id + '/3.jpg" width="120"></li>');

      $('#rv-photo-1').append('<img alt="" height="70" width="70" src="/img/' + id + '/1.jpg">');
      $('#rv-photo-2').append('<img alt="" height="70" width="70" src="/img/' + id + '/2.jpg">');
      $('#rv-photo-3').append('<img alt="" height="70" width="70" src="/img/' + id + '/3.jpg">');

      var info = data.information;
      var $infoBasic = $('#toilet-info-basic');

      function tf(isPresent) {
        return isPresent ? 'あり' : '-';
      }
      $infoBasic.append('<tr><th>営業時間</th><td><p>' + info.time + '</p></td></tr>');
      $infoBasic.append('<tr><th>洋式トイレ</th><td><p>' + tf(info.style_western) + '</p></td></tr>');
      $infoBasic.append('<tr><th>和式トイレ</th><td><p>' + tf(info.style_japan) + '</p></td></tr>');
      $infoBasic.append('<tr><th>ウォシュレット</th><td><p>' + tf(info.washlet) + '</p></td></tr>');
      $infoBasic.append('<tr><th>多目的トイレ</th><td><p>' + tf(info.multipurpose) + '</p></td></tr>');
      $infoBasic.append('<tr><th>パウダールーム</th><td><p>' + tf(info.powder_room) + '</p></td></tr>');
      $infoBasic.append('<tr><th>おむつ交換設備</th><td><p>' + tf(info.diaper_change_space) + '</p></td></tr>');
      $infoBasic.append('<tr><th>車椅子対応</th><td><p>' + tf(info.wheelchair) + '</p></td></tr>');

      $('#info-yo').text(info.style_western ? '有' : '無');
      $('#info-wa').text(info.style_japan ? '有' : '無');
    })
    .fail(function() {
      console.log('fail');
      console.log(arguments);
      alert('このトイレは現在存在しません。');
      location.href = '/list.html';
      return;
    });

    $('.ui.rating').rating();
    $('#toilet-rating-btn').on('click', function() {
      var location = $('#toilet-rating-location').rating('get rating');
      var functionality = $('#toilet-rating-functionality').rating('get rating');
      var design = $('#toilet-rating-design').rating('get rating');
      var comfortability = $('#toilet-rating-comfortability').rating('get rating');
      var others = $('#toilet-rating-others').rating('get rating');
      $.ajax({
        type: 'POST',
        url: 'https://gxl6xlv440.execute-api.ap-northeast-1.amazonaws.com/dev/postevaluation',
        data: JSON.stringify({
          id: id,
          location: location,
          functionality: functionality,
          design: design,
          comfortability: comfortability,
          others: others
        }),
        contentType: 'application/json',
        dataType: 'json'
      })
      .done(function () {
        alert('評価が完了しました。');
      })
      .fail(function() {
        console.log('fail');
        console.log(arguments);
        alert('只今サーバーメンテナンス中です。');
      });
    });
});
