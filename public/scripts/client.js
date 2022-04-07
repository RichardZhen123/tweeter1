$(document).ready(function() {
  const renderTweets = function(tweets) {
    const $tweetsContainer = $(".tweetsContainer");
    $tweetsContainer.empty();
    const arr = [];

    for (let obj of tweets) {
      let newTweet = createTweetElement(obj);
      console.log(newTweet);
      arr.push(newTweet[0]);
    }

    $tweetsContainer.append(arr);
  }
  
  // function to convert to text to prevent cross site scripting attacks
  const escape = function (str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  //dynamically creating tweet boxes as they are entered with profiles
  const createTweetElement = function(tweet) {
    const $tweet = $("<article>").addClass("tweetBox");
    const date = timeago.format(tweet.created_at);
    const tweetContent = 
      `<header>
      <div class="profile">
      <img src=${escape(tweet.user.avatars)} width="50" height="50">
      <p>${escape(tweet.user.name)}</p>
      </div>
      <p class="tag">${escape(tweet.user.handle)}</p> 
      </header>
      
      <p class="content">${escape(tweet.content.text)}</p>
      
      <footer>
      <p> ${escape(date)} </p>
      <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
      </div>
      </footer>`
    
    const newTweet = $tweet.append(tweetContent);
    return newTweet;
  };
  
  const getTweet = () => {
    $.ajax({
      url: "/tweets",
      type: "GET"
    }).then (function(data) {
      renderTweets(data);
    })
  }
  
  getTweet();
  
  //hiding tweet box initially so it does not display on intial load
  $(".alertBox").hide();

  //event listener for clicking "Tweet" 
  $('#tweetForm').on('submit', function(e) {
    e.preventDefault();
    const content = $("#tweetForm").serialize();
    const tweet = $("#tweet-text").val();
  
    //if stmts to show error msgs
    if (tweet.length > 140) {
      return $("#box").slideDown();
    }

    if (!tweet) {
      return $("#box2").slideDown();
    }
    
    $.ajax ({
      type: "POST",
      url: "/tweets",
      data: content
    }). then((data) => {
      getTweet();
      $("#tweet-text").val("");
    })
    
    // resetting counter to 140
    $('.counter').html("140");
  })
});