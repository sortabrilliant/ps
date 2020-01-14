/**
 * WordPress dependencies
 */
import { useCallback } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { PanelBody, TextControl } from '@wordpress/components';
import {
	InnerBlocks,
	InspectorControls,
	withColors,
	PanelColorSettings,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'core/image', 'core/paragraph' ];

function PostScriptEdit( props ) {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;

	const { text } = attributes;

	const onSetLabel = useCallback(
		( value ) => {
			setAttributes( { text: value } );
		},
		[ setAttributes ]
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Button Settings">
					<TextControl
						label="Button Label"
						value={ text || '' }
						onChange={ onSetLabel }
					/>
				</PanelBody>
				<PanelColorSettings
					title="Color Settings"
					initialOpen={ false }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: 'Background Color',
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: 'Text Color',
						},
					] }
				/>
			</InspectorControls>
			<div className="wp-block-post-script">
				<div className="wp-block-post-script__content">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						renderAppender={ () => (
							<InnerBlocks.ButtonBlockAppender />
						) }
					/>
				</div>
			</div>
		</>
	);
}

export default compose( [
	withColors( 'backgroundColor', { textColor: 'color' } ),
] )( PostScriptEdit );
