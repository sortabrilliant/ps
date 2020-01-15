<?php
/**
 * Plugin Name: Postscript
 * Plugin URI:  https://sortabrilliant.com/ps/
 * Description: Add important information to the bottom of every page with P.S.
 * Author:      sorta brilliant
 * Author URI:  https://sortabrilliant.com/
 * Version:     1.0.0
 * License:     GPL-2.0-or-later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package PostScript
 */

namespace SortaBrilliant\PostScript;

/**
 * Get the script data.
 *
 * @param string $path     File path.
 * @param string $dir      Directory.
 * @return array $data
 */
function get_script_data( $path, $dir ) {
	$pathinfo  = pathinfo( trailingslashit( $dir ) . $path );
	$file_path = "{$pathinfo['dirname']}/{$pathinfo['filename']}.asset.php";

	if ( ! file_exists( $file_path ) ) {
		return [ 'dependencies' => [], 'version' => false ];
	}

	$data = require $file_path;

	return $data;
}

/**
 * Registers the block and required assets.
 *
 * @return void
 */
function register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$script_path = 'build/index.js';
	$script_data = get_script_data( $script_path, __DIR__ );

	wp_register_script(
		'postscript',
		plugins_url( $script_path, __FILE__ ),
		$script_data['dependencies'],
		$script_data['version']
	);

	register_block_type( 'sortabrilliant/postscript', [
		'editor_script' => 'postscript',
	] );
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );

/**
 * Enqueue front-end assets.
 *
 * @return void
 */
function frontend_block_asssets() {
	if ( is_admin() ) {
		return;
	}

	wp_enqueue_script(
		'postscript-front-script',
		plugins_url( 'src/theme.js', __FILE__ ),
		[ 'jquery' ],
		'1.0.0',
		true
	);

	wp_enqueue_style(
		'postscript-front-style',
		plugins_url( 'src/theme.css', __FILE__ ),
		[],
		'1.0.0'
	);
}
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\frontend_block_asssets' );
