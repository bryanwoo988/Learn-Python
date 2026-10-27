/* Part 3 — Data analysis: chapters 12–14 (15 problems). Data and problems written for this app.
   These chapters need the data pack (numpy, pandas, matplotlib). */
(function () {
  'use strict';
  const { T, lesson, add, file } = window.PYC;
  const C = String.raw;
  const values = (exprs, extra) => Object.assign({ type: 'values', exprs }, extra);
  const figure = { type: 'figure' };

  file('students.csv', `
name,class,gender,math,science,english
Aisyah,5A,F,52,47,82
Ben,5B,M,77,82,56
Chen Wei,5C,M,59,63,89
Divya,5A,F,80,78,86
Ethan,5B,M,80,91,96
Farah,5C,F,94,100,81
Gopal,5A,M,93,100,87
Hana,5B,F,73,65,50
Irfan,5C,M,84,71,57
Jia Hui,5A,F,63,74,56
Kumar,5B,M,73,58,93
Lily,5C,F,76,82,70
Muthu,5A,M,58,55,66
Nur,5B,F,67,63,74
Omar,5C,M,92,93,90
Priya,5A,F,49,57,71
Qistina,5B,F,50,52,84
Ravi,5C,M,63,57,79
Siew Ling,5A,F,54,59,95
Tariq,5B,M,90,93,69
`);
  file('customers.csv', `
customer_id,name,city
1,Ali,Penang
2,Mei,Ipoh
3,Raj,Kuala Lumpur
4,Siti,Johor Bahru
5,Tom,Penang
`);
  file('orders.csv', `
order_id,customer_id,amount,date
1,1,153.82,2026-03-21
2,5,80.62,2026-04-28
3,5,157.16,2026-04-26
4,5,76.48,2026-05-18
5,4,105.01,2026-04-26
6,1,106.99,2026-02-11
7,1,131.38,2026-04-25
8,2,90.92,2026-02-13
9,5,123.98,2026-06-27
10,3,104.28,2026-06-19
11,5,146.44,2026-04-23
12,3,58.63,2026-03-10
13,1,33.77,2026-05-24
14,5,69.91,2026-02-18
15,5,88.26,2026-04-23
`);
  file('weather.csv', `
month,city,temp_c,rain_mm,humidity
1,Penang,28.3,313,79
2,Penang,27.5,316,73
3,Penang,27.9,258,86
4,Penang,27.4,,75
5,Penang,29.7,294,85
6,Penang,29.6,238,85
7,Penang,27.7,106,83
8,Penang,27.0,316,72
9,Penang,26.5,218,72
10,Penang,28.5,108,73
11,Penang,28.5,,78
12,Penang,28.7,234,74
1,Cameron Highlands,17.5,303,88
2,Cameron Highlands,20.0,385,85
3,Cameron Highlands,19.8,382,87
4,Cameron Highlands,18.2,281,89
5,Cameron Highlands,20.4,256,72
6,Cameron Highlands,18.9,156,74
7,Cameron Highlands,20.1,375,79
8,Cameron Highlands,19.2,223,74
9,Cameron Highlands,19.2,,70
10,Cameron Highlands,20.7,223,72
11,Cameron Highlands,17.7,211,81
12,Cameron Highlands,20.6,384,70
`);
  file('houses.csv', `
size_m2,bedrooms,age_years,price_k
185,5,19,733
86,2,29,323
98,2,33,300
214,5,14,871
72,2,2,348
99,2,34,386
67,2,12,325
60,1,33,159
187,6,8,775
102,2,27,377
75,2,11,338
122,3,26,439
100,2,30,347
189,6,17,822
109,2,5,532
220,5,34,818
101,4,22,482
145,4,34,493
213,6,35,813
109,3,17,482
88,2,16,327
166,4,3,753
102,3,6,487
125,3,4,541
135,3,16,494
160,5,16,664
58,1,15,205
86,1,35,274
144,3,29,532
212,5,25,775
110,3,27,480
85,3,32,346
119,3,22,418
166,5,18,707
129,4,7,566
161,4,1,720
142,3,3,649
83,2,7,352
87,2,19,303
203,5,26,751
`);

  // ================================================================ 12. NumPy
  lesson('numpy', {
    intro: T('<p><b>NumPy</b> stores numbers in <b>arrays</b> and does maths on the whole array at once — no loop needed. pandas, matplotlib and scikit-learn are all built on it. By convention it is imported as <code>np</code>.</p>',
      '<p><b>NumPy</b> 把数字存在<b>数组</b>里，并且能一次对整个数组做运算——不需要循环。pandas、matplotlib 和 scikit-learn 都建立在它之上。惯例上用 <code>np</code> 作为它的简称。</p>'),
    cards: [
      { title: T('Creating arrays', '创建数组'),
        body: T('<p><code>shape</code> gives the size of each dimension.</p>', '<p><code>shape</code> 给出每个维度的大小。</p>'),
        code: C`import numpy as np

a = np.array([3, 1, 4, 1, 5])
grid = np.array([[1, 2, 3], [4, 5, 6]])
print(a, a.shape)
print(grid.shape)
print(np.arange(0, 10, 2))
print(np.zeros(3), np.linspace(0, 1, 5))`},
      { title: T('Maths on whole arrays', '对整个数组做运算'),
        body: T('<p>Operators work element by element. Compare this with a loop over a list.</p>', '<p>运算符会逐个元素计算。和用循环处理列表比较一下。</p>'),
        code: C`import numpy as np

prices = np.array([10.0, 25.5, 7.2])
print(prices * 1.06)
print(prices + np.array([1, 1, 1]))
print(prices.sum(), prices.mean(), prices.max())
print(np.round(np.sqrt(prices), 2))`},
      { title: T('Indexing and masks', '索引与掩码'),
        body: T('<p>A comparison gives an array of True/False (a <b>mask</b>); using it as an index keeps only the True positions.</p>', '<p>比较运算会得到一个由 True/False 组成的数组（<b>掩码</b>）；把它当作索引，就只保留 True 的位置。</p>'),
        code: C`import numpy as np

temps = np.array([31, 28, 35, 33, 26])
print(temps[0], temps[-2:])
hot = temps > 30
print(hot)
print(temps[hot])
print((temps > 30).sum(), "hot days")`},
      { title: T('2-D arrays and axes', '二维数组与轴'),
        body: T('<p><code>axis=0</code> works down the columns, <code>axis=1</code> across the rows.</p>', '<p><code>axis=0</code> 沿着列往下计算，<code>axis=1</code> 沿着行横向计算。</p>'),
        code: C`import numpy as np

#: rows = 3 shops, columns = 4 weeks || 行 = 3 家店，列 = 4 周
sales = np.array([[5, 7, 6, 9],
                  [3, 2, 4, 3],
                  [8, 9, 7, 10]])
print(sales.sum(axis=1))   #: total per shop || 每家店的总数
print(sales.sum(axis=0))   #: total per week || 每周的总数
print(sales[2, 3], sales[:, 0])
print(sales.reshape(2, 6))`},
      { title: T('Random numbers', '随机数'),
        body: T('<p>A generator with a fixed seed gives the same "random" numbers every run — useful for examples and tests.</p>', '<p>设定了固定种子的随机数生成器，每次运行都会产生相同的"随机"数——适合用在示例和测试里。</p>'),
        code: C`import numpy as np

rng = np.random.default_rng(42)
print(rng.integers(1, 7, size=5))
heights = rng.normal(165, 8, size=1000)
print(round(heights.mean(), 1), round(heights.std(), 1))`}
    ],
    quiz: [
      { q: T('<code>np.array([1, 2, 3]) * 2</code> gives…', '<code>np.array([1, 2, 3]) * 2</code> 的结果是……'), options: [T('[1, 2, 3, 1, 2, 3]', '[1, 2, 3, 1, 2, 3]'), T('[2 4 6]', '[2 4 6]'), T('An error', '报错')], answer: 1, why: T('NumPy multiplies each element; a list would repeat instead.', 'NumPy 会把每个元素相乘；列表则是重复。') },
      { q: T('For a 3 × 4 array, what shape does <code>.sum(axis=1)</code> have?', '对于 3 × 4 的数组，<code>.sum(axis=1)</code> 的形状是？'), options: [T('(3,)', '(3,)'), T('(4,)', '(4,)'), T('(12,)', '(12,)')], answer: 0, why: T('Summing across each row leaves one value per row.', '每一行横向相加，每行留下一个值。') },
      { q: T('What does <code>a[a > 0]</code> return?', '<code>a[a > 0]</code> 返回什么？'), options: [T('True/False values', 'True/False 值'), T('Only the positive elements', '只有正数元素'), T('The positions', '位置')], answer: 1, why: T('A boolean mask keeps the elements where it is True.', '布尔掩码会保留为 True 的元素。') }
    ]
  });

  add({ id: 1201, section: 'numpy', level: 'easy',
    title: T('Convert a Whole Array', '一次转换整个数组'),
    desc: T('<p>Turn the list <code>celsius</code> into a NumPy array and create <code>fahrenheit</code>, an array of the same temperatures in °F (× 9 / 5 + 32). No loop needed.</p>', '<p>把列表 <code>celsius</code> 转成 NumPy 数组，并建立数组 <code>fahrenheit</code>，存放对应的华氏温度（× 9 / 5 + 32）。不需要循环。</p>'),
    given: T('<p><code>celsius</code> — a list of numbers</p>', '<p><code>celsius</code>——数字列表</p>'),
    cases: ['celsius = [0, 25, 37.5, 100]', 'celsius = [-40]'],
    starter: C`import numpy as np

`,
    solution: C`import numpy as np

c = np.array(celsius)
fahrenheit = c * 9 / 5 + 32
print(fahrenheit)`,
    hints: [T('<code>np.array(celsius)</code>.', '<code>np.array(celsius)</code>。'), T('Then apply the formula to the array.', '然后对数组套用公式。')],
    explain: T('Vectorised maths replaces loops and is much faster on large data.', '向量化运算代替了循环，在大量数据上快得多。'),
    check: values(['fahrenheit'], { asserts: [{ expr: 'type(fahrenheit).__name__ == "ndarray"', msg: T('<code>fahrenheit</code> must be a NumPy array.', '<code>fahrenheit</code> 必须是 NumPy 数组。') }] }) });

  add({ id: 1202, section: 'numpy', level: 'easy',
    title: T('Above Average', '高于平均'),
    desc: T('<p>Create <code>above</code>: the scores in <code>scores</code> that are greater than the mean, in their original order.</p>', '<p>建立 <code>above</code>：<code>scores</code> 中高于平均值的分数，保持原来的顺序。</p>'),
    given: T('<p><code>scores</code> — a NumPy array</p>', '<p><code>scores</code>——NumPy 数组</p>'),
    setup: 'import numpy as np',
    cases: ['scores = np.array([55, 78, 91, 62, 84])', 'scores = np.array([10, 10, 30])'],
    starter: C``,
    solution: C`above = scores[scores > scores.mean()]
print(above)`,
    hints: [T('<code>scores.mean()</code> is the average.', '<code>scores.mean()</code> 就是平均值。'), T('Use a mask: <code>scores[scores > …]</code>.', '用掩码：<code>scores[scores > …]</code>。')],
    explain: T('Masks are the NumPy way to filter.', '掩码是 NumPy 做筛选的方式。'),
    check: values(['above']) });

  add({ id: 1203, section: 'numpy', level: 'medium',
    title: T('Shop and Week Totals', '每家店和每周的总数'),
    desc: T('<p><code>sales</code> is a 2-D array: one row per shop, one column per week. Create:</p><ul><li><code>shop_totals</code> — the total for each shop</li><li><code>best_week</code> — the index (0, 1, …) of the week with the highest total, as an <code>int</code></li></ul>',
      '<p><code>sales</code> 是一个二维数组：每行是一家店，每列是一周。建立：</p><ul><li><code>shop_totals</code>——每家店的总数</li><li><code>best_week</code>——总数最高的那一周的索引（0、1、…），类型为 <code>int</code></li></ul>'),
    given: T('<p><code>sales</code> — a 2-D NumPy array</p>', '<p><code>sales</code>——二维 NumPy 数组</p>'),
    setup: 'import numpy as np',
    cases: ['sales = np.array([[5, 7, 6, 9], [3, 2, 4, 3], [8, 9, 7, 10]])', 'sales = np.array([[1, 9], [2, 0]])'],
    starter: C``,
    solution: C`shop_totals = sales.sum(axis=1)
best_week = int(sales.sum(axis=0).argmax())
print(shop_totals, best_week)`,
    hints: [T('Per shop = across a row: <code>axis=1</code>.', '每家店 = 沿着一行：<code>axis=1</code>。'), T('<code>.argmax()</code> gives the position of the largest value.', '<code>.argmax()</code> 给出最大值所在的位置。')],
    explain: T('Choosing the axis is how you say "per row" or "per column" in NumPy.', '在 NumPy 里，选择轴就是在说"按行"还是"按列"。'),
    check: values(['shop_totals', 'best_week']) });

  add({ id: 1204, section: 'numpy', level: 'medium',
    title: T('Standardise', '标准化'),
    desc: T('<p>Create <code>z</code>: each value of <code>x</code> minus the mean of <code>x</code>, divided by the standard deviation of <code>x</code> (<code>x.std()</code>). This is called a <b>z-score</b>.</p>', '<p>建立 <code>z</code>：<code>x</code> 的每个值减去 <code>x</code> 的平均值，再除以 <code>x</code> 的标准差（<code>x.std()</code>）。这叫做 <b>z 分数</b>。</p>'),
    given: T('<p><code>x</code> — a NumPy array</p>', '<p><code>x</code>——NumPy 数组</p>'),
    setup: 'import numpy as np',
    cases: ['x = np.array([2.0, 4.0, 4.0, 4.0, 5.0, 5.0, 7.0, 9.0])', 'x = np.array([10, 20, 30])'],
    starter: C``,
    solution: C`z = (x - x.mean()) / x.std()
print(z)`,
    hints: [T('Brackets matter: subtract first, then divide.', '括号很重要：先减，再除。')],
    explain: T('After standardising, values have mean 0 and standard deviation 1 — chapter 16 uses this to scale features.', '标准化后，数值的平均值为 0、标准差为 1——第 16 章会用它来缩放特征。'),
    check: values(['z']) });

  // ================================================================ 13. pandas
  lesson('pandas', {
    intro: T('<p><b>pandas</b> works with tables. A <b>DataFrame</b> is a table with named columns; one column is a <b>Series</b>. You can load a CSV, filter rows, add columns and summarise groups — usually in one line each. It is imported as <code>pd</code>.</p>',
      '<p><b>pandas</b> 用来处理表格。<b>DataFrame</b> 是有列名的表格；其中一列是一个 <b>Series</b>。你可以读取 CSV、筛选行、增加列、分组汇总——通常每件事一行就能完成。惯例上用 <code>pd</code> 作为简称。</p>'),
    cards: [
      { title: T('Loading a CSV', '读取 CSV'),
        body: T('<p><code>head()</code> shows the first rows, <code>shape</code> the size, <code>describe()</code> quick statistics.</p>', '<p><code>head()</code> 显示前几行，<code>shape</code> 是大小，<code>describe()</code> 给出快速统计。</p>'),
        code: C`import pandas as pd

df = pd.read_csv("students.csv")
print(df.head())
print(df.shape)
print(df.describe().round(1))`, files: ['students.csv'] },
      { title: T('Choosing columns and rows', '选择列和行'),
        body: T('<p><code>df["col"]</code> is one column, <code>df[["a", "b"]]</code> several. <code>.loc</code> selects by label, <code>.iloc</code> by position.</p>', '<p><code>df["col"]</code> 是一列，<code>df[["a", "b"]]</code> 是多列。<code>.loc</code> 按标签选择，<code>.iloc</code> 按位置选择。</p>'),
        code: C`import pandas as pd

df = pd.read_csv("students.csv")
print(df["math"].mean())
print(df[["name", "math"]].head(3))
print(df.iloc[0])
print(df.loc[df["name"] == "Hana", "english"])`, files: ['students.csv'] },
      { title: T('Filtering rows', '筛选行'),
        body: T('<p>A condition on a column makes a mask, just like NumPy. Combine conditions with <code>&amp;</code> and <code>|</code>, each in brackets.</p>', '<p>对一列写条件会得到掩码，和 NumPy 一样。用 <code>&amp;</code> 和 <code>|</code> 组合条件，每个条件都要加括号。</p>'),
        code: C`import pandas as pd

df = pd.read_csv("students.csv")
good = df[df["math"] >= 80]
print(good[["name", "math"]])
print(df[(df["class"] == "5A") & (df["english"] > 70)]["name"].tolist())`, files: ['students.csv'] },
      { title: T('New columns and sorting', '新增列与排序'),
        body: T('<p>Assigning to a new column name adds it. <code>sort_values</code> orders rows.</p>', '<p>给一个新的列名赋值就会新增这一列。<code>sort_values</code> 给行排序。</p>'),
        code: C`import pandas as pd

df = pd.read_csv("students.csv")
df["total"] = df["math"] + df["science"] + df["english"]
top = df.sort_values("total", ascending=False)
print(top[["name", "total"]].head(5))`, files: ['students.csv'] },
      { title: T('Grouping', '分组汇总'),
        body: T('<p><code>groupby</code> splits the table into groups, then <code>mean</code>, <code>sum</code>, <code>count</code>… summarise each one. <code>value_counts</code> counts categories.</p>', '<p><code>groupby</code> 把表格分成几组，然后用 <code>mean</code>、<code>sum</code>、<code>count</code>……汇总每一组。<code>value_counts</code> 统计每个类别的数量。</p>'),
        code: C`import pandas as pd

df = pd.read_csv("students.csv")
print(df.groupby("class")["math"].mean().round(1))
print(df.groupby("gender")[["math", "english"]].max())
print(df["class"].value_counts())`, files: ['students.csv'] },
      { title: T('Joining two tables', '合并两个表格'),
        body: T('<p><code>merge</code> joins tables on a shared column, like a SQL JOIN.</p>', '<p><code>merge</code> 按共同的列把两个表格合并起来，就像 SQL 的 JOIN。</p>'),
        code: C`import pandas as pd

customers = pd.read_csv("customers.csv")
orders = pd.read_csv("orders.csv")
both = orders.merge(customers, on="customer_id")
print(both[["order_id", "name", "amount"]].head())
print(both.groupby("city")["amount"].sum().round(2))`, files: ['customers.csv', 'orders.csv'] },
      { title: T('Missing values', '缺失值'),
        body: T('<p>Empty cells become <code>NaN</code>. Find them with <code>isna()</code>, then <code>fillna()</code> or <code>dropna()</code>.</p>', '<p>空白的格子会变成 <code>NaN</code>。用 <code>isna()</code> 找出它们，再用 <code>fillna()</code> 或 <code>dropna()</code> 处理。</p>'),
        code: C`import pandas as pd

w = pd.read_csv("weather.csv")
print(w.isna().sum())
print(w[w["rain_mm"].isna()])
w["rain_mm"] = w["rain_mm"].fillna(w["rain_mm"].median())
print(w["rain_mm"].isna().sum())`, files: ['weather.csv'] }
    ],
    quiz: [
      { q: T('Which gives one column as a Series?', '哪一个会得到一列 Series？'), options: [T('df["math"]', 'df["math"]'), T('df[["math"]]', 'df[["math"]]'), T('df.math()', 'df.math()')], answer: 0, why: T('Double brackets give a one-column DataFrame instead.', '双中括号得到的是只有一列的 DataFrame。') },
      { q: T('How do you combine two conditions in pandas?', '在 pandas 里怎样组合两个条件？'), options: [T('cond1 and cond2', 'cond1 and cond2'), T('(cond1) &amp; (cond2)', '(cond1) &amp; (cond2)'), T('cond1, cond2', 'cond1, cond2')], answer: 1, why: T('and does not work on whole columns; use &amp; with brackets.', 'and 不能作用在整列上；要用 &amp; 并加括号。') },
      { q: T('What does <code>df.groupby("class")["math"].mean()</code> return?', '<code>df.groupby("class")["math"].mean()</code> 返回什么？'), options: [T('One number', '一个数字'), T('The average math per class', '每个班的数学平均分'), T('The whole table', '整个表格')], answer: 1, why: T('One value per group, indexed by class.', '每组一个值，以班级作为索引。') }
    ]
  });

  const pdSetup = 'import pandas as pd';
  add({ id: 1301, section: 'pandas', level: 'easy',
    title: T('How Big Is the Table?', '表格有多大？'),
    desc: T('<p>Load <code>students.csv</code> into <code>df</code>, then set <code>n_rows</code> to the number of rows and <code>n_cols</code> to the number of columns.</p>', '<p>把 <code>students.csv</code> 读进 <code>df</code>，然后把行数存进 <code>n_rows</code>，列数存进 <code>n_cols</code>。</p>'),
    files: ['students.csv'],
    starter: C`import pandas as pd

`,
    solution: C`import pandas as pd

df = pd.read_csv("students.csv")
n_rows, n_cols = df.shape
print(n_rows, n_cols)`,
    hints: [T('<code>pd.read_csv("students.csv")</code>.', '<code>pd.read_csv("students.csv")</code>。'), T('<code>df.shape</code> is <code>(rows, columns)</code>.', '<code>df.shape</code> 就是 <code>(行数, 列数)</code>。')],
    explain: T('<code>shape</code> is the first thing to check after loading data.', '读入数据后，第一件事就是看 <code>shape</code>。'),
    check: values(['n_rows', 'n_cols']) });

  add({ id: 1302, section: 'pandas', level: 'easy',
    title: T('Pick Two Columns', '选出两列'),
    desc: T('<p><code>df</code> holds <code>students.csv</code>. Create <code>result</code>: a DataFrame with only the <code>name</code> and <code>math</code> columns.</p>', '<p><code>df</code> 里是 <code>students.csv</code>。建立 <code>result</code>：只包含 <code>name</code> 和 <code>math</code> 两列的 DataFrame。</p>'),
    given: T('<p><code>df</code> — the students table (pandas is imported as <code>pd</code>)</p>', '<p><code>df</code>——学生表格（pandas 已经以 <code>pd</code> 导入）</p>'),
    files: ['students.csv'], setup: pdSetup + '\ndf = pd.read_csv("students.csv")',
    starter: C``,
    solution: C`result = df[["name", "math"]]
print(result.head())`,
    hints: [T('Use a list of column names inside the brackets: <code>df[[…]]</code>.', '在中括号里放一个列名列表：<code>df[[…]]</code>。')],
    explain: T('The outer brackets select, the inner brackets are a Python list of names.', '外层中括号表示选择，内层中括号是一个 Python 列名列表。'),
    check: values(['result'], { ordered: true }) });

  add({ id: 1303, section: 'pandas', level: 'easy',
    title: T('Strong in Maths', '数学好的学生'),
    desc: T('<p>Create <code>result</code>: all rows of <code>df</code> where <code>math</code> is 80 or more (all columns).</p>', '<p>建立 <code>result</code>：<code>df</code> 中 <code>math</code> 大于或等于 80 的所有行（保留所有列）。</p>'),
    given: T('<p><code>df</code> — the students table</p>', '<p><code>df</code>——学生表格</p>'),
    files: ['students.csv'], setup: pdSetup + '\ndf = pd.read_csv("students.csv")',
    cases: ['', 'df = df.assign(math=df["math"] - 10)'],
    starter: C``,
    solution: C`result = df[df["math"] >= 80]
print(result)`,
    hints: [T('<code>df["math"] >= 80</code> is a mask.', '<code>df["math"] >= 80</code> 是一个掩码。'), T('Put the mask in <code>df[ ]</code>.', '把掩码放进 <code>df[ ]</code>。')],
    explain: T('Boolean filtering keeps the index of the original rows; that is fine.', '布尔筛选会保留原来行的索引；这没有问题。'),
    check: values(['result']) });

  add({ id: 1304, section: 'pandas', level: 'medium',
    title: T('Average Column', '平均分列'),
    desc: T('<p>Add a column <code>average</code> to <code>df</code>: the mean of <code>math</code>, <code>science</code> and <code>english</code> for each student, rounded to 1 decimal.</p>', '<p>给 <code>df</code> 新增一列 <code>average</code>：每个学生 <code>math</code>、<code>science</code>、<code>english</code> 三科的平均分，保留 1 位小数。</p>'),
    given: T('<p><code>df</code> — the students table</p>', '<p><code>df</code>——学生表格</p>'),
    files: ['students.csv'], setup: pdSetup + '\ndf = pd.read_csv("students.csv")',
    starter: C``,
    solution: C`df["average"] = df[["math", "science", "english"]].mean(axis=1).round(1)
print(df.head())`,
    hints: [T('<code>(df["math"] + df["science"] + df["english"]) / 3</code> works.', '<code>(df["math"] + df["science"] + df["english"]) / 3</code> 就可以。'), T('Finish with <code>.round(1)</code>.', '最后加 <code>.round(1)</code>。')],
    explain: T('Column maths is vectorised, like NumPy: one line handles every row.', '列运算和 NumPy 一样是向量化的：一行就处理了所有行。'),
    check: values(['df["average"]'], { ordered: true }) });

  add({ id: 1305, section: 'pandas', level: 'medium',
    title: T('Average per Class', '每班平均分'),
    desc: T('<p>Create <code>result</code>: the average <code>math</code> score for each <code>class</code>, rounded to 1 decimal (a Series indexed by class).</p>', '<p>建立 <code>result</code>：每个 <code>class</code> 的 <code>math</code> 平均分，保留 1 位小数（以班级为索引的 Series）。</p>'),
    given: T('<p><code>df</code> — the students table</p>', '<p><code>df</code>——学生表格</p>'),
    files: ['students.csv'], setup: pdSetup + '\ndf = pd.read_csv("students.csv")',
    starter: C``,
    solution: C`result = df.groupby("class")["math"].mean().round(1)
print(result)`,
    hints: [T('<code>df.groupby("class")["math"]</code> …', '<code>df.groupby("class")["math"]</code> ……'), T('… then <code>.mean().round(1)</code>.', '……然后 <code>.mean().round(1)</code>。')],
    explain: T('groupby → pick a column → summarise is the most used pattern in pandas.', '分组 → 选列 → 汇总，是 pandas 中最常用的模式。'),
    check: values(['result']) });

  add({ id: 1306, section: 'pandas', level: 'medium',
    title: T('Top 3 in English', '英文前三名'),
    desc: T('<p>Create <code>result</code>: the <code>name</code> and <code>english</code> columns of the three students with the highest English score, highest first.</p>', '<p>建立 <code>result</code>：英文成绩最高的三个学生的 <code>name</code> 和 <code>english</code> 两列，从高到低排列。</p>'),
    given: T('<p><code>df</code> — the students table</p>', '<p><code>df</code>——学生表格</p>'),
    files: ['students.csv'], setup: pdSetup + '\ndf = pd.read_csv("students.csv")',
    starter: C``,
    solution: C`result = df.sort_values("english", ascending=False).head(3)[["name", "english"]]
print(result)`,
    hints: [T('<code>sort_values("english", ascending=False)</code>.', '<code>sort_values("english", ascending=False)</code>。'), T('Then <code>.head(3)</code> and pick the two columns.', '然后 <code>.head(3)</code>，再选出两列。')],
    explain: T('Here the order matters, so the checker compares row order too.', '这题要求顺序，所以检查时也会比较行的顺序。'),
    check: values(['result'], { ordered: true }) });

  add({ id: 1307, section: 'pandas', level: 'hard',
    title: T('Spending per Customer', '每位顾客的消费'),
    desc: T('<p>Join <code>orders.csv</code> with <code>customers.csv</code> on <code>customer_id</code>, then create <code>result</code>: the total <code>amount</code> per customer <code>name</code>, rounded to 2 decimals (a Series indexed by name).</p>', '<p>按 <code>customer_id</code> 把 <code>orders.csv</code> 和 <code>customers.csv</code> 合并，然后建立 <code>result</code>：每位顾客（<code>name</code>）的 <code>amount</code> 总和，保留 2 位小数（以名字为索引的 Series）。</p>'),
    files: ['customers.csv', 'orders.csv'],
    starter: C`import pandas as pd

customers = pd.read_csv("customers.csv")
orders = pd.read_csv("orders.csv")
`,
    solution: C`import pandas as pd

customers = pd.read_csv("customers.csv")
orders = pd.read_csv("orders.csv")
both = orders.merge(customers, on="customer_id")
result = both.groupby("name")["amount"].sum().round(2)
print(result)`,
    hints: [T('<code>orders.merge(customers, on="customer_id")</code>.', '<code>orders.merge(customers, on="customer_id")</code>。'), T('Then group by <code>"name"</code> and sum <code>"amount"</code>.', '然后按 <code>"name"</code> 分组，对 <code>"amount"</code> 求和。')],
    explain: T('Merging brings the names next to the amounts so you can group by them.', '合并之后，名字和金额就在同一张表里，可以按名字分组了。'),
    check: values(['result']) });

  add({ id: 1308, section: 'pandas', level: 'hard',
    title: T('Fill the Gaps', '补上空缺'),
    desc: T('<p><code>weather.csv</code> has some empty <code>rain_mm</code> cells. Treat missing rain as 0, then create <code>result</code>: the total rain per <code>city</code> (a Series indexed by city).</p>', '<p><code>weather.csv</code> 里有些 <code>rain_mm</code> 是空的。把缺失的降雨量当作 0，然后建立 <code>result</code>：每个 <code>city</code> 的总降雨量（以城市为索引的 Series）。</p>'),
    files: ['weather.csv'],
    starter: C`import pandas as pd

w = pd.read_csv("weather.csv")
`,
    solution: C`import pandas as pd

w = pd.read_csv("weather.csv")
w["rain_mm"] = w["rain_mm"].fillna(0)
result = w.groupby("city")["rain_mm"].sum()
print(result)`,
    hints: [T('<code>w["rain_mm"].fillna(0)</code>.', '<code>w["rain_mm"].fillna(0)</code>。'), T('Group by city and sum.', '按城市分组求和。')],
    explain: T('Deciding what a missing value means (0? the average? drop the row?) is a real choice in every analysis.', '决定缺失值代表什么（0？平均值？删掉这一行？）是每次分析都要做的选择。'),
    check: values(['result']) });

  // ================================================================ 14. Matplotlib
  lesson('plotting', {
    intro: T('<p><b>matplotlib</b> draws charts. <code>plt.plot</code>, <code>plt.bar</code>, <code>plt.scatter</code> and <code>plt.hist</code> make the four most common kinds; <code>plt.title</code>, <code>plt.xlabel</code> and <code>plt.ylabel</code> label them. In this app the chart appears under the output. Chart text is in English.</p>',
      '<p><b>matplotlib</b> 用来画图。<code>plt.plot</code>、<code>plt.bar</code>、<code>plt.scatter</code>、<code>plt.hist</code> 画出最常见的四种图；<code>plt.title</code>、<code>plt.xlabel</code>、<code>plt.ylabel</code> 加上标签。在本应用里，图会显示在输出下方。图表里的文字使用英文。</p>'),
    cards: [
      { title: T('Line chart', '折线图'),
        body: T('<p>Good for change over time.</p>', '<p>适合表现随时间的变化。</p>'),
        code: C`import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May"]
sales = [120, 135, 128, 160, 172]
plt.plot(months, sales, marker="o")
plt.title("Monthly Sales")
plt.xlabel("Month")
plt.ylabel("Sales (RM)")`},
      { title: T('Bar chart', '柱状图'),
        body: T('<p>Good for comparing categories. A pandas Series can be plotted straight from a groupby.</p>', '<p>适合比较不同类别。pandas 的分组结果可以直接拿来画图。</p>'),
        code: C`import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("students.csv")
avg = df.groupby("class")["english"].mean()
plt.bar(avg.index, avg.values, color="#3572A5")
plt.title("Average English by Class")
plt.ylabel("Score")`, files: ['students.csv'] },
      { title: T('Scatter plot', '散点图'),
        body: T('<p>Shows how two numbers relate. Each dot is one row.</p>', '<p>显示两个数值之间的关系。每个点代表一行数据。</p>'),
        code: C`import pandas as pd
import matplotlib.pyplot as plt

h = pd.read_csv("houses.csv")
plt.scatter(h["size_m2"], h["price_k"], alpha=0.7)
plt.title("House Size vs Price")
plt.xlabel("Size (m2)")
plt.ylabel("Price (RM thousand)")`, files: ['houses.csv'] },
      { title: T('Histogram', '直方图'),
        body: T('<p>Shows how values are spread: how many fall into each range (<b>bin</b>).</p>', '<p>显示数值是怎样分布的：落在每个区间（<b>bin</b>）里的有多少个。</p>'),
        code: C`import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)
heights = rng.normal(165, 8, 500)
plt.hist(heights, bins=20, edgecolor="white")
plt.title("Heights of 500 People")
plt.xlabel("Height (cm)")`},
      { title: T('Two lines, a legend and subplots', '两条线、图例和子图'),
        body: T('<p>Give each line a <code>label</code> and call <code>plt.legend()</code>. <code>plt.subplots</code> puts several charts side by side.</p>', '<p>给每条线一个 <code>label</code>，再调用 <code>plt.legend()</code>。<code>plt.subplots</code> 可以把几个图并排放。</p>'),
        code: C`import pandas as pd
import matplotlib.pyplot as plt

w = pd.read_csv("weather.csv")
fig, (left, right) = plt.subplots(1, 2, figsize=(9, 3))
for city, part in w.groupby("city"):
    left.plot(part["month"], part["temp_c"], label=city)
    right.bar(city, part["humidity"].mean())
left.set_title("Temperature")
left.legend()
right.set_title("Mean Humidity")`, files: ['weather.csv'] }
    ],
    quiz: [
      { q: T('Which chart best shows the spread of exam scores?', '哪种图最能显示考试分数的分布？'), options: [T('Line chart', '折线图'), T('Histogram', '直方图'), T('Pie chart', '饼图')], answer: 1, why: T('A histogram counts how many values fall in each range.', '直方图统计每个区间里有多少个值。') },
      { q: T('How do you label the y-axis?', '怎样给 y 轴加标签？'), options: [T('plt.title("…")', 'plt.title("…")'), T('plt.ylabel("…")', 'plt.ylabel("…")'), T('plt.y("…")', 'plt.y("…")')], answer: 1, why: T('xlabel and ylabel label the axes.', 'xlabel 和 ylabel 给坐标轴加标签。') },
      { q: T('What is a scatter plot for?', '散点图用来做什么？'), options: [T('Comparing categories', '比较类别'), T('Seeing how two numbers relate', '看两个数值之间的关系'), T('Showing parts of a whole', '显示整体中的各部分')], answer: 1, why: T('Each point pairs an x value with a y value.', '每个点都把一个 x 值和一个 y 值配成一对。') }
    ]
  });

  add({ id: 1401, section: 'plotting', level: 'easy',
    title: T('Monthly Visitors Line Chart', '每月访客折线图'),
    desc: T('<p>Draw a <b>line chart</b> of <code>visitors</code> against <code>months</code> with the title <code>Monthly Visitors</code>, x-axis label <code>Month</code> and y-axis label <code>Visitors</code>.</p>', '<p>以 <code>months</code> 为横轴、<code>visitors</code> 为纵轴画一个<b>折线图</b>，标题为 <code>Monthly Visitors</code>，x 轴标签为 <code>Month</code>，y 轴标签为 <code>Visitors</code>。</p>'),
    given: T('<p><code>months</code> — list of month names; <code>visitors</code> — list of numbers; <code>plt</code> is imported</p>', '<p><code>months</code>——月份名称列表；<code>visitors</code>——数字列表；<code>plt</code> 已经导入</p>'),
    setup: 'import matplotlib.pyplot as plt',
    cases: ['months = ["Jan", "Feb", "Mar", "Apr"]\nvisitors = [320, 410, 395, 520]', 'months = ["Oct", "Nov"]\nvisitors = [90, 75]'],
    starter: C``,
    solution: C`plt.plot(months, visitors)
plt.title("Monthly Visitors")
plt.xlabel("Month")
plt.ylabel("Visitors")`,
    hints: [T('<code>plt.plot(x, y)</code>.', '<code>plt.plot(x, y)</code>。'), T('Then <code>plt.title</code>, <code>plt.xlabel</code>, <code>plt.ylabel</code> with the exact texts.', '然后用 <code>plt.title</code>、<code>plt.xlabel</code>、<code>plt.ylabel</code> 写上题目要求的文字。')],
    explain: T('A chart without a title and axis labels is hard to read — always label them.', '没有标题和坐标轴标签的图很难看懂——一定要加上。'),
    check: figure });

  add({ id: 1402, section: 'plotting', level: 'medium',
    title: T('Bar Chart from a Group', '用分组结果画柱状图'),
    desc: T('<p>From <code>students.csv</code>, draw a <b>bar chart</b> of the average <code>science</code> score per <code>class</code>, with the title <code>Average Science by Class</code>.</p>', '<p>用 <code>students.csv</code> 画一个<b>柱状图</b>，显示每个 <code>class</code> 的 <code>science</code> 平均分，标题为 <code>Average Science by Class</code>。</p>'),
    files: ['students.csv'],
    starter: C`import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("students.csv")
`,
    solution: C`import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("students.csv")
avg = df.groupby("class")["science"].mean()
plt.bar(avg.index, avg.values)
plt.title("Average Science by Class")`,
    hints: [T('First compute <code>df.groupby("class")["science"].mean()</code>.', '先算出 <code>df.groupby("class")["science"].mean()</code>。'), T('<code>plt.bar(avg.index, avg.values)</code>.', '<code>plt.bar(avg.index, avg.values)</code>。')],
    explain: T('Summarise first, then plot the summary — not the raw rows.', '先汇总，再画汇总的结果——而不是画原始的每一行。'),
    check: figure });

  add({ id: 1403, section: 'plotting', level: 'medium',
    title: T('Score Histogram', '分数直方图'),
    desc: T('<p>Draw a <b>histogram</b> of <code>scores</code> with <b>10 bins</b> and the title <code>Score Distribution</code>.</p>', '<p>为 <code>scores</code> 画一个有 <b>10 个区间</b>的<b>直方图</b>，标题为 <code>Score Distribution</code>。</p>'),
    given: T('<p><code>scores</code> — a NumPy array of 200 exam scores; <code>plt</code> is imported</p>', '<p><code>scores</code>——200 个考试分数组成的 NumPy 数组；<code>plt</code> 已经导入</p>'),
    setup: 'import numpy as np\nimport matplotlib.pyplot as plt\nscores = np.clip(np.random.default_rng(7).normal(68, 12, 200), 0, 100).round()',
    starter: C``,
    solution: C`plt.hist(scores, bins=10)
plt.title("Score Distribution")`,
    hints: [T('<code>plt.hist(scores, bins=10)</code>.', '<code>plt.hist(scores, bins=10)</code>。')],
    explain: T('The number of bins changes how the shape looks; 10–20 is a common starting point.', '区间的数量会改变图形的样子；一般从 10 到 20 个开始。'),
    check: figure });
})();
