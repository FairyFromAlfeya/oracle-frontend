import React, { FC, ChangeEvent, useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Container,
  Grid,
} from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DataArrayIcon from '@mui/icons-material/DataArray';
import { useStores } from '../../hooks/UseStores';
import { ListPairsResponse } from '../../dto/ListPairsResponse';
import { PageHeader } from './PageHeader';
import { PageTitleWrapper } from '../../components/PageTitleWrapper';
import { CopyButton } from '../../components/CopyButton';
import { Token } from '../../models/Token';
import { Pair } from '../../models/Pair';

export const PairsTable: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [pairs, setPairs] = useState<ListPairsResponse>([[], 0]);

  const { apiStore, pairsStore } = useStores();

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  const handleRemovePair = (id: string): void => {
    apiStore
      .removePair(id)
      .then((pair) => pairsStore.removePair(pair))
      .then(() =>
        apiStore.listPairs(page, limit).then((response) => setPairs(response)),
      );
  };

  const handleCreatePair = (address: string): void => {
    apiStore
      .createPair(address)
      .then((pair) => pairsStore.pushPair(pair))
      .then(() =>
        apiStore.listPairs(page, limit).then((response) => setPairs(response)),
      );
  };

  useEffect(() => {
    apiStore.listPairs(page, limit).then((response) => setPairs(response));
  }, [apiStore, limit, page]);

  const theme = useTheme();

  const getToken = (pair: Pair, isRight: boolean): Token =>
    pair.tokens.find(
      (t) => t.id === (isRight ? pair.rightToken : pair.leftToken),
    )!;

  return (
    <>
      <PageTitleWrapper>
        <PageHeader onCreate={handleCreatePair} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid item xs={12} pb={3}>
          <Card>
            <CardHeader title="Oracle Pairs List" />
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID / Symbol</TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>Left token</TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>Right token</TableCell>
                    <TableCell align="right">Created</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pairs[0].length < 1 && (
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        <DataArrayIcon fontSize="large" />
                        <Typography
                          variant="h2"
                          fontWeight="bold"
                          color="text.secondary"
                          noWrap
                        >
                          No Data
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  {pairs[0].map((pair) => (
                    <TableRow hover key={pair.id}>
                      <TableCell>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {pair.id}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {getToken(pair, false).symbol} -{' '}
                          {getToken(pair, true).symbol}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 300 }}>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {getToken(pair, false).symbol}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {getToken(pair, false).address}
                          </Typography>
                          <CopyButton
                            sx={{ ml: 1 }}
                            value={getToken(pair, false).address}
                          />
                        </Box>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 300 }}>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {getToken(pair, true).symbol}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {getToken(pair, true).address}
                          </Typography>
                          <CopyButton
                            sx={{ ml: 1 }}
                            value={getToken(pair, true).address}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          noWrap
                        >
                          {format(
                            new Date(pair.createdAt),
                            'dd-MM-yy HH:mm:ss',
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter,
                            },
                            color: theme.palette.error.main,
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleRemovePair(pair.id)}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={1}>
              <TablePagination
                component="div"
                count={pairs[1]}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10]}
              />
            </Box>
          </Card>
        </Grid>
      </Container>
    </>
  );
};
