jQuery( document ).ready( function( $ ) {
	$( '.wp-block-post-script__button' ).click( function() {
		$( this ).parent().toggleClass( 'is-active' );
	} );
} );
