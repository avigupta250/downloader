import { exec } from 'child_process';
import ytdl from 'ytdl-core';
import path from 'path';
import fs from 'fs';
// import { getVideoInfo } from '../services/youtubeService';

export async function downloadController(req, res) {
    try {
        const { url } = req.body;

      
        if (!url) {
            return res.status(400).json({ error: 'YouTube URL is required' });
        }
       

        const outputPath = path.resolve('output.mp4'); // Use absolute path for clarity

        // Download and merge video + audio
        await downloadVideoWithYT_DLP(url, outputPath);

        // Stream the file to the client
        if (fs.existsSync(outputPath)) {
            res.setHeader('Content-Disposition', `attachment; filename="video.mp4"`);
            res.setHeader('Content-Type', 'video/mp4');

            const readStream = fs.createReadStream(outputPath);
            readStream.pipe(res).on('close', () => {
                fs.unlinkSync(outputPath); // Cleanup: Remove the file after sending
            });
        } else {
            res.status(500).json({ error: 'File not found. Failed to download video.' });
        }
    } catch (error) {
        console.error('Error downloading video:', error);
        res.status(500).json({ error: 'Failed to download video', details: error.message });
    }
}

function downloadVideoWithYT_DLP(url, outputPath) {
    return new Promise((resolve, reject) => {
        // Command to download and merge video + audio into a single MP4 file
        const command = `yt-dlp -v -f bestvideo+bestaudio --merge-output-format mp4 -o "${outputPath}" ${url}`;
        console.log('Executing command:', command);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('yt-dlp error:', stderr);
                return reject(`Error: ${stderr}`);
            }
            console.log('yt-dlp output:', stdout);
            resolve(stdout);
        });
    });
}
