function paginate() {
	var $toolbar = $( '#toolbar' );
	var vw = $( window ).width();
	var tw = $toolbar.width();

	// Don't do anything if the toolbar fits
	if ( tw <= vw ) return;

	var diff = vw - tw;

	var $paginator = $( '<a>' )
		.addClass( 'paginator' )
		.addClass( 'more' )
		.attr( 'href', 'javascript:void(0)' );

	$paginator.on('click', slideMore );

	function slideMore () {
		$( this )
			.removeClass( 'more' )
			.addClass( 'less' )
			.off( 'click' )
			.on( 'click', slideLess );

		$toolbar.css( 'left', diff );
	}

	function slideLess () {
		$( this )
			.removeClass( 'less' )
			.addClass( 'more' )
			.off( 'click' )
			.on( 'click', slideMore );

		$toolbar.css( 'left', 0 );
	}

	$( 'body' ).append( $paginator );
};
