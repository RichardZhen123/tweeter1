$(document).ready(function() {
  $('#tweet-text').on('keyup', (event) => {
    const maxLength = 140;
    let message = event.target.value;
    let tweetLength = message.length;
    let charRemain = maxLength - tweetLength;
    
    if (tweetLength > maxLength) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "black")
    }

    $('.counter').html(charRemain);
  });
  
});