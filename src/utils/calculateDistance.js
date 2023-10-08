function calculateDistance(coords1, coords2) {
	let [lat1, lon1] = coords1,
		[lat2, lon2] = coords2;

	// Convert latitude and longitude from degrees to radians
	const degToRad = angle => angle * (Math.PI / 180);
	lat1 = degToRad(lat1);
	lon1 = degToRad(lon1);
	lat2 = degToRad(lat2);
	lon2 = degToRad(lon2);

	// Radius of the Earth in kilometers
	const radius = 6371; // Earth's radius in kilometers

	// Haversine formula
	const dLat = lat2 - lat1,
		dLon = lon2 - lon1;

	const a =
			Math.sin(dLat / 2) ** 2 +
			Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2,
		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	// Calculate the distance
	const distance = radius * c;

	return distance.toFixed(2); // Distance in kilometers
}

export default calculateDistance;
