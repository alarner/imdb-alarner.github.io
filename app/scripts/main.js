/* jshint devel:true */
$(document).ready(onDocumentReady);

function onDocumentReady() {
	var $search = $('#search');
	var $searchResults = $('#search-results');
	var $wishList = $('#wish-list');
	var $watchedList = $('#watched-list');
	$search.keyup(function() {
		$.get(
			'http://www.omdbapi.com/?s='+$search.val(),
			onResultsReceived,
			'json'
		);
	});

	function onResultsReceived(data) {
		$searchResults.html('');
		for(var i in data.Search) {
			var $append = $('<a href="#" class="list-group-item" data-imdbid="'+data.Search[i].imdbID+'"><span class="glyphicon glyphicon-plus pull-right"></span>'+data.Search[i].Title+'</a>');
			$searchResults.append($append);
			$append.click(onResultClick);
		}
	}

	function onResultClick(e) {
		var imdbId = $(this).data('imdbid');
		$search.val('');
		$searchResults.html('');
		$.get(
			'http://www.omdbapi.com/?i='+imdbId,
			onMovieInfo,
			'json'
		);
	}

	function onMovieInfo(data) {
		var $button = $('<button type="button" class="btn btn-default">Watched</button>');
		var $append = $('<tr><td>'+data.Title+'</td><td>'+data.Year+'</td><td>'+data.Genre+'</td><td>'+data.Runtime+'</td></tr>')
		$append.append($button);
		$wishList.append($append);

		$button.click(onWatchClick);
	}

	function onWatchClick(e) {
		$watchedList.append($(this).parent());
	}
}