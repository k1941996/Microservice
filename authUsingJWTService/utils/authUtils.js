import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

const roleMapping = (role) => {
  switch (role) {
    case 'admin':
      return '35b9103e';
    case 'customer':
      return '789ff438';
    default:
      break;
  }
};

export const generatePassowrdId = () => {
  const password_id = uuid();
  return password_id;
};

export const generateToken = (user) => {
  const role = roleMapping(user?.role);

  const token = jwt.sign(
    { password_id: user.password_id, role: role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1d',
    },
  );
  return token;
};
