import { render, fireEvent, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import TasksScreen from '../src/screens/TasksScreen';

const renderWithStore = (ui: React.ReactElement) =>
  render(<Provider store={store}>{ui}</Provider>);

test('no permite guardar task vacío y agrega cuando hay texto', () => {
  renderWithStore(<TasksScreen />);

  fireEvent.press(screen.getByText('Agregar nuevo task'));

  const input = screen.getByPlaceholderText('Descripción del task');
  const save = screen.getByText('Guardar');

  expect(save).toBeDisabled();

  fireEvent.changeText(input, 'Mi primer task');
  expect(save).not.toBeDisabled();

  fireEvent.press(save);

  expect(screen.getByText(/Mi primer task/i)).toBeTruthy();
});
