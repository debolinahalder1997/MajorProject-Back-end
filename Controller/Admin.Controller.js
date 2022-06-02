const ProductModel = require("../Model/AdminProductModel")

//-----------------Connect to the cloudinary server to Store The images----------//
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: 'dyz99avqd',
    api_key: '189355537692969',
    api_secret: 'VjTZ5h1lU27uO47pcRJ_CKaz9Io'
});
//-----------------Connect to the cloudinary server to Store The images----------//


exports.getProductName = (req, res) => {
    res.render('Admin/addProduct')
}


//--------------------AddProduct---------------//
exports.postProduct = (req, res) => {
    console.log(req.body.ProductImg);
    const title = req.body.title
    const description = req.body.description
    const ProductImg = req.files.ProductImg
    const ProductPrice = req.body.ProductPrice
    const category = req.body.category
    cloudinary.uploader.upload(ProductImg.tempFilePath, (err, result) => {
        const ProductDetails = new ProductModel(
            {
                title: title,
                description: description,
                // I have added only result.url here
                ProductImg: result.url,
                // I have added only result.url here
                ProductPrice: ProductPrice,
                category: category
            })

        ProductDetails.save().then(result => {
            console.log("Product Addess", result)
            return res.status(200).json({
                status: true,
                message: "Product Fetched successfully",
                productdata: result
            })
        }).catch(err => {
            console.log(err)
            return res.status(401).json({
                status: false,
                message: "Not able to post Product "
            })
        })
    })
}
//--------------------AddProduct---------------//

//--------------------Get The Added Products---------------//
exports.getproductData = (req, res) => {
    ProductModel.find().then((product) => {
        console.log(product)
        return res.status(200).json({
            status: true,
            message: "Product Fetched successfully",
            productdata: product
        })
    }).catch((err) => {
        console.log(err)
        return res.status(401).json({
            status: false,
            message: "Not able to fetech Product "
        })
    })
}
//--------------------Get The Added Products---------------//

//--------------------Get The Edited Products---------------//
exports.getEditedProduct = (req, res) => {
    //To collect the product id form URL
    const pId = req.params.pId

    ProductModel.findById(pId).then((product) => {
        console.log(product)
        return res.status(200).json({
            status: true,
            message: "ProductData Fetched successfully",
            productdata: product
        })
    }).catch((err) => {
        console.log(err)
        return res.status(401).json({
            status: false,
            message: "Unsuccessful Attempt(getEditedProduct)"
        })
    })
}
//--------------------Get The Edited Products---------------//

//--------------------Product Edit---------------//

exports.postproductEdit = (req, res) => {
    const pId = req.params.pId
    const title = req.body.title
    const description = req.body.description
    const ProductImg = req.files.ProductImg
    const ProductPrice = req.body.ProductPrice
    const category=req.body.category

    cloudinary.uploader.upload(ProductImg.tempFilePath, (err, result) => {
        ProductModel.findByIdAndUpdate({_id:pId}).then(product => {
            if (product) {
                product.title = title
                product.description = description

                // I have added only result.url here
                product.ProductImg = result.url
                // I have added only result.url here

                product.ProductPrice = ProductPrice
                product.category = category
                return product.save().then(data => {
                    return res.status(200).json({
                        status: true,
                        message: "Product Edited successfully"
                    })
                }).catch(err => {
                    console.log("Data Not saved", err)
                    return res.status(401).json({
                        status: false,
                        message: " Post Product Edit Unsuccessfully"
                    })
                })
            }
            else {
                res.redirect('/getProductdata')
            }
        }).catch(err => {
            console.log(err)
            return res.status(500).json({
                status: false,
                message: "Internal Server error...Not all the fields are filled up..kindly check!"
            })
        })


    })

}
//--------------------Product Edit---------------//



//------------------Deleting The data----------------//
exports.productDelete = (req, res) => {
    const pId = req.params.pId
    ProductModel.deleteOne({ _id: pId }).then(result => {
        console.log("Product Delete sucessfully")
        return res.status(200).json({
            status: true,
            message: "Product Deleted successfully",
        })
    }).catch(err => {
        console.log(err)
        return res.status(401).json({
            status: false,
            message: "Unsuccessful Attempt(Delete)"
        })
    })
}
//------------------Deleting The data----------------//