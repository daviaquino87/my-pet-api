import { User } from '@/modules/identification/entities/User';

test('Create new instance of user [entity]', () => {
  const user = new User({
    name: 'john Due',
    email: 'john@due.email.com',
    passwordHash: 'passwordHash',
  });

  expect(user).toHaveProperty('id');
  expect(user.id).toEqual(expect.any(String));
});
