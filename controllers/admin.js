const Repository = require('../models/Repository');
const User = require('../models/User');

/**
 * Dashboard
 */
exports.index = async (req, res) => {
  const nbRepos = await Repository.count().catch(null);
  const nbReposEnabled = await Repository.count({ enabled: true, }).catch(null);
  const nbUsers = await User.count().catch(null);
  const nbUsersWithPrivateAccess = await User.count({
    'tokens.scopes': { $in: ['repo'] },
  }).catch(null);

  return res.render('dashboard/index', {
    title: 'Dashboard',
    nbRepos,
    nbUsers,
    nbUsersWithPrivateAccess,
    nbReposEnabled,
  });
};
