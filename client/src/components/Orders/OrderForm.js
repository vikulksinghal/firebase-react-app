import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useForm from '../../hooks/useForm';
import moment from 'moment';
import { useSelector } from 'react-redux';

const initalState = {
  title: '',
  bookingDate: new Date(),
  city: '',
  country: '',
  street: '',
  zip: '',
  email: '',
  name: '',
  phone: '',
};

const OrderForm = ({ show, onPopup, onSubmit, order }) => {
  // Using useForm custom hook to manage local component form state throughout our application
  const { state, handleChange, dispatch } = useForm(initalState);
  const [validated, setValidated] = useState(false);
  const { manageOrderLoading } = useSelector((state) => state.orders);
  const {
    title,
    bookingDate,
    city,
    country,
    street,
    zip,
    email,
    name,
    phone,
  } = state;

  useEffect(() => {
    if (show === false) {
      // resetting form
      const initState = { ...initalState };

      dispatch({
        type: 'SET_MULTIPLE_STATE',
        payload: { ...initState },
      });
    }
  }, [show, dispatch]);

  useEffect(() => {
    if (order._id) {
      dispatch({
        type: 'SET_MULTIPLE_STATE',
        payload: {
          ...order,
          bookingDate: new Date(moment.unix(order.bookingDate._seconds)),
        },
      });
      onPopup();
    }
  }, [order, dispatch]);

  const handleValidate = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      onSubmit({ ...state });
    }
  };

  return (
    <Modal show={show} onHide={onPopup}>
      <Form noValidate validated={validated} onSubmit={handleValidate}>
        <Modal.Header closeButton>
          <Modal.Title>{!order._id ? 'Add' : 'Edit'} Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row}>
            <Form.Label column sm='4'>
              Title
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                required
                type='text'
                name='title'
                onChange={handleChange}
                value={title}
                placeholder='Enter Title'
              />
              <Form.Control.Feedback type='invalid'>
                Please enter title
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm='4'>
              Booking Date
            </Form.Label>
            <Col sm='8'>
              <DatePicker
                name='bookingDate'
                onChange={(date) => {
                  handleChange({
                    target: { name: 'bookingDate', value: date },
                  });
                }}
                placeholder='Booking Date'
                className='form-control'
                selected={bookingDate}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm='4'>
              Street
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                required
                readOnly={order._id}
                type='text'
                name='street'
                onChange={handleChange}
                value={street}
                placeholder='Enter Street'
              />
              <Form.Control.Feedback type='invalid'>
                Please enter street
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm='4'>
              City
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                required
                type='text'
                readOnly={order._id}
                name='city'
                onChange={handleChange}
                value={city}
                placeholder='Enter City'
              />
              <Form.Control.Feedback type='invalid'>
                Please enter city
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm='4'>
              Country
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                required
                type='text'
                readOnly={order._id}
                name='country'
                onChange={handleChange}
                value={country}
                placeholder='Enter Country'
              />
              <Form.Control.Feedback type='invalid'>
                Please enter country
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm='4'>
              Zip
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                required
                type='text'
                readOnly={order._id}
                name='zip'
                onChange={handleChange}
                value={zip}
                placeholder='Enter Zip'
              />
              <Form.Control.Feedback type='invalid'>
                Please enter zip
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm='4'>
              Name
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                required
                type='text'
                readOnly={order._id}
                name='name'
                onChange={handleChange}
                value={name}
                placeholder='Enter Name'
              />
              <Form.Control.Feedback type='invalid'>
                Please enter name
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm='4'>
              Email
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                required
                type='email'
                readOnly={order._id}
                name='email'
                onChange={handleChange}
                value={email}
                placeholder='Enter Email'
              />
              <Form.Control.Feedback type='invalid'>
                Please enter valid email
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm='4'>
              Phone
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                required
                type='text'
                readOnly={order._id}
                name='phone'
                onChange={handleChange}
                value={phone}
                placeholder='Enter Phone'
              />
              <Form.Control.Feedback type='invalid'>
                Please enter phone
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onPopup}>
            Close
          </Button>
          {manageOrderLoading ? (
            <Button variant='success' disabled>
              <Spinner
                as='span'
                animation='grow'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              {!order._id ? 'Adding' : 'Updating'}...
            </Button>
          ) : (
            <Button variant='success' type='submit'>
              {!order._id ? 'Add' : 'Update'}
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OrderForm;
