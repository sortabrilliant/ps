/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
	withColors,
	PanelColorSettings,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'core/image', 'core/paragraph' ];

function PostScriptEdit( props ) {
	const {
		attributes,
		setAttributes,
		isSelected,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;

	const { text } = attributes;

	return (
		<>
			{ isSelected && (
				<InspectorControls>
					<PanelColorSettings
						title="Color Settings"
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
			) }
			<div className="wp-block-post-script">
				<RichText
					tagName="span"
					multiline={ false }
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					withoutInteractiveFormatting
					placeholder="Add text…"
					keepPlaceholderOnFocus
					className={ classnames(
						'wp-block-post-script__button', {
							'has-text-color': textColor.color,
							[ textColor.class ]: textColor.class,
							'has-background': backgroundColor.color,
							[ backgroundColor.class ]: backgroundColor.class,
						}
					) }
					style={ {
						backgroundColor: backgroundColor.color,
						color: textColor.color,
					} }
				/>
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
