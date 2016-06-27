var getFoods = function() {
	$.get('/foods', function (res) {
		console.log(res)
	});
};