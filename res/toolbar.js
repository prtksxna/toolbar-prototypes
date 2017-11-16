$.getJSON( { url: 'res/tools.json' } ).done( function ( tools ) {
	var $toolbar = $( '<ul>' )
		.appendTo( 'body' )
		.attr( 'id', 'toolbar' );
	tools.forEach( function ( tool ) {
		$toolbar.append( getTool( tool ) );
	} );
} ) ;

function getTool ( tool ) {
	// Check if its just a dropdown like text style
	if (
		tool.title === undefined &&
		tool.icon === undefined &&
		tool.items !== undefined &&
		tool.items.length > 0
	) {
		var $menu = $( '<li>' ).addClass( 'dropdown-container' );
		$menu.append( $( '<span>' ).addClass( 'dropdown-selected' ).text( tool.items[ 0 ].title ) );
		var $menuList = $( '<ul>' ).appendTo( $menu );
		tool.items.forEach( function ( subTool ) {
			$menuList.append( getTool( subTool ) );
		} );
		return $menu;
	}

	var $tool = $( '<li>' );
	var iconUrl = 'node_modules/oojs-ui/dist/themes/wikimediaui/images/icons/';
	$tool.append( $( '<span>' ).addClass( 'tool-title' ).text( tool.title ) );

	if ( tool.icon !== undefined ) {
		$tool.prepend( $( '<img>' )
			.addClass( 'tool-icon' )
			.attr( 'src', iconUrl + tool.icon + '.svg' ) );
	}
	if ( tool.items ) {
		$tool.addClass( 'dropdown-container' );
		var $subTools = $( '<ul>' ).appendTo( $tool );
		tool.items.forEach( function ( subTool ) {
			$subTools.append( getTool( subTool ) );
		} );
	}
	return $tool;
};
