# Python Syntax · Python语言 — 设计文档

日期：2026-10-27
仓库：`bryanwoo988/Learn-Python`（目前只有 README）
上线网址：`https://bryanwoo988.github.io/Learn-Python/`
姊妹作：`bryanwoo988/Learn-SQL`（下称 LearnSQL），本 app 的界面、设置和发布方式都以它为模板。

## 1. 目的

做一个互动式、中英双语的 Python 学习 PWA，让完全没写过代码的人，从基础语法一步步学到 intermediate，然后继续学数据分析（NumPy、pandas、matplotlib）和机器学习入门（scikit-learn）。

学完之后，学员应该能做到这三件事（Bryan 的要求是"全部都要"）：

1. 把 Python 基础打牢，能独立写小程序、解基础题；
2. 用 pandas 读取和整理实际数据，并用 matplotlib 画图；
3. 用 scikit-learn 训练和评估一个简单模型。

做法跟 LearnSQL 一样：每一段例子都可以直接改、直接运行；练习题会判对错，提示一条一条解锁，最后可以看标准答案和讲解。

## 2. 目标、非目标、反目标

**目标**
- 零基础友好：每一步只引入一个新概念，报错有中英文解释。
- 互动：课程里的代码可以运行，练习题会自动判分，提示逐条解锁。
- 功能和 LearnSQL 一致：首页进度、Learn、Practice、Playground、Settings。
- 完全在浏览器里运行，不需要服务器；安装后可以离线使用。
- 符合 Woo Brothers 共享标准 APP-STANDARDS.md（见 §4）。

**非目标**
- 深度学习框架（TensorFlow、PyTorch）、YOLO 和其他大模型：浏览器里跑不了，见 §5.6。只在"下一步学什么"页面介绍。
- 数据库（MySQL、MongoDB）、Django、PIP：这些不是 Python 语言本身。
- 中英以外的语言。
- 用户账号、云端同步、排行榜。

**反目标**（就算功能都能运行，出现下面的情况也算做失败了）
- 只学基础的人，第一次打开就要下载几十 MB 的数据分析库。
- 学员写了一个死循环，整个页面卡死，只能关掉 app。
- 照抄 W3Schools 或其他网站的文字和例子（有版权问题）。
- 动到 LearnSQL 的代码或缓存。
- 新用户打开时因为第三方 CDN 挂了或被挡住，app 用不了。

## 3. 名称与身份

- 名字："Python Syntax · Python语言"，short name "Python Syntax"，跟 "SQL Syntax · SQL语言" 配对。*（我的决定）*
- localStorage 前缀 `pysyntax.`，service worker 缓存前缀 `py-syntax-`。*（我的决定，仿照 LearnSQL 的 `sqlsyntax.` / `sql-syntax-`）*
- 第一版版本号 `1.0.0`，**一次推出全部 18 章、约 83 题和"下一步学什么"页面**（Bryan 的决定）。不分阶段发布，所以数据分析包的下载机制和全部判分方式都要在 1.0.0 之前完成。
- 需要一套新的图标（Python 主题），尺寸和文件名跟 LearnSQL 的 `icons/` 相同。设计由 builder 决定，但不能使用 Python 软件基金会的官方蛇形 logo（商标）。

## 4. 约束

1. **发布规则**（从 LearnSQL 的 CLAUDE.md 照搬，新 repo 也要放一份 CLAUDE.md 写明）：每次发布，在 `js/releases.js` 最前面加一条记录（版本号、YYYY-MM-DD 日期、中英两种语言的用户说明），并把 `sw.js` 的 `VERSION` 改成同一个版本号，推送前运行 `node tools/check-release.mjs`。修 bug 加最后一位，加新功能加中间一位。
2. **APP-STANDARDS.md**（`bryanwoo988/woobrothers.my`）：
   - §1 更新后显示"更新了什么"（新用户不显示），设置页显示版本号和全部更新记录。直接复制 LearnSQL 的 `js/whatsnew.js`。
   - §2 有新版本时先询问"立即更新 / 稍后"，不能自动重新载入。
   - §3 设置页要有离线生成的二维码、网址、"分享 App 链接"按钮、版本号和日期时间。复制 LearnSQL 的 `js/qrcode.js`。
   - §4 service worker 只能删除名字以 `py-syntax-` 开头的缓存。
