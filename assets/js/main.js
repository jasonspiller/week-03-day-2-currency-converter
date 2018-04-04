$(function() {

	// make the api request
	$.get('http://data.fixer.io/api/latest?access_key=3e95437b3ad0e0208372ddfeed6587c3', function(response) {

		// convert from base currency (eur) to dollars (usd)
		function convertBase(intUSD) {
			return intUSD / response.rates.USD;
		}

		function convertCurrency() {

			var intUSD = convertBase($('input[type=text]').val()),
					strOutputCurrency = $(this).val(),
					intOutputAmount = 0;

			// assign output value rounded conversion
			intOutputAmount = Math.round(intUSD * response['rates'][strOutputCurrency]);

			$('#output_amount').html(intOutputAmount);
			$('#output_currency').html(strOutputCurrency);
		}

		// add event listener
		$('input[type="button"]').on('click', convertCurrency);

	});
})
