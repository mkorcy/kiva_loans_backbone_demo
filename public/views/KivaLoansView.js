window.KivaLoansView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
    this.collection.on('change', this.sortLoans, this);

  },

  render: function(){
    this.addAll()
    return this;
  },

  addAll: function(){
    this.$el.empty();
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(todoItem){
    var loanView = new KivaLoanView({model: todoItem});

    //normally you would probably see this.$el but we're appending to the table body here.
    $('tbody').append(loanView.render().el); 
  },
  sortLoans: function(){   
   //Clear the table items sine sort is going to redraw all of them in this implementation
   $('tbody').html('');  

   //Sort but don't allow a reset event.
   this.collection.sort({silent : false});

  }
});