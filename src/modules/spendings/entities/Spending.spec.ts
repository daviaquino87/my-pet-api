import { Spending } from '@/modules/spendings/entities/Spending';

test('Create new instance of spending [entity]', () => {
  const spending = new Spending({
    value: 12.5,
    userId: '001011100',
  });

  expect(spending).toHaveProperty('id');
  expect(spending.id).toEqual(expect.any(String));
});
