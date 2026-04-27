(async ()=>{
  try {
    const res = await fetch('http://localhost:5001/api/colleges');
    console.log('status', res.status);
    const text = await res.text();
    console.log(text);
  } catch (e) {
    console.error(e);
  }
})();
