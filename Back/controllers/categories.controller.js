const categoriesSchema = require('../models/categories.model');


exports.saveCategories = (req, res) => {

  const user_id = req.user._id;
  const categories = req.body;

  const userCategories = new categoriesSchema({ user_id, categories });

  // Before saving will delete existing, so no need to make update req :)
  categoriesSchema.deleteMany({user_id},  (err) => {
    if (err) return res.status(422).json({ 'error': 'Can not delete categories' + err });

    else userCategories.save(function (err) {
      if (err) return res.status(422).json({ 'error': 'Can not save categories' + err });
      return res.status(200).json({ 'expense submitted': true });
    });
    
  });

}


exports.getCategories = (req, res) => {
  const user_id = req.user._id;

  categoriesSchema.find({user_id})
  .then((userCategories) => res.send(Object.values( {...userCategories[0].categories} )))
  .catch((e) => res.send(e));
}