/*
	Photon by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1141px',  '1680px' ],
			large:    [ '981px',   '1140px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '321px',   '480px'  ],
			xxsmall:  [ null,      '320px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();


// --------------------------------
  var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = (browser.name == 'ie' || browser.name == 'edge' || browser.mobile) ? function() { return $(this) } : function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				on, off;

			on = function() {

				$t.css('background-position', 'center 100%, center 100%, center 0px');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$t.css('background-position', 'center ' + (pos * (-1 * intensity)) + 'px');

					});

			};

			off = function() {

				$t
					.css('background-position', '');

				$window
					.off('scroll._parallax');

			};

			breakpoints.on('<=medium', off);
			breakpoints.on('>medium', on);

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Clear transitioning state on unload/hide.
		$window.on('unload pagehide', function() {
			window.setTimeout(function() {
				$('.is-transitioning').removeClass('is-transitioning');
			}, 250);
		});

	// Fix: Enable IE-only tweaks.
		if (browser.name == 'ie' || browser.name == 'edge')
			$body.addClass('is-ie');

	// Scrolly.
		$('.scrolly').scrolly({
			offset: function() {
				return $header.height() - 2;
			}
		});

	// Tiles.
		var $tiles = $('.tiles > article');

		$tiles.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img'),
				$link = $this.find('.link'),
				x;

			// Image.

				// Set image.
					$this.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set position.
					if (x = $img.data('position'))
						$image.css('background-position', x);

				// Hide original.
					$image.hide();

			// Link.
				if ($link.length > 0) {

					$x = $link.clone()
						.text('')
						.addClass('primary')
						.appendTo($this);

					$link = $link.add($x);

					$link.on('click', function(event) {

						var href = $link.attr('href');

						// Prevent default.
							event.stopPropagation();
							event.preventDefault();

						// Target blank?
							if ($link.attr('target') == '_blank') {

								// Open in new tab.
									window.open(href);

							}

						// Otherwise ...
							else {

								// Start transitioning.
									$this.addClass('is-transitioning');
									$wrapper.addClass('is-transitioning');

								// Redirect.
									window.setTimeout(function() {
										location.href = href;
									}, 500);

							}

					});

				}

		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() {
				$window.trigger('scroll');
			});

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.height() + 10,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
				});

				window.setTimeout(function() {
					$window.triggerHandler('scroll');
				}, 100);

			});

		}

	// Banner.
		$banner.each(function() {

			var $this = $(this),
				$image = $this.find('.image'), $img = $image.find('img');

			// Parallax.
				$this._parallax(0.275);

			// Image.
				if ($image.length > 0) {

					// Set image.
						$this.css('background-image', 'url(' + $img.attr('src') + ')');

					// Hide original.
						$image.hide();

				}

		});

	// Menu.
		var $menu = $('#menu'),
			$menuInner;

		$menu.wrapInner('<div class="inner"></div>');
		$menuInner = $menu.children('.inner');
		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menuInner
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					window.setTimeout(function() {
						window.location.href = href;
					}, 250);

			});

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();
				event.preventDefault();

				$body.removeClass('is-menu-visible');

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);



// 2048 game
window.onload = function() {
  buildGridOverlay();                      //Generates grid-overlay
  cellCreator(2, 0);
  directions();
  score(0);
};


/* GENERATE GRID */
function buildGridOverlay() {
  var game    = document.getElementsByClassName('game');  
  var grid    = document.getElementsByClassName('grid');
  var size    = 4;
  var table   = document.createElement('DIV');

  table.className += 'grid';
  table.id = ' ';
  table.dataset.value = 0;
  
  for (var i = 0; i < size; i++) {
    var tr = document.createElement('DIV');
    table.appendChild(tr);
    tr.id = 'row_' + (i+1);
    tr.className += 'grid_row';
    
    for (var j = 0; j < size; j++) {
      var td = document.createElement('DIV');
      td.id = '' +(i+1) +(j+1);                            //ID with x y
      td.className += 'grid_cell';
      tr.appendChild(td);
    }
  document.body.appendChild(table);
  }
  
  return table;
}



