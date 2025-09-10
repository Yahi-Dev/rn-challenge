import 'whatwg-fetch';
import '@testing-library/jest-native/extend-expect';

// Mock necesario si tu app usa react-native-reanimated
// (evita crasheos y warnings en tests)
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));