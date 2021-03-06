$(document).on('turbolinks:load', function() {
$(function(){
  function buildMessage(message){
    var imageUrl = message.image === null ? '' : `<img class="" src="${message.image}" alt="">`
    var html = `<div class="message" data-message-id="${message.id}">
                <div class="message__info">
                <p class="message__info__user">
                ${message.name}
                </p>
                <p class="message__info__date">
                ${message.time}
                </p>
                </div>
                <p class="message__text">
                ${message.content}
                </p>
                ${imageUrl}
                </div>`
                return html;
    }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.main-container__messages').append(html)
      $("form")[0].reset();
      $('.submit-btn').prop('disabled', false);
      $('.main-container__messages').removeAttr('disabled');
      $('.main-container__messages').animate({ scrollTop: $('.main-container__messages')[0].scrollHeight});
      return false
    })
    .fail(function(){
      alert('エラー');
    })
  })

  // 以下メッセージの自動更新
  $(function(){
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data('message-id'); 
    var href = 'api/messages#index {:format=>"json"}'
    $.ajax({
      url: href,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildMessage(message);
          $('.main-container__messages').append(insertHTML);
          $('.main-container__messages').animate({ scrollTop: $('.main-container__messages')[0].scrollHeight});
        })
    })
    .fail(function() {
      alert("error");
    });
   };
  };
  
  setInterval(reloadMessages, 5000);
  });

});
});