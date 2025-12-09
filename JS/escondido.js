(() => {
  const MESSAGES = {
    mensagem: [
      "Vocês sempre irão fazer parte de minha história.",
      "Sou grata a Deus pela existência de vocês☺️.",
      "A gratidão transforma o pouco em suficiente.",
      "Seja mais gentil consigo mesmo.",
      "Errar todos erra, agora a forma que irá lidar com esse erro é o que te torna diferente.",
      "Vocês fazem parte do grupinho de professores que entraram na minha vida e se tornaram professores especiais (no grupo contando com vcs, agora tem 5 professores e eu não esquecerei de nenhum)."
    ],
    conselho: [
      "Se estiver em dúvida, escolha a decisão que deixe seu coração e sua mente em paz.",
      "Mesmo quando tudo parece um caos, ainda havera uma saida, as vezes ficamos tão imersos na dor que não nos permitimos enxergar a saída.",
      "Tem coisas que não acontece em nossas vidas não porq a vida está contra nós, mas por livramento.",
      "Enfrentar seus problemas/medo é dificil, mas é o que vai te deixar mais forte.",
      "Trate as pessoas da forma que gostaria de ser tratado.",
      "A mente sustenta o que o corpo não alcança"
    ],
    algo: [
      "Seu dedo indicador trabalha mais do que imagina.",
      "Quero ser monitoraa, quando tiver vaga me avisem, sou desatenta.😔",
      "Existe um polvo segurando uma xícara em algum emoji.",
      "Seu cérebro adora pequenas surpresas.",
      "A chance de você esquecer algo importante hoje é baixa, mas real.",
      "Fica tranquilos que não tem chances de eu esquecer de vocês, só se eu bater a cabeça e perder a memoria.",
    ]
  };

  const cat = document.getElementById('cat');
  const btnGen = document.getElementById('btnGen');
  const display = document.getElementById('display');
  const textEl = document.getElementById('text');
  const btnNext = document.getElementById('btnNext');
  const btnCopy = document.getElementById('btnCopy');
  const btnFav = document.getElementById('btnFav');
  const historyEl = document.getElementById('history');
  const favListEl = document.getElementById('favList');
  const btnShowFav = document.getElementById('btnShowFav');
  const btnClearFav = document.getElementById('btnClearFav');
  const emojiLayer = document.getElementById('emojiLayer');

  let last = '';
  const sessionHistory = [];
  const EMOJIS = ['✨', '🌟', '🤪', '😄', '🎯', '💬', '🍪'];

  const FAV_KEY = 'frases_favoritas_bel_v1';
  function loadFavs() { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); }
  function saveFavs(arr) { localStorage.setItem(FAV_KEY, JSON.stringify(arr)); }

  function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function generate(category) {
    const pool = MESSAGES[category];
    let candidate;
    for (let i = 0; i < 5; i++) {
      candidate = randomFrom(pool);
      if (candidate !== last) break;
    }
    last = candidate;
    sessionHistory.unshift(candidate);
    if (sessionHistory.length > 6) sessionHistory.pop();
    updateHistory();
    showTyping(candidate);
    burstEmojis();
  }

  function updateHistory() {
    if (sessionHistory.length === 0) {
      historyEl.textContent = 'Nenhuma geração ainda.';
      return;
    }
    historyEl.innerHTML = sessionHistory.map(s => `• ${s}`).join('<br>');
  }

  let typingTimer;
  function showTyping(str) {
    if (typingTimer) clearInterval(typingTimer);
    textEl.textContent = '';
    const chars = [...str];
    let i = 0;
    typingTimer = setInterval(() => {
      textEl.textContent += chars[i++] || '';
      if (i >= chars.length) clearInterval(typingTimer);
    }, 28);
  }

  async function copyText() {
    await navigator.clipboard.writeText(textEl.textContent);
    flash('Copiado!');
  }

  function speakText() {
    const u = new SpeechSynthesisUtterance(textEl.textContent);
    u.lang = 'pt-BR';
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  function toggleFav() {
    const cur = textEl.textContent.trim();
    if (!cur) return;
    const favs = loadFavs();
    const idx = favs.indexOf(cur);
    if (idx >= 0) {
      favs.splice(idx, 1);
      flash('Removido das favoritas');
    } else {
      favs.unshift(cur);
      flash('Favoritada!');
    }
    saveFavs(favs);
    renderFavs();
  }

  function renderFavs() {
    const favs = loadFavs();
    if (favs.length === 0) {
      favListEl.textContent = 'Nenhuma favorita ainda.';
      return;
    }
    favListEl.innerHTML = favs.map((f, i) => `
      <div class="fav-item">
        ${f}
        <button data-i="${i}" data-act="use" class="small">Usar</button>
        <button data-i="${i}" data-act="del" class="small">X</button>
      </div>
    `).join('');
  }

  function flash(msg) {
    const el = document.createElement('div');
    el.textContent = msg;
    Object.assign(el.style, {
      position: 'fixed', bottom: '18px', right: '18px', padding: '10px 14px',
      background: '#111827', borderRadius: '10px', boxShadow: '0 6px 20px rgba(0,0,0,0.4)'
    });
    document.body.append(el);
    setTimeout(() => el.style.opacity = '0', 1200);
    setTimeout(() => el.remove(), 2000);
  }

  function burstEmojis() {
    for (let i = 0; i < 8; i++) {
      const e = document.createElement('div');
      e.className = 'emoji';
      e.textContent = randomFrom(EMOJIS);
      e.style.left = 20 + Math.random() * 60 + '%';
      e.style.top = (60 + Math.random() * 30) + '%';
      emojiLayer.appendChild(e);
      setTimeout(() => e.remove(), 2000);
    }
  }

  btnGen.onclick = () => generate(cat.value);
  btnNext.onclick = () => generate(cat.value);
  btnCopy.onclick = copyText;
  btnFav.onclick = toggleFav;

  btnShowFav.onclick = () => {
    const favs = loadFavs();
    if (favs.length) showTyping(randomFrom(favs));
  };

  btnClearFav.onclick = () => {
    localStorage.removeItem(FAV_KEY);
    renderFavs();
    flash('Favoritas limpas.');
  };

  favListEl.onclick = e => {
    const btn = e.target;
    if (btn.tagName !== 'BUTTON') return;
    const i = +btn.dataset.i;
    const act = btn.dataset.act;
    const favs = loadFavs();
    if (act === 'use') {
      showTyping(favs[i]);
    } else if (act === 'del') {
      favs.splice(i, 1);
      saveFavs(favs);
      renderFavs();
    }
  };

  renderFavs();
})();