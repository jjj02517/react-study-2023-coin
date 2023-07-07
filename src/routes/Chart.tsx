import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

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
function Chart() {
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
			{isLoading ? (
				'loading'
			) : (
				<ApexChart
					type="candlestick"
					series={[
						{
							data: data?.map(price => ({
								x: new Date(price.time_close),
								y: [price.open, price.high, price.low, price.close],
							})) as [],
						},
					]}
					options={{
						theme: {
							mode: 'dark',
						},
						chart: {
							type: 'candlestick',
							width: 500,
							height: 350,
							toolbar: {
								show: false,
							},
							background: 'transparent',
						},
						grid: {
							show: false,
						},
						stroke: {
							curve: 'smooth',
							// width: 4,
						},
						yaxis: {
							show: false,
						},
						xaxis: {
							axisBorder: { show: false },
							axisTicks: { show: false },
							labels: { show: false },
							type: 'datetime',
							categories: data?.map(price =>
								new Date(price.time_close * 1000).toUTCString(),
							),
						},
						// fill: {
						// 	type: 'gradient',
						// 	gradient: {
						// 		gradientToColors: ['#fbc531'],
						// 		stops: [0, 100],
						// 	},
						// },
						// colors: ['#0097e6'],
						tooltip: {
							y: {
								formatter: value => `$ ${value.toFixed(3)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
