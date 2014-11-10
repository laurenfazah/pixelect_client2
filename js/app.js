var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'users': 'users', 
        'image_sets': 'image_sets',
        'images': 'images',
        'comments': 'comments',
        'likes': 'likes'
    },
    
    home: function() {
      $('#content').empty();
        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/images',
            type: 'GET'
        }).done(function(response) {
            console.table(response);
        });
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

    image_sets: function() {
      $('#content').empty();

        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/image_sets',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#imageSetsTemplate').html());
              $('#content').html(template({
                image_set: response
            }));
        });
    }, 

    images: function() {
      $('#content').empty();

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

    comments: function() {
      $('#content').empty();

        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/comments',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#commentsTemplate').html());
              $('#content').html(template({
                comment: response
            }));
        });
    },

    likes: function() {
      $('#content').empty();

        $.ajax({
            url: 'https://pixelect-rails-api.herokuapp.com/likes',
            type: 'GET'
        }).done(function(response) {
            console.log(response);
            var template = Handlebars.compile($('#likesTemplate').html());
              $('#content').html(template({
                like: response
            }));
        });
    }
});

var router = new Router();

Backbone.history.start();