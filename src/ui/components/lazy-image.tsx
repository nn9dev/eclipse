import React, { useState, useEffect } from 'react';

type LazyImageProps = {
	placeholder?: string;
	src: string;
	className?: string;
	backgroundImage?: boolean;
	style?: any;
}

// Create an area to store image URIs 
// (so things don't get so whacky when re-rendering)
const ImageStore: Map<string, string> = new Map();

export default function LazyImage(props: LazyImageProps) {
	const [src, setSrc] = useState(
		(ImageStore.has(props.src)) ? 
			ImageStore.get(props.src) : 
			(props.placeholder) ? props.placeholder : 'static/icons/default.cover@2x.png'
	);


	// Load image & set src state
	useEffect(() => {
		const controller = new AbortController();
		if (!ImageStore.has(props.src)) {
			const { signal } = controller;
			fetch(props.src, { signal }).then(async (res) => {
				const blob = await res.blob()
				const url = URL.createObjectURL(blob);
				ImageStore.set(props.src, url);
				setSrc(url);
			}).catch(err => {});
		}
		return () => {
			try {
				controller.abort();
			} catch (err) {
				console.log(err);
			}
		}
	}, [src, props.src]);

	// Return view
	return !props.backgroundImage ? 
		(<img src={src} className={props.className} alt={'img'} />) :
		(<div style={{ backgroundImage: `url(${src})`, ...(props.style ?? {}) }} className={props.className} />);
}