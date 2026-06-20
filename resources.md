# 📚 可视化框架与学习资源

> 本文档整理实现上述 10 类图表所需的框架、库、教程和灵感来源,方便你做二创时快速定位资源。

---

## 一、核心框架对比

| 框架 | 语言 | 学习曲线 | 灵活度 | 适合场景 | 本手册使用 |
|------|------|---------|--------|---------|-----------|
| **ECharts** | JS | ⭐⭐ 中等 | ⭐⭐⭐ 高(声明式) | 商业级仪表盘、中文项目 | 桑基/箱线/热力/弦图 |
| **D3.js** | JS | ⭐⭐⭐⭐ 陡峭 | ⭐⭐⭐⭐⭐ 极高 | 学术论文、定制可视化 | 河流/演化/网络/DTW |
| **Plotly** | Python/JS | ⭐⭐ 中等 | ⭐⭐⭐ 高 | 科学计算、Notebook | 降维图 |
| **Cytoscape.js** | JS | ⭐⭐ 中等 | ⭐⭐⭐ 高 | 图分析、知识图谱 | 知识图谱 |
| **Three.js** | JS | ⭐⭐⭐⭐ 陡峭 | ⭐⭐⭐⭐⭐ 极高 | 3D 可视化、沉浸式 | (二创 3D 方向) |
| **Observable Plot** | JS | ⭐⭐ 中等 | ⭐⭐⭐⭐ 高 | 快速原型、探索 | (推荐学习) |

### 选型建议
- **快速出商业效果** → ECharts(中文文档最全,内置高级类型最多)
- **学术论文配图** → D3.js(自由度无敌,Observable 上有海量范例)
- **数据科学/ML** → Plotly + Python(无缝衔接 pandas/sklearn)
- **图理论/网络分析** → Cytoscape.js 或 vis-network
- **3D 沉浸式** → Three.js + WebGL

---

## 二、各框架官方资源

### ECharts (Apache)
- 🏠 官网:https://echarts.apache.org
- 📖 文档:https://echarts.apache.org/handbook
- 🎨 示例库(必看):https://echarts.apache.org/examples
- 🎨 主题编辑器:https://echarts.apache.org/zh/theme-builder.html
- 💻 GitHub:https://github.com/apache/echarts
- **本手册用到的高级类型**:Sankey / Boxplot / Heatmap / ThemeRiver(河流) / Graph / Chord

### D3.js
- 🏠 官网:https://d3js.org
- 📖 API:https://github.com/d3/d3/blob/main/API.md
- 🎨 Observable Gallery(灵感宝库):https://observablehq.com/@d3/gallery
- 📚 D3 in Depth 教程:https://www.d3indepth.com
- 📚 书籍:《Interactive Data Visualization for the Web》(Scott Murray)
- **核心模块**:`d3-scale`(比例尺) / `d3-shape`(形状:stack/area/arc) / `d3-force`(力导向) / `d3-hierarchy`(层级) / `d3-zoom`(缩放)

### Plotly
- 🏠 官网:https://plotly.com
- 📖 Python 文档:https://plotly.com/python
- 📖 JS 文档:https://plotly.com/javascript
- 🎨 Plotly Express(高级 API):https://plotly.com/python/plotly-express
- 💻 GitHub:https://github.com/plotly/plotly.js

### Cytoscape.js
- 🏠 官网:https://js.cytoscape.org
- 📖 文档:https://js.cytoscape.org/#introduction
- 🎨 示例:https://js.cytoscape.org/#demos
- 🔌 扩展(布局/聚类):https://js.cytoscape.org/#extensions

### Three.js
- 🏠 官网:https://threejs.org
- 📖 文档:https://threejs.org/docs
- 🎨 示例(海量):https://threejs.org/examples
- 📚 教程:https://discoverthreejs.com

---

## 三、进阶生态(组合使用)

### 前端工程化封装
- **Vue**: `vue-echarts` (ECharts 的 Vue 封装) / `v-charts` (已停更但可参考)
- **React**: `echarts-for-react` / `react-vis` / `visx` (Airbnb 出品,D3 + React) / `recharts`
- **推荐架构**:用 D3 做数据计算 + 用 React/Vue 管理组件生命周期和状态

### 数据处理
- **JavaScript**:`d3-array`(统计) / `d3-dsv`(CSV/TSV) / `crossfilter`(大数据过滤)
- **Python**:`pandas` + `numpy`(预处理) / `scikit-learn`(PCA/t-SNE/UMAP) / `umap-learn`

