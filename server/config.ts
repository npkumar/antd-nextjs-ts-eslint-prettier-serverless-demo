enum NODE_ENV {
  development = 'development',
  production = 'production',
}

const config = {
  development: {
    hotelCredentialsEndpoint: 'http://tk2-409-45983.vs.sakura.ne.jp:9090/api/v0.1/hotelcredentials',
  },
  production: {
    hotelCredentialsEndpoint: 'http://tk2-409-45983.vs.sakura.ne.jp:9090/api/v0.1/hotelcredentials',
  },
};


const getConfig = () =>
  process.env.NODE_ENV === NODE_ENV.development ? config.development : config.production;

export default getConfig;
