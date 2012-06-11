// sample json for a single loan
//{"id":435805,"name":"Jos\u00e9 Ram\u00f3n","description":{"languages":["es","en"]},"status":"fundraising","funded_amount":0,"basket_amount":0,"image":{"id":1113843,"template_id":1},"activity":"Home Appliances","sector":"Personal Use","use":"to buy necessary kitchen appliances for his house.  ","location":{"country_code":"NI","country":"Nicaragua","town":"Leon","geo":{"level":"town","pairs":"12.435556 -86.879444","type":"point"}},"partner_id":74,"posted_date":"2012-06-09T23:50:04Z","planned_expiration_date":"2012-07-09T23:50:04Z","loan_amount":350,"borrower_count":1}
window.KivaLoan = Backbone.Model.extend({

	//pledge isn't an attribute we'll get from the JSON so adding it here 
	//as a default so it'll always be defined on the object.
	defaults: {		
		pledge : 0
	},
	initialize : function() {
		this.bind('error', function(model,errs) {
			alert("Pledge must be a positive integer.");
			model.set("pledge","0");
			model.save();
		});
	},
	validate : {
		//pledge should be a positive number
		pledge : {
			type : "number",
			min: 0
		}
	},

	sync: function(method, model, options) {
    	options = options || {};

    	if (method == "update")
    	{
    		//we don't have a server so we're going to post to a bin on requestb.in
    		$.post("http://requestb.in/1jnfo0y1", {
   			 json: {id: model.get('id'), pledge : model.get('pledge') }
			});
    		
    	}
    	else
    		Backbone.sync(method, model, options);
    }
});