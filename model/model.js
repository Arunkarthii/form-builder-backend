const mongoose = require('mongoose')

module.exports = mongoose.model(
    'mock_data',
    new mongoose.Schema({
        templateTitle: String,
        form: [
            {
                title: String,
                placeHolder: String,
                type: { type: String },
            }
        ],
        isDeleted: { type: Boolean, default: false },
    }, {
        timestamps: true, versionKey: false
    }),
    'mock_data'
)