$(document).ready(function () {

  $('#plusBtn').on('click', function () {
    $clone = $('fieldset').last().clone()
    $id = parseInt($clone.attr('id')) + 1
    $clone.attr('id', $id)
    $('fieldset').last().after($clone) //insert the new clone
  })

  $('#minusBtn').on('click', function () {
    $last = $('fieldset').last()
    if ( $last.attr('id') != 1 ) {
      $last.remove()
    }
  })

})