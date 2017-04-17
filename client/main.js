
// Backbone Collection

var Blocks = Backbone.Collection.extend({
  url: './api'
})

// Backbone View

var ImgContainerView = Backbone.View.extend({
  collection: new Blocks(),

  el: $('.carousel'),

  initialize: function () {
    var self = this
    this.template = _.template($('.block-template').html())
    this.collection.fetch({
      success: function (blocks) {
        self.$el.html(self.template({
          blocks: blocks.toJSON().slice(0, 4)
        }))
        self.checkButtons()
      }
    })
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
    } else if ((this.indexRef + 4) >= this.collection.length) {
      this.$('.btn-next').prop('disabled', true)
    }
  },

  render: function (carouselIndex) {
    this.$el.html(this.template({
      blocks: this.collection.toJSON().slice(0 + carouselIndex, 4 + carouselIndex)
    }))
    this.checkButtons()
  }
})

var imgContainerView = new ImgContainerView()
