const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // findAll is the equivalent of the SQL query: SELECT * FROM category;
  Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
          {
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
      ]
  })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    //using the 'where' option to indicate where we want to find a category where its id value equals whatever req.params.id is
    // This is similiar to the SQL query: SELECT * FROM category WHERE id = ?
      where: {
          id: req.params.id
      },
      attributes: ['id', 'category_name'],
      include: [
          {
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
      ]
  })
      .then(dbCategoryData => {
        /*Since we are searching by id, it is possible a search could be done for a nonexistent id value. 
          if the .then() method returns nothing from the query, a 404 status is sent to the client to indicate that it worked
          but no data was found for that requested id.  */ 
          if (!dbCategoryData) {
              res.status(404).json({ message: 'No category found with this id' });
              return;
          }
          res.json(dbCategoryData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
