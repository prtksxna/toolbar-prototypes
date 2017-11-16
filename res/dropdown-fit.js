function getDropdownSize( $tool ) {
	return {
		top: $tool.position().top + $tool.outerHeight(),
		left: $tool.position().left - 1,
		width: $tool.outerWidth()
	};
}
