/* ===========================================
   总览页:分页导航 + 详情渲染(学术笔记本风格)
   =========================================== */
const app = document.getElementById('app');

/* ---------- 封面页 ---------- */
function renderCover() {
  const cards = CHARTS.map(c => `
    <div class="card" data-go="${c.id}">
      <div class="card-num">
        <span>№ ${c.num}</span>
        <span class="card-tech">${c.tech}</span>
      </div>
      <div class="card-title">${c.title}</div>
      <div class="card-en">${c.en}</div>
      <div class="card-desc">${c.short}</div>
      <div class="card-tag">
        <span>${c.tagline}</span>
        <span class="card-arrow">→</span>
      </div>
    </div>
  `).join('');

  return `
    <div class="cover">
      <div class="cover-eyebrow">A Field Guide · 调研手册</div>
      <h1>可视化的<br/><em>二十二种</em>姿态</h1>
      <p class="cover-lede">
        系统整理 <strong>22 类</strong>专业级可视化图表,从基础的桑基、箱线、河流,
        到复杂的降维、知识图谱、DTW。每一种都配有<strong>可交互的实例</strong>、
        原理说明、适用场景与二次创作的思路。
        点击任意卡片进入详情,或用底部翻页依次研读。
      </p>
    </div>

    <div class="section-title">全部图表 · The Atlas</div>
    <div class="grid">${cards}</div>

    <div class="tech-overview">
      <h3>技术栈 · Toolkit</h3>
      <div class="tech-grid">
        <div class="tech-item">
          <strong>ECharts</strong>
          Apache 顶级项目,声明式 API,内置桑基 / 箱线 / 热力 / 弦图等高级类型。
        </div>
        <div class="tech-item">
          <strong>D3.js</strong>
          可视化的"瑞士军刀",低层 SVG/Canvas 操控,自由度最高,适合定制图表。
        </div>
        <div class="tech-item">
          <strong>Plotly</strong>
          Python / JS 双栈,科学计算友好,降维图与 3D 散点的首选。
        </div>
        <div class="tech-item">
          <strong>Cytoscape.js</strong>
          专为图理论设计,内置布局算法 / 最短路径 / 聚类,知识图谱利器。
        </div>
        <div class="tech-item">
          <strong>wordcloud2.js</strong>
          纯 JS 词云布局,支持自定义形状 mask 与配色映射。
        </div>
        <div class="tech-item">
          <strong>React / Vue</strong>
          组件化封装上述库,把图表做成可复用的工程化产品。
        </div>
      </div>
    </div>
  `;
}

