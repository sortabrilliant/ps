<?php
/**
 * Plugin Name:       P.S.
 * Plugin URI:        https://sortabrilliant.com/ps/
 * Description:       Add important information to the bottom of your site with P.S.
 * Version:           1.2.1
 * Requires at least: 5.0
 * Requires PHP:      5.6
 * Author:            sorta brilliant
 * Author URI:        https://sortabrilliant.com/
 * License:           GPL-2.0-or-later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package PostScript
 */

namespace SortaBrilliant\PostScript;

const VERSION = '1.2.1';

/**
 * Registers the block and required assets.
 *
 * @return void
 */
function register_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$asset_filepath = __DIR__ . '/build/index.asset.php';
	$asset_file     = file_exists( $asset_filepath ) ? include $asset_filepath : [
		'dependencies' => [],
		'version'      => VERSION,
	];

	wp_register_script(
		'postscript',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'postscript-editor-style',
		plugins_url( 'build/editor.css', __FILE__ ),
		[],
		$asset_file['version']
	);

	wp_register_script(
		'postscript-front-script',
		plugins_url( 'build/theme.js', __FILE__ ),
		[],
		$asset_file['version'],
		true
	);

	wp_register_style(
		'postscript-front-style',
		plugins_url( 'build/theme.css', __FILE__ ),
		[],
		$asset_file['version']
	);

	register_block_type( 'sortabrilliant/postscript', [
		'editor_script' => 'postscript',
		'editor_style'  => 'postscript-editor-style',
		'render_callback' => __NAMESPACE__ . '\\block_load_assets',
	] );
}
add_action( 'init', __NAMESPACE__ . '\\register_block' );

/**
 * Conditionally load block assets.
 *
 * @param array $attr
 * @param array $content
 * @return string $content
 */
function block_load_assets( $attr, $content ) {
	if ( ! is_admin() ) {
		wp_enqueue_script( 'postscript-front-script' );
		wp_enqueue_style( 'postscript-front-style' );
	}

	return $content;
}
