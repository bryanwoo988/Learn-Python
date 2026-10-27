/* Part 1 — Beginner: chapters 1–7 (35 problems). Written for this app. */
(function () {
  'use strict';
  const { T, lesson, add } = window.PYC;
  const C = String.raw;
  const stdout = { type: 'stdout' };

  // ================================================================ 1. Getting Started
  lesson('start', {
    intro: T('<p>A Python program is a list of instructions that run from top to bottom. Every grey box below is real Python: change it and press <b>Run</b>. You cannot break anything — <b>Reset</b> brings the example back.</p>',
      '<p>Python 程序就是一行行从上往下执行的指令。下面每个灰色框都是真正的 Python：改一改再按<b>运行</b>。不用怕弄坏——按<b>重置</b>就能恢复原样。</p>'),
    cards: [
      { title: T('print() shows things', 'print() 显示内容'),
        body: T('<p><code>print()</code> writes whatever is inside the brackets. Text goes inside quotes; numbers and calculations do not.</p>',
          '<p><code>print()</code> 会把括号里的东西显示出来。文字要放在引号里；数字和算式不用。</p>'),
        code: C`print("Hello, world!")
print(2 + 3)
print("2 + 3")`},
      { title: T('Comments', '注释'),
        body: T('<p>Everything after <code>#</code> on a line is a <b>comment</b>: a note for people. Python skips it.</p>',
          '<p>一行里 <code>#</code> 后面的内容是<b>注释</b>：写给人看的说明，Python 会跳过它。</p>'),
        code: C`#: This whole line is a comment || 这一整行都是注释
print("Comments are ignored")  #: so is this part || 这一部分也是
# print("This line does not run")`},
      { title: T('Variables store values', '变量用来存放值'),
        body: T('<p>A <b>variable</b> is a name for a value. <code>=</code> means "store the value on the right in the name on the left". You can change it later.</p>',
          '<p><b>变量</b>就是一个值的名字。<code>=</code> 的意思是"把右边的值存进左边的名字"。之后可以改。</p>'),
        code: C`name = "Ada"
age = 36
print(name)
print(age)
age = age + 1  #: use the old value to make a new one || 用旧的值算出新的值
print(age)`},
      { title: T('Several values in one print()', '一个 print() 显示多个值'),
        body: T('<p>Separate values with commas. <code>print</code> puts a space between them; <code>sep=</code> changes that.</p>',
          '<p>用逗号把值隔开。<code>print</code> 会在它们之间加一个空格；用 <code>sep=</code> 可以换成别的。</p>'),
        code: C`city = "Penang"
print("I live in", city)
print("Total:", 3 + 4)
print("2026", "10", "27", sep="-")`},
      { title: T('Indentation matters', '缩进很重要'),
        body: T('<p>Python uses the spaces at the start of a line to group code. The indented line belongs to the <code>if</code> above it. Mistakes show an error — try removing the spaces before <code>print</code>.</p>',
          '<p>Python 用行首的空格把代码分组。缩进的那一行属于上面的 <code>if</code>。写错会报错——试着删掉 <code>print</code> 前面的空格。</p>'),
        code: C`if 5 > 2:
    print("Five is greater than two")
print("This line always runs")`},
      { title: T('Reading an error', '看懂报错'),
        body: T('<p>This example has a mistake on purpose. The error tells you the <b>line</b> and the <b>kind</b> of problem, and the app adds a hint underneath. Fix it and run again.</p>',
          '<p>这个例子故意写错了。报错会告诉你出错的<b>行</b>和问题的<b>类型</b>，应用还会在下面加一句提示。改好后再运行。</p>'),
        code: C`print("Hello)`, expectError: true }
    ],
    quiz: [
      { q: T('What does <code>print(4 * 2)</code> show?', '<code>print(4 * 2)</code> 显示什么？'),
        options: [T('4 * 2', '4 * 2'), T('8', '8'), T('42', '42')], answer: 1, why: T('Without quotes, Python calculates first.', '没有引号时，Python 会先计算。') },
      { q: T('What does Python do with a line starting with <code>#</code>?', 'Python 怎样处理以 <code>#</code> 开头的一行？'),
        options: [T('Prints it', '把它打印出来'), T('Skips it', '跳过它'), T('Shows an error', '报错')], answer: 1, why: T('It is a comment, a note for people.', '它是注释，是写给人看的说明。') },
      { q: T('After <code>x = 5</code> and then <code>x = x + 2</code>, what is <code>x</code>?', '执行 <code>x = 5</code> 再执行 <code>x = x + 2</code> 后，<code>x</code> 是多少？'),
        options: [T('5', '5'), T('2', '2'), T('7', '7')], answer: 2, why: T('The right side uses the old value 5, then stores 7.', '右边先用旧的值 5 计算，再把 7 存回去。') }
    ]
  });

  add({ id: 101, section: 'start', level: 'easy',
    title: T('Hello, Python!', '你好，Python！'),
    desc: T('<p>Print exactly this line:</p><pre>Hello, Python!</pre>', '<p>准确地打印出这一行：</p><pre>Hello, Python!</pre>'),
    starter: C`#: Write your code below || 在下面写代码
`,
    solution: C`print("Hello, Python!")`,
    hints: [T('Use <code>print( )</code> with the text inside quotes.', '用 <code>print( )</code>，把文字放在引号里。'),
      T('Capital letters, the comma and the <code>!</code> must match exactly.', '大小写、逗号和 <code>!</code> 都要完全一样。')],
    explain: T('Text in quotes is a <b>string</b>; <code>print</code> shows it exactly as written.', '引号里的文字叫<b>字符串</b>；<code>print</code> 会原样显示它。'),
    check: stdout });

  add({ id: 102, section: 'start', level: 'easy',
    title: T('Two Lines', '两行文字'),
    desc: T('<p>Print these two lines, in this order:</p><pre>I am learning Python\nIt is fun</pre>', '<p>按顺序打印这两行：</p><pre>I am learning Python\nIt is fun</pre>'),
    starter: C`#: One print() makes one line || 一个 print() 输出一行
`,
    solution: C`print("I am learning Python")
print("It is fun")`,
    hints: [T('Each <code>print()</code> starts a new line.', '每个 <code>print()</code> 都会另起一行。'), T('Write two <code>print()</code> lines.', '写两行 <code>print()</code>。')],
    explain: T('Programs run top to bottom, so the first <code>print</code> appears first.', '程序从上往下执行，所以第一个 <code>print</code> 的内容先出现。'),
    check: stdout });

  add({ id: 103, section: 'start', level: 'easy',
    title: T('Who Was Born When', '谁出生于哪一年'),
    desc: T('<p>The variables <code>name</code> and <code>year</code> already hold a person and a year. Print one line like:</p><pre>Ada was born in 1815</pre><p>Use the variables — the hidden tests use other people.</p>',
      '<p>变量 <code>name</code> 和 <code>year</code> 已经存好了一个人名和一个年份。打印一行，例如：</p><pre>Ada was born in 1815</pre><p>要用变量——隐藏测试会换成别人。</p>'),
    given: T('<p><code>name</code> — text, e.g. <code>"Ada"</code><br><code>year</code> — a whole number, e.g. <code>1815</code></p>', '<p><code>name</code>——文字，例如 <code>"Ada"</code><br><code>year</code>——整数，例如 <code>1815</code></p>'),
    cases: ['name = "Ada"\nyear = 1815', 'name = "Alan"\nyear = 1912', 'name = "Grace"\nyear = 1906'],
    starter: C`#: name and year already exist || name 和 year 已经存在
`,
    solution: C`print(name, "was born in", year)`,
    hints: [T('<code>print</code> can take several values separated by commas.', '<code>print</code> 可以放几个用逗号隔开的值。'),
      T('Do not put quotes around <code>name</code> or <code>year</code> — you want their values, not the words.', '不要给 <code>name</code> 和 <code>year</code> 加引号——你要的是它们的值，不是这两个词。')],
    explain: T('<code>print(a, b, c)</code> joins the values with spaces. Using variables makes one program work for any data.', '<code>print(a, b, c)</code> 会用空格把值连起来。用变量，同一段程序就能处理任何数据。'),
    check: stdout });

  add({ id: 104, section: 'start', level: 'medium',
    title: T('Swap Two Variables', '交换两个变量'),
    desc: T('<p>Swap the values of <code>a</code> and <code>b</code>, then print <code>a</code> and then <code>b</code> on separate lines. If <code>a = 1</code> and <code>b = 2</code>, the output is:</p><pre>2\n1</pre>',
      '<p>交换 <code>a</code> 和 <code>b</code> 的值，然后分两行先打印 <code>a</code> 再打印 <code>b</code>。如果 <code>a = 1</code>、<code>b = 2</code>，输出是：</p><pre>2\n1</pre>'),
    given: T('<p><code>a</code>, <code>b</code> — two values</p>', '<p><code>a</code>、<code>b</code>——两个值</p>'),
    cases: ['a = 1\nb = 2', 'a = "left"\nb = "right"', 'a = 10\nb = -3'],
    starter: C`#: Swap a and b here || 在这里交换 a 和 b

print(a)
print(b)`,
    solution: C`a, b = b, a
print(a)
print(b)`,
    hints: [T('If you write <code>a = b</code> first, the old value of <code>a</code> is lost. Keep it in a third variable: <code>old = a</code>.', '如果先写 <code>a = b</code>，<code>a</code> 原来的值就丢了。先用第三个变量存起来：<code>old = a</code>。'),
      T('Python also has a shortcut: <code>a, b = b, a</code>.', 'Python 还有一个简便写法：<code>a, b = b, a</code>。')],
    explain: T('<code>a, b = b, a</code> builds the pair on the right first, then unpacks it into the names on the left.', '<code>a, b = b, a</code> 先算出右边这一对值，再拆开存进左边的两个名字。'),
    check: stdout });

  // ================================================================ 2. Data Types & Operators
  lesson('types', {
    intro: T('<p>Every value has a <b>type</b>: whole numbers (<code>int</code>), decimals (<code>float</code>), text (<code>str</code>) and True/False (<code>bool</code>). The type decides what you can do with it.</p>',
      '<p>每个值都有<b>类型</b>：整数（<code>int</code>）、小数（<code>float</code>）、文字（<code>str</code>）和真假值（<code>bool</code>）。类型决定了它能做什么。</p>'),
    cards: [
      { title: T('Four basic types', '四种基本类型'),
        body: T('<p><code>type()</code> tells you the type of any value.</p>', '<p><code>type()</code> 可以告诉你任何值的类型。</p>'),
        code: C`print(type(7))
print(type(3.5))
print(type("hello"))
print(type(True))`},
      { title: T('Arithmetic', '算术运算'),
        body: T('<p><code>/</code> always gives a decimal. <code>//</code> divides and drops the remainder, <code>%</code> gives the remainder, <code>**</code> is power.</p>',
          '<p><code>/</code> 的结果总是小数。<code>//</code> 是整除（去掉余数），<code>%</code> 是取余数，<code>**</code> 是乘方。</p>'),
        code: C`print(7 + 2, 7 - 2, 7 * 2)
print(7 / 2)
print(7 // 2)   #: whole times 2 fits into 7 || 7 里面有几个完整的 2
print(7 % 2)    #: what is left over || 剩下的余数
print(2 ** 10)`},
      { title: T('Changing type (casting)', '转换类型'),
        body: T('<p>Text that looks like a number is still text: <code>"3" + "4"</code> is <code>"34"</code>. Convert with <code>int()</code>, <code>float()</code> and <code>str()</code>.</p>',
          '<p>看起来像数字的文字仍然是文字：<code>"3" + "4"</code> 等于 <code>"34"</code>。用 <code>int()</code>、<code>float()</code>、<code>str()</code> 转换。</p>'),
        code: C`print("3" + "4")
print(int("3") + int("4"))
print(float("2.5") * 2)
print("Age: " + str(30))`},
      { title: T('Comparisons give True or False', '比较的结果是 True 或 False'),
        body: T('<p><code>==</code> asks "equal?" (one <code>=</code> stores a value). Combine answers with <code>and</code>, <code>or</code>, <code>not</code>.</p>',
          '<p><code>==</code> 是问"相等吗？"（一个 <code>=</code> 是存值）。用 <code>and</code>、<code>or</code>、<code>not</code> 组合判断。</p>'),
        code: C`x = 7
print(x == 7, x != 7)
print(x > 5 and x < 10)
print(x < 0 or x > 100)
print(not x > 5)`},
      { title: T('Short-hand assignment', '简写的赋值'),
        body: T('<p><code>x += 3</code> means <code>x = x + 3</code>. The same works for <code>-=</code>, <code>*=</code>, <code>/=</code>.</p>',
          '<p><code>x += 3</code> 就是 <code>x = x + 3</code>。<code>-=</code>、<code>*=</code>、<code>/=</code> 也一样。</p>'),
        code: C`score = 10
score += 5
score *= 2
print(score)`}
    ],
    quiz: [
      { q: T('What is <code>17 // 5</code>?', '<code>17 // 5</code> 等于多少？'), options: [T('3.4', '3.4'), T('3', '3'), T('2', '2')], answer: 1, why: T('5 fits into 17 three whole times.', '17 里面有 3 个完整的 5。') },
      { q: T('What is <code>17 % 5</code>?', '<code>17 % 5</code> 等于多少？'), options: [T('2', '2'), T('3', '3'), T('0.4', '0.4')], answer: 0, why: T('17 = 3 × 5 + 2, so the remainder is 2.', '17 = 3 × 5 + 2，所以余数是 2。') },
      { q: T('What does <code>"5" + "5"</code> give?', '<code>"5" + "5"</code> 的结果是什么？'), options: [T('10', '10'), T('"55"', '"55"'), T('An error', '报错')], answer: 1, why: T('Adding two strings joins them.', '两个字符串相加会把它们接起来。') }
    ]
  });

  add({ id: 201, section: 'types', level: 'easy',
    title: T('Rectangle Area', '长方形面积'),
    desc: T('<p>Print the area of a rectangle (width × height).</p>', '<p>打印一个长方形的面积（宽 × 高）。</p>'),
    given: T('<p><code>width</code>, <code>height</code> — numbers</p>', '<p><code>width</code>、<code>height</code>——数字</p>'),
    cases: ['width = 4\nheight = 5', 'width = 2.5\nheight = 4', 'width = 12\nheight = 1'],
    starter: C``,
    solution: C`print(width * height)`,
    hints: [T('Multiplication is <code>*</code>.', '乘号是 <code>*</code>。')],
    explain: T('Arithmetic works directly on variables that hold numbers.', '存着数字的变量可以直接做算术。'),
    check: stdout });

  add({ id: 202, section: 'types', level: 'easy',
    title: T('Minutes to Hours', '分钟换算成小时'),
    desc: T('<p><code>minutes</code> holds a number of minutes. Print the whole hours and the minutes left over, separated by a space. For 135 minutes:</p><pre>2 15</pre>',
      '<p><code>minutes</code> 存着一个分钟数。打印完整的小时数和剩下的分钟数，中间用空格隔开。135 分钟的输出是：</p><pre>2 15</pre>'),
    given: T('<p><code>minutes</code> — a whole number</p>', '<p><code>minutes</code>——整数</p>'),
    cases: ['minutes = 135', 'minutes = 60', 'minutes = 59', 'minutes = 1000'],
    starter: C``,
    solution: C`print(minutes // 60, minutes % 60)`,
    hints: [T('Whole hours: how many times does 60 fit? That is <code>//</code>.', '完整的小时：60 能放进去几次？用 <code>//</code>。'),
      T('Left-over minutes are the remainder: <code>%</code>.', '剩下的分钟数就是余数：<code>%</code>。')],
    explain: T('<code>//</code> and <code>%</code> work as a pair: <code>minutes == 60 * (minutes // 60) + minutes % 60</code>.', '<code>//</code> 和 <code>%</code> 是一对：<code>minutes == 60 * (minutes // 60) + minutes % 60</code>。'),
    check: stdout });

  add({ id: 203, section: 'types', level: 'easy',
    title: T('Average of Three', '三个数的平均值'),
    desc: T('<p>Print the average of <code>a</code>, <code>b</code> and <code>c</code>.</p>', '<p>打印 <code>a</code>、<code>b</code>、<code>c</code> 的平均值。</p>'),
    given: T('<p><code>a</code>, <code>b</code>, <code>c</code> — numbers</p>', '<p><code>a</code>、<code>b</code>、<code>c</code>——数字</p>'),
    cases: ['a = 70\nb = 85\nc = 90', 'a = 1\nb = 2\nc = 2', 'a = -3\nb = 0\nc = 3'],
    starter: C``,
    solution: C`print((a + b + c) / 3)`,
    hints: [T('Add them, then divide by 3.', '先相加，再除以 3。'), T('Without brackets, only <code>c</code> is divided: <code>a + b + c / 3</code>. Use <code>( )</code>.', '不加括号的话，只有 <code>c</code> 会被除：<code>a + b + c / 3</code>。要用 <code>( )</code>。')],
    explain: T('Like in maths, <code>*</code> and <code>/</code> happen before <code>+</code> and <code>-</code> unless brackets say otherwise.', '和数学一样，<code>*</code>、<code>/</code> 先于 <code>+</code>、<code>-</code> 计算，除非用括号改变顺序。'),
    check: stdout });

  add({ id: 204, section: 'types', level: 'easy',
    title: T('Is It Even?', '是偶数吗？'),
    desc: T('<p>Print <code>True</code> if <code>n</code> is even and <code>False</code> if it is odd.</p>', '<p>如果 <code>n</code> 是偶数就打印 <code>True</code>，奇数就打印 <code>False</code>。</p>'),
    given: T('<p><code>n</code> — a whole number</p>', '<p><code>n</code>——整数</p>'),
    cases: ['n = 10', 'n = 7', 'n = 0', 'n = -4'],
    starter: C``,
    solution: C`print(n % 2 == 0)`,
    hints: [T('An even number has remainder 0 when divided by 2.', '偶数除以 2 的余数是 0。'), T('A comparison like <code>x == 0</code> is already True or False — print it directly.', '像 <code>x == 0</code> 这样的比较本身就是 True 或 False——直接打印即可。')],
    explain: T('<code>n % 2 == 0</code> is a <b>bool</b> expression; no <code>if</code> is needed to print it.', '<code>n % 2 == 0</code> 是一个<b>布尔</b>表达式，打印它不需要 <code>if</code>。'),
    check: stdout });

  add({ id: 205, section: 'types', level: 'medium',
    title: T('Text to Number', '文字转数字'),
    desc: T('<p><code>text_a</code> and <code>text_b</code> are numbers written as text, such as <code>"12"</code>. Print their sum as a number (12 + 30 → <code>42</code>, not <code>1230</code>).</p>',
      '<p><code>text_a</code> 和 <code>text_b</code> 是写成文字的数字，例如 <code>"12"</code>。把它们当作数字相加后打印（12 + 30 → <code>42</code>，而不是 <code>1230</code>）。</p>'),
    given: T('<p><code>text_a</code>, <code>text_b</code> — strings containing whole numbers</p>', '<p><code>text_a</code>、<code>text_b</code>——内容是整数的字符串</p>'),
    cases: ['text_a = "12"\ntext_b = "30"', 'text_a = "7"\ntext_b = "-2"', 'text_a = "100"\ntext_b = "0"'],
    starter: C`print(text_a + text_b)  #: this joins the text — fix it || 这样会把文字接起来——改正它`,
    solution: C`print(int(text_a) + int(text_b))`,
    hints: [T('<code>int("12")</code> turns the text into the number 12.', '<code>int("12")</code> 会把文字变成数字 12。')],
    explain: T('Data from files and forms usually arrives as text; convert it before doing maths.', '从文件和表单读到的数据通常是文字，做计算前要先转换。'),
    check: stdout });

  // ================================================================ 3. Strings
  lesson('strings', {
    intro: T('<p>A <b>string</b> is text. You can measure it, take pieces of it, change its case, and build new strings from old ones. Strings never change in place — methods return a new string.</p>',
      '<p><b>字符串</b>就是文字。你可以量它的长度、取出其中一段、改变大小写，或用旧的字符串拼出新的。字符串本身不会被改变——方法会返回一个新的字符串。</p>'),
    cards: [
      { title: T('Length and positions', '长度和位置'),
        body: T('<p><code>len()</code> counts characters. Positions start at <b>0</b>; <code>-1</code> is the last character.</p>',
          '<p><code>len()</code> 计算字符个数。位置从 <b>0</b> 开始；<code>-1</code> 是最后一个字符。</p>'),
        code: C`word = "Python"
print(len(word))
print(word[0])
print(word[5])
print(word[-1])`},
      { title: T('Slices', '切片'),
        body: T('<p><code>text[start:end]</code> takes characters from <code>start</code> up to but <b>not including</b> <code>end</code>. Leave a side empty to go to the edge.</p>',
          '<p><code>text[start:end]</code> 取从 <code>start</code> 开始、到 <code>end</code> 为止（<b>不包括</b> <code>end</code>）的字符。省略一边就表示一直到头。</p>'),
        code: C`word = "Python"
print(word[0:2])
print(word[2:])
print(word[:3])
print(word[-3:])`},
      { title: T('Useful methods', '常用方法'),
        body: T('<p>Methods are called with a dot: <code>text.upper()</code>.</p>', '<p>方法用点号调用：<code>text.upper()</code>。</p>'),
        code: C`s = "  Hello World  "
print(s.strip())
print(s.lower())
print(s.upper())
print(s.replace("World", "Python"))
print("a,b,c".split(","))`},
      { title: T('f-strings', 'f-string 格式化'),
        body: T('<p>Put <code>f</code> before the quotes and write variables inside <code>{ }</code>. <code>:.2f</code> shows 2 decimal places.</p>',
          '<p>在引号前加 <code>f</code>，把变量写在 <code>{ }</code> 里。<code>:.2f</code> 表示保留 2 位小数。</p>'),
        code: C`item = "coffee"
price = 4.5
qty = 3
print(f"{qty} x {item} = RM{price * qty:.2f}")`},
      { title: T('Joining and checking', '拼接和检查'),
        body: T('<p><code>+</code> joins strings, <code>*</code> repeats them, <code>in</code> checks whether one is inside another.</p>',
          '<p><code>+</code> 拼接字符串，<code>*</code> 重复字符串，<code>in</code> 检查一个字符串是否包含另一个。</p>'),
        code: C`first = "Kuala"
second = "Lumpur"
print(first + " " + second)
print("ha" * 3)
print("Lum" in second)`},
      { title: T('Special characters', '特殊字符'),
        body: T('<p><code>\\n</code> starts a new line and <code>\\t</code> is a tab. Triple quotes hold text over several lines.</p>',
          '<p><code>\\n</code> 表示换行，<code>\\t</code> 是制表符。三引号可以写多行文字。</p>'),
        code: C`print("Line one\nLine two")
print("Name:\tAda")
poem = """Roses are red,
Python is too."""
print(poem)`}
    ],
    quiz: [
      { q: T('For <code>s = "banana"</code>, what is <code>s[1:3]</code>?', '设 <code>s = "banana"</code>，<code>s[1:3]</code> 是什么？'), options: [T('"ban"', '"ban"'), T('"an"', '"an"'), T('"ana"', '"ana"')], answer: 1, why: T('Positions 1 and 2; the end position 3 is not included.', '位置 1 和 2；结束位置 3 不包括在内。') },
      { q: T('What does <code>"Hi".upper()</code> return?', '<code>"Hi".upper()</code> 返回什么？'), options: [T('"hi"', '"hi"'), T('"HI"', '"HI"'), T('"Hi"', '"Hi"')], answer: 1, why: T('upper() makes every letter capital.', 'upper() 把所有字母变成大写。') },
      { q: T('With <code>n = 3</code>, what does <code>f"n={n}"</code> give?', '当 <code>n = 3</code> 时，<code>f"n={n}"</code> 的结果是什么？'), options: [T('"n={n}"', '"n={n}"'), T('"n=3"', '"n=3"'), T('An error', '报错')], answer: 1, why: T('In an f-string, { } is replaced by the value.', '在 f-string 里，{ } 会被替换成变量的值。') }
    ]
  });

  add({ id: 301, section: 'strings', level: 'easy',
    title: T('Shout It', '大声说出来'),
    desc: T('<p>Print <code>word</code> in capital letters followed by <code>!</code>. For <code>"hello"</code>: <code>HELLO!</code></p>', '<p>把 <code>word</code> 变成大写并在后面加 <code>!</code> 打印出来。<code>"hello"</code> 的输出是 <code>HELLO!</code></p>'),
    given: T('<p><code>word</code> — a string</p>', '<p><code>word</code>——字符串</p>'),
    cases: ['word = "hello"', 'word = "Python"', 'word = "ok"'],
    starter: C``,
    solution: C`print(word.upper() + "!")`,
    hints: [T('<code>.upper()</code> makes capitals.', '<code>.upper()</code> 转成大写。'), T('Join with <code>+ "!"</code>.', '用 <code>+ "!"</code> 拼接。')],
    explain: T('Methods return new strings, which can be joined with <code>+</code>.', '方法会返回新的字符串，可以再用 <code>+</code> 拼接。'),
    check: stdout });

  add({ id: 302, section: 'strings', level: 'easy',
    title: T('Initials', '姓名缩写'),
    desc: T('<p>Print the initials of <code>first</code> and <code>last</code>, each followed by a dot. Ada Lovelace → <code>A.L.</code></p>', '<p>打印 <code>first</code> 和 <code>last</code> 的首字母，每个后面加一个点。Ada Lovelace → <code>A.L.</code></p>'),
    given: T('<p><code>first</code>, <code>last</code> — names starting with a capital letter</p>', '<p><code>first</code>、<code>last</code>——以大写字母开头的名字</p>'),
    cases: ['first = "Ada"\nlast = "Lovelace"', 'first = "Lee"\nlast = "Chong"', 'first = "Guido"\nlast = "Rossum"'],
    starter: C``,
    solution: C`print(first[0] + "." + last[0] + ".")`,
    hints: [T('The first character is at position 0: <code>first[0]</code>.', '第一个字符在位置 0：<code>first[0]</code>。')],
    explain: T('Indexing with <code>[0]</code> picks a single character.', '用 <code>[0]</code> 可以取出单个字符。'),
    check: stdout });

  add({ id: 303, section: 'strings', level: 'easy',
    title: T('Last Three Characters', '最后三个字符'),
    desc: T('<p>Print the last three characters of <code>text</code>. For <code>"notebook"</code>: <code>ook</code></p>', '<p>打印 <code>text</code> 的最后三个字符。<code>"notebook"</code> 的输出是 <code>ook</code></p>'),
    given: T('<p><code>text</code> — a string with at least 3 characters</p>', '<p><code>text</code>——至少 3 个字符的字符串</p>'),
    cases: ['text = "notebook"', 'text = "abc"', 'text = "receipt-2026.pdf"'],
    starter: C``,
    solution: C`print(text[-3:])`,
    hints: [T('Negative positions count from the end.', '负数位置是从后往前数。'), T('A slice with no end goes to the last character: <code>text[-3:]</code>.', '没有结束位置的切片会一直取到最后：<code>text[-3:]</code>。')],
    explain: T('<code>text[-3:]</code> works for any length, unlike fixed positions.', '<code>text[-3:]</code> 对任何长度都成立，固定位置则不行。'),
    check: stdout });

  add({ id: 304, section: 'strings', level: 'medium',
    title: T('Tidy Up', '整理文字'),
    desc: T('<p><code>messy</code> has extra spaces around it and random capitals. Print it without the outer spaces, with only the first letter in capitals. <code>"  hELLo WORLD  "</code> → <code>Hello world</code></p>',
      '<p><code>messy</code> 前后有多余的空格，大小写也很乱。去掉前后的空格，只让第一个字母大写，然后打印。<code>"  hELLo WORLD  "</code> → <code>Hello world</code></p>'),
    given: T('<p><code>messy</code> — a string</p>', '<p><code>messy</code>——字符串</p>'),
    cases: ['messy = "  hELLo WORLD  "', 'messy = "PYTHON   "', 'messy = "   good morning"'],
    starter: C``,
    solution: C`print(messy.strip().capitalize())`,
    hints: [T('<code>.strip()</code> removes spaces at both ends.', '<code>.strip()</code> 去掉两端的空格。'), T('<code>.capitalize()</code> makes the first letter capital and the rest small. Methods can be chained: <code>s.strip().capitalize()</code>.', '<code>.capitalize()</code> 让首字母大写、其余小写。方法可以连着用：<code>s.strip().capitalize()</code>。')],
    explain: T('Each method returns a new string, so you can call the next method on it straight away.', '每个方法都返回一个新字符串，所以可以马上接着调用下一个方法。'),
    check: stdout });

  add({ id: 305, section: 'strings', level: 'medium',
    title: T('Price Tag', '价格标签'),
    desc: T('<p>Print a price tag like <code>Apple: RM1.50</code> — always with two decimal places.</p>', '<p>打印像 <code>Apple: RM1.50</code> 这样的价格标签——永远保留两位小数。</p>'),
    given: T('<p><code>item</code> — a string; <code>price</code> — a number</p>', '<p><code>item</code>——字符串；<code>price</code>——数字</p>'),
    cases: ['item = "Apple"\nprice = 1.5', 'item = "Laptop"\nprice = 3499', 'item = "Pen"\nprice = 0.999'],
    starter: C``,
    solution: C`print(f"{item}: RM{price:.2f}")`,
    hints: [T('Use an f-string: <code>f"{item}: RM{price}"</code>.', '用 f-string：<code>f"{item}: RM{price}"</code>。'), T('Add <code>:.2f</code> inside the braces to round to 2 decimals: <code>{price:.2f}</code>.', '在大括号里加 <code>:.2f</code> 保留 2 位小数：<code>{price:.2f}</code>。')],
    explain: T('Format specs like <code>:.2f</code> control how a number is shown without changing the number.', '<code>:.2f</code> 这样的格式说明只改变数字的显示方式，不改变数字本身。'),
    check: stdout });

  add({ id: 306, section: 'strings', level: 'medium',
    title: T('Count a Letter', '数一个字母'),
    desc: T('<p>Print how many times <code>letter</code> appears in <code>sentence</code>, ignoring capitals (so <code>"A"</code> and <code>"a"</code> both count).</p>', '<p>打印 <code>letter</code> 在 <code>sentence</code> 里出现了几次，不分大小写（<code>"A"</code> 和 <code>"a"</code> 都算）。</p>'),
    given: T('<p><code>sentence</code> — a string; <code>letter</code> — one character</p>', '<p><code>sentence</code>——字符串；<code>letter</code>——一个字符</p>'),
    cases: ['sentence = "An apple a day"\nletter = "a"', 'sentence = "Mississippi"\nletter = "S"', 'sentence = "xyz"\nletter = "q"'],
    starter: C``,
    solution: C`print(sentence.lower().count(letter.lower()))`,
    hints: [T('<code>text.count("a")</code> counts occurrences.', '<code>text.count("a")</code> 计算出现次数。'), T('Make both sides lower case first.', '先把两边都变成小写。')],
    explain: T('Normalising case before comparing is a common trick for "case-insensitive" checks.', '比较前先统一大小写，是做"不分大小写"判断的常用方法。'),
    check: stdout });

  // ================================================================ 4. Conditions
  lesson('conditions', {
    intro: T('<p>Programs make decisions with <code>if</code>. The indented block runs only when the condition is True. Do not forget the colon <code>:</code> at the end of the line.</p>',
      '<p>程序用 <code>if</code> 做决定。只有条件为 True 时，缩进的代码块才会执行。别忘了行尾的冒号 <code>:</code>。</p>'),
    cards: [
      { title: T('if and else', 'if 和 else'),
        body: T('<p>Change <code>temperature</code> and run again.</p>', '<p>改一改 <code>temperature</code> 再运行。</p>'),
        code: C`temperature = 33
if temperature > 30:
    print("Hot day — drink water")
else:
    print("Nice weather")`},
      { title: T('elif for more choices', '用 elif 处理更多情况'),
        body: T('<p>Python checks from the top and runs only the <b>first</b> branch that is True.</p>', '<p>Python 从上往下检查，只执行<b>第一个</b>为 True 的分支。</p>'),
        code: C`marks = 72
if marks >= 80:
    print("A")
elif marks >= 60:
    print("B")
elif marks >= 40:
    print("C")
else:
    print("Try again")`},
      { title: T('Combining conditions', '组合条件'),
        body: T('<p>Use <code>and</code> / <code>or</code> / <code>not</code>. Python also allows chains like <code>0 &lt; x &lt; 10</code>.</p>', '<p>用 <code>and</code> / <code>or</code> / <code>not</code>。Python 还支持连写，例如 <code>0 &lt; x &lt; 10</code>。</p>'),
        code: C`age = 15
has_ticket = True
if age >= 13 and has_ticket:
    print("You may enter")
if 12 < age < 18:
    print("Teenager")`},
      { title: T('match for fixed values', '用 match 匹配固定值'),
        body: T('<p><code>match</code> compares one value with several options. <code>_</code> catches everything else; <code>|</code> means "or".</p>', '<p><code>match</code> 把一个值和几个选项比较。<code>_</code> 匹配其他所有情况；<code>|</code> 表示"或"。</p>'),
        code: C`light = "amber"
match light:
    case "green":
        print("Go")
    case "amber" | "yellow":
        print("Slow down")
    case "red":
        print("Stop")
    case _:
        print("Unknown light")`},
      { title: T('One-line choice', '一行写完的选择'),
        body: T('<p><code>a if condition else b</code> picks one of two values.</p>', '<p><code>a if 条件 else b</code> 会在两个值中选一个。</p>'),
        code: C`n = 7
kind = "even" if n % 2 == 0 else "odd"
print(n, "is", kind)`}
    ],
    quiz: [
      { q: T('<code>x = 5</code>. Which branch runs?<pre>if x > 3:\n    print("A")\nelif x > 1:\n    print("B")</pre>', '<code>x = 5</code>。会执行哪个分支？<pre>if x > 3:\n    print("A")\nelif x > 1:\n    print("B")</pre>'),
        options: [T('A only', '只有 A'), T('B only', '只有 B'), T('A and B', 'A 和 B')], answer: 0, why: T('Only the first True branch runs.', '只执行第一个为 True 的分支。') },
      { q: T('What is missing? <code>if x > 3 print("big")</code>', '少了什么？<code>if x > 3 print("big")</code>'), options: [T('Brackets', '括号'), T('A colon and an indented line', '冒号和缩进的一行'), T('Nothing', '什么都不缺')], answer: 1, why: T('An if line ends with <code>:</code> and its body is indented.', 'if 那一行以 <code>:</code> 结尾，下面的代码要缩进。') },
      { q: T('What is <code>True and False</code>?', '<code>True and False</code> 等于什么？'), options: [T('True', 'True'), T('False', 'False')], answer: 1, why: T('and needs both sides to be True.', 'and 要两边都为 True 才为 True。') }
    ]
  });

  add({ id: 401, section: 'conditions', level: 'easy',
    title: T('Positive, Negative or Zero', '正数、负数还是零'),
    desc: T('<p>Print <code>positive</code>, <code>negative</code> or <code>zero</code> depending on <code>n</code>.</p>', '<p>根据 <code>n</code> 打印 <code>positive</code>、<code>negative</code> 或 <code>zero</code>。</p>'),
    given: T('<p><code>n</code> — a number</p>', '<p><code>n</code>——数字</p>'),
    cases: ['n = 5', 'n = -2.5', 'n = 0'],
    starter: C`if n > 0:
    print("positive")`,
    solution: C`if n > 0:
    print("positive")
elif n < 0:
    print("negative")
else:
    print("zero")`,
    hints: [T('Add an <code>elif</code> for numbers below 0.', '为小于 0 的数加一个 <code>elif</code>。'), T('Whatever is left must be zero — use <code>else</code>.', '剩下的情况一定是零——用 <code>else</code>。')],
    explain: T('if / elif / else covers every case exactly once.', 'if / elif / else 让每种情况刚好被处理一次。'),
    check: stdout });

  add({ id: 402, section: 'conditions', level: 'easy',
    title: T('Letter Grade', '等级评分'),
    desc: T('<p>Print the grade for <code>score</code>: <code>A</code> for 90 and above, <code>B</code> for 80–89, <code>C</code> for 70–79, otherwise <code>F</code>.</p>', '<p>打印 <code>score</code> 对应的等级：90 及以上为 <code>A</code>，80–89 为 <code>B</code>，70–79 为 <code>C</code>，其他为 <code>F</code>。</p>'),
    given: T('<p><code>score</code> — a whole number from 0 to 100</p>', '<p><code>score</code>——0 到 100 的整数</p>'),
    cases: ['score = 95', 'score = 80', 'score = 79', 'score = 12', 'score = 90'],
    starter: C``,
    solution: C`if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")`,
    hints: [T('Check the highest grade first.', '先检查最高的等级。'), T('Because elif only runs when earlier checks failed, <code>elif score >= 80</code> already means 80–89.', '因为 elif 只在前面的条件不成立时才检查，<code>elif score >= 80</code> 就已经表示 80–89。')],
    explain: T('Ordering the checks from high to low keeps each condition simple.', '从高到低排列条件，每个条件都能写得很简单。'),
    check: stdout });

  add({ id: 403, section: 'conditions', level: 'medium',
    title: T('Leap Year', '闰年'),
    desc: T('<p>Print <code>True</code> if <code>year</code> is a leap year, otherwise <code>False</code>. A year is a leap year if it is divisible by 4, <b>except</b> years divisible by 100, <b>unless</b> they are also divisible by 400.</p>',
      '<p>如果 <code>year</code> 是闰年就打印 <code>True</code>，否则打印 <code>False</code>。能被 4 整除的年份是闰年，<b>但</b>能被 100 整除的不是，<b>除非</b>它也能被 400 整除。</p>'),
    given: T('<p><code>year</code> — a whole number</p>', '<p><code>year</code>——整数</p>'),
    cases: ['year = 2024', 'year = 1900', 'year = 2000', 'year = 2023'],
    starter: C``,
    solution: C`print(year % 4 == 0 and (year % 100 != 0 or year % 400 == 0))`,
    hints: [T('"Divisible by 4" is <code>year % 4 == 0</code>.', '"能被 4 整除" 写作 <code>year % 4 == 0</code>。'), T('Leap if: divisible by 4 <b>and</b> (not divisible by 100 <b>or</b> divisible by 400).', '闰年条件：能被 4 整除 <b>并且</b>（不能被 100 整除 <b>或者</b> 能被 400 整除）。')],
    explain: T('Brackets group the "except … unless" part so <code>and</code>/<code>or</code> combine correctly.', '括号把"但……除非"这部分括起来，<code>and</code> 和 <code>or</code> 才会正确组合。'),
    check: stdout });

  add({ id: 404, section: 'conditions', level: 'easy',
    title: T('Weekday or Weekend', '工作日还是周末'),
    desc: T('<p><code>day</code> is a three-letter day name like <code>"Mon"</code>. Print <code>weekend</code> for <code>"Sat"</code> and <code>"Sun"</code>, otherwise <code>weekday</code>. Try <code>match</code>.</p>', '<p><code>day</code> 是三个字母的星期名，例如 <code>"Mon"</code>。<code>"Sat"</code> 和 <code>"Sun"</code> 打印 <code>weekend</code>，其他打印 <code>weekday</code>。试试用 <code>match</code>。</p>'),
    given: T('<p><code>day</code> — one of Mon, Tue, Wed, Thu, Fri, Sat, Sun</p>', '<p><code>day</code>——Mon、Tue、Wed、Thu、Fri、Sat、Sun 之一</p>'),
    cases: ['day = "Sat"', 'day = "Mon"', 'day = "Sun"', 'day = "Fri"'],
    starter: C`match day:
    case _:
        print("weekday")`,
    solution: C`match day:
    case "Sat" | "Sun":
        print("weekend")
    case _:
        print("weekday")`,
    hints: [T('Add a case above <code>case _</code>.', '在 <code>case _</code> 上面加一个 case。'), T('<code>case "Sat" | "Sun":</code> matches either value.', '<code>case "Sat" | "Sun":</code> 可以匹配其中任意一个。')],
    explain: T('Cases are tried from top to bottom; <code>_</code> must come last because it matches everything.', 'case 从上往下尝试；<code>_</code> 必须放最后，因为它能匹配所有值。'),
    check: stdout });

  // ================================================================ 5. Loops
  lesson('loops', {
    intro: T('<p>A <b>loop</b> repeats code. <code>for</code> goes through a sequence item by item; <code>while</code> keeps going as long as a condition is True. If a loop never ends, the app stops it after 10 seconds.</p>',
      '<p><b>循环</b>会重复执行代码。<code>for</code> 逐个走过一个序列；<code>while</code> 只要条件为 True 就一直执行。如果循环停不下来，应用会在 10 秒后把它停掉。</p>'),
    cards: [
      { title: T('for with range()', 'for 和 range()'),
        body: T('<p><code>range(5)</code> gives 0, 1, 2, 3, 4. <code>range(1, 6)</code> gives 1 to 5. A third number is the step.</p>', '<p><code>range(5)</code> 产生 0、1、2、3、4。<code>range(1, 6)</code> 产生 1 到 5。第三个数是步长。</p>'),
        code: C`for i in range(5):
    print(i)
for i in range(10, 0, -3):
    print("step", i)`},
      { title: T('Looping over text and lists', '遍历文字和列表'),
        body: T('<p><code>for</code> works on anything with items in order.</p>', '<p><code>for</code> 可以用在任何有顺序元素的东西上。</p>'),
        code: C`for letter in "hey":
    print(letter)
for fruit in ["durian", "mango", "rambutan"]:
    print("I like", fruit)`},
      { title: T('Adding up in a loop', '在循环里累加'),
        body: T('<p>Start a total at 0 <b>before</b> the loop and add to it inside.</p>', '<p>在循环<b>之前</b>把总数设为 0，在循环里往上加。</p>'),
        code: C`total = 0
for n in range(1, 5):
    total += n
    print("after adding", n, "total is", total)
print("final:", total)`},
      { title: T('while', 'while 循环'),
        body: T('<p>Make sure something inside changes, or the loop never stops.</p>', '<p>要确保循环里有东西在变化，否则循环永远停不下来。</p>'),
        code: C`savings = 100
months = 0
while savings < 200:
    savings *= 1.1
    months += 1
print(months, "months, savings:", round(savings, 2))`},
      { title: T('break and continue', 'break 和 continue'),
        body: T('<p><code>break</code> leaves the loop now. <code>continue</code> skips to the next round.</p>', '<p><code>break</code> 立即跳出循环。<code>continue</code> 跳过本轮，进入下一轮。</p>'),
        code: C`for n in range(1, 10):
    if n % 2 == 0:
        continue   #: skip even numbers || 跳过偶数
    if n > 7:
        break      #: stop completely || 完全停止
    print(n)`},
      { title: T('Loops inside loops', '循环里面套循环'),
        body: T('<p>The inner loop runs fully for each round of the outer loop. <code>end=""</code> keeps <code>print</code> on the same line.</p>', '<p>外层循环每走一轮，内层循环都会完整跑一遍。<code>end=""</code> 让 <code>print</code> 不换行。</p>'),
        code: C`for row in range(1, 4):
    for col in range(1, 4):
        print(row * col, end=" ")
    print()`}
    ],
    quiz: [
      { q: T('How many numbers does <code>range(3, 8)</code> give?', '<code>range(3, 8)</code> 会产生几个数？'), options: [T('5', '5'), T('6', '6'), T('8', '8')], answer: 0, why: T('3, 4, 5, 6, 7 — the end is not included.', '3、4、5、6、7——不包括结束值。') },
      { q: T('What does <code>break</code> do?', '<code>break</code> 做什么？'), options: [T('Skips one round', '跳过一轮'), T('Leaves the loop', '跳出循环'), T('Stops Python', '停止 Python')], answer: 1, why: T('continue skips a round; break leaves the loop.', 'continue 跳过一轮；break 跳出循环。') },
      { q: T('Why might <code>while x &lt; 10: print(x)</code> never stop?', '为什么 <code>while x &lt; 10: print(x)</code> 可能停不下来？'), options: [T('x never changes', 'x 一直没变'), T('print is slow', 'print 太慢'), T('10 is too big', '10 太大')], answer: 0, why: T('The condition stays True if nothing changes x.', '如果没有东西改变 x，条件就一直为 True。') }
    ]
  });

  add({ id: 501, section: 'loops', level: 'easy',
    title: T('Count to n', '数到 n'),
    desc: T('<p>Print the numbers from 1 to <code>n</code>, one per line.</p>', '<p>打印 1 到 <code>n</code> 的数字，每行一个。</p>'),
    given: T('<p><code>n</code> — a whole number ≥ 1</p>', '<p><code>n</code>——≥ 1 的整数</p>'),
    cases: ['n = 5', 'n = 1', 'n = 12'],
    starter: C``,
    solution: C`for i in range(1, n + 1):
    print(i)`,
    hints: [T('<code>range(1, n)</code> stops at n − 1.', '<code>range(1, n)</code> 只到 n − 1。'), T('Use <code>range(1, n + 1)</code>.', '用 <code>range(1, n + 1)</code>。')],
    explain: T('range stops <b>before</b> its end value, so add 1 to include <code>n</code>.', 'range 在结束值<b>之前</b>就停了，所以要加 1 才能包括 <code>n</code>。'),
    check: stdout });

  add({ id: 502, section: 'loops', level: 'easy',
    title: T('Sum 1 to n', '1 加到 n'),
    desc: T('<p>Print the sum 1 + 2 + … + <code>n</code>. Use a loop.</p>', '<p>打印 1 + 2 + … + <code>n</code> 的和。用循环来做。</p>'),
    given: T('<p><code>n</code> — a whole number ≥ 1</p>', '<p><code>n</code>——≥ 1 的整数</p>'),
    cases: ['n = 10', 'n = 1', 'n = 100'],
    starter: C`total = 0
`,
    solution: C`total = 0
for i in range(1, n + 1):
    total += i
print(total)`,
    hints: [T('Add each number to <code>total</code> inside the loop.', '在循环里把每个数加到 <code>total</code> 上。'), T('Print once, after the loop (no indentation).', '在循环之后打印一次（不缩进）。')],
    explain: T('The "accumulator" pattern: start at 0, add in the loop, use the result after it.', '这是"累加器"模式：从 0 开始，在循环里加，循环结束后使用结果。'),
    check: stdout });

  add({ id: 503, section: 'loops', level: 'easy',
    title: T('Times Table', '乘法表'),
    desc: T('<p>Print the times table of <code>n</code> from 1 to 10 in this format (for n = 3):</p><pre>3 x 1 = 3\n3 x 2 = 6\n…\n3 x 10 = 30</pre>', '<p>按下面的格式打印 <code>n</code> 从 1 到 10 的乘法表（n = 3 时）：</p><pre>3 x 1 = 3\n3 x 2 = 6\n…\n3 x 10 = 30</pre>'),
    given: T('<p><code>n</code> — a whole number</p>', '<p><code>n</code>——整数</p>'),
    cases: ['n = 3', 'n = 7', 'n = 12'],
    starter: C``,
    solution: C`for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")`,
    hints: [T('Loop <code>i</code> over <code>range(1, 11)</code>.', '让 <code>i</code> 遍历 <code>range(1, 11)</code>。'), T('An f-string makes the line: <code>f"{n} x {i} = {n * i}"</code>.', '用 f-string 组成这一行：<code>f"{n} x {i} = {n * i}"</code>。')],
    explain: T('Expressions such as <code>n * i</code> can go straight inside f-string braces.', '像 <code>n * i</code> 这样的表达式可以直接写在 f-string 的大括号里。'),
    check: stdout });

  add({ id: 504, section: 'loops', level: 'easy',
    title: T('Countdown', '倒计时'),
    desc: T('<p>Using <code>while</code>, print from <code>start</code> down to 1, then <code>Liftoff!</code>.</p>', '<p>用 <code>while</code> 从 <code>start</code> 倒数到 1，最后打印 <code>Liftoff!</code>。</p>'),
    given: T('<p><code>start</code> — a whole number ≥ 1</p>', '<p><code>start</code>——≥ 1 的整数</p>'),
    cases: ['start = 5', 'start = 1', 'start = 3'],
    starter: C`count = start
while count > 0:
    print(count)
    #: something must change here, or the loop never ends || 这里必须改变些什么，否则循环停不下来
`,
    solution: C`count = start
while count > 0:
    print(count)
    count -= 1
print("Liftoff!")`,
    hints: [T('Subtract 1 from <code>count</code> inside the loop.', '在循环里给 <code>count</code> 减 1。'), T('Print <code>Liftoff!</code> after the loop, not indented.', '在循环结束后打印 <code>Liftoff!</code>，不要缩进。')],
    explain: T('A while loop needs something that eventually makes its condition False.', 'while 循环需要有东西让它的条件最终变成 False。'),
    check: stdout });

  add({ id: 505, section: 'loops', level: 'medium',
    title: T('Next Multiple', '下一个倍数'),
    desc: T('<p>Print the first number <b>greater than</b> <code>n</code> that is divisible by <code>k</code>. For n = 10, k = 7 → <code>14</code>.</p>', '<p>打印第一个<b>大于</b> <code>n</code> 且能被 <code>k</code> 整除的数。n = 10、k = 7 → <code>14</code>。</p>'),
    given: T('<p><code>n</code>, <code>k</code> — whole numbers, k ≥ 1</p>', '<p><code>n</code>、<code>k</code>——整数，k ≥ 1</p>'),
    cases: ['n = 10\nk = 7', 'n = 14\nk = 7', 'n = 0\nk = 5', 'n = 99\nk = 1'],
    starter: C``,
    solution: C`x = n + 1
while x % k != 0:
    x += 1
print(x)`,
    hints: [T('Start checking at <code>n + 1</code>.', '从 <code>n + 1</code> 开始检查。'), T('Keep adding 1 while the remainder is not 0.', '只要余数不是 0 就一直加 1。')],
    explain: T('while is the right loop when you do not know in advance how many rounds are needed.', '不知道要循环多少次的时候，while 就是合适的选择。'),
    check: stdout });

  add({ id: 506, section: 'loops', level: 'medium',
    title: T('Star Triangle', '星号三角形'),
    desc: T('<p>Print a triangle of stars with <code>rows</code> lines. For 4 rows:</p><pre>*\n**\n***\n****</pre>', '<p>打印一个有 <code>rows</code> 行的星号三角形。4 行时：</p><pre>*\n**\n***\n****</pre>'),
    given: T('<p><code>rows</code> — a whole number ≥ 1</p>', '<p><code>rows</code>——≥ 1 的整数</p>'),
    cases: ['rows = 4', 'rows = 1', 'rows = 7'],
    starter: C``,
    solution: C`for i in range(1, rows + 1):
    print("*" * i)`,
    hints: [T('Row number <code>i</code> has <code>i</code> stars.', '第 <code>i</code> 行有 <code>i</code> 个星号。'), T('<code>"*" * 3</code> is <code>"***"</code>.', '<code>"*" * 3</code> 等于 <code>"***"</code>。')],
    explain: T('String repetition replaces an inner loop here.', '这里用字符串重复代替了内层循环。'),
    check: stdout });

  // ================================================================ 6. Lists & Tuples
  lesson('lists', {
    intro: T('<p>A <b>list</b> holds many values in order, inside <code>[ ]</code>. Lists can grow, shrink and change. A <b>tuple</b> <code>( )</code> is like a list that cannot change.</p>',
      '<p><b>列表</b>用 <code>[ ]</code> 按顺序存放多个值。列表可以变长、变短、修改。<b>元组</b> <code>( )</code> 像一个不能修改的列表。</p>'),
    cards: [
      { title: T('Making and reading lists', '创建和读取列表'),
        body: T('<p>Positions work like strings: start at 0, negative counts from the end.</p>', '<p>位置和字符串一样：从 0 开始，负数从后往前数。</p>'),
        code: C`fruits = ["apple", "banana", "cherry"]
print(fruits)
print(fruits[0], fruits[-1])
print(len(fruits))
print(fruits[1:])`},
      { title: T('Changing a list', '修改列表'),
        body: T('<p><code>append</code> adds at the end, <code>insert</code> at a position, <code>remove</code> deletes a value, <code>pop</code> takes one out.</p>', '<p><code>append</code> 加到末尾，<code>insert</code> 插到指定位置，<code>remove</code> 删除某个值，<code>pop</code> 取出一个元素。</p>'),
        code: C`cart = ["rice", "eggs"]
cart.append("milk")
cart.insert(0, "bread")
cart.remove("eggs")
last = cart.pop()
cart[0] = "wholemeal bread"
print(cart, "| took out:", last)`},
      { title: T('Checking and looping', '检查和遍历'),
        body: T('<p><code>in</code> checks membership. <code>enumerate</code> gives the position too.</p>', '<p><code>in</code> 检查元素是否存在。<code>enumerate</code> 会同时给出位置。</p>'),
        code: C`colors = ["red", "green", "blue"]
print("green" in colors)
for i, c in enumerate(colors):
    print(i, c)`},
      { title: T('Sorting and summaries', '排序与统计'),
        body: T('<p><code>sorted()</code> returns a new sorted list; <code>.sort()</code> sorts the list itself. <code>sum</code>, <code>min</code>, <code>max</code> summarise numbers.</p>', '<p><code>sorted()</code> 返回一个排好序的新列表；<code>.sort()</code> 直接给原列表排序。<code>sum</code>、<code>min</code>、<code>max</code> 用来统计数字。</p>'),
        code: C`nums = [4, 1, 9, 3]
print(sorted(nums))
print(sorted(nums, reverse=True))
print(sum(nums), min(nums), max(nums))
nums.sort()
print(nums)`},
      { title: T('Tuples and unpacking', '元组与拆包'),
        body: T('<p>Tuples are good for fixed groups like coordinates. Unpacking puts each item into its own variable.</p>', '<p>元组适合放固定的一组值，例如坐标。拆包会把每个元素放进各自的变量。</p>'),
        code: C`point = (3, 4)
x, y = point
print(x, y)
rgb = (255, 128, 0)
print(len(rgb), rgb[0])`}
    ],
    quiz: [
      { q: T('After <code>a = [1, 2]</code> and <code>a.append(3)</code>, what is <code>a</code>?', '执行 <code>a = [1, 2]</code> 和 <code>a.append(3)</code> 后，<code>a</code> 是什么？'), options: [T('[1, 2]', '[1, 2]'), T('[3, 1, 2]', '[3, 1, 2]'), T('[1, 2, 3]', '[1, 2, 3]')], answer: 2, why: T('append adds at the end.', 'append 加在末尾。') },
      { q: T('What is the difference between <code>sorted(a)</code> and <code>a.sort()</code>?', '<code>sorted(a)</code> 和 <code>a.sort()</code> 有什么不同？'), options: [T('No difference', '没有不同'), T('sorted returns a new list; sort changes a', 'sorted 返回新列表；sort 修改 a 本身')], answer: 1, why: T('a.sort() returns None and changes a in place.', 'a.sort() 返回 None，并直接修改 a。') },
      { q: T('Can you change a tuple after creating it?', '元组创建后可以修改吗？'), options: [T('Yes', '可以'), T('No', '不可以')], answer: 1, why: T('Tuples are immutable.', '元组是不可变的。') }
    ]
  });

  add({ id: 601, section: 'lists', level: 'easy',
    title: T('Shopping List', '购物清单'),
    desc: T('<p>Add <code>"milk"</code> to the end of <code>items</code>, remove <code>"bread"</code> (it is always in the list), then print the list.</p>', '<p>在 <code>items</code> 末尾加上 <code>"milk"</code>，删除 <code>"bread"</code>（它一定在列表里），然后打印列表。</p>'),
    given: T('<p><code>items</code> — a list of strings that contains <code>"bread"</code></p>', '<p><code>items</code>——包含 <code>"bread"</code> 的字符串列表</p>'),
    cases: ['items = ["eggs", "bread", "rice"]', 'items = ["bread"]', 'items = ["tea", "sugar", "bread", "salt"]'],
    starter: C``,
    solution: C`items.append("milk")
items.remove("bread")
print(items)`,
    hints: [T('<code>items.append(...)</code> and <code>items.remove(...)</code>.', '<code>items.append(...)</code> 和 <code>items.remove(...)</code>。')],
    explain: T('List methods change the list itself, so print the same variable afterwards.', '列表方法会直接修改列表本身，所以之后打印同一个变量即可。'),
    check: stdout });

  add({ id: 602, section: 'lists', level: 'easy',
    title: T('Largest and Smallest', '最大值和最小值'),
    desc: T('<p>Print the largest number in <code>nums</code>, then the smallest, on separate lines.</p>', '<p>分两行打印 <code>nums</code> 里最大的数和最小的数（先最大，后最小）。</p>'),
    given: T('<p><code>nums</code> — a non-empty list of numbers</p>', '<p><code>nums</code>——非空的数字列表</p>'),
    cases: ['nums = [4, 9, 1, 7]', 'nums = [5]', 'nums = [-3, -8, -1]'],
    starter: C``,
    solution: C`print(max(nums))
print(min(nums))`,
    hints: [T('Python has <code>max()</code> and <code>min()</code>.', 'Python 有 <code>max()</code> 和 <code>min()</code>。')],
    explain: T('Built-in functions save you writing a loop for common jobs.', '内置函数让你在常见任务中不用自己写循环。'),
    check: stdout });

  add({ id: 603, section: 'lists', level: 'easy',
    title: T('Class Average', '班级平均分'),
    desc: T('<p>Print the average of <code>scores</code>, rounded to 2 decimal places with <code>round()</code>.</p>', '<p>打印 <code>scores</code> 的平均分，用 <code>round()</code> 保留 2 位小数。</p>'),
    given: T('<p><code>scores</code> — a non-empty list of numbers</p>', '<p><code>scores</code>——非空的数字列表</p>'),
    cases: ['scores = [78, 85, 92, 64]', 'scores = [100]', 'scores = [1, 2, 2]'],
    starter: C``,
    solution: C`print(round(sum(scores) / len(scores), 2))`,
    hints: [T('Average = <code>sum(scores) / len(scores)</code>.', '平均值 = <code>sum(scores) / len(scores)</code>。'), T('<code>round(x, 2)</code> keeps 2 decimals.', '<code>round(x, 2)</code> 保留 2 位小数。')],
    explain: T('<code>sum</code> and <code>len</code> together give an average for any list length.', '<code>sum</code> 和 <code>len</code> 配合使用，对任何长度的列表都能求平均值。'),
    check: stdout });

  add({ id: 604, section: 'lists', level: 'medium',
    title: T('Even Numbers Only', '只要偶数'),
    desc: T('<p>Build a new list with only the even numbers from <code>nums</code>, in the same order, and print it. <code>[1, 2, 3, 4]</code> → <code>[2, 4]</code></p>', '<p>用 <code>nums</code> 里的偶数组成一个新列表（保持原来的顺序）并打印。<code>[1, 2, 3, 4]</code> → <code>[2, 4]</code></p>'),
    given: T('<p><code>nums</code> — a list of whole numbers</p>', '<p><code>nums</code>——整数列表</p>'),
    cases: ['nums = [1, 2, 3, 4]', 'nums = [7, 9]', 'nums = [10, -2, 5, 0, 8]'],
    starter: C`evens = []
`,
    solution: C`evens = []
for n in nums:
    if n % 2 == 0:
        evens.append(n)
print(evens)`,
    hints: [T('Loop over <code>nums</code>; when a number is even, <code>append</code> it to <code>evens</code>.', '遍历 <code>nums</code>；遇到偶数就 <code>append</code> 到 <code>evens</code>。'), T('If there are no even numbers, the answer is <code>[]</code>.', '如果没有偶数，答案就是 <code>[]</code>。')],
    explain: T('"Start empty, loop, append when it matches" is the filtering pattern. Chapter 8 shows a one-line version.', '"先建一个空列表，遍历，符合条件就加进去"是筛选的基本模式。第 8 章会介绍一行写完的写法。'),
    check: stdout });

  add({ id: 605, section: 'lists', level: 'medium',
    title: T('Distance from Origin', '到原点的距离'),
    desc: T('<p><code>point</code> is a tuple <code>(x, y)</code>. Print its distance from (0, 0), √(x² + y²), rounded to 2 decimals. <code>(3, 4)</code> → <code>5.0</code></p>', '<p><code>point</code> 是元组 <code>(x, y)</code>。打印它到 (0, 0) 的距离 √(x² + y²)，保留 2 位小数。<code>(3, 4)</code> → <code>5.0</code></p>'),
    given: T('<p><code>point</code> — a tuple of two numbers</p>', '<p><code>point</code>——包含两个数字的元组</p>'),
    cases: ['point = (3, 4)', 'point = (1, 1)', 'point = (-6, 2.5)'],
    starter: C``,
    solution: C`x, y = point
print(round((x ** 2 + y ** 2) ** 0.5, 2))`,
    hints: [T('Unpack first: <code>x, y = point</code>.', '先拆包：<code>x, y = point</code>。'), T('A square root is power 0.5: <code>value ** 0.5</code>.', '开平方就是 0.5 次方：<code>value ** 0.5</code>。')],
    explain: T('Unpacking gives each part of a tuple a clear name.', '拆包让元组的每一部分都有一个清楚的名字。'),
    check: stdout });

  // ================================================================ 7. Dictionaries & Sets
  lesson('dicts', {
    intro: T('<p>A <b>dictionary</b> stores <b>key → value</b> pairs, like a phone book: you look things up by key instead of by position. A <b>set</b> is an unordered collection with no duplicates.</p>',
      '<p><b>字典</b>存放<b>键 → 值</b>的对应关系，就像电话簿：用键来查找，而不是用位置。<b>集合</b>是没有顺序、没有重复元素的一组值。</p>'),
    cards: [
      { title: T('Making and reading a dictionary', '创建和读取字典'),
        body: T('<p><code>d[key]</code> fails if the key is missing; <code>d.get(key, default)</code> gives a default instead.</p>', '<p>键不存在时 <code>d[key]</code> 会报错；<code>d.get(key, 默认值)</code> 则返回默认值。</p>'),
        code: C`ages = {"Ali": 31, "Mei": 28}
print(ages["Mei"])
print(ages.get("Raj"))
print(ages.get("Raj", "unknown"))
print("Ali" in ages)`},
      { title: T('Adding, changing, removing', '添加、修改、删除'),
        body: T('<p>Assigning to a new key adds it; to an existing key replaces it.</p>', '<p>给新键赋值就是添加；给已有的键赋值就是替换。</p>'),
        code: C`stock = {"apple": 5}
stock["pear"] = 2
stock["apple"] += 10
del stock["pear"]
print(stock)`},
      { title: T('Looping over a dictionary', '遍历字典'),
        body: T('<p><code>.items()</code> gives key and value together.</p>', '<p><code>.items()</code> 同时给出键和值。</p>'),
        code: C`prices = {"nasi lemak": 5.5, "teh tarik": 2.8}
for food, price in prices.items():
    print(f"{food}: RM{price:.2f}")
print(list(prices.keys()))`},
      { title: T('Counting with a dictionary', '用字典计数'),
        body: T('<p>A classic pattern: <code>counts[x] = counts.get(x, 0) + 1</code>.</p>', '<p>一个经典模式：<code>counts[x] = counts.get(x, 0) + 1</code>。</p>'),
        code: C`votes = ["red", "blue", "red", "green", "red"]
counts = {}
for v in votes:
    counts[v] = counts.get(v, 0) + 1
print(counts)`},
      { title: T('Sets remove duplicates', '集合会去掉重复'),
        body: T('<p><code>&amp;</code> is "in both", <code>|</code> is "in either", <code>-</code> is "in the first only".</p>', '<p><code>&amp;</code> 表示"两边都有"，<code>|</code> 表示"任一边有"，<code>-</code> 表示"只有第一个有"。</p>'),
        code: C`a = {1, 2, 3, 3, 3}
b = {3, 4}
print(a)
print(a & b, a | b, a - b)
print(len(set(["x", "y", "x"])))`}
    ],
    quiz: [
      { q: T('What does <code>{"a": 1}.get("b", 0)</code> return?', '<code>{"a": 1}.get("b", 0)</code> 返回什么？'), options: [T('An error', '报错'), T('0', '0'), T('None', 'None')], answer: 1, why: T('get returns the default when the key is missing.', '键不存在时 get 返回默认值。') },
      { q: T('What is <code>len({1, 1, 2})</code>?', '<code>len({1, 1, 2})</code> 等于多少？'), options: [T('3', '3'), T('2', '2')], answer: 1, why: T('Sets keep each value once.', '集合中每个值只保留一次。') },
      { q: T('Which loop gives both key and value?', '哪种写法能同时得到键和值？'), options: [T('for k in d', 'for k in d'), T('for k, v in d.items()', 'for k, v in d.items()'), T('for v in d.values()', 'for v in d.values()')], answer: 1, why: T('.items() yields (key, value) pairs.', '.items() 产生 (键, 值) 对。') }
    ]
  });

  add({ id: 701, section: 'dicts', level: 'easy',
    title: T('Phone Book', '电话簿'),
    desc: T('<p>Print the number for <code>name</code> from <code>book</code>, or <code>Not found</code> if the name is not there.</p>', '<p>从 <code>book</code> 里打印 <code>name</code> 的电话号码；如果没有这个名字，打印 <code>Not found</code>。</p>'),
    given: T('<p><code>book</code> — a dict of name → number (strings); <code>name</code> — a string</p>', '<p><code>book</code>——名字 → 号码的字典（都是字符串）；<code>name</code>——字符串</p>'),
    setup: 'book = {"Ali": "012-3456789", "Mei": "016-1112233", "Raj": "019-8765432"}',
    cases: ['name = "Mei"', 'name = "Tom"', 'name = "Raj"'],
    starter: C``,
    solution: C`print(book.get(name, "Not found"))`,
    hints: [T('<code>book[name]</code> fails for a missing name.', '名字不存在时 <code>book[name]</code> 会报错。'), T('<code>book.get(name, "Not found")</code>.', '<code>book.get(name, "Not found")</code>。')],
    explain: T('<code>get</code> with a default avoids a KeyError and an extra if.', '带默认值的 <code>get</code> 可以避免 KeyError，也省掉一个 if。'),
    check: stdout });

  add({ id: 702, section: 'dicts', level: 'medium',
    title: T('Word Count', '单词计数'),
    desc: T('<p>Create a dictionary <code>counts</code> that maps each word in <code>text</code> to how many times it appears. Words are separated by spaces and already lower case. Your <code>counts</code> is checked directly — printing is optional.</p>',
      '<p>建立一个字典 <code>counts</code>，记录 <code>text</code> 中每个单词出现的次数。单词之间用空格隔开，并且都已经是小写。系统会直接检查你的 <code>counts</code>——打印与否都可以。</p>'),
    given: T('<p><code>text</code> — a string of lower-case words</p>', '<p><code>text</code>——由小写单词组成的字符串</p>'),
    cases: ['text = "the cat and the hat"', 'text = "go go go"', 'text = "one"'],
    starter: C`counts = {}
`,
    solution: C`counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
print(counts)`,
    hints: [T('<code>text.split()</code> gives a list of words.', '<code>text.split()</code> 会得到单词列表。'), T('For each word: <code>counts[word] = counts.get(word, 0) + 1</code>.', '对每个单词：<code>counts[word] = counts.get(word, 0) + 1</code>。')],
    explain: T('This counting pattern is everywhere. <code>collections.Counter</code> (chapter 9) does it in one line.', '这种计数模式到处都在用。<code>collections.Counter</code>（第 9 章）一行就能做到。'),
    check: { type: 'values', exprs: ['counts'] } });

  add({ id: 703, section: 'dicts', level: 'easy',
    title: T('How Many Different?', '有几个不同的值？'),
    desc: T('<p>Print how many different values are in <code>nums</code>.</p>', '<p>打印 <code>nums</code> 里有几个不同的值。</p>'),
    given: T('<p><code>nums</code> — a list</p>', '<p><code>nums</code>——列表</p>'),
    cases: ['nums = [1, 2, 2, 3, 3, 3]', 'nums = []', 'nums = [7, 7, 7]'],
    starter: C``,
    solution: C`print(len(set(nums)))`,
    hints: [T('A set keeps each value once.', '集合中每个值只保留一次。'), T('<code>len(set(nums))</code>.', '<code>len(set(nums))</code>。')],
    explain: T('Turning a list into a set is the quickest way to remove duplicates.', '把列表转成集合是去除重复最快的方法。'),
    check: stdout });

  add({ id: 704, section: 'dicts', level: 'medium',
    title: T('Friends in Common', '共同好友'),
    desc: T('<p>Print an alphabetically sorted list of the names that appear in both <code>a</code> and <code>b</code>.</p>', '<p>按字母顺序打印同时出现在 <code>a</code> 和 <code>b</code> 中的名字列表。</p>'),
    given: T('<p><code>a</code>, <code>b</code> — lists of names</p>', '<p><code>a</code>、<code>b</code>——名字列表</p>'),
    cases: ['a = ["Mei", "Ali", "Raj"]\nb = ["Raj", "Tom", "Ali"]', 'a = ["Zoe"]\nb = ["Yan"]', 'a = ["Bo", "Al", "Bo"]\nb = ["Bo", "Al"]'],
    starter: C``,
    solution: C`print(sorted(set(a) & set(b)))`,
    hints: [T('Turn both lists into sets and use <code>&amp;</code>.', '把两个列表都转成集合，再用 <code>&amp;</code>。'), T('<code>sorted()</code> turns the set into a sorted list.', '<code>sorted()</code> 会把集合变成排好序的列表。')],
    explain: T('Set operations answer "which items are shared / different" in one step.', '集合运算一步就能回答"哪些相同、哪些不同"。'),
    check: stdout });

  add({ id: 705, section: 'dicts', level: 'medium',
    title: T('Stock Value', '库存总值'),
    desc: T('<p><code>stock</code> maps an item to how many we have; <code>prices</code> maps an item to its price. Print the total value of the stock, rounded to 2 decimals.</p>', '<p><code>stock</code> 记录每种商品的数量；<code>prices</code> 记录每种商品的单价。打印库存的总价值，保留 2 位小数。</p>'),
    given: T('<p><code>stock</code>, <code>prices</code> — dicts with the same keys</p>', '<p><code>stock</code>、<code>prices</code>——键相同的两个字典</p>'),
    cases: ['stock = {"apple": 10, "pear": 4}\nprices = {"apple": 0.5, "pear": 1.25}', 'stock = {"pen": 0}\nprices = {"pen": 2.0}', 'stock = {"a": 3, "b": 2, "c": 1}\nprices = {"a": 1.1, "b": 2.2, "c": 3.3}'],
    starter: C`total = 0
`,
    solution: C`total = 0
for item, qty in stock.items():
    total += qty * prices[item]
print(round(total, 2))`,
    hints: [T('Loop over <code>stock.items()</code>.', '遍历 <code>stock.items()</code>。'), T('For each item add <code>qty * prices[item]</code>.', '每种商品加上 <code>qty * prices[item]</code>。')],
    explain: T('Two dictionaries with the same keys can be combined by looking up the key in both.', '键相同的两个字典，可以用同一个键在两边分别查找来组合。'),
    check: stdout });
})();
