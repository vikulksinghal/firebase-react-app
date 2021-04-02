import Header from './index';
import { shallow } from 'enzyme';

describe('Header Component', () => {
  it('Render without crashing', () => {
    const headerWrapper = shallow(<Header />);
  });
});
