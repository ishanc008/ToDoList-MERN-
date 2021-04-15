const router = require("express").Router();
let List = require("../models/list.model");

router.route("/").get((req,res)=>{
    List.find()
        .then(lists=>res.json(lists))
        .catch(err=>res.status(400).json("eroor:"+err));
})

router.route("/add").post((req,res)=>{
    const listItem = req.body.listItem;
    const newItem = new List({listItem});

    newItem.save()
        .then(()=>res.json("User Added"))
        .catch(err=>res.status(400).json("eroor:"+err));
})

router.route('/:id').delete((req, res) => {
    List.findByIdAndDelete(req.params.id)
      .then(() => res.json('List deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router