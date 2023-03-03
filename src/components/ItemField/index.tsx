import { Link } from 'react-router-dom'
import { FC } from 'react';

import { Box } from '@material-ui/core';
import styles from './style.module.scss';

export type ItemFieldProps = {
    items: any
};

export const ItemField: FC<ItemFieldProps> = ({ items }) => {

    return (
        <Box display='flex' flexWrap='wrap' justifyContent='space-between' mt='20px'>
            {items.map((data: any, i: any) => {
                return (
                    <Link to={typeof data._id !== 'undefined' ? `/media/${data._id}` : '#'} >
                        <div className={styles.biditem} key={i} >
                            <img src={data.media_url} alt={data.media_url} />
                            <Box mt='8px'>{data.metadata.title}</Box>
                            <div >{data.metadata.price}</div>
                        </div>
                    </Link>
                )
            })}
        </Box>
    );
};
