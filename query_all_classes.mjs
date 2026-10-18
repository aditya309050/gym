import https from 'https';

const query = encodeURIComponent(`*[_type == "page.class"]{
  _id,
  title,
  name,
  "slug": slug.current,
  lang,
  category->{title, name},
  "imageUrl": presentation.image.asset->url,
  "heroImageUrl": hero.image.asset->url,
  "cardImageUrl": card.image.asset->url
}[0..25]`);

const url = `https://z6ex5ahr.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;

https.get(url, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(d);
      console.log('Total classes returned:', parsed.result?.length);
      console.log(JSON.stringify(parsed.result, null, 2));
    } catch(e) {
      console.log('Error:', e.message);
    }
  });
}).on('error', e => console.error(e.message));
