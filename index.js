/* eslint-disable no-console */
const async = require('async');
const axios = require('axios');
const YoutubeDlWrap = require('youtube-dl-wrap');

// Init an instance with a given binary path.
// If none is provided "youtube-dl" will be used as command.
const youtubeDlWrap = new YoutubeDlWrap();

/**
 * Youtube Surround Codes Lookup table
 */
const DESIRED_CODEC_CODES = {
  // uncomment these lines to look for other codecs as well
  // 141: 'AAC_STEREO_256_KBPS',
  // 251: 'OPUS_STEREO_160_KBPS',
  258: 'AAC_SURROUND_384_KBPS',
  256: 'AAC_SURROUND_192_KBPS',
  327: 'AAC_SURROUND_256_KBPS',
  338: 'WEBM_QUAD_480_KBPS',
};

const isSurroundFormat = (format) => DESIRED_CODEC_CODES[format.format_id] !== undefined;

/**
 * Method to get a Youtube Video Metadata using `youtube-dl`
 * @param {Object} video
 * @returns {Object} Video Metadata
 */
const getVideoInfo = async (video) => {
  const requestUrl = `https://youtube.com/watch?v=${video.id.videoId}`;
  console.log('Calling youtube-dl to get metadata:', requestUrl, '| Title:', video.snippet.title);
  const metadata = await youtubeDlWrap.getVideoInfo(requestUrl);

  const surroundFormat = metadata.formats.find(isSurroundFormat);
  if (surroundFormat) {
    console.log('Found Surround video!', video.snippet.title, ' | Format:', DESIRED_CODEC_CODES[surroundFormat.format_id]);
    console.log(video);
  }
  return metadata;
};

/**
 * main function! This is our entrypoint :)
 */
const main = async () => {
  const params = {
    pageToken: process.env.PAGE_TOKEN || '',
    q: process.env.QUERY || 'Full Concert',
    key: process.env.API_KEY,
    maxResults: process.env.MAX_RESULTS || 50,
    type: process.env.TYPE || 'video',
    part: process.env.PART || 'snippet',
    videoDuration: process.env.VIDEO_DURATION || 'long',
  };

  const requestUrl = 'https://youtube.googleapis.com/youtube/v3/search';
  axios.get(requestUrl, { params })
    .then(async (videos) => {
      const { nextPageToken, items } = videos.data;
      console.log(`Found ${items.length} videos!`);
      console.log('Next page Token:', nextPageToken);
      async.eachOfLimit(items, 5, getVideoInfo);
    })
    .catch(console.error);
};

main();
