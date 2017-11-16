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
	$( '.dropdown-float' ).remove();

	var $tool = $( this );
	if (
		$tool.data( 'open' ) &&
		$( '.dropdown-float' ).length > 0
	) {
		$tool.data( 'open', false );
		return;
	}
	$tool.data( 'open', true );

	var $dropdown = $tool.find( '.dropdown-menu' ).clone();

	var top = $tool.position().top + $tool.outerHeight();
	var left = $tool.position().left - 1;
	var width = $tool.outerWidth();

	var $menu = $( '<div>' )
		.append( $dropdown )
		.css( {
			'top': top,
			'left': left,
			'width': width
		} )
		.addClass( 'dropdown-float' )
		.on( 'click', function () {
			$( this ).remove();
		} );

	$( 'body' ).append( $menu );
}
