import ytdl from 'ytdl-core';

export async function getVideoInfo(url) {
  try {
      return await ytdl.getInfo(url);
  } catch (error) {
      console.error('Error fetching video info:', error.message);
      throw new Error('Failed to get video information');
  }
}

export async function downloadVideo(url, res) {
  try {
      const stream = ytdl(url, {
          quality: 'highest',
          filter: 'videoandaudio',
      });

      stream.on('info', () => console.log('Streaming started'));
      stream.on('end', () => console.log('Streaming completed'));
      stream.on('error', (err) => console.error('Streaming error:', err.message));

      stream.pipe(res);

      return new Promise((resolve, reject) => {
          stream.on('end', resolve);
          stream.on('error', reject);
      });
  } catch (error) {
      console.error('Error downloading video:', error.message);
      throw new Error('Failed to download video');
  }
}


// export async function downloadVideo(url, res) {
//   try {
//     const stream = ytdl(url, {
//       quality: 'highest',
//       filter: 'videoandaudio'
//     });
    
//     stream.pipe(res);
    
//     return new Promise((resolve, reject) => {
//       stream.on('end', resolve);
//       stream.on('error', reject);
//     });
//   } catch (error) {
//     throw new Error('Failed to download video');
//   }
// }