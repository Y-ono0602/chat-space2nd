$(function(){
  function buildMessage(message){
    if(message.image == null){
    var html = `<div class="message">
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
                </div>`
    return html;
    }
    else {
    var html = `<div class="message">
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
                <img class="" src="${message.image}" alt="">
                </div>`
                return html;
    }}

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
      $(window).scrollTop(300);
      $('.input-box__text').val('')
      $('.submit-btn').prop('disabled', false);
      $('.main-container__messages').removeAttr('disabled');
      $('.main-container__messages').animate({ scrollTop: $('.main-container__messages')[0].scrollHeight});
      return false
    })
    .fail(function(){
      alert('エラー');
    })
  })
});