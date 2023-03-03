import styles from './style.module.scss';
import { FC,  } from 'react';

type ButtonProps = {
  children: any,
  width?: string,
  height?: string,
  type: string,
  onClick: any,
};


export const Button: FC<ButtonProps> = ({ children, width, height, type, onClick }) => {

  return (
    <>
      {type === 'primary' && <div className={`${styles.button} ${styles.primary}`} onClick={onClick} style={{ width: width, height: height }}>{children}</div>}
      {type === 'secondary' && <div className={`${styles.button} ${styles.secondary}`} onClick={onClick} style={{ width: width, height: height }}>{children}</div>}
    </>
  );
};
