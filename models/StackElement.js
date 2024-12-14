// Define a schema for the stack elements
const StackElementSchema = new mongoose.Schema({
    location: Number,
    value: String,
});


module.exports = mongoose.model('StackElement', StackElementSchema);