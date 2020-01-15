/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import icon from './icon';
import metadata from './block.json';

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

const { name, category, attributes } = metadata;

registerBlockType( name, {
	title: 'P.S.',
	description: 'Add important information to the bottom of your site.',
	icon,
	keywords: [ 'pop up', 'popover', 'PS', 'postscript', 'popper' ],
	category,
	attributes,
	supports: {
		multiple: false
	},
	edit,
	save,
} );
