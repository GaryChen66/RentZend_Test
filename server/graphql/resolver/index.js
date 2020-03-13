const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { createWriteStream } = require("fs");
const Application = require("../../models/application.model");

const applications = async () => {
  try {
    const applications = await Application.find().sort({createdAt: -1});
    return applications.map(application => application.transform());
  } catch (err) {
    throw err;
  }
} 

const submitApplication = async (args) => {
  try {
    let document = null;
    console.log(args);
    if (args.input.file) {
      
      const { filename, mimetype, createReadStream } = await args.input.file.file;
      const filepath = uuidv4() + path.extname(filename);
      await createReadStream().pipe(
        createWriteStream(path.join(__dirname, '../../public/files', filepath))
      );
      
      document = {
        name: filename,
        path: filepath,
        mimetype: mimetype
      };
    }

    const application = Application(args.input);
    if (document) {
      application.document = document;
    }

    const savedApplication = await application.save();
    return savedApplication.transform();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { applications, submitApplication };
