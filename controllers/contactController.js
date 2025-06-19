
const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");




/*@description Get all contacts
  route GET /api/contacts
  access private */
const getContacts=asyncHandler(async (req,res)=>{
    const contacts=await Contact.find({user_id: req.user.id});//user_id is passed ,so that contacts of that user only is shown
    res.status(200).json(contacts);
});

/*@description Create contacts
  route POST /api/contacts
  access private */
// for creating a new contact the request body should have name,email and phone
const createContact=asyncHandler(async (req,res)=>{
    console.log("The request body is " ,req.body);
    const {name,email,phone} =req.body;
    if(!name||!email||!phone)
    {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
      name,
      email,
      phone,
      user_id:req.user.id,
    });
    res.status(201).json(contact);
});

/*@description Get a contact
  route GET /api/contacts/:id
  access private */
const getContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
      res.status(404);
      throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

/*@description Update a contact
  route PUT /api/contacts/:id
  access private */
const updateContact=asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
      res.status(404);
      throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString()!=req.user.id)//toString() is done as contact.user_if is of type ObjectId
    {
      res.status(403);
      throw new Error("User do not have permission");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true }
    );
    res.status(200).json(updatedContact);
});

/*@description Delete a contact
  route DELETE /api/contacts/:id
  access private */
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if(contact.user_id.toString()!=req.user.id)
    {
      res.status(403);
      throw new Error("User do not have permission");
    }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Contact deleted successfully",
    id: req.params.id,
    deletedContact: contact,
  });
});
module.exports={getContacts,createContact,getContact,updateContact,deleteContact};