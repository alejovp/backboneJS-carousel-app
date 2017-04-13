// // Backbone Model

// var Blog = Backbone.Model.extend({
//   defaults: {
//     author: '',
//     title: '',
//     url: ''
//   }
// })

// // Backbone Collection

// var Blogs = Backbone.Collection.extend({})

// // New instances

// var blog1 = new Blog({
//   author: 'Michael',
//   title: 'Michael\'s Blog',
//   url: 'http://michaelsblog.com'
// })

// var blog2 = new Blog({
//   author: 'John',
//   title: 'John\'s Blog',
//   url: 'http://johnsblog.com'
// })

// var blogs = new Blogs([blog1, blog2])

// Backbone Views

// var BlogView = Backbone.View.extend({
//   model: new Blog(),
//   tagName: 'tr',
//   initialize: function () {
//     this.template = _.template($('.blogs-list-template').html())
//   },
//   render: function () {
//     this.$el.html(this.template(this.model.toJSON()))
//     return this
//   }

// })

var Block = Backbone.Model.extend({
  defaults: {
    title: '',
    images: []
  }
})

var Blocks = Backbone.Collection.extend({
  url: './data.json'
})

var ImgContainerView = Backbone.View.extend({
  model: Block,
  el: $('.img-display'),
  // initialize: function () {
  //   this.model.on('add', this.render, this)
  // },
  initialize: function () {
    this.template = _.template($('.block-template').html())
  },
  render: function () {
    var self = this
    var blocks = new Blocks()
    blocks.fetch({
      success: function (blocks) {
        self.$el.html(self.template({blocks: blocks.toJSON()}))
        console.log(blocks.toJSON())
      }
    })
    // console.log(images.toJSON())
    // this.$el.html(this.template)
    // _.each(this.model.toArray(), function (blog) {
    //   self.$el.append((new BlogView({model: blog})).render().$el)
    // })
    // return this
  }
})

var imgContainerView = new ImgContainerView()

imgContainerView.render()

// var blogsView = new BlogsView()

// $(document).ready(function () {
//   $('.add-blog').on('click', function () {
//     var blog = new Blog({
//       author: $('.author-input').val(),
//       title: $('.title-input').val(),
//       url: $('.url-input').val()
//     })
//     $('.author-input').val('')
//     $('.title-input').val('')
//     $('.url-input').val('')

//     blogs.add(blog)
//   })
// })

