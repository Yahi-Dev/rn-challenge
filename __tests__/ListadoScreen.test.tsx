import { render, screen, waitFor } from '@testing-library/react-native';
import ListadoScreen from '../src/screens/ListadoScreen';

const mockData = [{ id: '1', name: 'Elemento 1', avatar: '' }];

beforeEach(() => {
  // @ts-ignore
  global.fetch = jest.fn(async () => ({
    json: async () => mockData
  }));
});

afterEach(() => {
  // @ts-ignore
  global.fetch.mockClear();
});

test('muestra loading y luego la lista remota', async () => {
  render(<ListadoScreen />);
  expect(screen.getByTestId('loading')).toBeTruthy();

  await waitFor(() => expect(screen.getByTestId('remote-list')).toBeTruthy());
  expect(screen.getByText('Elemento 1')).toBeTruthy();
});
