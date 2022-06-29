// Client facing scripts here
$(document).ready(function() {
  $('.wine-form').submit(function(e) {
    let wineID = $(this).attr('data-id')
    $.ajax({
      url: '/soldout',
      type: 'POST',
      data: {
        id: wineID
      }
    });
  })
  $('.delete-form').submit(function(e) {
    let wineID = $(this).attr('data-id')
    $.ajax({
      url: '/removelisting',
      type: 'POST',
      data: {
        id: wineID
      }
    });
  })
})
