var lastVisibleMessageID = 0;

function getMessages()
{
    $('#commentSection').append('<p>Привет!</p>');
}




$(document).ready(function() {
    //setInterval('getMessages()', 2000);

    $('#sendComment').click(function(event) {
	event.preventDefault();

	var comment = $('#commentInput').val();
	var nickname = $('#nameInput').val();

	if (nickname == '') {
	    nickname = 'Unnamed';
	} else {}

	if (comment != '') {
	    $('#commentSection').append(`<p> ${nickname}: ${comment}`);
	} else {}
    });

});


// <div class="comment">
//   <p>
//     <span class="userName">Савва</span>
//     <span class="time">18:05 07.02.2014</span>
//   </p>
//   <p class="commentText">Интересное тестовое задание</p>
// </div>	
