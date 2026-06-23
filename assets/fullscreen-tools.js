(() => {
  if (window.__visFullscreenToolsLoaded) return;
  window.__visFullscreenToolsLoaded = true;

  /* ===== 通用尺寸兜底:解决全屏打开时容器高度为 0 导致图表塌陷 =====
     页面可调用 VisResize.register(el, onResize) 注册重绘回调,
     本工具会在容器拿到真实尺寸后 + ResizeObserver 变化时自动触发。 */
  const VisResize = {
    _observers: [],
    register(el, onResize) {
      if (!el || typeof onResize !== 'function') return;
      const fire = () => { try { onResize(el); } catch (e) { /* 静默,避免阻断页面 */ } };
      // 1) 初始轮询:布局未就绪时容器高度为 0,等到有尺寸再首次触发
      const check = (n = 0) => {
        const rect = el.getBoundingClientRect();
        if ((rect.width > 0 && rect.height > 0) || n > 30) {
          fire();
        } else {
          setTimeout(() => check(n + 1), 50);
        }
      };
      check();
      // 2) 后续尺寸变化:ResizeObserver
      if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => fire());
        ro.observe(el);
        this._observers.push(ro);
      } else {
        window.addEventListener('resize', fire);
      }
      // 3) 资源加载完成兜底(字体/图片加载后布局可能变化)
      window.addEventListener('load', fire);
    }
  };
  window.VisResize = VisResize;

  const style = document.createElement('style');
  style.textContent = `
    .vis-code-entry {
      position: fixed;
      top: 16px;
      right: 132px;
      z-index: 101;
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
      background: #faf9f6;
      color: #1a1a1a;
      border: 1px solid #1a1a1a;
      border-radius: 2px;
      padding: 8px 14px;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.04em;
      cursor: pointer;
      box-shadow: 0 2px 12px rgba(0,0,0,0.10);
      transition: background .15s, color .15s, transform .15s;
    }
    .vis-code-entry:hover {
      background: #2c5282;
      border-color: #2c5282;
      color: #faf9f6;
      transform: translateY(-1px);
    }
    .vis-code-modal {
      position: fixed;
      inset: 0;
      z-index: 200;
      display: none;
      background: rgba(26,26,26,0.62);
      padding: 42px;
    }
    .vis-code-modal.is-open {
      display: flex;
    }
    .vis-code-dialog {
      width: min(1180px, 100%);
      max-height: 100%;
      margin: auto;
      display: grid;
      grid-template-rows: auto 1fr;
      background: #faf9f6;
      border: 1px solid #1a1a1a;
      box-shadow: 0 18px 60px rgba(0,0,0,0.25);
    }
    .vis-code-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 16px 18px;
      border-bottom: 1px solid #d8d4c8;
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    .vis-code-title {
      min-width: 0;
    }
    .vis-code-title strong {
      display: block;
      color: #1a1a1a;
      font-size: 14px;
      line-height: 1.4;
    }
    .vis-code-title span {
      display: block;
      margin-top: 2px;
      color: #6b6b6b;
      font-size: 12px;
      line-height: 1.5;
    }
    .vis-code-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .vis-code-actions button {
      font-family: inherit;
      background: #faf9f6;
      border: 1px solid #d8d4c8;
      color: #1a1a1a;
      border-radius: 2px;
      padding: 7px 12px;
      font-size: 12px;
      cursor: pointer;
    }
    .vis-code-actions button:hover {
      border-color: #2c5282;
      color: #2c5282;
      background: #ebf0f7;
    }
    .vis-code-body {
      min-height: 0;
      overflow: auto;
      background: #1f2328;
    }
    .vis-code-body pre {
      margin: 0;
      padding: 18px 20px 28px;
      color: #f3f1ea;
      font: 12px/1.65 "JetBrains Mono", Consolas, monospace;
      white-space: pre;
      tab-size: 2;
    }
    @media (max-width: 768px) {
      .vis-code-entry {
        top: 58px;
        right: 16px;
      }
      .vis-code-modal {
        padding: 14px;
      }
      .vis-code-head {
        align-items: flex-start;
        flex-direction: column;
      }
      .vis-code-actions {
        width: 100%;
        justify-content: flex-start;
      }
    }
  `;
  document.head.appendChild(style);

  const getSceneSummary = () => {
    const labels = Array.from(document.querySelectorAll('[data-set], [data-algo]'))
      .map(el => el.textContent.trim().replace(/\s+/g, ' '))
      .filter(Boolean);
    return labels.length ? labels.join(' / ') : '当前页面代码';
  };

  const buildAnnotatedSource = () => {
    const title = document.querySelector('h1')?.textContent.trim().replace(/\s+/g, ' ') || document.title;
    return `<!--\n` +
      `==== Agent 二创上下文 ====\n` +
      `图表示例: ${title}\n` +
      `场景/算法入口: ${getSceneSummary()}\n` +
      `技术栈: 见 <head> 中引入的 CDN 库(ECharts / D3 / Plotly / Cytoscape / wordcloud2)\n` +
      `\n` +
      `阅读方式(自上而下):\n` +
      `1. <head>:通过 CDN 加载图表库,零依赖,双击即可运行。\n` +
      `2. DATASETS / DATASET 常量:多场景示例数据,点击页面按钮可切换。\n` +
      `3. render() / draw*():把数据映射成图形的渲染入口,改这里即可二创。\n` +
      `4. .controls 上的按钮:绑定 data-set 切换场景,可加自己的数据集。\n` +
      `\n` +
      `二创建议:\n` +
      `- 换 palette 配色(顶部常量数组)立刻改变全图风格。\n` +
      `- 在 DATASETS 里加一组你的真实数据,即可看到效果。\n` +
      `- 调整坐标轴 / 布局参数实现不同的可视化诉求。\n` +
      `=========================\n` +
      `-->\n\n${buildCleanSource()}`;
  };

  /* 抓取一份「干净」的页面源码用于复制:剥离工具自身注入的元素
     (返回按钮 BACK_BTN、查看代码入口、代码模态框、本脚本),
     让复制出来的代码可作为干净的二创上下文交给 Agent。 */
  const buildCleanSource = () => {
    const body = document.body.cloneNode(true);
    // body:剥离工具注入的入口按钮 / 代码模态框 / 本脚本引用 / 「← 返回介绍」按钮
    body.querySelectorAll('.vis-code-entry, .vis-code-modal').forEach(el => el.remove());
    body.querySelectorAll('script[src*="fullscreen-tools.js"]').forEach(el => el.remove());
    Array.from(body.querySelectorAll('a')).forEach(a => {
      const s = a.getAttribute('style') || '';
      if (s.includes('position:fixed') && a.textContent.includes('返回')) a.remove();
    });
    // head:移除本脚本引用 + 工具动态注入的 <style>(类名以 vis-code 开头)
    const headClean = document.head.cloneNode(true);
    headClean.querySelectorAll('script[src*="fullscreen-tools.js"]').forEach(el => el.remove());
    Array.from(headClean.querySelectorAll('style')).forEach(st => {
      if (/vis-code-/.test(st.textContent)) st.remove();
    });
    return `<!DOCTYPE html>\n<html lang="zh-CN">\n${headClean.outerHTML}\n${body.outerHTML}\n</html>`;
  };

  const modal = document.createElement('div');
  modal.className = 'vis-code-modal';
  modal.innerHTML = `
    <div class="vis-code-dialog" role="dialog" aria-modal="true" aria-label="查看代码">
      <div class="vis-code-head">
        <div class="vis-code-title">
          <strong>示例代码</strong>
          <span>已附二创注释,包含当前图表的多场景数据、交互按钮和渲染逻辑。</span>
        </div>
        <div class="vis-code-actions">
          <button type="button" data-copy>复制 Copy</button>
          <button type="button" data-close>关闭</button>
        </div>
      </div>
      <div class="vis-code-body"><pre><code></code></pre></div>
    </div>
  `;
  document.body.appendChild(modal);

  const code = modal.querySelector('code');
  const copyButton = modal.querySelector('[data-copy]');
  const closeButton = modal.querySelector('[data-close]');

  const openModal = () => {
    code.textContent = buildAnnotatedSource();
    modal.classList.add('is-open');
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
  };

  const copyCode = async () => {
    const text = code.textContent || buildAnnotatedSource();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.left = '-9999px';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    copyButton.textContent = '已复制';
    window.setTimeout(() => { copyButton.textContent = '复制 Copy'; }, 1200);
  };

  const entry = document.createElement('button');
  entry.type = 'button';
  entry.className = 'vis-code-entry';
  entry.textContent = '查看代码';
  entry.addEventListener('click', openModal);
  document.body.appendChild(entry);

  copyButton.addEventListener('click', copyCode);
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  if (new URLSearchParams(location.search).get('showCode') === '1') {
    window.setTimeout(openModal, 120);
  }
})();
