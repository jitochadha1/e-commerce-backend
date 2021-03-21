const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/category', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', "category_name"]
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
      }
    ]
  }).then(result => {
    if (!result) {
      return res.status(404).json({ message: 'No category found' })
    }
    console.log('RES', result);
    return res.json(result)
  })
    .catch(err => {
      console.log(err)
      return res.status(500).json(err)
    })

});

router.post('/', (req, res) => {
  // create a new category
  console.log('REQ', req.body);
  Category.create({
    category_name: req.body.name
  }).then(result => res.json(result))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: Number(req.params.id)
    }
  })
    .then(updatedData => {
      if (!updatedData) {
        return res.status(404).json({ message: 'No category found with id' })
      }
      return res.status(200).json(updatedData);
    }).catch(err => {
      console.log(err);
      return res.status(500).json(er)
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(deletedData => {
    if(!deletedData){
      return res.status(404).json('No category with this id was found')
    }
    return res.status(200).json(deletedData)
  }).catch(err => {
    console.log(err);
    return res.status(500).json(err)
  })
});

module.exports = router;
