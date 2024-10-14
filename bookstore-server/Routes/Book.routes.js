const express = require('express')
const router  = express.Router();
const authMiddleware = require("../Middlewares/authenticateUser");
const BookController = require('../Controllers/Book.controller')
    router.post("/api/createbook",BookController.createBook);
    router.get("/api/getbooks",BookController.getAllBooks);
    router.get("/api/getbook/:id",BookController.getBook);
    router.put("/api/updateBook/:id",BookController.updateBook);
    router.delete("/api/removeBook/:id",BookController.removeBook);
    
module.exports = router;