import { useState, useEffect, useCallback } from "react";

export const BEAR_MARKETS = [
  { name: "2011 Bear", athDate: "2011-06-08", ath: 31.91, bottomDate: "2011-11-18", bottom: 2.01, drawdown: -93.7, durationDays: 163, recovered: true },
  { name: "2014–2015 Bear", athDate: "2013-11-29", ath: 1163, bottomDate: "2015-01-14", bottom: 152, drawdown: -86.9, durationDays: 411, recovered: true },
  { name: "2017–2018 Bear", athDate: "2017-12-17", ath: 19891, bottomDate: "2018-12-15", bottom: 3122, drawdown: -83.5, durationDays: 363, recovered: true },
  { name: "2021–2022 Bear", athDate: "2021-11-10", ath: 69000, bottomDate: "2022-11-21", bottom: 15476, drawdown: -77.6, durationDays: 376, recovered: true },
];

const FEAR_GREED_URL = "https://api.alternative.me/fng/";
const COINGECKO_URL = "https://api.coingecko.com/api/v3";

export function useBitcoinData() {
  const [data, setData] = useState({
    price: null, ath: null, athDate: null,
    drawdown: null, fearGreed: null, fearGreedLabel: null,
    loading: true, error: null, lastUpdated: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const [priceRes, fgRes] = await Promise.all([
        fetch(`${COINGECKO_URL}/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`),
        fetch(FEAR_GREED_URL),
      ]);
      const btc = await priceRes.json();
      const fg = await fgRes.json();
      const price = btc.market_data?.current_price?.usd;
      const ath = btc.market_data?.ath?.usd;
      const athDate = btc.market_data?.ath_date?.usd;
      const drawdown = price && ath ? (((price - ath) / ath) * 100) : null;
      const fearGreedValue = fg?.data?.[0]?.value;
      const fearGreedLabel = fg?.data?.[0]?.value_classification;
      setData({ price, ath, athDate, drawdown, fearGreed: fearGreedValue, fearGreedLabel, loading: false, error: null, lastUpdated: new Date() });
    } catch (err) {
      setData(prev => ({ ...prev, loading: false, error: err.message }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30 * 1000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return data;
}
