import notFoundImg from '../../404.png';
const NotFound = () => {
  return (
    <div className='d-flex align-items-center justify-content-center w-100'>
      <img src={notFoundImg} alt='404' />
    </div>
  );
};

export default NotFound;
