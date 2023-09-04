module.exports = {
  locales: ['ru', 'en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'SmartContracts'],
    '/': ['SmartContracts', 'CreateToken'],
    '/contract/[network]/[address]': ['SmartContracts', 'CreateToken'],
    '/create': ['CreateToken', 'common'],
    '/profile': ['Profile', 'SmartContracts'],
    '/dao/[address]': ['Dao'],
    '/createDao': ['Dao', 'CreateToken'],
    '/quests': ['Quests', 'Profile'],
  },
  loadLocaleFrom: (lang, ns) => require(`./src/locales/${lang}/${ns}`),
};
