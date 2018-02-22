// Función para llamar a los gifs a través de los botones
$(document).ready(() => {
	$('#cats').click(showCats);
	$('#dogs').click(showDogs);
	$('#babies').click(showBabies);
	$('#grannys').click(showGrandma);
});

// Primer llamado ajax
function showCats() {
	$.ajax({
		url: 'http://api.giphy.com/v1/gifs/search?q=cat&api_key=52Fc9WimSIVx01b8PKW9ICvYEHG4LNQ5&limit=15&offset=0&rating=R&lang=en',
		type: 'GET',
		datatype: 'json'
	})
		.done(function (response) {
			showCatsGifs(response);
		})
		.fail(function (err) {
			console.log('error al cargar cats gifs');
		});
}
// Gift gatos
function showCatsGifs(response) {
	$('.containerImg').empty();
	for (let i = 0; i < response.data.length; i++) {
		$(`<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" style="margin-top: 1em; margin-bottom: 1em;"><div class="thumbnail"><img class="center-block img-responsive" src="${response.data[i].images.fixed_height.url}" alt="${response.data[i].title}" style="height: 200px"><div class="caption text-right"><h5><a href="${response.data[i].images.downsized.url}" target="_blank"><i class="fas fa-heart" style="color: #8E8D91; margin-right: 2em;"></i></a></h5></div></div></div>`).appendTo('.containerImg');
	}
}
//  segundo llamado ajax
function showDogs() {
	$.ajax({
		url: 'http://api.giphy.com/v1/gifs/search?q=dog&api_key=52Fc9WimSIVx01b8PKW9ICvYEHG4LNQ5&limit=15&offset=0&rating=R&lang=en',
		type: 'GET',
		datatype: 'json'
	})
		.done(function (response) {
			showDogsGifs(response);
		})
		.fail(function (err) {
			console.log('error al cargar dogs gifs');
		});
}
// Gift perros
function showDogsGifs(response) {
	$('.containerImg').empty();
	for (let i = 0; i < response.data.length; i++) {
		$(`<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" style="margin-top: 1em; margin-bottom: 1em;"><div class="thumbnail"><img class="center-block img-responsive" src="${response.data[i].images.fixed_height.url}" alt="${response.data[i].title}" style="height: 200px"><div class="caption text-right"><h5><a href="${response.data[i].images.downsized.url}" target="_blank"><i class="fas fa-heart" style="color: #8E8D91; margin-right: 2em;"></i></a></h5></div></div></div>`).appendTo('.containerImg');		
	}
}

//  tercer llamado ajax
function showBabies() {;
	$.ajax({
		url: 'http://api.giphy.com/v1/gifs/search?q=babies&api_key=52Fc9WimSIVx01b8PKW9ICvYEHG4LNQ5&limit=15&offset=0&rating=R&lang=en',
		type: 'GET',
		datatype: 'json'
	})
		.done(function (response) {
			showBabiesGifs(response);
		})
		.fail(function (err) {
			console.log('error al cargar babies gifs');
		});
}
// Gift babies
function showBabiesGifs(response) {
	$('.containerImg').empty();
	for (let i = 0; i < response.data.length; i++) {
		$(`<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" style="margin-top: 1em; margin-bottom: 1em;"><div class="thumbnail"><img class="center-block img-responsive" src="${response.data[i].images.fixed_height.url}" alt="${response.data[i].title}" style="height: 200px"><div class="caption text-right"><h5><a href="${response.data[i].images.downsized.url}" target="_blank"><i class="fas fa-heart" style="color: #8E8D91; margin-right: 2em;"></i></a></h5></div></div></div>`).appendTo('.containerImg');
	}
}

// cuarto llamado ajax
function showGrandma() {
	$.ajax({
		url: 'http://api.giphy.com/v1/gifs/search?q=grandma&api_key=52Fc9WimSIVx01b8PKW9ICvYEHG4LNQ5&limit=15&offset=0&rating=R&lang=en',
		type: 'GET',
		datatype: 'json'
	})
		.done(function (response) {
			showGrandmaGifs(response);
		})
		.fail(function (err) {
			console.log('error al cargar grandma gifs');
		});
}
// Gift abuelas
function showGrandmaGifs(response) {
	$('.containerImg').empty();
	for (let i = 0; i < response.data.length; i++) {
		$(`<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" style="margin-top: 1em; margin-bottom: 1em;"><div class="thumbnail"><img class="center-block img-responsive" src="${response.data[i].images.fixed_height.url}" alt="${response.data[i].title}" style="height: 200px"><div class="caption text-right"><h5><a href="${response.data[i].images.downsized.url}" target="_blank"><i class="fas fa-heart" style="color: #8E8D91; margin-right: 2em;"></i></a></h5></div></div></div>`).appendTo('.containerImg');
	}
}