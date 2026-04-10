const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// LOGIN
app.post('/api/login', (req, res) => {
  const admin = JSON.parse(fs.readFileSync('./data/admin.json'));
  if(req.body.user == admin.user && req.body.senha == admin.senha){
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
});

// PRODUTOS
app.get('/api/produtos', (req, res) => {
  const produtos = JSON.parse(fs.readFileSync('./data/produtos.json'));
  res.json(produtos);
});

app.post('/api/produtos', (req, res) => {
  let produtos = JSON.parse(fs.readFileSync('./data/produtos.json'));
  produtos.push(req.body);
  fs.writeFileSync('./data/produtos.json', JSON.stringify(produtos));
  res.json({ ok: true });
});

app.delete('/api/produtos/:id', (req, res) => {
  let produtos = JSON.parse(fs.readFileSync('./data/produtos.json'));
  produtos = produtos.filter(p => p.id != req.params.id);
  fs.writeFileSync('./data/produtos.json', JSON.stringify(produtos));
  res.json({ ok: true });
});

app.listen(process.env.PORT || 3000, () => console.log("Rodando 🚀"));
