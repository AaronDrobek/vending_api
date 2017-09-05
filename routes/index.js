const express = require("express");
const router = express.Router();
const models = require("../models/index");

router.get("/api/customer/items", function (req,res) {
  models.Item.findAll()
    .then(function(data){
      res.json({data: data});
    })
    .catch(function(err) {
      res.json(err)
    })
  })

router.post("/api/vendor/items", function (req,res) {
  models.Item.create({
    description: req.body.description,
    cost: req.body.cost,
    quantity: req.body.quantity
  })
    .then(function(data) {
      res.json({data:data, message: "item created"})
    })
    .catch(function(err) {
      res.json(err)
    })
})

router.put("/api/vendor/items/:itemId", function (req,res) {
  models.Item.update({
    description: req.body.description,
    cost: req.body.cost,
    quantity: req.body.quantity
  }, { where: {
    id: req.params.itemId
  }})
  .then(function(data) {
    res.json({data:data, message: "item updated"})
  })
    .catch(function(err) {
      res.json(err)
    })
})

router.post("/api/customer/items/:itemId/purchases", function(req,res) {
  let item;
  models.Item.findById(req.params.itemId)
    .then(function(data) {
      item = data
      if(item.cost <= req.body.payment && item.quantity > 0){
        models.Purchase.create({
          payment: req.body.payment,
          itemId: req.params.itemId
        })
        .then(function(data) {
          item.update({
          quantity: item.quantity - 1
        })
          .then(function(data) {
            res.json({data:data, status:"success", change: req.body.payment - item.cost })

          })
        })
      }else{
        res.json({status:"failure"})
      }

    }).catch(function(err) {
      res.json({status: "failure"})
    })
  })
router.get("/api/vendor/purchases", function(req,res) {
  models.Purchase.findAll()
  .then(function(data) {
    res.json({data:data, status: "success"})
  })

})


router.get("/api/vendor/money", function(req,res) {
  models.Purchase.findAll({
    include: [{
      model: models.Item,
      as: 'Items'
    }]
  })
    .then(function(data) {
      let sum = 0;
      for (var i = 0; i < data.length; i++) {
        sum += data[i].Items.cost
      }
      res.json({data: sum, status: "success"})
    })

  })



module.exports = router;
