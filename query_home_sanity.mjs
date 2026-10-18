import https from 'https';

const query = encodeURIComponent(`*[_type in ["page.home", "page.class", "category.class"]][0..15]{
  _type,
  title,
  name,
  slug,
  hero,
  classes,
  classesShowcase,
  "imageUrl": hero.image.asset->url
}`);
const url = `https://z6ex5ahr.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;

https.get(url, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(d);
      console.log('Results:');
      console.log(JSON.stringify(parsed.result, null, 2).slice(0, 4000));
    } catch(e) {
      console.log('Error:', e.message);
    }
  });
}).on('error', e => console.error(e.message));
