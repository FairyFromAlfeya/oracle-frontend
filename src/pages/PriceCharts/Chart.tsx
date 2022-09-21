import React from 'react';
import {
  Card,
  Box,
  Typography,
  Avatar,
  Grid,
  alpha,
  useTheme,
  styled,
} from '@mui/material';
import ApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Pair } from '../../models/Pair';
import { Token } from '../../models/Token';
import { useStores } from '../../hooks/UseStores';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${alpha(theme.colors.alpha.black[100], 0.07)};
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
  `,
);

export const Chart = observer(() => {
  const { priceChartStore } = useStores();

  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: { show: false },
      sparkline: { enabled: true },
      zoom: { enabled: false },
    },
    fill: {
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: [theme.colors.primary.main, theme.palette.error.main],
    dataLabels: { enabled: false },
    theme: { mode: theme.palette.mode },
    stroke: {
      show: true,
      colors: [theme.colors.primary.main, theme.palette.error.main],
      width: 2,
    },
    legend: { show: false },
    yaxis: { show: false, tickAmount: 5 },
    xaxis: {
      type: 'datetime',
      tickAmount: 8,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        formatter: (val, timestamp) =>
          format(new Date(timestamp!), 'dd-MM-yy HH:mm:ss'),
      },
    },
    tooltip: {
      x: { show: true },
      y: {
        title: {
          formatter: (name) => `${name}:`,
        },
      },
      marker: { show: false },
    },
  };

  const getToken = (p: Pair, isRight: boolean): Token =>
    p.tokens.find((t) => t.id === (isRight ? p.rightToken : p.leftToken))!;

  const getTokenImage = (pair: Pair, isRight: boolean): string =>
    `${process.env.REACT_APP_CRYPTO_ASSETS_BASE_URL}/${
      getToken(pair, isRight)?.symbol
    }.svg`;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12}>
        <Card sx={{ overflow: 'visible' }}>
          <Box sx={{ p: 3 }}>
            {priceChartStore.selectedPair && (
              <Box display="flex" alignItems="center">
                <AvatarWrapper>
                  <img
                    alt={getToken(priceChartStore.selectedPair, false).symbol}
                    src={getTokenImage(priceChartStore.selectedPair, false)}
                  />
                </AvatarWrapper>
                <AvatarWrapper sx={{ ml: -4 }}>
                  <img
                    alt={getToken(priceChartStore.selectedPair, true).symbol}
                    src={getTokenImage(priceChartStore.selectedPair, true)}
                  />
                </AvatarWrapper>
                <Box display="grid">
                  <Typography variant="h4" noWrap>
                    {getToken(priceChartStore.selectedPair, false).symbol}-
                    {getToken(priceChartStore.selectedPair, true).symbol}
                  </Typography>
                  <Typography variant="subtitle1" noWrap>
                    {priceChartStore.selectedPair.address}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          <ApexChart
            options={chartOptions}
            series={[
              {
                name: 'Price',
                data: priceChartStore.pricesSeries,
              },
              {
                name: 'TWAP',
                data: priceChartStore.twapsSeries,
              },
            ]}
            type="area"
            height={500}
          />
        </Card>
      </Grid>
    </Grid>
  );
});
