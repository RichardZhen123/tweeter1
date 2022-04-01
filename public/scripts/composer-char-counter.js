$(document).ready(function() {
  $('#tweet-text').on('keyup', (event) => {
    const maxLength = 140;
    const message = event.target.value;
    const tweetLength = message.length;
    const charRemain = maxLength - tweetLength;
    
    if (tweetLength > maxLength) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "black")
    }

    $('.counter').html(charRemain);

    // Hiding alert box
    if (charRemain <= maxLength && charRemain > 0) {
      $("#box").slideUp();
      $("#box2").slideUp();
    }
  });
  
});