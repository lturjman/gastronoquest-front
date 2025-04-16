// Validation du mot de passe avec au moins 8 caractères, une majuscule, une minuscule et un caractère spécial
export const isValidPassword = (password) => {
  const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  return passwordregex.test(password);
};
