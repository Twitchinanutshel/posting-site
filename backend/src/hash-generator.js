import bcrypt from 'bcrypt';

const password = 'MariGiftFor2Years';

const generateHash = async () => {
  const hash = await bcrypt.hash(password, 10); 
  console.log('Hashed password:', hash);
};

generateHash();
