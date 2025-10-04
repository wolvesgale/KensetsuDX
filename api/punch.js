// /api/punch.js  (Node 18+)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method not allowed' });

  const GAS_URL = 'https://script.google.com/macros/s/AKfycbxLfhnrt9N2kV7UW4RGFuRhg3jzTCngBStcK7RA9XJis1gm78For6sirNhijiSxwlhG5Q/exec'; // ← あなたの GAS /exec

  try{
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // サーバー側から GAS に転送（ブラウザ → Vercel → GAS）
    const r = await fetch(GAS_URL, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(body)
    });

    const data = await r.json().catch(()=>({ ok:false, error:'Bad JSON from GAS' }));
    res.status(r.status).json(data);

  }catch(e){
    res.status(500).json({ ok:false, error:String(e) });
  }
}
