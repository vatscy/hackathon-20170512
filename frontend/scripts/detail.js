$(function() {
  $.ajax({
    type: 'GET',
    url: 'https://gxl6xlv440.execute-api.ap-northeast-1.amazonaws.com/dev/toilet',
    data: {
      id: 1494570067
    },
    dataType: 'json'
  })
  .done(function (data) {
    document.title = data.name + ' - 新宿区/ [トイレの食べログ]';
    $('#toilet-name').text(data.name);
    $('#pillow-word').text(data.pillow_word);
    $('#mainphoto-view').append('<li class="mainphoto-box"><img alt="メイン写真" class="mainphoto-image" src="/img/' + data.id + '/catch.jpg"></li>');
  })
  .fail(function () {
    console.log('fail');
    console.log(arguments);
  });
});
