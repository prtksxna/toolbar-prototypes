window.addMenuButton = function () {
	var $toolbar = $( '#toolbar' );
	var vw = $( window ).width();
	var tw = $toolbar.width();

	// Don't do anything if the toolbar fits
	if ( tw <= vw ) return;

	tw = 0;
	var tools = $( '#toolbar > li:visible' );
	var extra = [];
	var $lastTool;

	tools.each( function ( li ) {
		var $this = $( this );
		var w = $this.outerWidth();
		tw += w;
		if ( tw > vw ) {
			extra.push( $this.clone() );
			$this.remove();
		}
	} );

	// Getting the remaining tools again
	tools = $( '#toolbar > li:visible' );

	// ...find the last one
	$lastTool =  $( tools.toArray()[ tools.length - 1 ] );
	extra.unshift( $lastTool ); // push to the beginning of the extra
	$lastTool.remove();

	// Move the extras into a div
	var $extra = $( '<div>' )
		.hide()
		.addClass( 'extra' )
		.append( extra )
		.appendTo( 'body' );

	// Add menu button
	$( '#toolbar' ).css( 'width', '100%' );
	var $menuButton = $( '<li>' )
		.appendTo( '#toolbar' )
		.addClass( 'menu' );

	$menuButton.on( 'click', function() {
		$( this ).toggleClass( 'open' );
		$( '.extra' ).toggle();
	} );

};
