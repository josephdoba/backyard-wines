// nodemailer setup
console.log("the contact.js page loaded correctly");

// const { mailSender } = require('./mail-sender.js');

$(document).ready(function() {

  $(".contact-seller_form-style").on("submit", function(event) {
  // $("form").on("submit", function(event) {
    event.preventDefault();

    // sanitize entry point:
    let contactText = $(".contact-seller_message-area").val();
    const data = $(this).serialize();
    // const $emptyError = `You can't send an empty email!`; Stretch Feature
    // const $errorIcon = `<i class="fa-solid fa-circle-exclamation"></i>`; Stretch Feature
    // const $lengthError = `Email too long. Must be within 300 chars.`; Stretch Feature

    // check if empty:
    if (!contactText) {
      alert("Cannot send a blank email");
    }

    // Send email:
    console.log(contactText);
    mailSender();



  });
});


/*

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

