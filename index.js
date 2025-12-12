import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req,res)=>{
  res.send('<form action="/proxy"><input name="url" placeholder="https://example.com"><button>Go</button></form>');
});

app.get('/proxy', async (req,res)=>{
  const url = req.query.url;
  if(!url) return res.send("No URL");
  try{
    const r = await fetch(url);
    const text = await r.text();
    res.send(text);
  }catch(e){
    res.send("Error: "+e.toString());
  }
});

app.listen(PORT, ()=>console.log("Proxy running on "+PORT));
