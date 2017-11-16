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
		var $menu = $( '<li>' )
			.on( 'click', openDropdown )
			.addClass( 'dropdown-container' );
		var $selected = $( '<span>' )
			.addClass( 'dropdown-selected' )
			.text( tool.items[ 0 ].title );

		$menu.append( $selected );
		var $menuList = $( '<ul>' )
			.addClass( 'dropdown-menu' )
			.appendTo( $menu );
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

function openDropdown( event ) {
	// Remove all exisitng dropdowns
	$( '.dropdown-float' ).remove();

	var $tool = $( this );
	// If the tool is open, set it to closed
	// since we just destroyed all menus
	if ( $tool.data( 'open' ) ) {
		$tool.data( 'open', false );
		return;
	}

	// We'll copy this over to the floating menu
	var $dropdown = $tool.find( '.dropdown-menu' ).clone();

	// Get positions
	var pos = getDropdownSize( $tool );

	// Setup the menu and position it
	$tool.data( 'open', true );
	var $menu = $( '<div>' )
		.data( 'tool', $tool )
		.append( $dropdown )
		.css( {
			'top': pos.top,
			'left': pos.left,
			'width': pos.width
		} )
		.addClass( 'dropdown-float' )
		.on( 'click', function () {
			// Reset the open state on the tool this belongs to
			$( $( this ).data( 'tool' ) ).data( 'open', false );
			// ...and get rid of the menu
			$( this ).remove();
		} );

	$( 'body' ).append( $menu );
}
