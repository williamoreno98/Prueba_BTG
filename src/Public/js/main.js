$(function(){
    const socket= io();

    //variables
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');
    const $user = $('#usernames');

    $nickForm.submit(e =>{
        e.preventDefault();
        console.log('submit1');
        socket.emit('new request',$nickname.val(), data =>{
            $('#nickWrap').hide();
            $('#contentWrap').show();
            $nickname.val('');
        });
    });

    //events
    $messageForm.submit(e => {
        e.preventDefault();
        console.log('submit2');
        socket.emit('send message',$messageBox.val());
        $messageBox.val('');
    });

    socket.on('new message', function (data){
        $chat.append('<b>'+ data.nick +': '+ '</b>' + data.msg + '<br>');
    });

    socket.on('usernames', data => {
        let html='';
        for(let i = 0; i < data.length; i++){
            html += `<p><i class="fas fa-user"></i> ${data[i]} </p>` 
        }
        $user.html(html);
    });

    
    socket.on('load old messages', data => {
        for(let i = 0; i < data.length; i++){
            displayMsg(messages[i]);
        }
    });

    function displayMsg(data){
        $chat.append('<b>'+ data.nick +': '+ '</b>' + data.msg + '<br>');
    }
    
})
