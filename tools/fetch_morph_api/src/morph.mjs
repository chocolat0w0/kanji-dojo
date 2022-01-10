import fetch from 'node-fetch';

const data = {
  app_id: '7dcdb0e68b1ab28f8c77534c4dc4f041b6fdc78b7f39a42a7d6071492b52d057',
  sentence: '漢字が混ざっている文章。',
  info_filter: 'form|read',
};

fetch('https://labs.goo.ne.jp/api/morph', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data.word_list[0]);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
