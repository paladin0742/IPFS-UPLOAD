import { Box } from '@material-ui/core';
import styles from './style.module.scss';

type TableProps = {
  title?: string;
  data?: any[];
  acceptBid: (id: string) => void;
  isOwner: string;
};

export const Table: React.FC<TableProps> = ({
  title,
  data,
  acceptBid,
  isOwner,
}) => {
  console.log("isowner", isOwner)
  return (
    <Box my='16px' width='100%' >
      <Box display='flex' flexDirection='col' >
        <Box style={{ overflowX: 'auto', width: '100%' }}>
          <Box py='8px' style={{ verticalAlign: 'middle' }} display='inline-block' minWidth='100%'>
            <Box fontWeight='bold' pb='8px' >{title}</Box>
            <Box overflow='hidden' borderBottom="1px solid rgb(229 231 235)" borderRadius='6px'>
              <table style={{ minWidth: '100%', borderBottom: '1px solid rgb(229 231 235)' }}>
                <thead style={{ background: 'transparent' }}>
                  <tr>
                    <th
                      scope="col"
                      align='left'
                      style={{ paddingTop: '12px', paddingBottom: '12px', fontSize: '12px', fontWeight: 700, color: 'white', textTransform: 'uppercase' }}>
                      Address
                    </th>

                    <th
                      align='left'
                      scope="col"
                      style={{ paddingTop: '12px', paddingBottom: '12px', fontSize: '12px', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Price
                    </th>
                    {isOwner && title === 'Bidding' && (
                      <th
                        align="right"
                        style={{ paddingTop: '12px', paddingBottom: '12px', fontSize: '12px', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item, index) => (
                    <tr style={{ background: 'transparent' }} key={index}>
                      <td style={{ paddingTop: '16px', paddingBottom: '16px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 700, color: 'white' }}>
                        {item.bidder.substring(0, 4) + '....' + item.bidder.substring(item.bidder.length - 4)}
                      </td>
                      <td style={{ paddingTop: '16px', paddingBottom: '16px', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 700, color: 'white' }}>
                        {item.price} KET
                      </td>
                      {isOwner && title === 'Bidding' && (
                        <td align="right">
                          <button
                            type="button"
                            onClick={() => acceptBid(item)}
                            className={styles.acceptbutton}>
                            Accept
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
