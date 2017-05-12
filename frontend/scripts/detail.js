$(function() {
  $.ajax({
    type: 'GET',
    url: 'https://gxl6xlv440.execute-api.ap-northeast-1.amazonaws.com/dev/toilet',
    data: {
      id: 123456789
    },
    dataType: 'json'
  })
  .done(function (data) {
    document.title = data.name + ' - 新宿区/ [トイレの食べログ]';
    $('#toilet-name').text(data.name);

    for (var i = 0, len = data.photo_catch.length; i < len; i++) {
      $('#mainphoto-view').append('<li class="mainphoto-box"><img alt="メイン写真:' + i + '" class="mainphoto-image" src="' + data.photo_catch[i] + '"></li>');
    }
  })
  .fail(function () {
    console.log('fail');
    console.log(arguments);
  });
});
