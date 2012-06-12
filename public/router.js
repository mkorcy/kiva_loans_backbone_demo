// Being a sample app this routes on this are fairly straight forward.

window.KivaLoansApp = new (Backbone.Router.extend({
  routes: {
    "": "index"
  },
  initialize: function(){
    this.kivaLoans = new KivaLoans();
    this.loansView = new KivaLoansView({collection: this.kivaLoans});
    $('#loans').html(this.loansView.el);
//    this.loansView.render();
  },
  index: function(){
    //$('#loans').html(this.loansView.el);
    this.kivaLoans.fetch();
  },

  start: function(){
    // I'd enable push state but my app is only one page anyhow so it is moot.
    Backbone.history.start({pushState:false});
  }  
}));
