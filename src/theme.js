jQuery( document ).ready( function( $ ) {
	$button   = $( '.wp-block-post-script__button' );
	$btnLabel = $button.text();
	
	$button.click( function() {
		$( this ).parent().toggleClass( 'is-active' );

		$( this ).html( function( i, html ) {
			return html === $btnLabel ? '&times;' : $btnLabel;
		} );
	} );
} );
