const express = require('express');
const authController = require('../Controller/AuthController')
const router = express.Router();
const { check, body } = require('express-validator')




// router.get('/home', (request, response) => {
//     response.setHeader('Content-Type', 'text/html');
//     response.write('<h1>Welcome</h1>')
//     response.end();
// })

// router.get('/myForm', (request, response) => {
//     response.setHeader('Content-Type', 'text/html')
//     response.write('<form action="/postForm" method="post">')
//     response.write('<label for="fname">First name:</label><br><input type="text" id="fname" name="firstname" ><br>')
//     response.write('<label for="lname">Last name:</label><br><input type="text" id="lname" name="lastname"><br>')
//     response.write('<input type="submit" value="Submit">')
//     response.write('</form>')
//     response.end();
// })

// router.post('/postForm', (request, response) => {
//     const fname = request.body.firstname;
//     const lname = request.body.lastname;
//     console.log(fname, lname);
// })


router.post('/postForm', authController.postRegister)
router.post('/postLogin', authController.postLogin)

// router.post('/register', [
//     body('firstname', 'Valid first name here').isLength({ min: 3 }),
//     body('lastname', 'Valid last name here').isLength({ min: 3 }),
//     check('email').isEmail().withMessage("Input valid email"),
//     body('password', 'Enter valid password').isLength({ min: 3, max: 6 })
// ], authController.postRegister)


module.exports = router;