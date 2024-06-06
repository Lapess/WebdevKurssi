const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://lassivauhkala:${password}@webdevkurssi1.d5ok24i.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=WebdevKurssi1`;

mongoose.set("strictQuery", false);
mongoose.connect(url);
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length >= 5) {
  const nameToAdd = process.argv[3];
  const numberToAdd = process.argv[4];

  const contact = new Contact({
    name: nameToAdd,
    number: numberToAdd,
  });
  console.log(numberToAdd);

  contact.save().then((result) => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact);
    });
    mongoose.connection.close();
  });
}
