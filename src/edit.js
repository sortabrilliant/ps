/**
 * WordPress dependencies
 */
import { useCallback } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { PanelBody, RangeControl, TextControl } from '@wordpress/components';
import {
	InnerBlocks,
	InspectorControls,
	withColors,
	PanelColorSettings,
} from '@wordpress/block-editor';

const MIN_BORDER_RADIUS_VALUE = 0;
const MAX_BORDER_RADIUS_VALUE = 50;
const INITIAL_BORDER_RADIUS_POSITION = 5;

function BorderPanel( { borderRadius = '', setAttributes } ) {
	const setBorderRadius = useCallback(
		( newBorderRadius ) => {
			setAttributes( { borderRadius: newBorderRadius } );
		},
		[ setAttributes ]
	);
	return (
		<PanelBody title="Border Settings" initialOpen={ false }>
			<RangeControl
				value={ borderRadius }
				label="Border Radius"
				min={ MIN_BORDER_RADIUS_VALUE }
				max={ MAX_BORDER_RADIUS_VALUE }
				initialPosition={ INITIAL_BORDER_RADIUS_POSITION }
				allowReset
				onChange={ setBorderRadius }
			/>
		</PanelBody>
	);
}

function PostScriptEdit( props ) {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;

	const { text, borderRadius } = attributes;

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
				<BorderPanel
					borderRadius={ borderRadius }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>
			<div className="wp-block-post-script">
				<div className="wp-block-post-script__content">
					<InnerBlocks
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
