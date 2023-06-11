exports.getOverview = (req, res) => {
  res.status(200).render('overview', { tour: 'All Tours' });
};
exports.getTour = (req, res) => {
  res.status(200).render('tour', { tour: 'The Foresr Hiker tour' });
};
