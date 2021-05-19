// JavaScript Document

mapboxgl.accessToken =
			'pk.eyJ1IjoibHRheWxvcjIwMjAiLCJhIjoiY2toNHJ1MW1sMHIycjJ5bHM5a3FhM3FhZiJ9.4IOBWNgtCWPDYsZIIZ6xIA';
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/ltaylor2020/ckh4s29540v4u19lmip26c8l5', // stylesheet location
			center: [-0.337486, 53.748016], // starting position [lng, lat]
			zoom: 17, // starting zoom
			pitch: 60,
			bearing: 90,
		});

		var marker = new mapboxgl.Marker()
			.setLngLat([-0.33777316, 53.7478633])
			.addTo(map);

		// The 'building' layer in the mapbox-streets vector source contains building-height
		// data from OpenStreetMap.
		map.on('load', function () {
			// Insert the layer beneath any symbol layer.
			var layers = map.getStyle().layers;

			var labelLayerId;
			for (var i = 0; i < layers.length; i++) {
				if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
					labelLayerId = layers[i].id;
					break;
				}
			}

			map.addLayer({
					'id': '3d-buildings',
					'source': 'composite',
					'source-layer': 'building',
					'filter': ['==', 'extrude', 'true'],
					'type': 'fill-extrusion',
					'minzoom': 15,
					'paint': {
						'fill-extrusion-color': '#aaa',

						// use an 'interpolate' expression to add a smooth transition effect to the
						// buildings as the user zooms in
						'fill-extrusion-height': [
							'interpolate',
							['linear'],
							['zoom'],
							15,
							0,
							15.05,
							['get', 'height']
						],
						'fill-extrusion-base': [
							'interpolate',
							['linear'],
							['zoom'],
							15,
							0,
							15.05,
							['get', 'min_height']
						],
						'fill-extrusion-opacity': 0.6
					}
				},
				labelLayerId
			);
		});