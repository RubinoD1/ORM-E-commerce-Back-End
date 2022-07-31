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
        /* Since we are searching by id, it is possible a search could be done for a nonexistent id value. 
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

// create a new category
router.post('/', (req, res) => {
  // To insert data SQL's .create() method is used. 
  // A key/value pair is used where the key is what defined the Category model and values are what we get from req.body.
  Category.create({
      category_name: req.body.category_name
  })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
 /* The .update() method combines the parameters for creating data and looking up data. 
 We pass in req.body to provide the new data we want to use in the update and req.params.id to indicate 
 where exactly we want that new data to be used. */
 Category.update(req.body, {
      where: {
          id: req.params.id
      }
  })
      .then(dbCategoryData => {
          if (!dbCategoryData[0]) {
              res.status(404).json({ message: 'No Category found with this id' });
              return;
          }
          res.json(dbCategoryData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  //To delete data, the destroy method is used and an identifier to indicate where we would like to delete the data 
  //from the Category database table. 
  Category.destroy({
      where: {
          id: req.params.id
      }
  })
      .then(dbCategoryData => {
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


module.exports = router;
