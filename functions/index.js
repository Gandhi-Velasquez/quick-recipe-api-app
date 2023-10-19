const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: true }));

async function load(req, res) {
  res.json('Welcome to the recipie site!');
}

async function getData(req, res) {
  try {
    let response = await axios.get('https://www.simplyrecipes.com/quick-dinner-recipes-5091422');

    let articles = []

    let html = response.data;
    let $ = cheerio.load(html);

    $('a[id^="mntl-card-list-items"]').each((index, element) => {
      const url = $(element).attr('href');
      const title = $(element).find('.card__content .card__title .card__title-text').text();
      const imgSrc = $(element).find('.loc.card__top .card__media img').attr('data-src');

      articles.push({
        title,
        url,
        img: imgSrc || ''
      });
    });

    res.json(articles);
  } catch (e) {
    console.error('Error fetching data:', e);
    res.status(500).json({ e: 'Internal Server Error' });
  }
}

async function getRecipieData(req, res) {
  try {
    let recipie = null
    const id = req.params.id
    const url = req.query.url
    let response = await axios.get(url);

    let html = response.data;
    let $ = cheerio.load(html);

    const ingredientsSection = $(`section[id^="section--ingredients"]`);

    const contentDiv = ingredientsSection.find('.loc.section__content');
    
    const ingredientLists = contentDiv.find('div[id^="structured-ingredients"] ul');

    const ingredientsData = [];

    ingredientLists.each((index, ulElement) => {
      const lis = $(ulElement).find('li');
    
      const ingredientList = lis.map((liIndex, liElement) => $(liElement).text()).get();
      ingredientsData.push(ingredientList);
    });

    const ingredients = [...ingredientsData.flat()];

    // const ingredients = ingredientLists.map((index, element) => $(element).text()).get();

    const recipe = {
      ingredients: ingredients,
    };
    res.json(recipe);
  } catch (e) {
    console.error('Error fetching recipie data:', e);
    res.status(500).json({ e: 'Internal Server Error' });
  }
}

app.get('/', load);
app.get('/recipes', getData);
app.get('/recipes/:id', getRecipieData);

//app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));

const api = express()
api.use(cors({ origin: true }))

api.set('etag', false)
app.set('etag', false)

api.use('/api', app)

api.listen(PORT, () => console.log(`Server Listening on PORT ${PORT}`))