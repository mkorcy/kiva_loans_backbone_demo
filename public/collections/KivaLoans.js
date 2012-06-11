window.KivaLoans = Backbone.Collection.extend({
	model: KivaLoan,
	url: 'http://api.kivaws.org/v1/loans/newest.json',
	comparator: function(loan)
	{
		return - loan.get("pledge");
	},
	// The Kiva API returns loans under "loans".
  	parse: function(response) {
      return response.loans;
  	}	
});