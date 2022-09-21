import React from 'react';
import { Grid, Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/UseStores';

const ONE_HOUR = 60 * 60 * 1000;

const TWAP_INTERVALS = [300, 600, 900, 1800];

export const Controls = observer(() => {
  const { priceChartStore } = useStores();

  const formatDate = (timestamp: number) =>
    format(new Date(timestamp), 'dd-MM-yy HH:mm:ss');

  return (
    <>
      <Grid item my={2}>
        <ToggleButtonGroup
          exclusive
          value={priceChartStore.twapInterval}
          onChange={(_, v) => priceChartStore.setTwapInterval(v)}
          fullWidth
        >
          {TWAP_INTERVALS.map((interval) => (
            <ToggleButton key={interval} disableRipple value={interval}>
              {interval / 60}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
      {priceChartStore.minTimestamp && priceChartStore.maxTimestamp && (
        <Grid item mx={1}>
          <Slider
            max={priceChartStore.maxTimestamp}
            min={priceChartStore.minTimestamp}
            step={ONE_HOUR}
            value={priceChartStore.range}
            onChange={(_, value, activeThumb) =>
              priceChartStore.setRange(value as number[], activeThumb)
            }
            valueLabelDisplay="auto"
            valueLabelFormat={formatDate}
            disableSwap
          />
        </Grid>
      )}
    </>
  );
});