/* RANDOM TILE CREATOR */
function cellCreator(c, timeOut) {
  /* do 2 times for 2 new tiles */
  for (var i = 0; i < c; i++) {
    
    var count = 0;
    /* search for an empty cell to create a tile */
    
    for (var value = 1; value < 2; value++) {
      var randomX = Math.floor((Math.random()*4)+1);
      var randomY = Math.floor((Math.random()*4)+1);
      var checker = document.getElementById('' +randomX +randomY);
      if (checker.innerHTML != '') {
        value = 0;
      } 
    }
    
    var randomValue = Math.floor((Math.random()*4) +1); //create value 1, 2, 3 or 4
    if (randomValue == 3) {randomValue=4};              //3 --> 4
    if (randomValue == 1) {randomValue=2};              //1 --> 2
    var position = document.getElementById(''+randomX +randomY);
    var tile = document.createElement('DIV');           //create div at x, y
    position.appendChild(tile);                         //tile becomes child of grid cell
    tile.innerHTML = ''+randomValue;                    //tile gets value 2 or 4
    
    colorSet(randomValue, tile);
    tile.data = ''+randomValue;
    tile.id = 'tile_'+randomX +randomY;
    position.className += ' active';
    var tileValue = tile.dataset.value;
    tile.dataset.value = ''+randomValue;
    
    console.info(''+timeOut);
    if (timeOut == 0) {
      tile.className = 'tile '+randomValue;
    } else { setTimeout(function() {
        tile.className = 'tile '+randomValue;
      }, 10); }
    
  }
  
  

}

/* MOVE TILES */
document.onkeydown = directions;

function directions(e) {
  e = e || window.event;
  var d = 0;
// ----- KEY UP ----- //
    if (e.keyCode == '38') {      
      var count = 2;  
      
      for (var x = 2; x > 1; x--) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(x, y, -1, 0, 1, 0);
          console.info(''+x +y);
        }
        if (x == 2) {
          x += count;
          count++;
        }
        if (count > 4) { break; }
      }
      cellReset();
    }   
      
// ----- KEY DOWN ----- //
    else if (e.keyCode == '40') { // down
      var count = -2;  
      var test  = 1;
      for (var x = 3; x < 4; x++) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(x, y, 1, 0, 4, 0);
        }
        if (x == 3) {
          x += count;
          count--;
        }
        if (count < -4) { break; }
      }
      cellReset();
    }
      
// ----- KEY LEFT ----- //      
    
    else if (e.keyCode == '37') { // left
      
      
      var count = 2;  
      var test  = 1;
      for (var x = 2; x > 1; x--) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(y, x, 0, -1, 0, 1);
        }
        if (x == 2) {
          x += count;
          count++;
        }
        if (count > 4) { break; }
      }
      cellReset();
    }
  
// ----- KEY RIGHT ----- //
    else if (e.keyCode == '39') { // right
      
      var count = -2;  
      var noCell = 0;
      var c = 1;
      var d = 0;
      
      for (var x = 3; x < 4; x++) {
        for (var y = 1; y < 5; y++) {
          moveTilesMain(y, x, 0, 1, 0, 4, c, d);
        }
        if (x == 3) {
          x += count;
          count--;
        }
        if (count < -4) { break; }
      }
      cellReset();
    }

}

//--------------------------------------------------------

