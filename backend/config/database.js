const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
const connectDatabase= ()=>{
mongoose.connect('mongodb+srv://bett:19990303je@cluster0.okpp7ux.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully!');
})
.catch((err) => {
  console.log(`MongoDB connection error: ${err}`);
});
}
module.exports = connectDatabase