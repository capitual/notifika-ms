import mongoose from "mongoose"

const NotificationSchema = new mongoose.Schema({
    user: { type: Number,  require: true },
    key: {type: String, require: true },
    values: { type: Object, required: true },
    args: { type: Object },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
})

export = mongoose.model('Notification', NotificationSchema)