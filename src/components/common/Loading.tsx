import React from 'react';
import styled from 'styled-components';

interface LoadingProps {
	width?: string;
	height?: string;
	stroke?: string;
}

function Loading({ width, height, stroke }: LoadingProps) {
	return (
		<LoadingBg>
			<svg
				viewBox="0 0 38 38"
				width={width ? width : '50px'}
				height={height ? height : '50px'}
				stroke={stroke ? stroke : '#fbc531'}
			>
				<g fill="none" fillRule="evenodd">
					<g transform="translate(1 1)" strokeWidth="2">
						<circle strokeOpacity=".25" cx="18" cy="18" r="18"></circle>
						<path d="M36 18c0-9.94-8.06-18-18-18">
							<animateTransform
								attributeName="transform"
								type="rotate"
								from="0 18 18"
								to="360 18 18"
								dur="0.8s"
								repeatCount="indefinite"
							></animateTransform>
						</path>
					</g>
				</g>
			</svg>
		</LoadingBg>
	);
}

const LoadingBg = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: block;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.6);

	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export default Loading;
