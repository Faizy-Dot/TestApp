import mongoose from "mongoose"

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String,required : true  },
        email: { type: String ,unique : true, required : true },
        password: { type: String , requried : true},
      
    }, {
    timestamps: true
}
)

const UserModal = mongoose.model("users", userSchema)

export default UserModal;