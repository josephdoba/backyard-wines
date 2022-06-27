// User clicked on Send button:
//$(document).ready(function() {
 // console.log("contact ready!");
//});


// $(document).ready(



//   $("form").on("submit", function(event) {
//     event.preventDefault();
//     console.log("Ayy the contact button is connected!");

//   })
// );


/*
  // sanitize entry point:
  let contactText = escape($(".new-tweet-form-textarea").val());
  const safeHTML = `<p>${contactText}</p>`;
  const data = $(this).serialize();
  const $emptyError = `You can't send an empty tweet!`;
  const $errorIcon = `<i class="fa-solid fa-circle-exclamation"></i>`;
  const $lengthError = `Tweet too long. Must be within 140 chars.`;

  // check if empty:
  if (!contactText) {
    $(".new-tweet-error").slideDown(200, function() {
      $(".new-tweet-error").toggleClass("new-tweet-error-border");
      $(".new-tweet-error").text($emptyError);
      $(".new-tweet-error").append($errorIcon);
      $(".new-tweet-error").prepend($errorIcon);
    });

  // If cleared, post to server:
  } else {
    $(".new-tweet-error").slideUp(200, function() {
      $(".new-tweet-error").toggleClass("new-tweet-error-border");
    });

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: data
    }).then(data => {
      loadTweets();
    });
    // clear textbox field and reset character count
    $(".new-tweet-form-textarea").val("");
    $('.counter').text(140);
  }
  */

