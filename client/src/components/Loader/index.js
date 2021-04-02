import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <div
      className='d-flex align-items-center justify-content-center w-100'
      style={{ minHeight: 300 }}
    >
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
