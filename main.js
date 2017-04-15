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
    // this.btnNext = $('.btn-next')
    // this.model.view = this
    // this.model.bind('validated', this.validated)
  },

  indexRef: 0,

  events: {
    'click .btn-next': 'nextBlocks',
    'click .btn-prev': 'prevBlocks'
  },

  // validated: function () {
  //   if ((this.indexRef + 4) >= this.model.length) {
  //     this.view.btnNext.attr('disabled', 'true')
  //     console.log(this.indexRef)
  //     console.log(this.model.length)
  //   } else {
  //     this.view.btnNext.attr('disabled', 'false')
  //   }
  // },

  nextBlocks: function () {
    this.indexRef = this.indexRef + 4
    // this.render(this.indexRef)

    if ((this.indexRef + 4) >= this.model.length) {
      this.render(this.indexRef)
      this.$('.btn-next').addClass('disabled')
      console.log(this.$('.btn-next'))
      console.log(this.indexRef)
      console.log(this.model.length)
    }

    // this.validated()
  },

  prevBlocks: function () {
    this.indexRef = this.indexRef - 4
    this.render(this.indexRef)
    console.log(this.indexRef)
  },

  checkNextBtn: function () {
    if ((this.indexRef + 4) >= this.model.length) {
      this.$el.find('.btn-next').prop('disabled', true)
      console.log(this.$el.find('.btn-next')[0])
      console.log(this.indexRef)
      console.log(this.model.length)
    }
  },

  render: function (index) {
    var self = this
    this.model.fetch({
      success: function (blocks) {
        self.$el.html(self.template({
          blocks: blocks.toJSON().slice(0 + index, 4 + index)
        }))
        // console.log(blocks.toJSON().slice(0 + index, 4 + index))
      }
    })
  }
})

var imgContainerView = new ImgContainerView()

imgContainerView.render(0)
