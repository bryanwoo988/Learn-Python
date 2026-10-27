/* Part 4 — Machine learning: chapters 15–18 (13 problems) and the "what to learn next" page.
   Written for this app. Uses scikit-learn's built-in datasets (no internet needed) and the app's CSVs. */
(function () {
  'use strict';
  const PYC = window.PYC;
  const { T, lesson, add } = PYC;
  const C = String.raw;
  const fn = (name, calls) => ({ type: 'function', name, calls });
  const values = (exprs, extra) => Object.assign({ type: 'values', exprs }, extra);
  const need = (expr, en, zh) => ({ expr, msg: T(en, zh) });

  // ================================================================ 15. Statistics Basics
  lesson('stats', {
    intro: T('<p>Before any model, describe the data. The <b>mean</b>, <b>median</b> and <b>mode</b> say where the middle is; the <b>standard deviation</b> and <b>percentiles</b> say how spread out it is; <b>correlation</b> says whether two columns move together.</p>',
      '<p>建模之前，先描述数据。<b>平均数</b>、<b>中位数</b>、<b>众数</b>说明数据的中心在哪里；<b>标准差</b>和<b>百分位数</b>说明数据有多分散；<b>相关系数</b>说明两列数据是否一起变化。</p>'),
    cards: [
      { title: T('Mean, median, mode', '平均数、中位数、众数'),
        body: T('<p>One very large value pulls the mean up, but not the median.</p>', '<p>一个特别大的值会把平均数拉高，但中位数不受影响。</p>'),
        code: C`import statistics
import numpy as np

salaries = [3200, 3500, 3500, 4100, 4800, 25000]
print("mean  ", round(np.mean(salaries), 1))
print("median", np.median(salaries))
print("mode  ", statistics.mode(salaries))`},
      { title: T('Spread: standard deviation', '离散程度：标准差'),
        body: T('<p>Both groups have mean 50; the standard deviation shows how different they are.</p>', '<p>两组的平均数都是 50；标准差显示出它们有多不同。</p>'),
        code: C`import numpy as np

steady = np.array([48, 50, 52, 49, 51])
wild = np.array([10, 90, 30, 70, 50])
print(steady.mean(), round(steady.std(), 2))
print(wild.mean(), round(wild.std(), 2))`},
      { title: T('Percentiles', '百分位数'),
        body: T('<p>The 90th percentile is the value that 90 % of the data is below.</p>', '<p>第 90 百分位数是指有 90% 的数据都低于它的那个值。</p>'),
        code: C`import numpy as np

rng = np.random.default_rng(1)
wait_minutes = rng.exponential(8, 1000)
for p in (25, 50, 90, 99):
    print(p, round(np.percentile(wait_minutes, p), 1))`},
      { title: T('Normal distribution', '正态分布'),
        body: T('<p>Many measurements cluster around a middle value in a bell shape. About 68 % fall within one standard deviation of the mean.</p>', '<p>许多测量值会以钟形聚集在中间值附近。大约 68% 的数据落在平均数左右一个标准差之内。</p>'),
        code: C`import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(3)
x = rng.normal(100, 15, 5000)
inside = ((x > 85) & (x < 115)).mean()
print(round(inside * 100, 1), "% within one std")
plt.hist(x, bins=40)
plt.title("Normal Distribution")`},
      { title: T('Correlation', '相关系数'),
        body: T('<p>Correlation goes from −1 to 1. Near 1: both rise together; near 0: no straight-line relation.</p>', '<p>相关系数介于 −1 和 1 之间。接近 1：两者一起上升；接近 0：没有直线关系。</p>'),
        code: C`import pandas as pd

h = pd.read_csv("houses.csv")
print(h.corr().round(2))`, files: ['houses.csv'] }
    ],
    quiz: [
      { q: T('A few huge values make which measure misleading?', '少数几个特别大的值会让哪个指标失真？'), options: [T('The median', '中位数'), T('The mean', '平均数'), T('The mode', '众数')], answer: 1, why: T('The mean uses every value, so extremes pull it.', '平均数用到了每个值，所以极端值会把它拉偏。') },
      { q: T('What does a standard deviation of 0 mean?', '标准差为 0 表示什么？'), options: [T('All values are the same', '所有值都一样'), T('The mean is 0', '平均数是 0'), T('There is no data', '没有数据')], answer: 0, why: T('No value differs from the mean.', '没有任何值偏离平均数。') },
      { q: T('A correlation of −0.9 means…', '相关系数为 −0.9 表示……'), options: [T('No relation', '没有关系'), T('When one goes up, the other goes down', '一个上升时，另一个下降'), T('An error', '出错了')], answer: 1, why: T('Negative and strong: they move in opposite directions.', '负值且很强：两者朝相反的方向变化。') }
    ]
  });

  add({ id: 1501, section: 'stats', level: 'easy',
    title: T('Describe the Ages', '描述年龄'),
    desc: T('<p>For the list <code>ages</code>, create <code>mean_age</code> (rounded to 2 decimals), <code>median_age</code> and <code>mode_age</code> (the most common age).</p>', '<p>对列表 <code>ages</code>，建立 <code>mean_age</code>（保留 2 位小数）、<code>median_age</code> 和 <code>mode_age</code>（出现最多的年龄）。</p>'),
    given: T('<p><code>ages</code> — a list of whole numbers with one most common value</p>', '<p><code>ages</code>——整数列表，其中有一个出现最多的值</p>'),
    cases: ['ages = [23, 25, 25, 31, 40, 25, 37]', 'ages = [60, 18, 18]'],
    starter: C`import statistics

`,
    solution: C`import statistics

mean_age = round(statistics.mean(ages), 2)
median_age = statistics.median(ages)
mode_age = statistics.mode(ages)
print(mean_age, median_age, mode_age)`,
    hints: [T('The <code>statistics</code> module has <code>mean</code>, <code>median</code> and <code>mode</code>.', '<code>statistics</code> 模块里有 <code>mean</code>、<code>median</code>、<code>mode</code>。')],
    explain: T('Reporting all three gives a fair picture when the data is skewed.', '数据偏斜时，同时给出三个指标更公允。'),
    check: values(['mean_age', 'median_age', 'mode_age']) });

  add({ id: 1502, section: 'stats', level: 'medium',
    title: T('Spread of Delivery Times', '送货时间的离散程度'),
    desc: T('<p>For the array <code>times</code>, create <code>std</code>: the standard deviation (NumPy’s <code>std()</code>) rounded to 2 decimals, and <code>p90</code>: the 90th percentile.</p>', '<p>对数组 <code>times</code>，建立 <code>std</code>：标准差（NumPy 的 <code>std()</code>），保留 2 位小数；以及 <code>p90</code>：第 90 百分位数。</p>'),
    given: T('<p><code>times</code> — a NumPy array of minutes; <code>np</code> is imported</p>', '<p><code>times</code>——以分钟为单位的 NumPy 数组；<code>np</code> 已经导入</p>'),
    setup: 'import numpy as np',
    cases: ['times = np.array([22, 35, 28, 41, 30, 26, 55, 33, 29, 38])', 'times = np.array([10, 10, 10, 50])'],
    starter: C``,
    solution: C`std = round(times.std(), 2)
p90 = np.percentile(times, 90)
print(std, p90)`,
    hints: [T('<code>times.std()</code> and <code>np.percentile(times, 90)</code>.', '<code>times.std()</code> 和 <code>np.percentile(times, 90)</code>。')],
    explain: T('"90 % of deliveries arrive within p90 minutes" is often more useful than the average.', '"90% 的货在 p90 分钟内送到"往往比平均值更有用。'),
    check: values(['std', 'p90']) });

  add({ id: 1503, section: 'stats', level: 'easy',
    title: T('Size and Price', '面积与价格'),
    desc: T('<p>Load <code>houses.csv</code> and create <code>corr</code>: the correlation between <code>size_m2</code> and <code>price_k</code>, rounded to 3 decimals.</p>', '<p>读取 <code>houses.csv</code>，建立 <code>corr</code>：<code>size_m2</code> 和 <code>price_k</code> 之间的相关系数，保留 3 位小数。</p>'),
    files: ['houses.csv'],
    starter: C`import pandas as pd

h = pd.read_csv("houses.csv")
`,
    solution: C`import pandas as pd

h = pd.read_csv("houses.csv")
corr = round(h["size_m2"].corr(h["price_k"]), 3)
print(corr)`,
    hints: [T('<code>series_a.corr(series_b)</code>.', '<code>series_a.corr(series_b)</code>。')],
    explain: T('A strong correlation suggests size will be a good feature for predicting price — next chapter.', '强相关说明面积很适合用来预测价格——下一章就会用到。'),
    check: values(['corr']) });

  // ================================================================ 16. Regression
  lesson('regression', {
    intro: T('<p><b>Regression</b> predicts a number, such as a price. scikit-learn models all work the same way: create the model, <code>fit(X, y)</code> on known examples, then <code>predict</code> new ones. <code>X</code> is a table of inputs (features), <code>y</code> the answers.</p>',
      '<p><b>回归</b>用来预测一个数值，例如价格。scikit-learn 的模型用法都一样：创建模型，用已知的例子 <code>fit(X, y)</code>，再 <code>predict</code> 新的数据。<code>X</code> 是输入（特征）组成的表格，<code>y</code> 是答案。</p>'),
    cards: [
      { title: T('A straight line through the data', '穿过数据的一条直线'),
        body: T('<p><code>LinearRegression</code> finds the best line: price ≈ slope × size + intercept.</p>', '<p><code>LinearRegression</code> 会找出最合适的一条直线：价格 ≈ 斜率 × 面积 + 截距。</p>'),
        code: C`import pandas as pd
from sklearn.linear_model import LinearRegression

h = pd.read_csv("houses.csv")
X = h[["size_m2"]]   #: a table (2-D) of inputs || 输入必须是表格（二维）
y = h["price_k"]
model = LinearRegression().fit(X, y)
print("slope", round(model.coef_[0], 2), "intercept", round(model.intercept_, 1))
print(model.predict(pd.DataFrame({"size_m2": [80, 150]})).round(1))`, files: ['houses.csv'] },
      { title: T('Seeing the fit', '把拟合画出来'),
        body: T('<p>Plot the points and the model’s line together.</p>', '<p>把数据点和模型的直线画在一起。</p>'),
        code: C`import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

h = pd.read_csv("houses.csv").sort_values("size_m2")
model = LinearRegression().fit(h[["size_m2"]], h["price_k"])
plt.scatter(h["size_m2"], h["price_k"], alpha=0.6)
plt.plot(h["size_m2"], model.predict(h[["size_m2"]]), color="red")
plt.title("Linear Fit")`, files: ['houses.csv'] },
      { title: T('Curves: polynomial regression', '曲线：多项式回归'),
        body: T('<p>When the data bends, fit a curve. <code>np.polyfit</code> finds the coefficients.</p>', '<p>数据有弯曲时，就拟合一条曲线。<code>np.polyfit</code> 会算出系数。</p>'),
        code: C`import numpy as np

hour = np.array([1, 2, 3, 4, 5, 6, 7, 8])
speed = np.array([90, 72, 60, 55, 57, 66, 80, 98])
coef = np.polyfit(hour, speed, 2)
curve = np.poly1d(coef)
print(np.round(coef, 2))
print(round(curve(4.5), 1))`},
      { title: T('Several features: multiple regression', '多个特征：多元回归'),
        body: T('<p>Give the model more columns. Each gets its own coefficient.</p>', '<p>给模型更多列。每一列都会得到自己的系数。</p>'),
        code: C`import pandas as pd
from sklearn.linear_model import LinearRegression

h = pd.read_csv("houses.csv")
features = ["size_m2", "bedrooms", "age_years"]
model = LinearRegression().fit(h[features], h["price_k"])
for name, c in zip(features, model.coef_):
    print(name, round(c, 2))`, files: ['houses.csv'] },
      { title: T('Train/test split', '训练集 / 测试集划分'),
        body: T('<p>Never judge a model on the data it learned from. Hold back a test set; <code>score</code> gives R² (1.0 is perfect).</p>', '<p>不要用模型学过的数据来评价它。留出一部分作为测试集；<code>score</code> 给出 R²（1.0 是完美）。</p>'),
        code: C`import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

h = pd.read_csv("houses.csv")
X, y = h[["size_m2", "bedrooms", "age_years"]], h["price_k"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)
model = LinearRegression().fit(X_train, y_train)
print("train R2", round(model.score(X_train, y_train), 3))
print("test R2 ", round(model.score(X_test, y_test), 3))`, files: ['houses.csv'] },
      { title: T('Scaling features', '特征缩放'),
        body: T('<p>Features on very different scales (m² vs years) can confuse some models. <code>StandardScaler</code> turns each into z-scores.</p>', '<p>尺度差异很大的特征（平方米和年数）会干扰某些模型。<code>StandardScaler</code> 把每个特征都转成 z 分数。</p>'),
        code: C`import pandas as pd
from sklearn.preprocessing import StandardScaler

h = pd.read_csv("houses.csv")
scaled = StandardScaler().fit_transform(h[["size_m2", "age_years"]])
print(scaled[:3].round(2))
print(scaled.mean(axis=0).round(2), scaled.std(axis=0).round(2))`, files: ['houses.csv'] }
    ],
    quiz: [
      { q: T('Why keep a separate test set?', '为什么要留出单独的测试集？'), options: [T('To train faster', '训练更快'), T('To check the model on data it has not seen', '用模型没见过的数据来检验它'), T('It is required by Python', 'Python 要求这样做')], answer: 1, why: T('A model can memorise its training data; the test set shows how it generalises.', '模型可能会把训练数据背下来；测试集能看出它的泛化能力。') },
      { q: T('In scikit-learn, what shape must X have?', '在 scikit-learn 里，X 必须是什么形状？'), options: [T('A single list', '一个列表'), T('A 2-D table (rows × features)', '二维表格（行 × 特征）')], answer: 1, why: T('That is why we write h[["size_m2"]] with double brackets.', '所以我们要用双中括号写 h[["size_m2"]]。') },
      { q: T('An R² of 0.95 on the test set means…', '测试集上 R² 为 0.95 表示……'), options: [T('The model explains most of the variation', '模型解释了大部分变化'), T('95 % of predictions are exact', '95% 的预测完全准确')], answer: 0, why: T('R² measures explained variance, not exact hits.', 'R² 衡量的是被解释的方差，而不是完全命中的比例。') }
    ]
  });

  const houses = 'import pandas as pd\nh = pd.read_csv("houses.csv")';
  add({ id: 1601, section: 'regression', level: 'easy',
    title: T('Predict a Price', '预测价格'),
    desc: T('<p>Fit a <code>LinearRegression</code> called <code>model</code> that predicts <code>price_k</code> from <code>size_m2</code> (all rows of <code>h</code>). Then create <code>pred_100</code>: the predicted price for a 100 m² house, rounded to 1 decimal.</p>',
      '<p>用 <code>h</code> 的全部数据训练一个名为 <code>model</code> 的 <code>LinearRegression</code>，用 <code>size_m2</code> 预测 <code>price_k</code>。然后建立 <code>pred_100</code>：100 平方米房子的预测价格，保留 1 位小数。</p>'),
    given: T('<p><code>h</code> — the houses table; <code>pd</code> is imported</p>', '<p><code>h</code>——房屋表格；<code>pd</code> 已经导入</p>'),
    files: ['houses.csv'], setup: houses,
    starter: C`from sklearn.linear_model import LinearRegression

`,
    solution: C`from sklearn.linear_model import LinearRegression

model = LinearRegression().fit(h[["size_m2"]], h["price_k"])
pred_100 = round(model.predict(pd.DataFrame({"size_m2": [100]}))[0], 1)
print(pred_100)`,
    hints: [T('<code>LinearRegression().fit(h[["size_m2"]], h["price_k"])</code>.', '<code>LinearRegression().fit(h[["size_m2"]], h["price_k"])</code>。'), T('<code>model.predict(…)</code> returns an array; take <code>[0]</code>. Pass a one-row table such as <code>pd.DataFrame({"size_m2": [100]})</code>.', '<code>model.predict(…)</code> 返回一个数组，取 <code>[0]</code>。传入一个只有一行的表格，例如 <code>pd.DataFrame({"size_m2": [100]})</code>。')],
    explain: T('fit → predict is the whole scikit-learn workflow; every model follows it.', 'fit → predict 就是 scikit-learn 的完整流程；每个模型都是这样用的。'),
    check: values(['pred_100'], { asserts: [need('type(model).__name__ == "LinearRegression"', '<code>model</code> must be a LinearRegression.', '<code>model</code> 必须是 LinearRegression。')] }) });

  add({ id: 1602, section: 'regression', level: 'medium',
    title: T('Three Features', '三个特征'),
    desc: T('<p>Fit a <code>LinearRegression</code> called <code>model</code> on all rows of <code>h</code>, using the features <code>size_m2</code>, <code>bedrooms</code>, <code>age_years</code> (in that order) to predict <code>price_k</code>. Then create <code>pred</code>: the predicted price for a 120 m², 3-bedroom, 10-year-old house, rounded to 1 decimal.</p>',
      '<p>用 <code>h</code> 的全部数据训练一个名为 <code>model</code> 的 <code>LinearRegression</code>，以 <code>size_m2</code>、<code>bedrooms</code>、<code>age_years</code>（按这个顺序）为特征来预测 <code>price_k</code>。然后建立 <code>pred</code>：一间 120 平方米、3 间卧室、房龄 10 年的房子的预测价格，保留 1 位小数。</p>'),
    given: T('<p><code>h</code> — the houses table; <code>pd</code> is imported</p>', '<p><code>h</code>——房屋表格；<code>pd</code> 已经导入</p>'),
    files: ['houses.csv'], setup: houses,
    starter: C`from sklearn.linear_model import LinearRegression

features = ["size_m2", "bedrooms", "age_years"]
`,
    solution: C`from sklearn.linear_model import LinearRegression

features = ["size_m2", "bedrooms", "age_years"]
model = LinearRegression().fit(h[features], h["price_k"])
new_house = pd.DataFrame([[120, 3, 10]], columns=features)
pred = round(model.predict(new_house)[0], 1)
print(pred)`,
    hints: [T('Fit on <code>h[features]</code>.', '用 <code>h[features]</code> 来训练。'), T('Predict with <code>pd.DataFrame([[120, 3, 10]], columns=features)</code>.', '用 <code>pd.DataFrame([[120, 3, 10]], columns=features)</code> 来预测。')],
    explain: T('Each coefficient is "how much the price changes when this feature goes up by 1, others unchanged".', '每个系数的意思是"其他特征不变时，这个特征增加 1，价格会变化多少"。'),
    check: values(['pred', 'model.coef_.round(3)'], { asserts: [need('type(model).__name__ == "LinearRegression"', '<code>model</code> must be a LinearRegression.', '<code>model</code> 必须是 LinearRegression。')] }) });

  add({ id: 1603, section: 'regression', level: 'medium',
    title: T('Score on Unseen Data', '在没见过的数据上评分'),
    desc: T('<p>Split <code>X</code> and <code>y</code> with <code>train_test_split(X, y, test_size=0.25, random_state=0)</code>, fit a <code>LinearRegression</code> on the training part, and create <code>r2</code>: its score on the <b>test</b> part, rounded to 3 decimals.</p>',
      '<p>用 <code>train_test_split(X, y, test_size=0.25, random_state=0)</code> 划分 <code>X</code> 和 <code>y</code>，在训练部分上训练一个 <code>LinearRegression</code>，然后建立 <code>r2</code>：它在<b>测试</b>部分上的得分，保留 3 位小数。</p>'),
    given: T('<p><code>X</code> — size, bedrooms, age; <code>y</code> — price (from houses.csv)</p>', '<p><code>X</code>——面积、卧室数、房龄；<code>y</code>——价格（来自 houses.csv）</p>'),
    files: ['houses.csv'], setup: houses + '\nX = h[["size_m2", "bedrooms", "age_years"]]\ny = h["price_k"]',
    starter: C`from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

`,
    solution: C`from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)
model = LinearRegression().fit(X_train, y_train)
r2 = round(model.score(X_test, y_test), 3)
print(r2)`,
    hints: [T('<code>train_test_split</code> returns four parts: <code>X_train, X_test, y_train, y_test</code>.', '<code>train_test_split</code> 返回四个部分：<code>X_train, X_test, y_train, y_test</code>。'), T('<code>model.score(X_test, y_test)</code>.', '<code>model.score(X_test, y_test)</code>。')],
    explain: T('The same <code>random_state</code> gives the same split, so results can be reproduced.', '相同的 <code>random_state</code> 会得到相同的划分，结果才能重现。'),
    check: values(['r2']) });

  // ================================================================ 17. Classification & Clustering
  lesson('classify', {
    intro: T('<p><b>Classification</b> predicts a category (spam or not, which flower species). <b>Clustering</b> finds groups in data that has no labels at all. The fit / predict pattern stays the same.</p>',
      '<p><b>分类</b>预测一个类别（是不是垃圾邮件、是哪种花）。<b>聚类</b>在完全没有标签的数据里找出分组。fit / predict 的用法不变。</p>'),
    cards: [
      { title: T('The iris flowers', '鸢尾花数据'),
        body: T('<p>150 flowers, 4 measurements each, 3 species. It comes with scikit-learn.</p>', '<p>150 朵花，每朵 4 项测量值，共 3 个品种。它是 scikit-learn 自带的数据。</p>'),
        code: C`from sklearn.datasets import load_iris

iris = load_iris(as_frame=True)
df = iris.frame
print(df.head())
print(iris.target_names)
print(df["target"].value_counts())`},
      { title: T('Logistic regression', '逻辑回归'),
        body: T('<p>Despite its name, it classifies. <code>accuracy_score</code> is the share of correct answers.</p>', '<p>虽然名字叫回归，它其实是做分类的。<code>accuracy_score</code> 是答对的比例。</p>'),
        code: C`from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
model = LogisticRegression(max_iter=500).fit(X_train, y_train)
print(accuracy_score(y_test, model.predict(X_test)))`},
      { title: T('Decision trees', '决策树'),
        body: T('<p>A tree asks yes/no questions about the features. You can print the questions it learned.</p>', '<p>决策树针对特征提出一连串"是/否"问题。你可以把它学到的问题打印出来。</p>'),
        code: C`from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier, export_text

iris = load_iris()
tree = DecisionTreeClassifier(max_depth=2, random_state=0).fit(iris.data, iris.target)
print(export_text(tree, feature_names=list(iris.feature_names)))`},
      { title: T('K nearest neighbours', 'K 近邻'),
        body: T('<p>KNN labels a new point by the votes of the k closest training points — so scale the features first.</p>', '<p>KNN 根据离新数据最近的 k 个训练点投票来决定它的类别——所以要先缩放特征。</p>'),
        code: C`from sklearn.datasets import load_wine
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

X, y = load_wine(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
for k in (1, 5, 15):
    knn = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=k)).fit(X_train, y_train)
    print(k, round(knn.score(X_test, y_test), 3))`},
      { title: T('Confusion matrix', '混淆矩阵'),
        body: T('<p>Rows are the true classes, columns the predicted ones. Off-diagonal numbers are mistakes.</p>', '<p>行是真实类别，列是预测类别。不在对角线上的数字就是预测错误。</p>'),
        code: C`from sklearn.metrics import confusion_matrix

actual =    ["spam", "spam", "ham", "ham", "ham", "spam"]
predicted = ["spam", "ham",  "ham", "ham", "spam", "spam"]
print(confusion_matrix(actual, predicted, labels=["spam", "ham"]))`},
      { title: T('K-means clustering', 'K-means 聚类'),
        body: T('<p>No labels: K-means places k centres and assigns each point to the nearest one.</p>', '<p>没有标签：K-means 放置 k 个中心，把每个点分配给离它最近的中心。</p>'),
        code: C`import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

X, _ = make_blobs(n_samples=200, centers=3, random_state=4)
km = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X)
plt.scatter(X[:, 0], X[:, 1], c=km.labels_, s=15)
plt.scatter(km.cluster_centers_[:, 0], km.cluster_centers_[:, 1], c="red", marker="x", s=120)
plt.title("K-means with 3 Clusters")`},
      { title: T('Hierarchical clustering', '层次聚类'),
        body: T('<p>Agglomerative clustering starts with every point alone and keeps merging the closest groups.</p>', '<p>凝聚式聚类一开始让每个点各自成组，然后不断合并最接近的两组。</p>'),
        code: C`from sklearn.datasets import make_blobs
from sklearn.cluster import AgglomerativeClustering

X, _ = make_blobs(n_samples=12, centers=2, random_state=1)
labels = AgglomerativeClustering(n_clusters=2).fit_predict(X)
print(labels)`}
    ],
    quiz: [
      { q: T('Which task has no labels to learn from?', '哪种任务没有可供学习的标签？'), options: [T('Classification', '分类'), T('Clustering', '聚类'), T('Regression', '回归')], answer: 1, why: T('Clustering finds groups by itself.', '聚类会自己找出分组。') },
      { q: T('Why scale features before KNN?', '为什么要在 KNN 之前缩放特征？'), options: [T('KNN uses distances, so large-unit features would dominate', 'KNN 用距离计算，数值大的特征会占主导'), T('It is faster', '更快')], answer: 0, why: T('Distances mix all features; scaling makes them comparable.', '距离会混合所有特征；缩放让它们可以相互比较。') },
      { q: T('In a confusion matrix, where are the correct predictions?', '在混淆矩阵里，预测正确的数字在哪里？'), options: [T('First row', '第一行'), T('On the diagonal', '对角线上'), T('Last column', '最后一列')], answer: 1, why: T('Diagonal cells are where true class = predicted class.', '对角线上的格子表示真实类别 = 预测类别。') }
    ]
  });

  const irisSetup = 'from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)';
  add({ id: 1701, section: 'classify', level: 'easy',
    title: T('Tree for Flowers', '用决策树分花'),
    desc: T('<p>The iris data is already split into <code>X_train, X_test, y_train, y_test</code>. Train a <code>DecisionTreeClassifier</code> called <code>model</code> and create <code>acc</code>: its accuracy on the test set. It must be at least 0.9.</p>',
      '<p>鸢尾花数据已经分成 <code>X_train, X_test, y_train, y_test</code>。训练一个名为 <code>model</code> 的 <code>DecisionTreeClassifier</code>，并建立 <code>acc</code>：它在测试集上的准确率。准确率必须至少 0.9。</p>'),
    given: T('<p><code>X_train, X_test, y_train, y_test</code> — iris, 30 % test</p>', '<p><code>X_train, X_test, y_train, y_test</code>——鸢尾花数据，30% 为测试集</p>'),
    setup: irisSetup,
    starter: C`from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

`,
    solution: C`from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

model = DecisionTreeClassifier(random_state=0).fit(X_train, y_train)
acc = accuracy_score(y_test, model.predict(X_test))
print(acc)`,
    hints: [T('<code>DecisionTreeClassifier(random_state=0).fit(X_train, y_train)</code>.', '<code>DecisionTreeClassifier(random_state=0).fit(X_train, y_train)</code>。'), T('<code>accuracy_score(y_test, model.predict(X_test))</code>.', '<code>accuracy_score(y_test, model.predict(X_test))</code>。')],
    explain: T('Any reasonable tree passes; the check looks at the model type and the accuracy, not exact numbers.', '任何合理的决策树都能通过；检查的是模型类型和准确率，而不是精确的数字。'),
    check: values([], { asserts: [
      need('type(model).__name__ == "DecisionTreeClassifier"', '<code>model</code> must be a DecisionTreeClassifier.', '<code>model</code> 必须是 DecisionTreeClassifier。'),
      need('abs(acc - model.score(X_test, y_test)) < 1e-9', '<code>acc</code> must be the accuracy on the test set.', '<code>acc</code> 必须是测试集上的准确率。'),
      need('acc >= 0.9', 'Accuracy is below 0.9.', '准确率低于 0.9。')] }) });

  add({ id: 1702, section: 'classify', level: 'medium',
    title: T('Wine with KNN', '用 KNN 分辨葡萄酒'),
    desc: T('<p>The wine data is split into <code>X_train, X_test, y_train, y_test</code>. Build <code>model</code>: a pipeline that first applies <code>StandardScaler</code> and then <code>KNeighborsClassifier</code>. Fit it and create <code>acc</code>, its test accuracy (at least 0.9).</p>',
      '<p>葡萄酒数据已经分成 <code>X_train, X_test, y_train, y_test</code>。建立 <code>model</code>：一个先做 <code>StandardScaler</code>、再做 <code>KNeighborsClassifier</code> 的管道（pipeline）。训练它，并建立 <code>acc</code>：测试集准确率（至少 0.9）。</p>'),
    given: T('<p><code>X_train, X_test, y_train, y_test</code> — wine data</p>', '<p><code>X_train, X_test, y_train, y_test</code>——葡萄酒数据</p>'),
    setup: 'from sklearn.datasets import load_wine\nfrom sklearn.model_selection import train_test_split\nX, y = load_wine(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)',
    starter: C`from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

`,
    solution: C`from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

model = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5))
model.fit(X_train, y_train)
acc = model.score(X_test, y_test)
print(acc)`,
    hints: [T('<code>make_pipeline(StandardScaler(), KNeighborsClassifier())</code>.', '<code>make_pipeline(StandardScaler(), KNeighborsClassifier())</code>。'), T('A pipeline has <code>fit</code> and <code>score</code> like any model.', '管道和其他模型一样有 <code>fit</code> 和 <code>score</code>。')],
    explain: T('Without scaling, KNN on this data scores much lower — try it.', '不缩放的话，KNN 在这份数据上的得分会低很多——试试看。'),
    check: values([], { asserts: [
      need('type(model).__name__ == "Pipeline" and [type(s).__name__ for _, s in model.steps] == ["StandardScaler", "KNeighborsClassifier"]', '<code>model</code> must be a pipeline: StandardScaler, then KNeighborsClassifier.', '<code>model</code> 必须是一个管道：先 StandardScaler，再 KNeighborsClassifier。'),
      need('abs(acc - model.score(X_test, y_test)) < 1e-9', '<code>acc</code> must be the test accuracy.', '<code>acc</code> 必须是测试集准确率。'),
      need('acc >= 0.9', 'Accuracy is below 0.9.', '准确率低于 0.9。')] }) });

  add({ id: 1703, section: 'classify', level: 'easy',
    title: T('Count the Mistakes', '数一数错误'),
    desc: T('<p>Create <code>cm</code>, the confusion matrix of <code>y_true</code> and <code>y_pred</code> (use scikit-learn), and <code>wrong</code>, the number of wrong predictions.</p>', '<p>建立 <code>cm</code>：<code>y_true</code> 和 <code>y_pred</code> 的混淆矩阵（用 scikit-learn），以及 <code>wrong</code>：预测错误的个数。</p>'),
    given: T('<p><code>y_true</code>, <code>y_pred</code> — lists of class numbers</p>', '<p><code>y_true</code>、<code>y_pred</code>——类别编号列表</p>'),
    cases: ['y_true = [0, 1, 2, 2, 1, 0, 1]\ny_pred = [0, 2, 2, 2, 1, 0, 0]', 'y_true = [1, 1, 0]\ny_pred = [1, 1, 0]'],
    starter: C`from sklearn.metrics import confusion_matrix

`,
    solution: C`from sklearn.metrics import confusion_matrix

cm = confusion_matrix(y_true, y_pred)
wrong = int(cm.sum() - cm.trace())
print(cm)
print(wrong)`,
    hints: [T('<code>confusion_matrix(y_true, y_pred)</code>.', '<code>confusion_matrix(y_true, y_pred)</code>。'), T('Correct answers are on the diagonal: <code>cm.trace()</code>. Wrong = total − correct.', '正确的在对角线上：<code>cm.trace()</code>。错误数 = 总数 − 正确数。')],
    explain: T('The matrix shows <b>which</b> classes get mixed up, not just how many mistakes there are.', '混淆矩阵不仅显示错了多少，还显示<b>哪些</b>类别被弄混了。'),
    check: values(['cm', 'wrong']) });

  add({ id: 1704, section: 'classify', level: 'medium',
    title: T('Find the Groups', '找出分组'),
    desc: T('<p><code>X</code> holds 150 unlabelled points that form 3 groups. Use <code>KMeans</code> to create <code>labels</code>: one cluster number per point. The checker compares your groups with the true ones (cluster numbers may differ).</p>',
      '<p><code>X</code> 里有 150 个没有标签的点，它们分成 3 组。用 <code>KMeans</code> 建立 <code>labels</code>：每个点一个簇编号。检查程序会把你的分组和真实的分组比较（簇的编号可以不同）。</p>'),
    given: T('<p><code>X</code> — a 150 × 2 array</p>', '<p><code>X</code>——150 × 2 的数组</p>'),
    setup: 'from sklearn.datasets import make_blobs\nfrom sklearn.metrics import adjusted_rand_score\nX, _true = make_blobs(n_samples=150, centers=3, cluster_std=0.8, random_state=11)',
    starter: C`from sklearn.cluster import KMeans

`,
    solution: C`from sklearn.cluster import KMeans

labels = KMeans(n_clusters=3, n_init=10, random_state=0).fit_predict(X)
print(labels[:10])`,
    hints: [T('<code>KMeans(n_clusters=3, n_init=10, random_state=0)</code>.', '<code>KMeans(n_clusters=3, n_init=10, random_state=0)</code>。'), T('<code>.fit_predict(X)</code> returns the labels.', '<code>.fit_predict(X)</code> 返回标签。')],
    explain: T('Cluster numbers are arbitrary — "group 0" in one run may be "group 2" in another — so they are compared with the adjusted Rand score.', '簇的编号是任意的——这次的"第 0 组"可能是另一次的"第 2 组"——所以用调整兰德指数来比较。'),
    check: values([], { asserts: [
      need('len(labels) == len(X) and len(set(labels)) == 3', '<code>labels</code> must give one of 3 clusters for every point.', '<code>labels</code> 必须为每个点给出 3 个簇之一。'),
      need('adjusted_rand_score(_true, labels) > 0.9', 'The groups do not match the real ones well enough.', '分组和真实分组不够吻合。')] }) });

  // ================================================================ 18. Neural Networks
  lesson('neural', {
    intro: T('<p>A <b>neural network</b> is many small units (<b>neurons</b>) in layers. Each neuron multiplies its inputs by <b>weights</b>, adds a <b>bias</b> and passes the result through an <b>activation function</b>. Training adjusts the weights to reduce mistakes. Here you build a neuron with NumPy and train a small network with scikit-learn; big frameworks such as TensorFlow and PyTorch need a computer (see the last card).</p>',
      '<p><b>神经网络</b>由许多分层排列的小单元（<b>神经元</b>）组成。每个神经元把输入乘以<b>权重</b>，加上<b>偏置</b>，再经过<b>激活函数</b>。训练就是不断调整权重来减少错误。这里你会用 NumPy 写一个神经元，并用 scikit-learn 训练一个小网络；TensorFlow、PyTorch 这类大框架需要在电脑上运行（见最后一张卡片）。</p>'),
    cards: [
      { title: T('One neuron', '一个神经元'),
        body: T('<p>Weighted sum + bias, then an activation. The sigmoid squeezes any number into 0…1.</p>', '<p>加权求和 + 偏置，然后经过激活函数。sigmoid 把任何数字压缩到 0…1 之间。</p>'),
        code: C`import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

inputs = np.array([0.9, 0.2, 0.4])    #: e.g. rain, wind, cloud || 例如：雨、风、云
weights = np.array([2.0, -1.0, 1.5])
bias = -1.0
z = inputs @ weights + bias           #: @ is the dot product || @ 是点积
print(round(z, 3), round(sigmoid(z), 3))`},
      { title: T('Activation functions', '激活函数'),
        body: T('<p>Without them a network could only draw straight lines. ReLU is the most used today.</p>', '<p>没有激活函数，网络只能画直线。ReLU 是现在最常用的。</p>'),
        code: C`import numpy as np
import matplotlib.pyplot as plt

z = np.linspace(-5, 5, 200)
plt.plot(z, 1 / (1 + np.exp(-z)), label="sigmoid")
plt.plot(z, np.maximum(0, z) / 5, label="relu / 5")
plt.plot(z, np.tanh(z), label="tanh")
plt.legend()
plt.title("Activation Functions")`},
      { title: T('A network that reads digits', '会认数字的网络'),
        body: T('<p><code>load_digits</code> has 1,797 handwritten digits of 8 × 8 pixels. <code>MLPClassifier</code> is a small neural network; training takes a few seconds.</p>', '<p><code>load_digits</code> 有 1,797 个 8 × 8 像素的手写数字。<code>MLPClassifier</code> 是一个小型神经网络；训练需要几秒钟。</p>'),
        code: C`from sklearn.datasets import load_digits
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split

X, y = load_digits(return_X_y=True)
X = X / 16                     #: pixel values 0–16 → 0–1 || 像素值 0–16 → 0–1
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
net = MLPClassifier(hidden_layer_sizes=(32,), max_iter=200, random_state=0)
net.fit(X_train, y_train)
print("test accuracy", round(net.score(X_test, y_test), 3))
print("predicted", net.predict(X_test[:10]), "actual", y_test[:10])`},
      { title: T('Watching it learn', '看它学习'),
        body: T('<p><code>loss_curve_</code> records the error after each pass over the data (an <b>epoch</b>). It should go down.</p>', '<p><code>loss_curve_</code> 记录每一轮（<b>epoch</b>）训练后的误差。它应该逐渐下降。</p>'),
        code: C`import matplotlib.pyplot as plt
from sklearn.datasets import load_digits
from sklearn.neural_network import MLPClassifier

X, y = load_digits(return_X_y=True)
net = MLPClassifier(hidden_layer_sizes=(32,), max_iter=60, random_state=0).fit(X / 16, y)
plt.plot(net.loss_curve_)
plt.title("Training Loss")
plt.xlabel("Epoch")
plt.ylabel("Loss")`},
      { title: T('Overfitting', '过拟合'),
        body: T('<p>A big network trained on few examples can memorise them: training accuracy near 1.0 but worse on new data. More data or a simpler model helps.</p>', '<p>用很少的例子训练很大的网络，它可能会把例子背下来：训练准确率接近 1.0，但在新数据上表现变差。更多的数据或更简单的模型会有帮助。</p>'),
        code: C`from sklearn.datasets import load_digits
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split

X, y = load_digits(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X / 16, y, train_size=100, random_state=1)
net = MLPClassifier(hidden_layer_sizes=(128,), max_iter=400, random_state=0).fit(X_train, y_train)
print("train", round(net.score(X_train, y_train), 3))
print("test ", round(net.score(X_test, y_test), 3))`},
      { title: T('The same idea in TensorFlow and PyTorch', '同样的想法，用 TensorFlow 和 PyTorch 写'),
        body: T('<p>Real deep-learning projects use these frameworks on a computer or in Google Colab (they do not run in a browser). The structure is the same as above: layers, an activation, fit and evaluate.</p>', '<p>真正的深度学习项目会在电脑或 Google Colab 上使用这些框架（它们不能在浏览器里运行）。结构和上面一样：层、激活函数、训练和评估。</p>'),
        readonly: true,
        code: C`#: TensorFlow / Keras || TensorFlow / Keras
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(64,)),
    tf.keras.layers.Dense(32, activation="relu"),
    tf.keras.layers.Dense(10, activation="softmax"),
])
model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
model.fit(X_train, y_train, epochs=20)
model.evaluate(X_test, y_test)

#: PyTorch || PyTorch
import torch
from torch import nn

net = nn.Sequential(nn.Linear(64, 32), nn.ReLU(), nn.Linear(32, 10))
optimizer = torch.optim.Adam(net.parameters())
loss_fn = nn.CrossEntropyLoss()
for epoch in range(20):
    optimizer.zero_grad()
    loss = loss_fn(net(X_train), y_train)
    loss.backward()
    optimizer.step()`}
    ],
    quiz: [
      { q: T('What does a neuron compute before its activation?', '神经元在激活之前计算什么？'), options: [T('The weighted sum of inputs plus a bias', '输入的加权和再加上偏置'), T('The average of its inputs', '输入的平均值'), T('A random number', '一个随机数')], answer: 0, why: T('z = inputs · weights + bias.', 'z = 输入 · 权重 + 偏置。') },
      { q: T('Training accuracy 1.0, test accuracy 0.7. This is…', '训练准确率 1.0，测试准确率 0.7。这是……'), options: [T('Underfitting', '欠拟合'), T('Overfitting', '过拟合'), T('Perfect', '完美')], answer: 1, why: T('The model memorised the training data.', '模型把训练数据背下来了。') },
      { q: T('Why can this app not run TensorFlow?', '为什么本应用不能运行 TensorFlow？'), options: [T('It is not written in Python', '它不是用 Python 写的'), T('It is not built for in-browser Python and is very large', '它没有为浏览器中的 Python 打包，而且非常大')], answer: 1, why: T('Pyodide includes scikit-learn but not TensorFlow or PyTorch.', 'Pyodide 包含 scikit-learn，但不包含 TensorFlow 或 PyTorch。') }
    ]
  });

  add({ id: 1801, section: 'neural', level: 'easy',
    title: T('Sigmoid', 'Sigmoid 函数'),
    desc: T('<p>Write <code>sigmoid(x)</code> that returns 1 / (1 + e<sup>−x</sup>). Use <code>math.exp</code> (or NumPy).</p>', '<p>写一个函数 <code>sigmoid(x)</code>，返回 1 / (1 + e<sup>−x</sup>)。用 <code>math.exp</code>（或 NumPy）。</p>'),
    starter: C`import math

def sigmoid(x):
    pass
`,
    solution: C`import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))`,
    hints: [T('<code>math.exp(-x)</code> is e<sup>−x</sup>.', '<code>math.exp(-x)</code> 就是 e<sup>−x</sup>。')],
    explain: T('sigmoid(0) = 0.5; large positive inputs approach 1, large negative inputs approach 0.', 'sigmoid(0) = 0.5；很大的正数趋近 1，很大的负数趋近 0。'),
    check: fn('sigmoid', [[0], [2], [-1], [10]]) });

  add({ id: 1802, section: 'neural', level: 'medium',
    title: T('A Neuron Function', '神经元函数'),
    desc: T('<p>Write <code>neuron(inputs, weights, bias)</code>: multiply each input by its weight, add them up, add the bias, and return the sigmoid of the result. <code>inputs</code> and <code>weights</code> are lists of the same length.</p>',
      '<p>写一个函数 <code>neuron(inputs, weights, bias)</code>：把每个输入乘以对应的权重，加起来，再加上偏置，返回结果的 sigmoid 值。<code>inputs</code> 和 <code>weights</code> 是长度相同的列表。</p>'),
    starter: C`import math

def neuron(inputs, weights, bias):
    pass
`,
    solution: C`import math

def neuron(inputs, weights, bias):
    z = sum(x * w for x, w in zip(inputs, weights)) + bias
    return 1 / (1 + math.exp(-z))`,
    hints: [T('<code>zip(inputs, weights)</code> pairs them up.', '<code>zip(inputs, weights)</code> 把它们一一配对。'), T('Reuse the sigmoid formula from the previous problem.', '沿用上一题的 sigmoid 公式。')],
    explain: T('A whole network is just many of these, layer after layer — NumPy does each layer as one matrix product.', '整个网络就是一层又一层的许多这样的神经元——NumPy 用一次矩阵乘法完成一整层。'),
    check: fn('neuron', [[[0.9, 0.2, 0.4], [2.0, -1.0, 1.5], -1.0], [[1, 1], [0, 0], 0], [[0.5], [-4], 1]]) });

  add({ id: 1803, section: 'neural', level: 'hard',
    title: T('Train a Digit Reader', '训练一个认数字的网络'),
    desc: T('<p>The digits are split and scaled into <code>X_train, X_test, y_train, y_test</code>. Train an <code>MLPClassifier</code> called <code>net</code> with <code>random_state=0</code> and create <code>acc</code>: its accuracy on the test set. It must reach at least 0.9. Keep the network small (e.g. one hidden layer of 32) so it trains in a few seconds.</p>',
      '<p>数字数据已经划分并缩放为 <code>X_train, X_test, y_train, y_test</code>。训练一个名为 <code>net</code>、<code>random_state=0</code> 的 <code>MLPClassifier</code>，并建立 <code>acc</code>：测试集准确率。必须至少达到 0.9。网络保持小一点（例如一个 32 个神经元的隐藏层），这样几秒钟就能训练完。</p>'),
    given: T('<p><code>X_train, X_test, y_train, y_test</code> — digits, pixels scaled to 0–1</p>', '<p><code>X_train, X_test, y_train, y_test</code>——数字数据，像素已缩放到 0–1</p>'),
    setup: 'from sklearn.datasets import load_digits\nfrom sklearn.model_selection import train_test_split\nX, y = load_digits(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X / 16, y, random_state=0)',
    starter: C`from sklearn.neural_network import MLPClassifier

`,
    solution: C`from sklearn.neural_network import MLPClassifier

net = MLPClassifier(hidden_layer_sizes=(32,), max_iter=200, random_state=0)
net.fit(X_train, y_train)
acc = net.score(X_test, y_test)
print(acc)`,
    hints: [T('<code>MLPClassifier(hidden_layer_sizes=(32,), max_iter=200, random_state=0)</code>.', '<code>MLPClassifier(hidden_layer_sizes=(32,), max_iter=200, random_state=0)</code>。'), T('<code>net.fit(…)</code>, then <code>net.score(X_test, y_test)</code>.', '<code>net.fit(…)</code>，然后 <code>net.score(X_test, y_test)</code>。')],
    explain: T('A small network already reads handwritten digits with over 90 % accuracy — the same idea, scaled up, powers modern image recognition.', '一个小网络就能以超过 90% 的准确率认出手写数字——把同样的想法放大，就是现代图像识别的基础。'),
    check: values([], { asserts: [
      need('type(net).__name__ == "MLPClassifier"', '<code>net</code> must be an MLPClassifier.', '<code>net</code> 必须是 MLPClassifier。'),
      need('abs(acc - net.score(X_test, y_test)) < 1e-9', '<code>acc</code> must be the test accuracy.', '<code>acc</code> 必须是测试集准确率。'),
      need('acc >= 0.9', 'Accuracy is below 0.9.', '准确率低于 0.9。')] }) });

  // ================================================================ What to learn next
  PYC.NEXT = {
    intro: T('<p>You have covered the Python foundations, data analysis and the core ideas of machine learning. Here is where to go from here, and why some topics are not in this app.</p>',
      '<p>你已经学完了 Python 基础、数据分析和机器学习的核心概念。下面是接下来可以学的方向，以及为什么有些主题不在本应用里。</p>'),
    sections: [
      { title: T('Deep learning', '深度学习'),
        body: T('<p>Deep learning means neural networks with many layers. It powers image recognition, speech and large language models. It needs much more computing power than a phone browser offers, usually a GPU.</p>',
          '<p>深度学习指的是有很多层的神经网络。图像识别、语音和大型语言模型都靠它。它需要的计算能力远超手机浏览器，通常需要 GPU。</p>') },
      { title: T('TensorFlow and PyTorch', 'TensorFlow 和 PyTorch'),
        body: T('<p>The two main deep-learning frameworks. <b>PyTorch</b> (from Meta) is the most common in research and new projects; <b>TensorFlow / Keras</b> (from Google) is widely used in industry. Both build on what you learned: arrays, layers, activations, fit and evaluate. Neither runs inside this app.</p>',
          '<p>两大主流深度学习框架。<b>PyTorch</b>（Meta 开发）在研究和新项目中最常见；<b>TensorFlow / Keras</b>（Google 开发）在工业界应用广泛。两者都建立在你学过的东西之上：数组、层、激活函数、训练和评估。它们都不能在本应用里运行。</p>') },
      { title: T('YOLO and object detection', 'YOLO 与物体检测'),
        body: T('<p><b>YOLO</b> ("You Only Look Once") finds and labels objects in images — people, cars, fruit — and draws boxes around them. Modern versions (from Ultralytics) are built on PyTorch. To learn it you first need convolutional neural networks (CNNs) and image data handling, then a GPU.</p>',
          '<p><b>YOLO</b>（"You Only Look Once"）能在图片中找出物体——人、车、水果——并加上标签和框。现在的版本（Ultralytics 开发）建立在 PyTorch 上。要学它，先要学卷积神经网络（CNN）和图像数据处理，还需要 GPU。</p>'),
        code: C`#: Runs on a computer or Colab, not in this app || 在电脑或 Colab 上运行，不能在本应用里运行
from ultralytics import YOLO

model = YOLO("yolo11n.pt")
results = model("street.jpg")
results[0].show()` },
      { title: T('Google Colab: a free notebook with a GPU', 'Google Colab：免费的、带 GPU 的笔记本'),
        body: T('<p><a href="https://colab.research.google.com" target="_blank" rel="noopener">Google Colab</a> runs Python notebooks in the cloud with numpy, pandas, scikit-learn, TensorFlow and PyTorch already installed, and offers a free GPU. Everything you wrote here works there too.</p>',
          '<p><a href="https://colab.research.google.com" target="_blank" rel="noopener">Google Colab</a> 在云端运行 Python 笔记本，已经装好了 numpy、pandas、scikit-learn、TensorFlow 和 PyTorch，还提供免费的 GPU。你在这里写的代码在那里也都能运行。</p>') },
      { title: T('A suggested path', '建议的学习路线'),
        body: T('<ol><li>Practise pandas and matplotlib on your own data (work spreadsheets, sports results).</li><li>Go deeper into scikit-learn: cross-validation, pipelines, feature engineering.</li><li>Learn PyTorch or Keras in Colab: dense networks, then CNNs for images.</li><li>Then object detection (YOLO) or text models, depending on your goal.</li></ol>',
          '<ol><li>用自己的数据（工作上的表格、比赛成绩）练习 pandas 和 matplotlib。</li><li>深入学习 scikit-learn：交叉验证、管道、特征工程。</li><li>在 Colab 上学 PyTorch 或 Keras：先学全连接网络，再学处理图像的 CNN。</li><li>然后根据你的目标，学物体检测（YOLO）或文本模型。</li></ol>') }
    ]
  };
})();
