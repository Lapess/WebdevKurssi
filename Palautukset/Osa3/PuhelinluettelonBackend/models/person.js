const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("Connecting to database");
mongoose
  .connect(url)
  .then(() => {
    console.log("connection established to database succesfully");
  })
  .catch((error) => {
    console.log("Error occured while connecting to database: ", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: (val) => {
        if (val.length >= 8) {
          let count = 0;
          for (let i = 0; i < val.length; i++) {
            if (val[i] === "-") {
              count++;
            }
          }
          if (count !== 1) {
            return false;
          } else {
            const valparts = val.split("-");
            if (valparts[0].length > 3 || valparts[0].length < 2) {
              return false;
            } else {
              return true;
            }
          }
        } else {
          return false;
        }
      },
      message: (number) =>
        `${number.value} is in invalid. number must be atleast 8 characters long and in xx-xxxxx or xxx-xxxx format`,
    },
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", contactSchema);
