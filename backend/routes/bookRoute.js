import express from "express"  
import { BookModel } from "../models/bookModel.js";

const router = express.Router()


// save book
router.post("/savebooks", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author and publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await BookModel.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get all books
router.get("/allbooks", async (request, response) => {
  try {
    const allbooks = await BookModel.find({});
    return response.status(201).json({
      count: BookModel.length,
      data: allbooks,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get books by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const allbook = await BookModel.findById(id);
    return response.status(201).json(allbook);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// edit books
router.put("/editbook/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author and publishYear",
      });
    }

    const { id } = request.params;
    const result = await BookModel.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({ message: "Book Not Found" });
    }
    return response.status(200).send({ message: "Book Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// delete book
router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await BookModel.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: "Book Not Found" });
    }
    return response.status(200).send("Book Deleted Successfully");
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


export default router;  