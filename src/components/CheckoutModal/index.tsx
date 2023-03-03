import { BsInstagram } from 'react-icons/bs';
import { useEffect, useRef } from 'react';

import { FaTelegramPlane, FaTwitter } from 'react-icons/fa';
import { Box } from '@material-ui/core';

import styles from './style.module.scss';
import { Button } from '../Button';

type ModalProps = {
    open: boolean;
    setOpen: any;
    img_src?: string;
    img_title?: string;
    username?: string;
    price?: string;
    onCheckout?: any;
    type?: number,
};

export const CheckoutModal: React.FC<ModalProps> = ({ open, setOpen, img_src, img_title, username, price, onCheckout, type }) => {

    const dialog = useRef<any>();

    useEffect(() => {
        document.addEventListener('mouseup', function (event) {
            if (dialog.current && !dialog.current.contains(event.target)) {
                setOpen(false);
            }
        });
    }, [setOpen]);

    const ellipsis = username?.substring(0, 2) === '0x' ? username.substring(0, 4) + '....' + username.substring(username.length - 4) : username;
    return (
        <div className={styles.modal} style={{ display: open ? 'flex' : 'none' }}>
            <div className={styles.opacityback} />
            {type === 1 ?
                < div className={styles.modalfield} ref={dialog}>
                    <Box fontWeight={600} fontSize='24px' color='white' my='28px'>Check Out</Box>
                    <div className={styles.modalbody}>
                        <Box display='flex' justifyContent='space-between' fontWeight={600} color='white'>
                            <div>Item</div>
                            <div>Subtotal</div>
                        </Box>
                        <Box display='flex' justifyContent='space-between' color='white' my='36px'>
                            <Box display='flex' alignItems='center' >
                                <img src={img_src} width='105px' height='105px' alt={img_src} />
                                <Box ml='16px'>
                                    <Box fontWeight={600} >{ellipsis}</Box>
                                    <Box mt='4px'>{img_title}</Box>
                                </Box>
                            </Box>
                            <div>{price} <span style={{ fontWeight: 600 }}>ETH</span></div>
                        </Box>
                        <Box display='flex' justifyContent='space-between' color='white' >
                            <Box fontWeight={600}>Total</Box>
                            <div>{price} <span style={{ fontWeight: 600 }}>ETH</span></div>
                        </Box>
                    </div>
                    <Box display='flex' justifyContent='space-around' mt='32px'>
                        <Button type='primary' width="140px" height="40px" onClick={(e: any) => { onCheckout(e, price) }}>Checkout</Button>
                        <div></div>
                        <Button type='secondary' width="140px" height="40px" onClick={() => { setOpen(false) }}>Cancel</Button>
                    </Box>
                </div>
                :
                <div className={`${styles.modalfield} ${styles.successfield}`} ref={dialog}>
                    <Box fontWeight={600} fontSize="24px" color="white" my='28px' >Payment Successful</Box>
                    <div className={`${styles.modalbody} ${styles.successbody}`}>
                        <img src={img_src} width={211} height={206} alt={img_src} />
                        <Box mt='32px' style={{ maxWidth: 365 }}>
                            You successfully purchased
                            <span style={{ fontWeight: 'bold' }}>{img_title}</span>
                            from <span style={{ fontWeight: 'bold' }}>{ellipsis}</span>
                        </Box>
                    </div>
                    <Box display='flex' justifyContent='center' mt='32px' color='white' flexDirection='col' alignItems='center'>
                        <Box fontWeight={600} fontSize='20px'>Share</Box>
                        <div className={styles.socialbutton}>
                            <BsInstagram fontSize={38} />
                            <FaTwitter fontSize={38} />
                            <FaTelegramPlane fontSize={38} />
                        </div>
                    </Box>
                </div>
            }
        </div >
    );
};
