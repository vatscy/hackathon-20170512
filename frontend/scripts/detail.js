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
