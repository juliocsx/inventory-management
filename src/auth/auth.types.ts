import { User } from 'src/modules/user/user.schema';

type LoginData = {
  token: string;
  user: User;
};

export { LoginData };
