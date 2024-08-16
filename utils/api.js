
export const fetchData = async (variable, lang) => {
	try {
		const myHeaders = new Headers();
		// Optionally append language header if needed
		myHeaders.append("Accept-Language", lang);

		// Append the cookie to the headers
		myHeaders.append("Cookie", "laravel_session=PGsgd3jR1M5Ss3kBJytnvHXHHLT3Xvk6bKKiazlD");

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
			next:{
				revalidate:10
			}
		};

		const response = await fetch(
			`https://api.emocoegypt.com/${variable}`,
			requestOptions
		);

		// Check if the response is okay (status code 200-299)
		if (!response.ok) {
			console.log(`HTTP error! status: ${response.status}`);
		}

		// Read the response as text
		const result = await response.json();
		return result;  // Return the raw text response

	} catch (error) {
		console.error("Failed to fetch data:", error);
		throw error;
	}
};


		// const response = await fetch(
		// 	`http://admin.emocoegypt.com/admin/public/${variable}`,
		// 	{
		// 		method: "GET",
		// 		headers: myHeaders,
		// 		// next: {
		// 		// 	revalidate: 10,
		// 		// },
		// 	},
		// );