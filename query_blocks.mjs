import https from 'https';

const query = encodeURIComponent(`*[_type == "page.home" && lang == "en"][0]{
  blocks[]{
    _type,
    internalName,
    title,
    classes[]{
      ...,
      "resolved": *[_id == ^._ref][0]{
        title,
        name,
        slug,
        image{asset->{url}},
        category->{name, title}
      }
    },
    ...
  }
}`);

const url = `https://z6ex5ahr.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;

https.get(url, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(d);
      const blocks = parsed.result?.blocks || [];
      console.log('Total blocks in home page:', blocks.length);
      blocks.forEach((b, i) => {
        console.log(`Block ${i}: ${b._type} (${b.internalName || b.title || 'no name'})`);
      });
      // Save blocks to file for inspection
      import('fs').then(fs => {
        fs.writeFileSync('sanity_home_blocks.json', JSON.stringify(blocks, null, 2));
        console.log('Saved sanity_home_blocks.json');
      });
    } catch(e) {
      console.log('Error:', e.message);
    }
  });
}).on('error', e => console.error(e.message));