3. **不使用外部 CDN**：所有脚本、wasm、Python 包都放在本 repo，由 GitHub Pages 提供（这是 §5 选定的方案 A）。
4. **托管在 GitHub Pages**：不能自定义 HTTP header。所以 `SharedArrayBuffer`（需要 COOP/COEP header）默认用不了，这会影响死循环的处理和 `input()`，见 §6.4。另外单个文件不能超过 100 MB。
5. **内容版权**：课程章节**顺序**参考 W3Schools Python 教程，但所有文字、例子、数据和题目都要为本 app 重新写，跟 LearnSQL 对 LeetCode 的处理方式一样。
6. **不动 LearnSQL**：共用代码一律复制过来，不抽成共享库。

## 5. 实现方式

### 5.1 考虑过的方案

| 方案 | 做法 | 取舍 |
|---|---|---|
| **A. Pyodide 放在本 repo（已选）** | 跟 LearnSQL 把 sql.js 放进 `vendor/` 一样，Pyodide 本体和需要的 Python 包都放在 `vendor/pyodide/` | 版本固定、不依赖第三方、离线行为可控；代价是 repo 会多出几十 MB 的二进制文件，升级 Pyodide 需要手动换文件 |
| B. 从 jsDelivr 下载 Pyodide | repo 里只有 app，运行环境第一次使用时从 CDN 下载 | repo 小；但新用户依赖 CDN 能不能连上，跨域资源的离线缓存也更容易出问题 |
| C. 抽出 LearnSQL 和本 app 共用的代码，做成共享库 | Settings、主题、更新提示只维护一份 | 以后重复少；但现在就要改 LearnSQL，工作范围变大。等两边稳定后再考虑 |
| （否决）React/Vite 等框架 | — | 和 LearnSQL 的纯 JS、无编译写法不一致，两个 app 会变成两套写法 |

Bryan 选了 **A**，理由是这个 app 的卖点是"装好就能离线学"，零基础用户遇到打不开的情况不会自己排查。

### 5.2 技术栈（跟 LearnSQL 相同）

- 纯 HTML/CSS/JavaScript，不用框架，没有编译步骤，用 hash 路由（`#/`、`#/learn`、`#/practice`、`#/playground`、`#/settings`）。
- 以下文件从 LearnSQL 复制后修改：`index.html` 外壳（包括避免深色模式闪白的那段内联脚本）、`css/style.css`、`js/icons.js`、`js/qrcode.js`、`js/whatsnew.js`、`js/app.js` 里的设置页、主题、安装、更新、进度部分，`sw.js`、`manifest.webmanifest`、`tools/check-release.mjs`。
- SQL 专用的部分（`sqlcompat.js`、表格比对、SQL 语法高亮）换成 Python 版本。

### 5.3 Python 运行环境

- **Pyodide 314.0.7**（2026-09-14 发布，2026-10-27 查到的最新版）。已核实 Pyodide 的包配方里有 numpy、pandas、matplotlib、scipy、scikit-learn，没有 torch 和 tensorflow。
- Pyodide 跑在 **Web Worker** 里，不在主线程，所以 Python 运行时界面不会卡住。
- 分成两层：
  - **基础层**：Pyodide 本体和标准库。在 service worker 安装时预先缓存，第 1–11 章和 Playground 的基础功能都离线可用。
  - **数据分析包**：numpy、pandas、matplotlib、scipy、scikit-learn 以及它们的依赖。学员第一次打开第 12–18 章、第 12–18 章的题目，或者在 Playground 里 import 这些库时，先显示说明（大小和用途），学员确认后才下载，并显示进度。下载后放进独立的缓存（例如 `py-syntax-pkgs-<pyodide版本>`），app 更新时**不能**把它删掉重下，只有 Pyodide 版本改变时才换。service worker 的 activate 清理逻辑要保留当前的包缓存。
- 只放需要的包，不放 Pyodide 完整发行版的全部几百个包。

两层的实际大小目前还没量。builder 要量出来，写进文档和下载提示里。

### 5.4 共享标准的落实

同 §4.2。更新记录 `js/releases.js` 用 `window.PY_RELEASES`，只有 `en` 和 `zh` 两种语言（跟 LearnSQL 一样，标准里的 `ms` 不需要）。

## 6. 功能

### 6.1 页面（跟 LearnSQL 一致）

- **Home**：总进度、每段进度、"继续下一题"。
- **Learn**：18 章按 4 段分组，再加最后一页"下一步学什么"。
- **Practice**：按章节筛选，显示已完成 / 未完成和难度。
- **Playground**：自由写 Python，自带几个示例 CSV 文件。数据分析包下载后，这里也能用 pandas 和画图。
- **Settings**：语言（English / 中文）、跟随系统 / 浅色 / 深色模式加 4 套浅色主题和 4 套深色主题（跟 LearnSQL 同名同色）、二维码、网址、分享、安装（包括 iOS 的安装说明）、版本号和更新记录、重置进度。

