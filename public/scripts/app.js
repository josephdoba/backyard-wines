// Client facing scripts here
$(document).ready(function() {
  $('.wine-form').submit(function(e) {
    e.preventDefault();
    let wineID = $(this).attr('data-id')
    $.ajax({
      url: '/soldout',
      type: 'POST',
      data: {
        id: wineID
      }
    })
  })
})
