const BASE = {10:399,15:449,20:529,30:699,40:849};
const DAYS_ADD = {7:0,10:25,14:60};

function calcTotal(size, days, extraWeight, permit){
  let t = BASE[size] || 529;
  t += DAYS_ADD[days] || 0;
  if(extraWeight) t += 75;
  if(permit) t += 50;
  return t;
}
function agency(size){ return 800 + (BASE[size]||529); }
function freelancer(size){ return Math.round((BASE[size]||529)*1.35); }

function bindCalc(){
  const root = document.getElementById('calculator-section');
  if(!root) return;
  const state = {size:20, days:7, extra:false, permit:false};
  const set = () => {
    root.querySelectorAll('[data-size]').forEach(el=>el.classList.toggle('on', +el.dataset.size===state.size));
    root.querySelectorAll('[data-days]').forEach(el=>el.classList.toggle('on', +el.dataset.days===state.days));
    root.querySelectorAll('[data-extra]').forEach(el=>el.classList.toggle('on', state.extra));
    root.querySelectorAll('[data-permit]').forEach(el=>el.classList.toggle('on', state.permit));
    const you = calcTotal(state.size,state.days,state.extra,state.permit);
    root.querySelector('#you-price').textContent = '$'+you.toLocaleString();
    root.querySelector('#ag-price').textContent = '$'+agency(state.size).toLocaleString();
    root.querySelector('#fr-price').textContent = '$'+freelancer(state.size).toLocaleString();
    root.querySelector('#size-val').textContent = state.size;
    sessionStorage.setItem('bd-quote', JSON.stringify({...state, you}));
  };
  root.querySelectorAll('[data-size]').forEach(el=>el.onclick=()=>{state.size=+el.dataset.size;set();});
  root.querySelectorAll('[data-days]').forEach(el=>el.onclick=()=>{state.days=+el.dataset.days;set();});
  root.querySelectorAll('[data-extra]').forEach(el=>el.onclick=()=>{state.extra=!state.extra;set();});
  root.querySelectorAll('[data-permit]').forEach(el=>el.onclick=()=>{state.permit=!state.permit;set();});
  set();
}

function addToCart(size){
  const days = 7;
  const you = calcTotal(size,days,false,false);
  const cart = {size, days, extra:false, permit:false, you};
  sessionStorage.setItem('bd-cart', JSON.stringify(cart));
  location.href = 'cart.html';
}

function renderCart(){
  const el = document.getElementById('cart-body');
  if(!el) return;
  const cart = JSON.parse(sessionStorage.getItem('bd-cart')||sessionStorage.getItem('bd-quote')||'null');
  if(!cart){ el.innerHTML = '<p>Your cart is empty. <a href="sizes.html">View dumpster sizes</a>.</p>'; return; }
  el.innerHTML = `<div class="card"><h3>${cart.size} Yard Dumpster</h3>
    <p class="muted">${cart.days}-day rental period. Flat-rate pricing.</p>
    <p><b>$${cart.you.toLocaleString()}</b></p>
    <div class="row"><a class="btn btn-yellow" href="checkout.html">Continue to checkout</a>
    <a class="btn btn-ghost" href="sizes.html">Change size</a></div></div>`;
}

function submitCheckout(e){
  e.preventDefault();
  sessionStorage.setItem('bd-order','ok');
  location.href='success.html';
}

if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}
document.addEventListener('DOMContentLoaded',()=>{bindCalc();renderCart();});
