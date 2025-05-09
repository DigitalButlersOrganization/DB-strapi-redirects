import * as qs from 'qs';
import { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Layouts } from '@strapi/admin/strapi-admin';
import { useFetchClient } from '@strapi/strapi/admin';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Typography,
  Button,
  Flex,
  IconButton,
  Searchbar,
} from '@strapi/design-system';
import { ChevronUp, ChevronDown, Plus, Pencil, Trash } from '@strapi/icons';

import { TableHead } from '../components/TableHead';

import { usePrevious } from '../hooks/usePrevious';
import { useDebounce } from '../hooks/useDebounce';

import S from '../helpers/styles';
import getTrad from '../helpers/getTrad';
import { PLUGIN_ID } from '../pluginId';

const OverviewPage = () => {
  const { get, del } = useFetchClient();
  const history = useNavigate();
  //const { pageSize, page, setNewPage } = useSearchQuery();
  const { formatMessage } = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc');
  const [redirects, setRedirects] = useState([]);
  const [totalNumberOfRedirects, setTotalNumberOfRedirects] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const prevDebouncedSearchValue = usePrevious(debouncedSearchValue);
  const tableHeaders = [
    {
      name: 'id',
      label: formatMessage({ id: getTrad('overview.table.headers.id') }),
    },
    {
      name: 'from',
      label: formatMessage({ id: getTrad('overview.table.headers.from') }),
    },
    {
      name: 'to',
      label: formatMessage({ id: getTrad('overview.table.headers.to') }),
    },
    {
      name: 'type',
      label: formatMessage({ id: getTrad('overview.table.headers.type') }),
    },
  ];
  //const pageCount = Math.ceil(totalNumberOfRedirects / pageSize);

  const handleRowClick = (id) => {
    history(`/plugins/${PLUGIN_ID}/${id}`);
  };

  const getRedirects = async () => {
    try {
      setIsLoading(true);
      const { data } = await get(`/${PLUGIN_ID}`);
      setRedirects(data);
      setTotalNumberOfRedirects(data.total);
      setIsLoading(false);
    } catch (error) {
      setRedirects([]);
      setTotalNumberOfRedirects(0);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRedirects();
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleDeleteRedirect = async (id) => {
    try {
      await del(`/${PLUGIN_ID}/${id}`);
      await getRedirects(1);
    } catch (error) {
      setRedirects([]);
      setTotalNumberOfRedirects(0);
      setIsLoading(false);
    }
  };

  const handleNewRedirect = () => {
    history(`/plugins/${PLUGIN_ID}/new`);
  };

  return (
    <Box>
      <Layouts.Header
        p={0}
        primaryAction={
          <Button startIcon={<Plus />} onClick={handleNewRedirect}>
            {formatMessage({ id: getTrad('overview.header.addButton.title') })}
          </Button>
        }
        title={formatMessage({ id: getTrad('overview.header.title') })}
        as="h2"
      />

      <Flex
        paddingLeft={10}
        paddingRight={10}
        marginBottom={10}
        direction="column"
        alignItems="flex-start"
        gap={6}
      >
        <S.SelectHelp type="button" onClick={() => setIsOpen(!isOpen)}>
          {formatMessage({ id: getTrad('overview.help.title') })}
          <ChevronUp width={3} height={3} style={{ display: isOpen ? 'block' : 'none' }} />
          <ChevronDown width={3} height={3} style={{ display: isOpen ? 'none' : 'block' }} />
        </S.SelectHelp>
        {isOpen && (
          <S.InfoBox hasRadius padding={4} marginTop={4} background="#fff">
            <S.InfoItem>
              <Typography textColor="neutral800" fontWeight="bold" as="h4" marginBottom={2}>
                {formatMessage({ id: getTrad('overview.help.instructions') })}
              </Typography>

              <ul>
                <li>
                  {formatMessage(
                    { id: getTrad('overview.help.from') },
                    { strong: (chunks) => <strong>{chunks}</strong> }
                  )}
                </li>
                <li>
                  {formatMessage(
                    { id: getTrad('overview.help.to') },
                    { strong: (chunks) => <strong>{chunks}</strong> }
                  )}
                </li>
                <li>
                  {formatMessage(
                    { id: getTrad('overview.help.type') },
                    { strong: (chunks) => <strong>{chunks}</strong> }
                  )}
                </li>
              </ul>
            </S.InfoItem>
          </S.InfoBox>
        )}
      </Flex>

      <Flex paddingLeft={10} paddingRight={10} direction="column" alignItems="stretch" gap={6}>
        {redirects.length > 0 ? (
          <Table colCount={tableHeaders.length} rowCount={redirects.length}>
            <TableHead headers={tableHeaders} />
            <Tbody>
              {redirects.map((entry) => (
                <Tr key={entry.id}>
                  <Td>
                    <Typography textColor="neutral800">{entry.id}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800" ellipsis style={{ maxWidth: '400px' }}>
                      {entry.from}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800" ellipsis style={{ maxWidth: '400px' }}>
                      {entry.to}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {formatMessage({
                        id: getTrad(`detail.form.type.value.${entry.type}`),
                      })}
                    </Typography>
                  </Td>
                  <Td>
                    <Flex justifyContent="end">
                      <Tooltip.Provider>
                        <IconButton
                          onClick={() => handleRowClick(entry.id)}
                          label={formatMessage({
                            id: getTrad('overview.table.actions.edit.label'),
                          })}
                          withTooltip={false}
                        >
                          <Pencil />
                        </IconButton>
                      </Tooltip.Provider>
                      <Tooltip.Provider>
                        <IconButton
                          onClick={() => handleDeleteRedirect(entry.id)}
                          label={formatMessage({
                            id: getTrad('overview.table.actions.delete.label'),
                          })}
                          withTooltip={false}
                        >
                          <Trash />
                        </IconButton>
                      </Tooltip.Provider>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <div></div>
        )}
      </Flex>
    </Box>
  );
};

export default memo(OverviewPage);
