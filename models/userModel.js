const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please add a user name"],
    },
    email: {
        type: String,
        required: [true,"Please add a user email ID"],
        unique: [true,"Email Address already taken"],//this ensures unique email address used for distinguishing user
    },
    password: {
        type: String,
        required: [true,"Please add the user password"],
    }
},{
    timestamps: true,
});

module.exports=mongoose.model("User",userSchema);