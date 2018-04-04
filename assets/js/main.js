$(function() {

	// make the api request
	$.get('http://data.fixer.io/api/latest?access_key=3e95437b3ad0e0208372ddfeed6587c3', function(response) {

		// convert input to base currency (eur)
		function convertBase(intInput) {
			return intInput / response.rates.USD;
		}

		// convert usd amount entered to appropriate currency
		function convertCurrency() {

			var intUSD = convertBase($('input[type=text]').val()),
					strOutputCurrency = $(this).val(),
					intOutputAmount = 0;

			// assign output value rounded conversion
			intOutputAmount = Math.round(intUSD * response['rates'][strOutputCurrency]);

			// add the value to the output element
			if (intOutputAmount < 0 || isNaN(intOutputAmount)) {
				$('.output').html('Please Enter a Valid Number');
			} else {
				$('.output').html(intOutputAmount + ' ' + strOutputCurrency);
			}


			// on each button press remove value, hide output element, update value and then show output element
			$('.outputValue').on('hide.bs.collapse', function () {
				$('.output').html('');
				$('.outputValue').on('hidden.bs.collapse', function () {
					if (intOutputAmount < 0 || isNaN(intOutputAmount)) {
						$('.output').html('Please Enter a Valid Number');
					} else {
						$('.output').html(intOutputAmount + ' ' + strOutputCurrency);
					}
					$('.outputValue').collapse('toggle');
				})
			})
		}

		// add event listener
		$('button').on('click', convertCurrency);

	});
})
