import { ReactElement, JSXElementConstructor } from 'react';
import { render, screen } from '@testing-library/react';
import Confirmation from '@/components/Confirmation';
import UserEvent from '@testing-library/user-event';

const setup = (jsx: ReactElement<any, string | JSXElementConstructor<any>>) => {
  return {
    user: UserEvent.setup(),
    ...render(jsx),
  };
};

describe('Confirmation', () => {
  it('should have a dynamic confirmation question', () => {
    setup(<Confirmation children="a question" onOk={jest.fn()} />);
    expect(screen.getByText('a question')).toBeInTheDocument();
  });

  it('should have an "OK" button', () => {
    setup(<Confirmation children="foo" onOk={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Ok' }));
  });

  it('should have an "Cancel" button', () => {
    setup(<Confirmation children="foo" onOk={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Cancel' }));
  });

  it('should be able to receive a handler for the OK button and call it when the button is clicked', async () => {
    const onOk = jest.fn();
    const { user } = setup(<Confirmation children="foo" onOk={onOk} />);
    await user.click(screen.getByRole('button', { name: 'Ok' }));
    expect(onOk).toHaveBeenCalled();
  });
});
