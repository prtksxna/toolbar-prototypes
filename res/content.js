$.get( { url: 'content.html' } ).done( function ( content ) {
	var $content = $( '<div>' ).attr( {
		id: 'content',
		contenteditable: true
	} ).html( content );
	$( 'body' ).append( $content );
} ) ;
