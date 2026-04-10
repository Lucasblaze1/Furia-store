function carregar(){
 fetch('/api/produtos')
 .then(r=>r.json())
 .then(data=>{
  let html='';
  data.forEach(p=>{
   html+=`${p.nome} - R$${p.preco} <button onclick="rem(${p.id})">X</button><br>`;
  });
  lista.innerHTML=html;
 });
}

function add(){
 fetch('/api/produtos',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body: JSON.stringify({
   id: Date.now(),
   nome: nome.value,
   preco: preco.value
  })
 }).then(()=>carregar());
}

function rem(id){
 fetch('/api/produtos/'+id,{method:'DELETE'})
 .then(()=>carregar());
}

carregar();