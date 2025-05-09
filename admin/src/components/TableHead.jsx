import { IconButton, Typography, Thead, Tr } from '@strapi/design-system';
import { ArrowUp, ArrowDown } from '@strapi/icons';

import S from '../styles/TableHeadStyles';

const TableHead = (props) => {
    return (
        <Thead>
            <Tr>
                {props.headers.map((header) => (
                    <S.Th key={header.name}>
                        <Typography
                            onClick={() => props.handleSort(header.name)}
                            variant="sigma"
                        >
                            {header.label}
                        </Typography>

                        {props.sortBy === header.name && (
                            <IconButton
                                onClick={() => props.handleSort(header.name)}
                                icon={props.sortOrder === 'asc' ? <ArrowDown /> : <ArrowUp />}
                                noBorder
                                aria-label="sort-icon"
                                label="Sort order"
                            >
                                {props.sortOrder === 'asc' ? <ArrowDown /> : <ArrowUp />}
                            </IconButton>
                        )}
                    </S.Th>
                ))}
            </Tr>
        </Thead>
    );
};

export { TableHead };
