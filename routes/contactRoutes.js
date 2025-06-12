const express=require('express');
const router=express();
const {getContacts,createContact,getContact,updateContact, deleteContact}=require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
//Get all contacts
router.route('/').get(getContacts)

//create contact
router.route('/').post(createContact)

//get a contact
router.route('/:id').get(getContact);

//update a contact
router.route('/:id').put(updateContact)

//delete a contact
router.route('/:id').delete(deleteContact)

module.exports= router;