const mongoose= require('mongoose');
const {Schema} = mongoose;

const bdSchema= new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    solicitud: String,
    mensaje: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports= mongoose.model(`pqrs`,bdSchema);
