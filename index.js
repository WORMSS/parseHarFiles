/* eslint-disable @typescript-eslint/no-var-requires, no-undef */


const clipboardy = require('clipboardy');
require.extensions['.har'] = require.extensions['.json'];
const a = require('./localhost.har');
delete require.extensions['.har'];
const b = a.log.entries.filter((b) => b.request.url.includes('api/profile-data'));
const h = b
  .map(
    (c) =>
      `Request Time: ${c.startedDateTime}
Request URL: ${c.request.method} ${c.request.url}
Request Body: ${parse(c.request.postData)}
Response Status: ${c.response.status}
Response Body: ${parse(c.response.content)}
Cache Info: ${JSON.stringify(c.cache, null, 2)}
`,
  )
  .join('\r\n');

clipboardy.writeSync(h);
//require('fs').writeFileSync('./entries.txt', h, 'utf-8');

function parse(d) {
  try {
    if (!d || !d.text) {
      return '';
    }
    const parsed = JSON.parse(d.text);
    return JSON.stringify(parsed, null, 2);
  } catch (err) {
    console.log(err, d);
  }
}
