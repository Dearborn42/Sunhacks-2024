import bcrypt from 'bcrypt';
import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema({
    email:{
        required: true,
        type: String,
        unique: true,
    },
    password:{
        required: true,
        type: String,
    },
    name: {
        type: String,
        required: true,
        validate:{
            validator: (value)=>{return value.split(" ").length == 2 || value.split(" ").length == 3},
        }
    },
    userName:{
        required: true,
        type: String,
        unique: true,
    },
    skills:{
        required: true,
        type: Array,
        default: [],
    },
    pastWorks:{
        required: true,
        type: Array,
        default: [],
        validate:{
            validator: (value)=>{
                if(typeof value.link == "string" && value.link.length > 0){
                    if(value.rating >= 0 && value.rating <=5){
                        return true;
                    }
                }
            },
        }
    },
    credits:{
        type: Number,
        default: 3
    },
    averageRating:{
        type: Number,
        default: 3
    }
}, { collection: 'Accounts'});


accountSchema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

accountSchema.pre("save", function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const Account = mongoose.model('Account', accountSchema);

export default Account;