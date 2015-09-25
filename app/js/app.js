(function($){
  //Author: Brady Sammons
  //URL: www.bradysammons.com
	/* -------------------------------------------------------- */
	/*	//set Global variables
	/* -------------------------------------------------------- */
	$.fn.card_drop = function( options ){
		var settings = $.extend({
			stackHeight : null,
			explicitHeight: false,
			upateTitle: true,
			theme: null,
			cardSize: null,
			complete : null
		}, options);

		return this.each( function(){
			// Set global variables
			var card = $(this),
					toggler = card.children("a.toggle"),
					cards = toggler.next("div").children("a"),
					count = cards.length,
					cardWidth = 100;


				//Height Options: small | Medium:default | Large
				if( settings.cardSize ){
					$(this).addClass(settings.cardSize);
				}
				//Theme Options: Blue:default | Green | Red | add more via css!
				if( settings.theme ){
					$(this).addClass(settings.theme);
				}

				// Set z-Index of card items and invert
				cards.each(function(i){
					$(this).css("z-index" , count - i);
				});

				var containerHeight = 0;
				cards.each(function(){
				    containerHeight += $(this).outerHeight() + 10;
				});
				// Set top margins, and widths of cards
				function setClosed(){
					cards.each(function(index){
						 $(this).css("top" , index * 2)
						 		.css("width" , (cardWidth - index * 1)+"%")
						 		.css("margin-left" , (index * .5) +"%");

						if( settings.explicitHeight === true ){
								card.css("height" , $(this).outerHeight() + 10 );
						}
						if( settings.stackHeight ){
							$(this).css("top" , index * settings.stackHeight )
						}
					});
					cards.addClass('closed');
					card.removeClass("active");
				}
				setClosed();

			/* -------------------------------------------------------- */
			/*	Toggler click handler
			/* -------------------------------------------------------- */
			toggler.on("mousedown" , function(){
				var $this = $(this);
				// If the menu is active:
				if(card.is("active")){
					setClosed();
				}else{
					// If the menu is inactive:
					card.addClass("active");
					cards.removeClass('closed');

					// If esxlicit height set
					if( settings.explicitHeight === true ){
							card.css("height" , containerHeight );
					}
					//set top margins
					cards.each(function(index){
						var $this = $(this);
						 $this.css("top" , $this.outerHeight() * (index + 1))
						 		.css("width" , "100%")
						 		.css("margin-left" , "0px");
					});
				}
			});

			/* -------------------------------------------------------- */
			/*	When card items are clicked....
			/* -------------------------------------------------------- */
			cards.on("click" , function(){
				var $this = $(this),
						label = $this.text(),
						icon = $this.children("i").attr("class");

				cards.removeClass('active');
				if($this.is("active")){
					$this.removeClass("active");
						}else{
					$this.addClass("active");
				}
				if( settings.updateTitle === false ){
					//do nthing
				}else{
					toggler.children("span").text(label);
					toggler.children("i").removeClass().addClass(icon);
				}
				setClosed();
				// If you need you can run a call back function on click of deck item
				if ( $.isFunction( settings.complete ) ) {
						settings.complete.call( this );
				}
				return false;
			});
		});
	}
})(jQuery);
