'use strict';
import ApiMethods from './ApiMethods';

const apiEndpoint = process.env.NODE_ENV === "production" ? "https://pong-demo-nyc.herokuapp.com/" : "http://localhost:5000/";

console.log("api endpoint: " + apiEndpoint);

class PongApi {

	static getScore() {
		var promise = new Promise((resolve, reject) => {
			ApiMethods.get(apiEndpoint + 'score')
			.done((data) => {
				resolve(data);
			})
			.fail((error) => {
				reject(error);
			});
		});

		return promise;
	}
	
	static getPerson() {
		var promise = new Promise((resolve, reject) => {
			ApiMethods.get(apiEndpoint + 'person')
			.done((data) => {
				resolve(data);
			})
			.fail((error) => {
				reject(error);
			});
		});

		return promise;
	}
}

module.exports = PongApi;