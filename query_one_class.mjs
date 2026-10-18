import https from 'https';

const query = encodeURIComponent(`*[_type == "page.class"][0]`);
const url = `https://z6ex5ahr.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;

https.get(url, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      console.log(JSON.stringify(JSON.parse(d).result, null, 2));
    } catch(e) {
      console.log('Error:', e.message);
    }
  });
}).on('error', e => console.error(e.message));
