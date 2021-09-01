# Youtube Video Search by Codecs

> CLI to filter Youtube videos based on the desired Audio/Video Codec

# Requirements
* An API Key from Google Developers Console. You can get one [here](https://developers.google.com/youtube/v3/getting-started).
* `youtube-dl` installed. If you are on Linux: `snap install youtube-dl`

# Quick start

Pass in your `API_KEY` and your `QUERY` and you are good to go :).

By default it will filter videos that contain Surround Codecs. You can see the Codecs codes on this [page](https://gist.github.com/AgentOak/34d47c65b1d28829bb17c24c04a0096f).

```bash
git clone git@github.com:gugacavalieri/youtube-video-codec-search.git
[npm|yarn] install
env API_KEY=<> QUERY="Full Concert" [npm|yarn] run search
```

## Additional Parameters:

You can pass these as Environment Variables if you want. You can also look at the full [docs](https://developers.google.com/youtube/v3/docs/search/list)

| Name           | Description                                                  | Required | Default          |
| -------------- | ------------------------------------------------------------ | -------- | ---------------- |
| PAGE_TOKEN     | The `**pageToken**` parameter identifies a specific page in the result set that should be returned. | No       | `''`             |
| QUERY          | The `**q**` parameter specifies the query term to search for. | No       | `'full concert'` |
| API_KEY        | Youtube API Key                                              | Yes      | -                |
| MAX_RESULTS    | The `**maxResults**` parameter specifies the maximum number of items that should be returned in the result set. Acceptable values are `0` to `50`, inclusive. | No       | `50`             |
| TYPE           | The `**type**`  parameter restricts a search query to only retrieve a particular type of resource. The value is a comma-separated list of resource types. | No       | `'video'`        |
| VIDEO_DURATION | The `**videoDuration**` parameter filters video search results based on their duration. | No       | `'long'`         |

## Desired Codecs

If you want to narrow/broaden your search, you can tweak this line of code:

```js
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
```
