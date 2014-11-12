var ImageApp = ImageApp || {}

ImageApp.key = "";

ImageApp.getAmazonURL = function() {
  $.ajax({
    url: 'https://pixelect-rails-api.herokuapp.com/amazon/sign_key',
    type: 'GET',
    data: {file_name: 'url.jpg'},
  })
  .done(function(result) {
    $('#uploadPolicy').val(result.policy);
    $('#uploadSignature').val(result.signature);
    $('#accessKey').val(result.access_key);
    $('#acl').val(result.acl);
    $('#key').val(result.key);
    ImageApp.key = "https://s3.amazonaws.com/pixelect-ig/" + result.key;
  })
  .fail(function(error) {
    console.log(error);
    console.log('error');
  })
  .always(function() {
    console.log("complete");
  });

};


ImageApp.addUrlToAPI = function() {
  // ImageApp.getAmazonURL();
  $.ajax({
    url: 'https://pixelect-rails-api.herokuapp.com/images',
    type: 'POST',
    data: {image: {file_name: 'placeholder', image_file: 'placeholder', image_url: ImageApp.key, flag: '0', image_set_id: $('#content').find('h1').attr("data-id")}}
  }).done(function(response) {
    console.log('url sent to api');
    console.table(response);
  });
}

$(document).ready(function() {
  $('#content').on('click', '#s3input', ImageApp.getAmazonURL);
  $('#content').on('click', '#submitButton', ImageApp.addUrlToAPI);
});
