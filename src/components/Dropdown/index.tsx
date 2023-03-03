import styles from './style.module.scss';
import { FaChevronDown } from 'react-icons/fa'
import React, { FC } from 'react'
import { Box } from '@material-ui/core';

export type ItemFieldProps = {
  values: any
};

export const Dropdown: FC<ItemFieldProps> = ({ values }) => {
  return (
    <div className={styles.dropdownfield}>
      <Box fontSize='14px'>{values[0]}</Box>
      <FaChevronDown />
    </div>
  )
};
