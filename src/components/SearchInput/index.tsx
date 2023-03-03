import { FiSearch } from 'react-icons/fi'
import { FC } from 'react';

import styles from './style.module.scss';

type SearchInputProps = {
    setCriteria: any
};

export const SearchInput: FC<SearchInputProps> = ({ setCriteria }) => {

    return (
        <div className={styles.inputfields}>
            <FiSearch fontSize="26px" color="white" />
            <input type="text" style={{ marginLeft: '12px', width: '100%', background: 'transparent', outline: 'none', border: 'none', color: 'white', fontFamily: 'Poppins', fontWeight: 'bold' }} placeholder='Search Item Here'
                onKeyDown={setCriteria} />
        </div>
    );
};
