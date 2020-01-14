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
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );

	const buttonClasses = classnames( 'wp-block-post-script__button', {
		'has-text-color': textColor || customTextColor,
		[ textClass ]: textClass,
		'has-background': backgroundColor || customBackgroundColor,
		[ backgroundClass ]: backgroundClass,
	} );

	const buttonStyle = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
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