function moveTilesMain(x, y, X, Y, xBorder, yBorder, c, d) {      
   
  var tile     = document.getElementById('tile_'+x +y);
  var checker  = document.getElementById(''+x +y);
  var xAround  = x+X;
  var yAround  = y+Y;
  
  if (xAround > 0 && xAround < 5 && yAround > 0 && yAround < 5 && checker.className == 'grid_cell active') {
    var around = document.getElementById(''+xAround +yAround);
    
    //________
      
    if (around.className == 'grid_cell active') {
      //catching
      var aroundTile = document.getElementById('tile_'+xAround +yAround);
      if (aroundTile.innerHTML == tile.innerHTML) {
        //same
        var value = tile.dataset.value*2;
        aroundTile.dataset.value = ''+value;
        aroundTile.className = 'tile '+value;
        aroundTile.innerHTML = ''+value;
        colorSet(value, aroundTile);
        checker.removeChild(tile);
        checker.className = 'grid_cell';
        around.className  = 'grid_cell active merged';
        document.getElementsByClassName('grid').id = 'moved';
        document.getElementsByClassName('grid').className = 'grid '+value;
        var grid = document.getElementById(' ');
        var scoreValue = parseInt(grid.dataset.value);
        var newScore = value + scoreValue;
        
        grid.dataset.value = newScore;
        var score = document.getElementById('value');
        
        score.innerHTML = ''+newScore;
      } 
    } else if (around.className == 'grid_cell'){
      //not catching
      around.appendChild(tile);
      around.className = 'grid_cell active';
      tile.id = 'tile_'+xAround +yAround;
      checker.className = 'grid_cell';
      document.getElementsByClassName('grid').id = 'moved';
    }
    
    
    //________
  }  
}


//-------------------------------------------------------


function cellReset() {
  var count = 0;
  var a = document.getElementsByClassName('grid').id;
  console.log(''+a);
  
  for (var x=1; x<5; x++) {
    for (var y=1; y<5; y++) {
      
      var resetter = document.getElementById(''+x +y);
      if (resetter.innerHTML != '') {
        count++;
      }
      
      if (resetter.innerHTML == '') {
        resetter.className = 'grid_cell';
      } 
      
      if (resetter.className == 'grid_cell active merged') {
        resetter.className = 'grid_cell active'
      }
    }
  }
  if (count == 16) {
    document.getElementById('status').className = 'lose';
  } else if (document.getElementsByClassName('grid').id == 'moved'){ 
    cellCreator(1, 1); 
  }
  document.getElementsByClassName('grid').id = ' ';
}

function score() {
  
  var grid = document.getElementById(' ');
  var value = grid.dataset.value;
  document.getElementById('value').innerHTML = ''+value;
  
}


/* ----- STYLE ----- */
function colorSet(value, tile) {
  switch(value) {
    case 2:    tile.style.background = '#fbfced'; tile.style.color = 'black'; break;
    case 4:    tile.style.background = '#ecefc6'; tile.style.color = 'black'; break;
    case 8:    tile.style.background = '#ffb296'; tile.style.color = 'black'; break;
    case 16:   tile.style.background = '#ff7373'; tile.style.color = 'black'; break;
    case 32:   tile.style.background = '#f6546a'; tile.style.color = 'white'; break;
    case 64:   tile.style.background = '#8b0000'; tile.style.color = 'white'; break;
    case 128:  tile.style.background = '#794044'; tile.style.color = 'white'; 
               tile.style.fontSize = '50px'; break;
    case 256:  tile.style.background = '#31698a'; tile.style.color = 'white';
               tile.style.fontSize = '50px'; break;
    case 512:  tile.style.background = '#297A76'; tile.style.color = 'white';
               tile.style.fontSize = '50px'; break;
    case 1024: tile.style.background = '#2D8A68'; tile.style.color = 'white';
               tile.style.fontSize = '40px'; break;
    case 2048: tile.style.background = '#1C9F4E'; tile.style.color = 'white'; 
               tile.style.fontSize = '40px'; 
               document.getElementById('status').className = 'won'; break;
    case 4096: tile.style.background = '#468499'; tile.style.color = 'white'; 
               tile.style.fontSize = '40px'; break;
    case 8192: tile.style.background = '#0E2F44'; tile.style.color = 'white';
               tile.style.fontSize = '40px'; break;
  }
                    
}

function info() {
  setTimeout(function() {
    document.getElementById('description').classList.toggle('show');
  }, 10);  
  
}

function reset() {
  for (var x = 1; x < 5; x++) {
    for (var y = 1; y < 5; y++) {
      var resetter = document.getElementById(''+x +y);
      if (resetter.className == 'grid_cell active') {
        var tile = document.getElementById('tile_'+x +y);
        resetter.removeChild(tile);
      }
    }
  }
  document.getElementById('status').className = '';
  document.getElementById(' ').dataset.value = 0;
  score();
  cellReset();
  cellCreator(2, 0);
}
