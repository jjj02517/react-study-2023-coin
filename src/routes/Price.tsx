import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import styled from 'styled-components';

const PriceList = styled.li`
	margin-bottom: 20px;

	div {
		display: flex;
		align-items: center;
		text-align: center;

		&:first-child {
			margin-bottom: 10px;
			font-weight: 600;
		}
	}
	span {
		width: 50%;
	}
`;

type ChildProps = {
	coinId: string;
};

interface IHistory {
	time_open: number;
	time_close: number;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	market_cap: number;
}

function Price() {
	const { coinId } = useOutletContext<ChildProps>();

	const { isLoading, data } = useQuery<IHistory[]>(
		['ohlcv', coinId],
		() => fetchCoinHistory(coinId),
		{
			// refetchInterval: 1000,
		},
	);

	return (
		<div>
			<div>
				{isLoading ? (
					'loading'
				) : (
					<ul>
						{data?.slice(0, 100).map(price => (
							<PriceList>
								<div>
									<span>Open Price</span>
									<span>Close Price</span>
								</div>
								<div>
									<span>$ {price.open} </span>
									<span>$ {price.close}</span>
								</div>
							</PriceList>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Price;
