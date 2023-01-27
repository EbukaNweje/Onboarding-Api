const addProduct = require("../models/addProduct");

exports.newProduct = async(req,res, next) =>{
    try{
        const createdProduct = await addProduct.create(req.body)
        res.status(200).json({
            message: "New Product added",
            data: createdProduct
        });
    }catch(e){
        next(e)
    }
};

exports.getAllProduct = async(req,res, next) =>{
    try{
        const allProduct = await addProduct.find()
        res.status(200).json({
            message: "This all the Product",
            data: allProduct
        });
    }catch(e){
        next(e)
    }
};

exports.getOneProduct = async(req,res, next) =>{
    try{
        const productId = req.params.productId
        const oneProduct = await addProduct.findById(productId)
        res.status(200).json({
            message: "This all the Product",
            data: oneProduct
        });
    }catch(e){
        next(e)
    }
};

exports.updateOneProduct = async(req,res, next) =>{
    try{
        const productId = req.params.productId
        const oneProduct = await addProduct.findByIdAndUpdate(productId, req.body, {new: true})
        res.status(200).json({
            message: "This all the Product",
            data: oneProduct
        });
    }catch(e){
        next(e)
    }
};

exports.deleteOneProduct = async(req,res, next) =>{
    try{
        const productId = req.params.productId
         await addProduct.findByIdAndDelete(productId)
        res.status(202).json({message: "Deleted"});
    }catch(e){
        next(e)
    }
};