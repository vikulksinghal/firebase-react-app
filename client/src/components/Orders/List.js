import moment from 'moment';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import editIcon from '../../edit-icon.svg';

const List = ({ order, onEdit }) => {
  const renderTooltip = (props) => (
    <Tooltip id='button-tooltip' {...props}>
      Edit Order
    </Tooltip>
  );

  return (
    <tr key={order._id}>
      <td>{order.title}</td>
      <td>{order.customer ? order.customer.name : 'N/A'}</td>
      <td>
        {order.address
          ? `${order.address.street} ${order.address.city} ${order.address.country} ${order.address.zip}`
          : 'N/A'}
      </td>
      <td className={order.bookingDate._seconds}>
        {moment.unix(order.bookingDate._seconds).format('MM/DD/YYYY')}
      </td>
      <td>
        <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <img
            onClick={() => onEdit(order._id)}
            src={editIcon}
            alt='edit-icon'
            style={{ maxWidth: 25, cursor: 'pointer' }}
          />
        </OverlayTrigger>
        ,
      </td>
    </tr>
  );
};

export default List;
