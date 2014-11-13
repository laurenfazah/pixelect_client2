var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'users': 'users',
        'images': 'images',
        'upload_image_set' : 'upload_image_set',
        'postImages': 'postImages',
        'image_sets/:id' : 'image_sets',
        'about' : 'about'
    },

    home: function() {
      $('#content').empty();
      $('#myCarousel').show();
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/favorite/get_favorite',
            type: 'GET'
        }).done(function(response) {
            console.table(response);
            var template = Handlebars.compile($('#homePopSetsTemplate').html());
              $('#pop_script').html(template({
                pop_image_set: response
            }));
        });
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/recent/get_recent',
            type: 'GET'
        }).done(function(response) {
            console.table(response);
            var template = Handlebars.compile($('#homeRecSetsTemplate').html());
              $('#rec_script').html(template({
                rec_image_set: response
            }));
        });
    },

    // upload_pics: function() {
    //   $('#myCarousel').hide();
    //   $('#content').empty();

    //   var template = Handlebars.compile($("#uploadPicsTemplate").html());
    //     $('#content').html(template({

    //     }));

    // },

    upload_image_set: function() {
      $('#myCarousel').hide();
      $('#content').empty()
      var template = Handlebars.compile($('#uploadTemplate').html());
          $('#content').html(template({
                // picSet: response
            }));
      },

    users: function() {
      $('#content').empty();

        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/users',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#usersTemplate').html());
              $('#content').html(template({
                user: response
            }));
        });
    },

    image_sets: function(id) {
        $('#content').empty();
        $('#myCarousel').hide();
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/image_sets/' + id,
            type: 'GET'
        }).done(function(response) {
          console.table(response);
            var responseJSON = response.to_json;
            console.log(responseJSON);
            var template = Handlebars.compile($('#imageSetTemplate').html());
              $('#content').html(template({
                image_set: response
            }));
        });
        // $('#content').empty();
        // $.ajax({
        //     url: 'https://pixelect-rails-api.herokuapp.com/####/' + id,
        //     type: 'GET'
        // }).done(function(response) {
        //     // console.log(responseJSON);
        //     var template = Handlebars.compile($('#imageSetTemplate').html());
        //       $('#likesTotal').html(template({
        //     }));
        // });
    },




    images: function() {

      $('#content').empty();
      $('#myCarousel').hide();


        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/images',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#imagesTemplate').html());
              $('#content').html(template({
                image: response
            }));
        });
    },


    about: function() {
        $('#myCarousel').hide();
        $('#content').empty();
        var template = Handlebars.compile($('#aboutTemplate').html());
          $('#content').html(template({
        }));
    },


});
// var events = function() {
//     $('.see-image-set').on('click', image_sets);
// };

// $(function() {
//     events;
// })

  // $('#content').on('click', '#submitComment', function() {
        // e.preventDefault();

    var comment_post = function() {

        // console.log($(this).attr("data-id"))
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/comments',
            type: 'POST',
            data: {comment: {
                body: $('#content').find('input[name="createComment"]').val(),
                user_id: 1,
                image_set_id: $(this).attr("data-id")}
            }
        }).done(function(response) {
            console.log(response.body);
            var template = Handlebars.compile($('#commentsTemplate').html());
              $('#bodyOfComments').append(template({
                comment: response.body
            }));

        });
    };

    var create_image_set = function() {
      // console.log($('#content').find('input[name="voting-criteria"]').val());
        $.ajax({
          url: 'https://pixelect-rails-api.herokuapp.com/image_sets',
          type: 'POST',
          data: {image_set: {
                voting_criteria: $('#content').find('input[name="voting-criteria"]').val(),
                user_id: '',
                total_likes: 0}
          }
        }).done(function(response){
          console.log(response);
          var template = Handlebars.compile($('#imageSetImageTemplate').html());
          $('#content').html(template({
                image_set: response
            }));
        });
      };

    // var render_pic_to_upload = function() {
    //     var id = $('#content').find('h1').attr("data-id")
    //     $('#content').empty();
    //     // console.log($('#content').find('h1').attr("data-id"))
    //     $.ajax({
    //         url: 'https://pixelect-rails-api.herokuapp.com/image_sets/'+ id,
    //         type: 'GET'
    //     }).done(function(response) {
    //         var template = Handlebars.compile($('#imageSetImageTemplate').html());
    //         $('#content').html(template({
    //             image_set: response
    //         }));
    //     });
    // }

    // var makeHoverHappen = function() {

    // };


$(document).ready(function () {
  $('#content').on('click', '#submitComment', comment_post);
  $('#content').on('click', '#submit-picture-set', create_image_set);
  // $('#content').on('click', '#submitButton', render_pic_to_upload);
  // $('<img>').on('hover', makeHoverHappen)
  $("<img>").hover(
    function() {
    $("<img>").stop().fadeOut();
  },
    function() {
    $("<img>").stop().fadeIn();
    });
});

var router = new Router();


Backbone.history.start();
