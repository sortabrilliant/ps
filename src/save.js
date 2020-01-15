/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, getColorClassName } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const {
		backgroundColor,
		customBackgroundColor,
		customTextColor,
		text,
		textColor,
		borderRadius,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	const buttonClasses = classnames( 'wp-block-post-script__button', {
		'wp-block-button__link': true,
		'has-text-color': textColor || customTextColor,
		[ textClass ]: textClass,
		'has-background': backgroundColor || customBackgroundColor,
		[ backgroundClass ]: backgroundClass,
	} );

	const buttonStyle = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		borderRadius: borderRadius ? borderRadius + 'px' : undefined,
	};

	return (
		<div className="wp-block-post-script">
			<RichText.Content
				tagName="button"
				className={ buttonClasses }
				style={ buttonStyle }
				value={ text }
			/>
			<div className="wp-block-post-script__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default save;