/* ---------- 详情页 ---------- */
function renderDetail(chart) {
  const idx = CHARTS.findIndex(c => c.id === chart.id);
  const scenes = chart.scenes.map(s => `<li>${s}</li>`).join('');
  const remix = chart.remix.map(s => `<li>${s}</li>`).join('');

  return `
    <div class="detail-header">
      <div>
        <h2>${chart.title}<br/><em>${chart.en}</em></h2>
        <div class="en">第 ${idx + 1} 篇,共 ${CHARTS.length} 篇</div>
        <div class="detail-meta">CHAPTER ${chart.num} / 22 · ${chart.tech}</div>
      </div>
      <div class="tech-badge">${chart.tech}</div>
    </div>

    <div class="layout">
      <div>
        <div class="chart-box">
          <div class="chart-toolbar">
            <a class="btn" href="./${chart.id}/index.html" target="_blank">全屏打开 ↗</a>
            <button class="btn" onclick="location.reload()">重新加载 ↻</button>
          </div>
          <div id="chart-mount" class="chart-inner"></div>
        </div>

        <div class="info-block" style="margin-top: 32px;">
          <h3>实现方式 · How it's made</h3>
          <p>${chart.how}</p>
          <div class="code">📄 ${chart.id}/index.html — 双击即可打开,依赖通过 CDN 加载</div>
          <div class="howto-note">每种图表都内置了 2-3 组真实场景的示例数据,可在页面内切换观察不同数据下的表现。</div>
        </div>
      </div>

      <div class="info-panel">
        <div class="info-block">
          <h3>这是什么图 · What</h3>
          <p>${chart.what}</p>
        </div>
        <div class="info-block">
          <h3>适用场景 · Where</h3>
          <ul>${scenes}</ul>
        </div>
        <div class="info-block">
          <h3>二创思路 · Remix</h3>
          <ul>${remix}</ul>
        </div>
        <div class="info-block">
          <h3>推荐技术栈 · Stack</h3>
          <ul>
            <li>主框架:<strong>${chart.tech}</strong></li>
            <li>封装:<strong>React / Vue 组件</strong></li>
            <li>数据流:<strong>axios + Pinia / Redux</strong></li>
            <li>样式:<strong>Tailwind / CSS Modules</strong></li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

/* ---------- 分页状态机 ---------- */
let currentPage = 'cover';

function go(pageId) {
  currentPage = pageId;
  app.innerHTML = '';
  if (pageId === 'cover') {
    const sec = document.createElement('section');
    sec.className = 'page active';
    sec.innerHTML = renderCover();
    app.appendChild(sec);
    updatePager(null);
  } else {
    const chart = CHARTS.find(c => c.id === pageId);
    if (!chart) return;
    const sec = document.createElement('section');
    sec.className = 'page active';
    sec.innerHTML = renderDetail(chart);
    app.appendChild(sec);
    updatePager(chart);
    loadChartDemo(chart);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updatePager(chart) {
  const pagerInfo = document.getElementById('pagerInfo');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  if (!chart) {
    pagerInfo.innerHTML = '<b>目录</b> · 共 ' + CHARTS.length + ' 篇';
    btnPrev.disabled = true;
    btnNext.disabled = false;
    btnNext.textContent = '开始阅读 →';
    return;
  }
  const idx = CHARTS.findIndex(c => c.id === chart.id);
  pagerInfo.innerHTML = `<b>${chart.num}. ${chart.title}</b> · 第 ${idx + 1} / ${CHARTS.length} 篇`;
  btnPrev.disabled = false;
  btnPrev.textContent = idx === 0 ? '← 返回目录' : `← ${CHARTS[idx - 1].num}`;
  btnNext.disabled = idx === CHARTS.length - 1;
  btnNext.textContent = idx === CHARTS.length - 1 ? '完 ✓' : `${CHARTS[idx + 1].num} →`;
}

/* 用 iframe 隔离子页面,避免库全局污染 */
function loadChartDemo(chart) {
  const mount = document.getElementById('chart-mount');
  if (!mount) return;
  mount.innerHTML = '';
  const iframe = document.createElement('iframe');
  iframe.src = `./${chart.id}/index.html`;
  iframe.style.cssText = 'width:100%;height:100%;border:0;background:transparent;';
  iframe.setAttribute('loading', 'lazy');
  mount.appendChild(iframe);
}

/* 事件代理 */
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-go]');
  if (t) { e.preventDefault(); go(t.getAttribute('data-go')); }
});

document.getElementById('btnPrev').addEventListener('click', () => {
  if (currentPage === 'cover') return;
  const idx = CHARTS.findIndex(c => c.id === currentPage);
  if (idx === 0) go('cover');
  else go(CHARTS[idx - 1].id);
});
document.getElementById('btnNext').addEventListener('click', () => {
  if (currentPage === 'cover') { go(CHARTS[0].id); return; }
  const idx = CHARTS.findIndex(c => c.id === currentPage);
  if (idx === CHARTS.length - 1) return;
  go(CHARTS[idx + 1].id);
});
document.getElementById('btnHome').addEventListener('click', () => go('cover'));

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') document.getElementById('btnPrev').click();
  if (e.key === 'ArrowRight') document.getElementById('btnNext').click();
});

/* hash 路由:支持从子页面「返回」按钮回到指定详情页
   例 #06-network → 直接打开网络图详情页(用于子页全屏打开后的返回) */
function initFromHash() {
  const hash = location.hash.slice(1);
  if (hash && CHARTS.some(c => c.id === hash)) {
    go(hash);
    return;
  }
  go('cover');
}
initFromHash();
