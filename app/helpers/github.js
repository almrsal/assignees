const GitHub = require('github');

exports.auth = (user) => {
  const gh = new GitHub({ debug: true });
  const tokens = user.tokens.map(t => t.accessToken);

  gh.authenticate({
    type: 'oauth',
    token: tokens[0],
  });

  return gh;
};

exports.getWebhookConfig = (owner, repo, active) => {
  return {
    owner,
    repo,
    name: 'web',
    config: {
      url: 'http://assignees.tailordev.fr/events',
      content_type: 'json'
    },
    events: ['pull_request'],
    active,
  };
};

exports.getExistingWebhookConfig = (id, owner, repo, active) => {
  return Object.assign({},
    module.exports.getWebhookConfig(owner, repo, active),
    { id }
  );
};
