import $ from 'jquery';

class ApiMethods {

	get(url) {
		console.log("GET: " + url);
		return $.ajax({
			type: 'GET',
			url
		});
	}

	post(url, data) {
		console.log("POST: " + url);
		return $.ajax({
			type: 'POST',
			url,
			data: JSON.stringify(data),
			processData: false,
			dataType: 'json',
			contentType: 'application/json;charset=utf-8'
		});
	}
}

module.exports = new ApiMethods();