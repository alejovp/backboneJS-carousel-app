// Backbone model

var Block = Backbone.Model.extend({
  defaults: {
    title: 'No image found',
    images: ['https://cdn.browshot.com/static/images/not-found.png']
  }
})

// Backbone Collection

var Blocks = Backbone.Collection.extend({
  url: './data.json'
})

// Backbone View

var ImgContainerView = Backbone.View.extend({
  model: new Blocks(),

  el: $('.carousel'),

  initialize: function () {
    this.template = _.template($('.block-template').html())
  },

  indexRef: 0,

  events: {
    'click .btn-next': 'nextBlocks',
    'click .btn-prev': 'prevBlocks'
  },

  nextBlocks: function () {
    this.indexRef = this.indexRef + 4
    this.render(this.indexRef)
  },

  prevBlocks: function () {
    this.indexRef = this.indexRef - 4
    this.render(this.indexRef)
  },

  checkButtons: function () {
    if (this.indexRef === 0) {
      this.$('.btn-prev').prop('disabled', true)
    } else if ((this.indexRef + 4) >= this.model.length) {
      this.$('.btn-next').prop('disabled', true)
      // console.log(this.$el.find('.btn-next')[0])
      // console.log(this.indexRef)
      // console.log(this.model.length)
    }
  },

  render: function (carouselIndex) {
    var self = this
    this.model.fetch({
      success: function (blocks) {
        self.$el.html(self.template({
          blocks: blocks.toJSON().slice(0 + carouselIndex, 4 + carouselIndex)
        }))
        self.checkButtons()
      }
    })
  }
})

var imgContainerView = new ImgContainerView()

imgContainerView.render(0)
