//@ts-nocheck
import React, { useState } from 'react';

export default function LazyImage(props) {
	const [src, setSrc] = useState((props.placeholder) ? props.placeholder : 'static/icons/default.cover@2x.png');

	// Load image & set src state
	const image = new Image();
	image.src = props.src;
	image.addEventListener('load', () => {
		setSrc(props.src);
	});

	// Return view
	return !props.backgroundImage ? 
		(<img src={src} className={props.className} alt={'img'} />) :
		(<div style={{ backgroundImage: `url(${src})` }} className={props.className} />);
}