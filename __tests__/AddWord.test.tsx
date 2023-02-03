import AddWord from '@/components/AddWord';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, JSXElementConstructor } from 'react';

function setup(jsx: ReactElement<any, string | JSXElementConstructor<any>>) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

describe('AddWord', () => {
  it('should render an input and a button', () => {
    render(<AddWord />);
    expect(screen.getByTestId('add-word-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-word-button')).toBeInTheDocument();
  });

  it('should render the button in disabled state', () => {
    render(<AddWord />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should have the add button enabled only after 2+ characters are entered', async () => {
    const { user } = setup(<AddWord />);
    const input = screen.getByTestId('add-word-input');

    expect(screen.getByTestId('add-word-button')).toBeDisabled();

    await user.type(input, 'a');
    expect(screen.getByTestId('add-word-button')).toBeDisabled();

    await user.type(input, 'b');
    expect(screen.getByTestId('add-word-button')).not.toBeDisabled();
  });

  it('should have the add button disabled if the input has spaces', async () => {
    const { user } = setup(<AddWord />);
    const input = screen.getByTestId('add-word-input');

    expect(screen.getByTestId('add-word-button')).toBeDisabled();

    await user.type(input, 'apple pear');
    expect(screen.getByTestId('add-word-button')).toBeDisabled();
  });

  it('should clear the input after the button is clicked', async () => {
    const { user } = setup(<AddWord />);
    const input = screen.getByTestId('add-word-input');

    await user.type(input, 'apple');
    expect(input).toHaveValue('apple');

    await user.click(screen.getByTestId('add-word-button'));
    expect(input).toHaveValue('');
  });

  it('should call the onWordAdd callback when the button is clicked', async () => {
    const onWordAdd = jest.fn();
    const { user } = setup(<AddWord onWordAdd={onWordAdd} />);
    const input = screen.getByTestId('add-word-input');

    await user.type(input, 'apple');
    await user.click(screen.getByTestId('add-word-button'));

    expect(onWordAdd).toHaveBeenCalledWith('apple');
  });
});
