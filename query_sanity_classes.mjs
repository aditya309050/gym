import https from 'https';

// Query Sanity for classes and home page sections
const query = encodeURIComponent(`*[_type in ["class", "classes", "home", "club", "fitnessHub"]]{
  _type,
  title,
  name,
  slug,
  subtitle,
  category,
  "imageUrl": image.asset->url
}`);

const url = `https://z6ex5ahr.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;

https.get(url, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(d);
      console.log('Sanity items count:', parsed.result?.length);
      console.log(JSON.stringify(parsed.result, null, 2).slice(0, 4000));
    } catch(e) {
      console.log('Error parsing:', e.message);
    }
  });
}).on('error', e => console.error(e.message));
