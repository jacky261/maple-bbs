$(document).ready(function(){
  $('.like-reply').click(function() {
    var _$this = $(this);
    var replyId = _$this.attr('data-id');
    var like_url = "/replies/" + replyId + '/like';
    var data = JSON.stringify({
    });
    if(_$this.hasClass('like-active')){
      $.ajax ({
        type : "DELETE",
        url : like_url,
        data:data,
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
          if (response.status === '200')
          {
            _$this.attr("title","赞");
            _$this.removeClass("like-active");
            _$this.addClass("like-no-active");
          } else
          {
            window.location.href = response.data.url;
          }
        }});
    }else {
      $.ajax ({
        type : "POST",
        url : like_url,
        data:data,
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
          if (response.status === '200')
          {
            _$this.attr("title","取消赞");
            _$this.removeClass("like-no-active");
            _$this.addClass("like-active");
          } else
          {
            window.location.href = response.url;
          }
        }});
    }});
  $('.reply-author').click(function() {
    var _$this = $(this);
    var author = _$this.attr('data-id');
    $('#content').focus();
    $('#content').val('@' + author + ' ');
  });
});
function DoVote(voteData) {
  $(document).ready(function(){
    $('#topic-up-vote').click(function() {
      var data = JSON.stringify({
      });
      $.ajax ({
        type : "POST",
        url : voteData.vote_url,
        data:data,
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
          if (response.status === '200')
          {
            $('.votes').html(result.html);
          } else
          {
            window.location.href = result.url;
          }
        }});
    });
    $('#topic-down-vote').click(function() {
      var data = JSON.stringify({
      });
      $.ajax ({
        type : "DELETE",
        url : voteData.vote_url,
        data:data,
        contentType: 'application/json;charset=UTF-8',
        success: function(response) {
          if (response.status === '200')
          {
            $('.votes').html(result.html);
          } else
          {
            window.location.href = result.url;
          }
        }});
    });
  });
}
function PreviewTopic(pre_url) {
  $('#topic-preview').click(function() {
    var content = $('#content').val();
    $.post(pre_url, {
      content: $("#content").val(),
      choice: $("#choice").val()
    }, function(data) {
      $("#show-preview").html(data);
    });
  });
}
function AskTopic(pre_url) {
  $(document).ready(function(){
    PreviewTopic(pre_url);
    $('#tokenfield').tokenfield({
      limit:4
    });
  });
}
function EditTopic(pre_url,edit_url) {
  $(document).ready(function(){
    PreviewTopic(pre_url);
    $('#tokenfield').tokenfield({
      limit:4
    });
    $('#topic-put-btn').click(function() {
      var form_data = $("form#topic-put").serializeArray();
      var data = {};
      $.each(form_data,function() {
        data[this.name] = this.value;
      });
      data = JSON.stringify(data);
      $.ajax ({
        type : "PUT",
        url : edit_url,
        data:data,
        contentType: 'application/json;charset=UTF-8',
        success: function(result) {
          if (result.judge === true) {
            window.location.href= edit_url;
          }else {
            alert(result.error);
          }
        }
      });
    });
  });
}