### 6.2 代码里的语言（Bryan 的决定）

| 部分 | 语言 |
|---|---|
| 说明、提示、讲解、测验、报错解释、界面 | 跟着 Settings 的语言（中 / 英） |
| 代码里的**注释**（课程例子、起始代码、标准答案） | 跟着 Settings 的语言（中 / 英） |
| 变量名、函数名、`print` 出来的文字、数据内容、CSV 栏名和值 | 一律英文 |
| 图表的标题、坐标轴、图例 | 一律英文。中文解释写在图表外面，不需要中文字体 |

这样判分只需要一套预期输出，因为注释不影响运行结果。

需要配合的设计：
- 有注释的代码要能按语言生成。做法由 builder 决定，例如 `T(en, zh)` 存两份代码，或者存一份代码再加一张按行号对应的注释表。`tools/check-problems.mjs` 要确认两种语言的代码**去掉注释后完全相同**，并且两种语言的标准答案都能通过。
- 草稿（`drafts`）仍然按题目 id 保存一份。学员一旦改过代码，草稿就是学员自己的，切换语言时不改动；还没改过的起始代码则跟着切换。

### 6.3 课程卡片

每章有几张卡片，每张卡片包括：说明、一段可以修改并运行的代码、运行结果（文字输出，有图就显示图）。每章末尾有一个小测验，全部答完就算这一章完成（跟 LearnSQL 一样）。

### 6.4 运行代码

- **停止和超时**：每次运行都有"停止"按钮，超过一定时间（建议 10 秒，数据分析章节可以长一些）自动停止。因为 GitHub Pages 上没有 `SharedArrayBuffer`，没办法用 Pyodide 的中断功能，所以做法是**终止 worker，再重新启动一个**，同时提示学员"代码运行太久，可能是死循环"。数据分析包已经缓存，重启只需要重新载入，但会花几秒钟。*（我的决定；如果 builder 找到在 GitHub Pages 上可靠启用跨域隔离的方法，可以改用中断，但要先确认不会影响同网域下的其他 app。）*
- **`input()`**：worker 没办法停下来等用户在界面上输入。练习题一律直接给好变量当作输入，不使用 `input()`。课程里有一张卡片解释 `input()`，卡片和 Playground 提供一个"输入"框，事先填好的每一行依次作为 `input()` 的返回值。*（我的决定）*
- **报错解释**：常见的错误（`SyntaxError`、`IndentationError`、`NameError`、`TypeError`、`ValueError`、`IndexError`、`KeyError`、`ZeroDivisionError`、`AttributeError`、`ModuleNotFoundError`）在原本的英文 traceback 下面加一行中英文解释。traceback 要去掉 Pyodide 内部的调用层，只显示学员自己代码的行号。
- **画图**：使用 matplotlib 的非交互式后端，把图转成图片显示在输出下方。图里的文字一律英文（见 §6.2）。
- **文件读写**：第 10 章和 Playground 使用 Pyodide 的虚拟文件系统，事先放好示例文件。每次运行前重置成初始状态，避免上一次运行的结果影响这一次。

### 6.5 练习题和判分

每题的结构参照 LearnSQL：`id`、`section`、`level`（easy / medium / hard）、双语 `title` / `desc`、起始代码 `starter`、提示 `hints[]`、标准答案 `solution`、讲解 `explain`，再加上判分规则 `check`。题目、数据和故事都为本 app 原创。

判分方式按题目类型选择：

| 类型 | 适用 | 做法 |
|---|---|---|
| `stdout` | 第 1–7 章大部分题 | 比对 `print` 出来的内容，忽略每行末尾的空格和最后的空行 |
| `function` | 第 8 章起 | 调用学员写的函数，用公开测试和隐藏测试比对返回值。浮点数允许小误差 |
| `vars` | 需要算出某个变量的题 | 运行后检查指定变量的值 |
| `dataframe` | 第 13 章 | 比对 DataFrame 的列、值和形状。题目写明是否要求行的顺序 |
| `figure` | 第 14 章 | 检查当前 figure：图表类型、数据点、英文标题和坐标轴标签。不比对图片 |
| `model` | 第 16–18 章 | 检查模型类型、关键参数，以及在固定测试集上的分数是否达到门槛。所有随机过程都要固定 `random_state` |

"提交"会跑隐藏测试；"运行"只跑代码，显示输出。没通过时说明是哪一个测试没过（隐藏测试只说没过，不显示内容）。看答案前，如果还有提示没看完，要先确认（跟 LearnSQL 一样）。

### 6.6 数据

