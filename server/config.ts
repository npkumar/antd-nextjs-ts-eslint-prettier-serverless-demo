enum NODE_ENV {
  development = 'development',
  production = 'production',
}

const config = {
  development: {
    hotelCredentialsEndpoint: 'http://localhost:8080/api/v0.1/hotelcredentials',
  },
  production: {
    hotelCredentialsEndpoint: 'http://localhost:8080/api/v0.1/hotelcredentials',
  },
};

const getConfig = () =>
  process.env.NODE_ENV === NODE_ENV.development ? config.development : config.production;

export default getConfig;
