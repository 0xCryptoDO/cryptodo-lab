export const untokenizedUrls = {
  GET_MESSAGE_TO_SIGN: 'auth/web3/msg-to-sign',
  CURRENT_USER: 'users/current'
};

export const tokenizedUrls = {
  LOGIN: 'auth/web3/login',
};

export const urls = {
  ...untokenizedUrls,
  ...tokenizedUrls,
};