- 第 10、13、14 章使用为本 app 原创的小型 CSV（几十到几百行），放在 repo 里。主题贴近生活：销售记录、成绩单、天气、员工资料。
- 第 15–18 章可以使用 scikit-learn 自带的小数据集（如 iris、wine、breast cancer、digits），这些数据随包一起下载，离线也能用。不能用 `fetch_*` 这类需要联网下载的数据集。

### 6.7 进度和本机存储

跟 LearnSQL 一样：`progress = { solved, lessons, drafts }`、`prefs`（模式和主题）、语言、看过的版本号，全部存在 localStorage（前缀 `pysyntax.`）。没有任何东西传到服务器。

## 7. 课程大纲（18 章 + 一页"下一步学什么"，约 83 题）

章节顺序参照 W3Schools，合并成 18 章。题数是目标，builder 可以在每段内调整 ±1 到 2 题。

**第一段：Beginner（35 题）**

| # | 章节 | 内容 | 题数 |
|---|---|---|---|
| 1 | 入门 | `print`、语法和缩进、注释、变量 | 4 |
| 2 | 数据类型与运算 | 数字、类型转换、布尔值、运算符 | 5 |
| 3 | 字符串 | 切片、常用方法、f-string 格式化 | 6 |
| 4 | 条件判断 | `if / elif / else`、`match` | 4 |
| 5 | 循环 | `while`、`for`、`range`、`break / continue` | 6 |
| 6 | 列表与元组 | list 的增删改查、排序、tuple | 5 |
| 7 | 字典与集合 | dict、set、遍历 | 5 |

**第二段：Intermediate（20 题）**

| # | 章节 | 内容 | 题数 |
|---|---|---|---|
| 8 | 函数 | `def`、参数、返回值、作用域、`lambda`、推导式 | 6 |
| 9 | 错误处理与常用模块 | `try / except`、import、math、datetime、json、正则 | 5 |
| 10 | 文件读写 | 打开、读写文本文件和 CSV 文件 | 3 |
| 11 | 面向对象 | class、继承、多态、迭代器 | 6 |

**第三段：数据分析（15 题，需要数据分析包）**

| # | 章节 | 内容 | 题数 |
|---|---|---|---|
| 12 | NumPy | 数组、运算、索引、随机数 | 4 |
| 13 | pandas | Series / DataFrame、读 CSV、筛选、分组汇总、合并、清理数据 | 8 |
| 14 | Matplotlib | 折线图、柱状图、散点图、直方图 | 3 |

**第四段：机器学习（13 题，需要数据分析包）**

| # | 章节 | 内容 | 题数 |
|---|---|---|---|
| 15 | 统计基础 | 平均数、中位数、众数、标准差、百分位数、数据分布 | 3 |
| 16 | 回归 | 线性回归、多项式回归、多元回归、特征缩放、训练集 / 测试集划分 | 3 |
| 17 | 分类与聚类 | 逻辑回归、决策树、KNN、混淆矩阵、K-means、层次聚类 | 4 |
| 18 | 神经网络入门 | 用 NumPy 写一个神经元、激活函数；用 scikit-learn 的 `MLPClassifier` 训练，画学习曲线，理解过拟合；展示等效的 TensorFlow / PyTorch 代码，标明"仅供阅读" | 3 |

**"下一步学什么"页面**（没有题目）：介绍深度学习、TensorFlow、PyTorch、YOLO 物体检测分别是什么，说明为什么本 app 不教，并给出用 Google Colab 继续学习的路线。

## 8. 测试和发布检查

- `tools/check-release.mjs`：从 LearnSQL 复制，检查版本号一致、更新记录格式正确、预先缓存的文件都存在。
- `tools/check-problems.mjs`（新增）：在 Node 里用 Pyodide 跑每一题，确认**标准答案能通过所有测试**、**起始代码不能通过**。每次改动题目后、推送前都要运行。数据分析和 ML 题目需要 Node 能载入本地的包。
- 在真实浏览器（桌面 Chromium，加上手机尺寸的视窗）里检查：离线启动、数据分析包下载和离线使用、死循环被停止、更新提示、深浅主题切换。

## 9. 留给 builder 决定的事

- 每一章具体的卡片、例子、测验题和练习题内容（遵守 §4.5 和 §7）。
- 代码编辑器：沿用 LearnSQL 那种轻量的 textarea 加语法高亮的做法，把高亮规则改成 Python。Python 对缩进很敏感，至少要支持 Tab 缩进、回车时保持缩进。
- 图标设计、`theme_color`。
- 超时的确切秒数、数据分析包下载界面的样式。
- 文件结构，原则上跟 LearnSQL 一致（`js/lessons.js`、`js/problems.js` 等）。题目多的话，可以按段拆成几个文件。
