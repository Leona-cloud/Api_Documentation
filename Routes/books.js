const express = require('express')
const router = express.Router();
const { Books } = require('../Models/books');


   /**
    * @swagger
    * 
    * /api/books:
    *   post:
    *       description: save books to the database
    *       requestBody: 
    *           content:
    *               application/json:
    *                   schema:
    *                       properties:
    *                           - author : 
    *                                    type: string
    *                                    description: author of the book
    *                            
    */


router.get('/', async(req, res)=>{
    const book = await Books.find().sort('name');
    res.send(book)
});

router.get('/:id', async(req, res)=>{
    const book = await Books.findById({_id: req.params.id});

    if (!book) return res.status(404).send("book with the given ID was not found");
    res.status(200).send(book);
    
});


router.post('/', async(req, res)=>{
   try {
        const book = new Books({
            title: req.body.title,
            author: req.body.author
        })
        const result = await book.save();
        res.send(result);
    console.log(result);
   } catch (ex) {
       console.log(ex)
   }
});

router.put('/:id', async(req, res)=>{
    try {
        const book = await Books.findByIdAndUpdate(req.params.id, {new: true});
        if (!book) {
            return res.status(404).send("Book doesn't exist");
          } else {
            res.send("Book has been updated" + book);
          }
    } catch (ex) {
        console.log(ex)
    }
});

router.delete('/:id', async(req, res)=>{
    try {
        const book = await Books.findByIdAndRemove(req.params.id);
        if (!book) {
            return res.status(404).send("book with the given id does not exist");
          } else {
            res.send("book has been deleted");
          }
    } catch (ex) {
        console.log(ex)
    }
});


module.exports = router;

