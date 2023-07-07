import { useState } from 'react';
import styled from 'styled-components';

interface ContainerProps {
	bgColor: string;
	borderColor: string;
}

const Container = styled.div<ContainerProps>`
	width: 200px;
	height: 200px;
	background-color: ${props => props.bgColor};
	border-color: ${props => props.theme.borderColor};
`;

interface CircleProps {
	bgColor: string;
	borderColor?: string;
	text?: string;
}

function Circle({ bgColor, borderColor, text = 'defaule text' }: CircleProps) {
	return (
		<Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
			{text}
		</Container>
	);
}

export default Circle;
