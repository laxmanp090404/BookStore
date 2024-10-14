const BookModel = require("../Models/Book.model");
exports.createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      price,
      language,
      rating,
      description,
      reviews,
      imageUrl,
    } = req.body;

    const newBook = await BookModel.create({
      title,
      author,
      price,
      language,
      rating,
      description,
      reviews,
      imageUrl,
    });
    if (!newBook) {
      res.status(400).send({ message: "book not created" });
    } else {
      res.status(201).send({ message: "created Book" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    console.log(error, " at createbook controller");
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const Books = await BookModel.find();

    if (!Books) {
      res.status(404).send({ message: "Books not found or unable to get" });
    }
    res.status(200).json(Books);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error, "getallbook controller");
  }
};
exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const Book = await BookModel.findById(id);
    if (!Book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).json(Book);
  } catch (error) {
    console.log(error, "getBookController");
  }
};

exports.removeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const Book = await BookModel.findByIdAndDelete(id);
    if (!Book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).json({ message: "Successfully Removed" });
  } catch (error) {
    console.log(error, "removeBookController");
  }
};

exports.updateBook = async (req, res) => {
  try {
      const { id } = req.params;
      const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedBook) {
          res.status(404).send({ message: "Book not found" });
      } else {
          res.status(200).send({ message: "Successfully Updated", book: updatedBook });
      }
  } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
      console.log(error, "updateBook controller");
  }
};