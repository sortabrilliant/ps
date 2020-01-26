import './theme.css';

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

	function toggleWindowVisibility( content, button, close = true ) {
		content.setAttribute( 'aria-hidden', String( close ) );
		button.setAttribute( 'aria-expanded', String( ! close ) );
		button.innerHTML = close ? buttonLabel : '&times;';
		setTabIndexOnFocusableElements( focusableElements, close ? -1 : 0 );
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

			toggleWindowVisibility( content, button, isOpen );
		} );

		window.addEventListener( 'click', function( event ) {
			if ( event.target === button || content.contains( event.target ) ) {
				return;
			}

			toggleWindowVisibility( content, button, true );
		} );

		window.addEventListener( 'keydown', function( event ) {
			if ( event.key === 'Escape' ) {
				toggleWindowVisibility( content, button, true );
			}
		} );
	}
} )();
