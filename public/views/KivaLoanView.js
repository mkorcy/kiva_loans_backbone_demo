window.KivaLoanView = Backbone.View.extend({
  //Sample JSON Result from Kiva
  //{"id":435805,"name":"Jos\u00e9 Ram\u00f3n","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1113843,"template_id":1},"activity":"Home Appliances","sector":"Personal Use","use":"to buy necessary kitchen appliances for his house.  ","location":{"country_code":"NI","country":"Nicaragua","town":"Leon","geo":{"level":"town","pairs":"12.435556 -86.879444","type":"point"}},"partner_id":74,"posted_date":"2012-06-09T23:50:04Z","planned_expiration_date":"2012-07-09T23:50:04Z","loan_amount":350,"borrower_count":1}
  // From the Requirements the following table columns need to be present:
  // Loan, Name, Status, Amount, Country, Pledge
  tagName: "tr",
  template: _.template('<td><%= id %><a href="#loanDetails" data-toggle="modal" class="loan_info">&nbsp;<i class=" icon-info-sign"></i></a></td><td><%= name %></td><td><%= status %></td><td><%= funded_amount %></td><td><%= location.country %></td><td><div class="input-prepend input-append"><span class="add-on">$</span><input id="<%= id %>" class="span2 tr" type="text" value="<%= pledge %>"><span class="add-on">.00</span></div></td>'),
  events: {
    'change input': 'sortLoans',
    'click a':'showLoanDetails'
  },

  initialize: function(){
    this.model.on('change', this.render, this);
    this.model.on('destroy hide', this.remove, this);

  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  remove: function(){
    this.$el.remove();
  },
  showLoanDetails: function(){    
    $('#modal_title').empty();
    $('#modal_description').empty();
    $('#modal_title').html(this.model.get('name'))
    $('#modal_description').append('<h3>Activity: ' + this.model.get('activity'));
    $('#modal_description').append('<h4>Sector: ' + this.model.get('sector'));
    $('#modal_description').append('<p>Use: ' + this.model.get('use'));
  },
  sortLoans: function(){
    var selector = 'input#' + this.model.get('id');
     this.model.set('pledge',$(selector).val());    
     this.model.save();         
  }
});
