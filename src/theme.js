( function () {
	var FOCUSABLE_ELEMENTS = [
		'a[href]:not([tabindex^="-"]):not([inert])',
		'area[href]:not([tabindex^="-"]):not([inert])',
		'input:not([disabled]):not([inert])',
		'select:not([disabled]):not([inert])',
		'textarea:not([disabled]):not([inert])',
		'button:not([disabled]):not([inert])',
		'iframe:not([tabindex^="-"]):not([inert])',
		'audio:not([tabindex^="-"]):not([inert])',
		'video:not([tabindex^="-"]):not([inert])',
		'[contenteditable]:not([tabindex^="-"]):not([inert])',
		'[tabindex]:not([tabindex^="-"]):not([inert])'
	];

	var button = document.querySelector( '.wp-block-post-script__button' );

	function setTabIndexOnFocusableElements( elements, tabIndex ) {
		for ( var i = 0; i < elements.length; i++ ) {
			elements[i].tabIndex = tabIndex;
		}
	}

	if ( button ) {
		var buttonLabel = button.innerHTML;
		var parent = button.parentElement;
		var content = parent.querySelector( '.wp-block-post-script__content' );
		var focusableElements = content.querySelectorAll( FOCUSABLE_ELEMENTS.join( ',' ) );

		button.setAttribute( 'aria-expanded', false );
		content.setAttribute( 'aria-hidden', true );

		setTabIndexOnFocusableElements( focusableElements, -1 );

		button.addEventListener( 'click', function() {
			var isOpen = content.getAttribute( 'aria-hidden' ) === 'false';

			content.setAttribute( 'aria-hidden', String( isOpen ) );
			button.setAttribute( 'aria-expanded', String( ! isOpen ) );
			button.innerHTML = isOpen ? buttonLabel : '&times;';
			setTabIndexOnFocusableElements( focusableElements, isOpen ? -1 : 0 );
		} );
	}
} )();