function getDropdownSize( $tool ) {
	return {
		top: $tool.position().top + $tool.outerHeight(),
		left: 0,
		width: $tool.parent().outerWidth()
	};
}
