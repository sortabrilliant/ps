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
	description: '@todo',
	icon,
	keywords: [ 'common' ],
	category,
	attributes,
	edit,
	save,
} );
