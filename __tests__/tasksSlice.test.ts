import reducer, { addTask } from '../src/features/tasks/tasksSlice';

test('agrega un task al estado', () => {
  const s1 = reducer(undefined, { type: '@@INIT' } as any);
  const s2 = reducer(s1, addTask('Hola mundo'));
  expect(s2.items.length).toBe(1);
  expect(s2.items[0].description).toBe('Hola mundo');
});
