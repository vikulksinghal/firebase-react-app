const functions = require('firebase-functions');
const admin = require('firebase-admin');
const config = require('config');
// Initialize app
admin.initializeApp({
  credential: admin.credential.cert({
    type: config.get('type'),
    project_id: config.get('project_id'),
    private_key_id: config.get('private_key_id'),
    private_key: config.get('private_key'),
    client_email: config.get('client_email'),
    client_id: config.get('client_id'),
    auth_uri: config.get('auth_uri'),
    token_uri: config.get('token_uri'),
    auth_provider_x509_cert_url: config.get('auth_provider_x509_cert_url'),
    client_x509_cert_url: config.get('client_x509_cert_url'),
  }),
  databaseURL: config.get('databaseURL'),
  databaseAuthVariableOverride: {
    uid: config.get('uid'),
  },
});

module.exports = {
  admin,
  functions,
};
