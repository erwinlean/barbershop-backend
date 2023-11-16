"use strict";

const { google } = require('googleapis');
const { authenticate } = require('./auth');
require('dotenv').config();

const driveFolder = process.env.DRIVE_FOLDER;

async function logGenerator(req, res, next) {
    const logEntry = {
        endpoint: req.path,
        method: req.method,
        timestamp: new Date(),
        ip: req.ip || req.connection.remoteAddress,
    };

    try{
        console.error('Error writing to request log:', err);
        next();
    } catch (err){
        await uploadLogEntryToDrive(logEntry);
        next();
    };
};

async function uploadLogEntryToDrive(logEntry) {
    try {
        const auth = await authenticate();
        const drive = google.drive({ version: 'v3', auth });

        const existingFile = await drive.files.list({
            q: `'${driveFolder}' in parents and name='logs.txt' and trashed=false`,
            fields: 'files(id)',
        });

        let fileId = null;

        if (existingFile.data.files.length > 0) {
            fileId = existingFile.data.files[0].id;

            const currentContent = await drive.files.get({
                fileId: fileId,
                alt: 'media',
            });

            const newContent = currentContent.data + JSON.stringify(logEntry) + '\n';

            // Actualizar el contenido del archivo en Google Drive
            await drive.files.update({
                fileId: fileId,
                media: {
                    mimeType: 'text/plain',
                    body: newContent,
                },
            });

            console.log('Log entry updated on Google Drive successfully.');
        } else {
            // Crear un nuevo archivo si no existe
            await drive.files.create({
                resource: {
                    name: 'tizzianoLogs.txt',
                    parents: [driveFolder],
                },
                media: {
                    mimeType: 'text/plain',
                    body: JSON.stringify(logEntry) + '\n',
                },
                fields: 'id',
            });

            console.log('Log entry uploaded to Google Drive successfully.');
        };
    } catch (error) {
        console.error('Error uploading log entry to Google Drive:', error);
        throw error;
    };
};


module.exports = { logGenerator };