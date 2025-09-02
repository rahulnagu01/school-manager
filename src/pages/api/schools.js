import { getConnection } from '../../lib/db';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = { api: { bodyParser: false } };

// Helper to always coerce a field to a plain value, not array
function getSingle(value) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    form.uploadDir = './public/schoolImages';
    form.keepExtensions = true;
    form.maxFileSize = 10 * 1024 * 1024;

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(400).json({ error: "Image upload error" });

      // Coerce all input fields to "simple" values
      const name = getSingle(fields.name);
      const address = getSingle(fields.address);
      const city = getSingle(fields.city);
      const state = getSingle(fields.state);
      const contact = getSingle(fields.contact);
      const email_id = getSingle(fields.email_id);

      // Handle file, whether single or in array
      let image = "";
      let fileObj = files?.image;
      if (Array.isArray(fileObj)) fileObj = fileObj[0];

      if (fileObj) {
        const filePath = fileObj.filepath || fileObj.path;
        const newFilename = `${Date.now()}_${fileObj.originalFilename || fileObj.name}`;
        const newPath = `./public/schoolImages/${newFilename}`;
        if (!filePath) {
          console.error("Filepath is undefined! fileObj=", fileObj);
          return res.status(400).json({ error: "File upload failed, no temp path." });
        }
        fs.renameSync(filePath, newPath);
        image = `/schoolImages/${newFilename}`;
      }

      try {
        const conn = await getConnection();
        await conn.execute(
          'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name, address, city, state, contact, image, email_id]
        );
        await conn.end();
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

  } else if (req.method === 'GET') {
    try {
      const conn = await getConnection();
      const [rows] = await conn.execute('SELECT id, name, address, city, image FROM schools');
      await conn.end();
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}