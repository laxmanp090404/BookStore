    const mongoose = require('mongoose');

    const BookSchema = new mongoose.Schema({
        title:{
            type:String,
            required: [true, 'Title is required']
        },
        author:{
            type:String,
            required: [true, 'Author is required']
        },
        price:{
            type:Number,
            required: [true, 'Price is required']
        },
        language:{
            type:String,
            required: [true, 'Language is required']
        },
        imageUrl:{
            type:String
        },
        rating:{
            type:Number,
            min:0,
            max:10,
            default:0
        },
        description:{
            type:String,
            required:[true,"Description required"]
        },
        reviews:{
            type:Number,
            default:0
        }
    }, {
        timestamps: true 
    });

    const Book = mongoose.model('Book', BookSchema);

    module.exports = Book;
