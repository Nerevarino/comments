// var lastVisibleMessageID = 0;

function getMessages()
{
    $.post('../php/getComments.php',
	   {
	       // 'lastVisibleMessageID' : lastVisibleMessageID
	   },
	   function(data, status) {
	       var commentSection = $('#commentSection');
	       var newComments = JSON.parse(data);
	       commentSection.empty();
	       for(var i in newComments) {
		   commentSection.append
		   (		       
`<div class="comment">
  <p>
    <span class="userName">${newComments[i].nickname}</span>
    <span class="time">${newComments[i].time}</span>
  </p>
  <p class="commentText">${newComments[i].comment}</p>
</div>`	
		       
		   );
	       }
	   }
    );
}




$(document).ready(function() {
    setInterval('getMessages()', 2000);

    $('#nameInput').val('');
    $('#commentInput').val('');
    
    $('#sendComment').click(function(event) {
	event.preventDefault();

	var commentInput  = $('#commentInput');
	var nicknameInput = $('#nameInput'); 
	
	var comment = commentInput.val();
	var nickname = nicknameInput.val();
	var date = new Date();

	
	var timeString = `${date.toLocaleTimeString()}  ${date.toLocaleDateString()}`;

	if (nickname == '') {
	    nickname = 'Unnamed';
	} else {}

	if (comment.length != 0) {
	     $.post('../php/postComment.php',
		   {
		       'nickname' : nickname,
		       'comment'  : comment,
		       'timeString' : timeString
		   },
		   function(data, status)
		   {
		       commentInput.val('');
		       nicknameInput.val('');		       
		   }
	    );
	} else {
	    alert("Ваш комментарий пуст(");
	}
    });

});


