const MONGODB_URI = "mongodb+srv://addverb_user:addverb_password@addverb-clean-city.g3gqa.mongodb.net/clean_city?retryWrites=true&w=majority";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = { MONGODB_URI, JWT_SECRET_KEY };