### 地理可视化
- **Mapbox GL JS**:矢量瓦片,效果最好
- **Deck.gl**:Uber 出品,大数据地理可视化(百万点)
- **kepler.gl**:开箱即用的地理 BI 工具

### 大数据可视化
- **Datashader**(Python):百万级点栅格化
- **ECharts GL**:WebGL 加速版 ECharts
- **Plotly + WebGL**:`scattergl` 替代 `scatter`

---

## 四、灵感与作品集(必收藏)

| 资源 | 链接 | 看点 |
|------|------|------|
| **The Pudding** | https://pudding.cool | 数据新闻视觉化标杆 |
| **NYT Graphics** | https://www.nytimes.com/section/upshot | 新闻图表天花板 |
| **FiveThirtyEight** | https://fivethirtyeight.com | 政治体育数据可视化 |
| **Information is Beautiful** | https://informationisbeautiful.net | David McCandless 作品 |
| **Observable** | https://observablehq.com | D3 作者 Mike Bostock 的平台,无数范例 |
| **Data Sketches** | http://www.datasketch.es | 每月主题可视化挑战 |
| **Reddit r/dataisbeautiful** | https://reddit.com/r/dataisbeautiful | 社区作品交流 |

---

## 五、学术理论(打基础必读)

### 书籍
- 📘 **《The Visual Display of Quantitative Information》** — Edward Tufte(可视化圣经)
- 📘 **《Visualization Analysis and Design》** — Tamara Munzner(系统理论)
- 📘 **《Semiology of Graphics》** — Jacques Bertin(图形符号学鼻祖)
- 📘 **《Interactive Data Visualization》** — Scott Murray(D3 入门)
- 📘 **《数据可视化》** — 陈为(中文,浙江大学)

### 论文 / 会议
- **IEEE VIS** — 可视化顶会,每年最佳论文必读
- **EuroVis** — 欧洲可视化会议
- **CHI** — 人机交互(含可视化交互设计)
- **关键论文**:
  - Streamgraph: Byron & Wattenberg, "Stacked Graphs — Geometry & Aesthetics" (2008)
  - t-SNE: van der Maaten & Hinton, "Visualizing Data using t-SNE" (2008)
  - UMAP: McInnes et al., "UMAP: Uniform Manifold Approximation" (2018)
  - DTW: Sakoe & Chiba, "Dynamic programming algorithm optimization for spoken word recognition" (1978)

### 在线课程
- 🎓 **edX "Data Visualization"](https://www.edx.org)** — Harvard/UMich 等
- 🎓 **Coursera "Data Visualization with Tableau"**
- 🎓 **Observable's Learn D3**:https://observablehq.com/collection/learn-d3

---

## 六、本手册二创建议清单

每张图都已留好扩展点。下面是优先级建议:

### 🔥 高价值二创(容易出彩)
1. **DTW + 时序聚类**:多条时序互相 DTW → 层次聚类热力图(学术性强)
2. **降维图 + 原始数据联动**:brush 框选 → 触发右侧原图列表(ML 工程师最爱)
3. **知识图谱 + LLM**:自然语言提问 → RAG 抽取子图 → 可视化(当下最热)
4. **3D 网络图**:Three.js + 3D 力布局(沉浸式探索大图)

### 💡 美学向二创
5. **桑基图动画化**:时间 slider 让流向逐年演化
6. **河流图个性化配色**:按情绪着色(绿正/红负)
7. **演化时间线叙事模式**:自动滚动 + 镜头聚焦,像纪录片

### 🛠️ 工程化封装
8. **Vue/React 组件库**:把 10 张图封装成 `<VizSankey :data="..." />` 组件
9. **TypeScript 类型化**:为每种图表数据格式定义 interface
10. **主题系统**:抽离配色到 CSS variables,支持暗色/亮色切换

---

## 七、CDN 速查(本手册所用)

```html
<!-- ECharts -->
<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>

<!-- D3.js -->
<script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>

<!-- Plotly -->
<script src="https://cdn.plot.ly/plotly-2.35.2.min.js"></script>

<!-- Cytoscape.js -->
<script src="https://cdn.jsdelivr.net/npm/cytoscape@3.30.2/dist/cytoscape.min.js"></script>

<!-- Three.js -->
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
```

---

祝学习愉快!有任何图表想深入,直接告诉我,我可以基于这些 demo 继续定制。🎯
