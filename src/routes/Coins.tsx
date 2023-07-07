import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Loading from '../components/common/Loading';
import { fetchCoins } from '../api';

const Container = styled.div`
	max-width: 480px;
	padding: 0px 20px;
	margin: 0 auto;
`;
const Header = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 20vh;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
	background-color: #fff;
	margin-bottom: 20px;
	border-radius: 4px;

	a {
		display: flex;
		align-items: center;
		padding: 20px;
		transition: color 0.2s ease-in;
		color: #2f3640;
	}

	&:hover {
		a {
			color: ${props => props.theme.accentColor};
		}
	}
`;
const Title = styled.h1`
	font-size: 48px;
	color: ${props => props.theme.accentColor};
`;
const Img = styled.img`
	width: 20px;
	height: 20px;
	border-radius: 100%;
	margin-right: 10px;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>(['allCoins'], fetchCoins);
	// const [coins, setCoins] = useState<CoinInterface[]>([]);
	// const [loading, setLoading] = useState(true);
	// useEffect(() => {
	// 	(async () => {
	// 		const response = await fetch('https://api.coinpaprika.com/v1/coins');
	// 		const json = await response.json();

	// 		setCoins(json.slice(0, 100));
	// 		setLoading(false);
	// 	})();
	// }, []);

	return (
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title>코인</Title>
			</Header>
			{isLoading ? (
				<Loading />
			) : (
				<CoinList>
					{data?.slice(0, 100).map(coin => (
						<Coin key={coin.id}>
							<Link to={`/${coin.id}`} state={{ name: coin.name }}>
								<Img
									src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
									alt={coin.name}
								/>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinList>
			)}
		</Container>
	);
}

export default Coins;
