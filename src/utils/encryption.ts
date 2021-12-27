import bcrypt from 'bcrypt';

export const encrypt = async (text: string) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(text, salt);
};

export const compare = async (
  inputPassword: string,
  originalPassword: string
) => await bcrypt.compare(inputPassword, originalPassword);

export default {
  encrypt,
  compare,
};
