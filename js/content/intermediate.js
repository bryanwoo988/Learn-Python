/* Part 2 — Intermediate: chapters 8–11 (20 problems). Written for this app. */
(function () {
  'use strict';
  const { T, lesson, add, file } = window.PYC;
  const C = String.raw;
  const fn = (name, calls) => ({ type: 'function', name, calls });
  const values = (exprs, extra) => Object.assign({ type: 'values', exprs }, extra);

  file('notes.txt', `
Buy durian at the market
Call Mei about the trip
Finish chapter 10
Water the plants
`);
  file('sales.csv', `
date,item,qty,price
2026-01-03,notebook,4,3.50
2026-01-03,pen,10,1.20
2026-01-04,stapler,1,12.90
2026-01-05,notebook,2,3.50
2026-01-06,marker,6,2.80
2026-01-06,pen,5,1.20
2026-01-07,folder,8,0.90
2026-01-08,stapler,2,12.90
`);

  // ================================================================ 8. Functions
  lesson('functions', {
    intro: T('<p>A <b>function</b> is a named piece of code you can run again and again. It takes <b>parameters</b> (inputs) and can <b>return</b> a result. From this chapter on, many problems ask you to write a function; the checker calls it with several inputs.</p>',
      '<p><b>函数</b>是一段有名字、可以反复执行的代码。它接收<b>参数</b>（输入），并且可以<b>返回</b>结果。从本章开始，很多题目会要求你写一个函数，检查程序会用几组不同的输入去调用它。</p>'),
    cards: [
      { title: T('def and calling', 'def 和调用'),
        body: T('<p>Defining a function does not run it. Calling it — name plus brackets — does.</p>', '<p>定义函数并不会执行它。调用它——名字加括号——才会执行。</p>'),
        code: C`def say_hi():
    print("Hi!")

say_hi()
say_hi()`},
      { title: T('Parameters and return', '参数和返回值'),
        body: T('<p><code>return</code> sends a value back to the caller. <code>print</code> only shows it — you cannot use a printed value later.</p>', '<p><code>return</code> 把一个值送回给调用的地方。<code>print</code> 只是显示——打印出来的值没法再拿去用。</p>'),
        code: C`def add(a, b):
    return a + b

result = add(2, 3)
print(result, add(10, -4) * 2)`},
      { title: T('Default and keyword arguments', '默认参数和关键字参数'),
        body: T('<p>A parameter with <code>=</code> has a default. You can pass arguments by name in any order.</p>', '<p>带 <code>=</code> 的参数有默认值。也可以用名字传参，顺序随意。</p>'),
        code: C`def price_with_tax(price, rate=0.06):
    return round(price * (1 + rate), 2)

print(price_with_tax(100))
print(price_with_tax(100, 0.08))
print(price_with_tax(rate=0.1, price=50))`},
      { title: T('Scope: local and global', '作用域：局部和全局'),
        body: T('<p>Variables created inside a function exist only there. Pass values in as parameters and get results out with <code>return</code>.</p>', '<p>在函数里创建的变量只在函数里存在。用参数把值传进去，用 <code>return</code> 把结果带出来。</p>'),
        code: C`def double(x):
    y = x * 2    #: y only exists inside double || y 只存在于 double 里面
    return y

print(double(4))
print("y" in globals())`},
      { title: T('lambda and sort keys', 'lambda 与排序键'),
        body: T('<p><code>lambda</code> is a tiny one-line function, handy for <code>key=</code> in <code>sorted</code>, <code>min</code>, <code>max</code>.</p>', '<p><code>lambda</code> 是一行写完的小函数，常用在 <code>sorted</code>、<code>min</code>、<code>max</code> 的 <code>key=</code> 里。</p>'),
        code: C`people = [("Ali", 31), ("Mei", 24), ("Raj", 40)]
print(sorted(people, key=lambda p: p[1]))
print(max(people, key=lambda p: p[1])[0])`},
      { title: T('List comprehensions', '列表推导式'),
        body: T('<p><code>[expression for item in items if condition]</code> builds a list in one line.</p>', '<p><code>[表达式 for 元素 in 序列 if 条件]</code> 一行就能建好一个列表。</p>'),
        code: C`nums = [1, 2, 3, 4, 5, 6]
squares = [n * n for n in nums]
evens = [n for n in nums if n % 2 == 0]
print(squares)
print(evens)
print({w: len(w) for w in ["sun", "moon"]})`}
    ],
    quiz: [
      { q: T('What does a function return if it has no <code>return</code>?', '没有 <code>return</code> 的函数会返回什么？'), options: [T('0', '0'), T('None', 'None'), T('An error', '报错')], answer: 1, why: T('Python returns None by default.', 'Python 默认返回 None。') },
      { q: T('<code>def f(x, y=2): return x * y</code>. What is <code>f(5)</code>?', '<code>def f(x, y=2): return x * y</code>。<code>f(5)</code> 等于多少？'), options: [T('5', '5'), T('7', '7'), T('10', '10')], answer: 2, why: T('y uses its default 2.', 'y 用默认值 2。') },
      { q: T('What is <code>[x + 1 for x in [1, 2]]</code>?', '<code>[x + 1 for x in [1, 2]]</code> 是什么？'), options: [T('[2, 3]', '[2, 3]'), T('[1, 2, 1]', '[1, 2, 1]'), T('3', '3')], answer: 0, why: T('The expression is applied to each item.', '表达式会作用在每个元素上。') }
    ]
  });

  add({ id: 801, section: 'functions', level: 'easy',
    title: T('Greeting Function', '问候函数'),
    desc: T('<p>Write <code>greet(name)</code> that <b>returns</b> (not prints) <code>"Hello, NAME!"</code>. <code>greet("Ada")</code> → <code>"Hello, Ada!"</code></p>', '<p>写一个函数 <code>greet(name)</code>，<b>返回</b>（不是打印）<code>"Hello, NAME!"</code>。<code>greet("Ada")</code> → <code>"Hello, Ada!"</code></p>'),
    starter: C`def greet(name):
    pass  #: replace with your code || 换成你的代码
`,
    solution: C`def greet(name):
    return f"Hello, {name}!"`,
    hints: [T('Build the text with an f-string.', '用 f-string 组出这段文字。'), T('Use <code>return</code>, not <code>print</code>.', '用 <code>return</code>，不要用 <code>print</code>。')],
    explain: T('Returning makes the result reusable: <code>greet("Ada").upper()</code> works, a printed value would not.', '返回值可以被再次使用：<code>greet("Ada").upper()</code> 可以运行，打印出来的值却不行。'),
    check: fn('greet', [['Ada'], ['Mei'], ['World']]) });

  add({ id: 802, section: 'functions', level: 'easy',
    title: T('Celsius to Fahrenheit', '摄氏转华氏'),
    desc: T('<p>Write <code>c_to_f(c)</code> that returns the temperature in Fahrenheit: F = C × 9 / 5 + 32.</p>', '<p>写一个函数 <code>c_to_f(c)</code>，返回对应的华氏温度：F = C × 9 / 5 + 32。</p>'),
    starter: C`def c_to_f(c):
    pass
`,
    solution: C`def c_to_f(c):
    return c * 9 / 5 + 32`,
    hints: [T('Return the formula directly.', '直接返回这个公式。')],
    explain: T('Small, single-purpose functions are easy to test and reuse.', '只做一件事的小函数容易测试，也容易重复使用。'),
    check: fn('c_to_f', [[0], [100], [-40], [36.6]]) });

  add({ id: 803, section: 'functions', level: 'easy',
    title: T('Palindrome', '回文'),
    desc: T('<p>Write <code>is_palindrome(word)</code> that returns <code>True</code> if the word reads the same backwards, ignoring capitals (<code>"Level"</code> → True).</p>', '<p>写一个函数 <code>is_palindrome(word)</code>：如果单词倒过来读也一样（不分大小写）就返回 <code>True</code>（<code>"Level"</code> → True）。</p>'),
    starter: C`def is_palindrome(word):
    pass
`,
    solution: C`def is_palindrome(word):
    w = word.lower()
    return w == w[::-1]`,
    hints: [T('<code>text[::-1]</code> is the text reversed.', '<code>text[::-1]</code> 就是倒过来的文字。'), T('Lower-case first, then compare.', '先转小写，再比较。')],
    explain: T('A slice with step −1 walks backwards through the string.', '步长为 −1 的切片会倒着走过整个字符串。'),
    check: fn('is_palindrome', [['Level'], ['python'], ['a'], ['Noon'], ['ab']]) });

  add({ id: 804, section: 'functions', level: 'medium',
    title: T('Squares with a Comprehension', '用推导式求平方'),
    desc: T('<p>Write <code>squares(n)</code> that returns the list <code>[1, 4, 9, …, n²]</code>. For <code>n = 0</code> return <code>[]</code>.</p>', '<p>写一个函数 <code>squares(n)</code>，返回列表 <code>[1, 4, 9, …, n²]</code>。<code>n = 0</code> 时返回 <code>[]</code>。</p>'),
    starter: C`def squares(n):
    pass
`,
    solution: C`def squares(n):
    return [i * i for i in range(1, n + 1)]`,
    hints: [T('Numbers 1 to n: <code>range(1, n + 1)</code>.', '1 到 n：<code>range(1, n + 1)</code>。'), T('<code>[i * i for i in …]</code>.', '<code>[i * i for i in …]</code>。')],
    explain: T('A comprehension replaces "empty list + loop + append" with one readable line.', '推导式把"空列表 + 循环 + append"变成了一行好读的代码。'),
    check: fn('squares', [[5], [1], [0], [10]]) });

  add({ id: 805, section: 'functions', level: 'medium',
    title: T('Sort by Length', '按长度排序'),
    desc: T('<p>Write <code>by_length(words)</code> that returns a <b>new</b> list of the words sorted from shortest to longest. Words of equal length keep their original order.</p>', '<p>写一个函数 <code>by_length(words)</code>，返回一个按长度从短到长排好序的<b>新</b>列表。长度相同的单词保持原来的先后顺序。</p>'),
    starter: C`def by_length(words):
    pass
`,
    solution: C`def by_length(words):
    return sorted(words, key=len)`,
    hints: [T('<code>sorted(…, key=…)</code> sorts by whatever the key function returns.', '<code>sorted(…, key=…)</code> 会按 key 函数的返回值来排序。'), T('<code>len</code> itself is a function: <code>key=len</code>.', '<code>len</code> 本身就是一个函数：<code>key=len</code>。')],
    explain: T('Python’s sort is <b>stable</b>: equal keys keep their order.', 'Python 的排序是<b>稳定</b>的：键相同的元素保持原来的顺序。'),
    check: fn('by_length', [[['kiwi', 'fig', 'banana']], [[]], [['bb', 'a', 'cc', 'd']]]) });

  add({ id: 806, section: 'functions', level: 'medium',
    title: T('Count Vowels', '数元音'),
    desc: T('<p>Write <code>count_vowels(text)</code> that returns how many vowels (a, e, i, o, u — upper or lower case) are in <code>text</code>.</p>', '<p>写一个函数 <code>count_vowels(text)</code>，返回 <code>text</code> 中元音字母（a、e、i、o、u，大小写都算）的个数。</p>'),
    starter: C`def count_vowels(text):
    pass
`,
    solution: C`def count_vowels(text):
    return sum(1 for ch in text.lower() if ch in "aeiou")`,
    hints: [T('Loop over <code>text.lower()</code> and check <code>ch in "aeiou"</code>.', '遍历 <code>text.lower()</code>，检查 <code>ch in "aeiou"</code>。'), T('Keep a counter, or use <code>sum(1 for …)</code>.', '用一个计数器，或者用 <code>sum(1 for …)</code>。')],
    explain: T('<code>in</code> on a string checks for a single character quickly.', '对字符串用 <code>in</code> 可以快速检查某个字符。'),
    check: fn('count_vowels', [['Hello World'], ['xyz'], ['AEIOU aeiou'], ['']]) });

  // ================================================================ 9. Errors & Modules
  lesson('modules', {
    intro: T('<p>Errors are normal. <code>try</code> / <code>except</code> lets a program handle them instead of crashing. <b>Modules</b> add ready-made tools: <code>import math</code>, <code>random</code>, <code>datetime</code>, <code>json</code>, <code>re</code> and many more come with Python.</p>',
      '<p>出错很正常。<code>try</code> / <code>except</code> 让程序处理错误而不是直接崩溃。<b>模块</b>提供现成的工具：<code>import math</code>、<code>random</code>、<code>datetime</code>、<code>json</code>、<code>re</code> 等很多模块都是 Python 自带的。</p>'),
    cards: [
      { title: T('try and except', 'try 和 except'),
        body: T('<p>Catch the specific error you expect. Change <code>"abc"</code> to <code>"12"</code>.</p>', '<p>捕获你预料到的具体错误。试着把 <code>"abc"</code> 改成 <code>"12"</code>。</p>'),
        code: C`text = "abc"
try:
    number = int(text)
    print("Got", number)
except ValueError:
    print("That is not a whole number:", text)`},
      { title: T('else, finally and raise', 'else、finally 和 raise'),
        body: T('<p><code>else</code> runs when nothing failed, <code>finally</code> always runs, <code>raise</code> creates your own error.</p>', '<p>没出错时运行 <code>else</code>，<code>finally</code> 总会运行，<code>raise</code> 主动抛出错误。</p>'),
        code: C`def check_age(age):
    if age < 0:
        raise ValueError("age cannot be negative")
    return age

for a in [30, -1]:
    try:
        check_age(a)
    except ValueError as e:
        print("Problem:", e)
    else:
        print(a, "is fine")
    finally:
        print("checked", a)`},
      { title: T('math and random', 'math 和 random'),
        body: T('<p><code>random.seed()</code> makes random numbers repeatable, which helps when testing.</p>', '<p><code>random.seed()</code> 让随机数可以重现，方便测试。</p>'),
        code: C`import math
import random

print(math.sqrt(16), math.pi, math.floor(2.7), math.ceil(2.1))
random.seed(1)
print(random.randint(1, 6), random.choice(["rock", "paper", "scissors"]))`},
      { title: T('Dates with datetime', '用 datetime 处理日期'),
        body: T('<p>Subtracting dates gives a <code>timedelta</code>; <code>.days</code> is the number of days.</p>', '<p>两个日期相减得到 <code>timedelta</code>；<code>.days</code> 就是相差的天数。</p>'),
        code: C`from datetime import date, timedelta

start = date(2026, 1, 1)
end = date.fromisoformat("2026-03-01")
print((end - start).days)
print(start + timedelta(days=100))
print(start.strftime("%d/%m/%Y"))`},
      { title: T('JSON', 'JSON'),
        body: T('<p>JSON is the text format most web services use. <code>json.dumps</code> turns Python into JSON text; <code>json.loads</code> reads it back.</p>', '<p>JSON 是大多数网络服务使用的文字格式。<code>json.dumps</code> 把 Python 数据转成 JSON 文字；<code>json.loads</code> 再读回来。</p>'),
        code: C`import json

order = {"id": 7, "items": ["teh", "roti"], "paid": True}
text = json.dumps(order)
print(text)
back = json.loads(text)
print(back["items"][1])`},
      { title: T('Regular expressions', '正则表达式'),
        body: T('<p><code>re</code> finds patterns in text. <code>\\d+</code> means "one or more digits".</p>', '<p><code>re</code> 用来在文字中找规律。<code>\\d+</code> 表示"一个或多个数字"。</p>'),
        code: C`import re

text = "Order 15 costs RM42, order 16 costs RM7"
print(re.findall(r"\d+", text))
print(re.findall(r"RM(\d+)", text))
print(re.sub(r"\d", "#", "pin 1234"))`}
    ],
    quiz: [
      { q: T('Which error does <code>int("hi")</code> raise?', '<code>int("hi")</code> 会引发哪种错误？'), options: [T('TypeError', 'TypeError'), T('ValueError', 'ValueError'), T('NameError', 'NameError')], answer: 1, why: T('The type (str) is allowed; the value is not a number.', '类型（str）是允许的；但值不是数字。') },
      { q: T('When does a <code>finally</code> block run?', '<code>finally</code> 代码块什么时候运行？'), options: [T('Only after an error', '只在出错后'), T('Only without errors', '只在没出错时'), T('Always', '总会运行')], answer: 2, why: T('finally is for clean-up that must always happen.', 'finally 用来做一定要做的收尾工作。') },
      { q: T('What does <code>re.findall(r"\\d+", "a1b22")</code> return?', '<code>re.findall(r"\\d+", "a1b22")</code> 返回什么？'), options: [T("['1', '22']", "['1', '22']"), T("['1', '2', '2']", "['1', '2', '2']"), T('[1, 22]', '[1, 22]')], answer: 0, why: T('\\d+ matches runs of digits, returned as strings.', '\\d+ 匹配连续的数字，结果是字符串。') }
    ]
  });

  add({ id: 901, section: 'modules', level: 'easy',
    title: T('Safe Division', '安全除法'),
    desc: T('<p>Write <code>safe_divide(a, b)</code> that returns <code>a / b</code>, or <code>None</code> if <code>b</code> is 0. Use <code>try</code> / <code>except</code>.</p>', '<p>写一个函数 <code>safe_divide(a, b)</code>，返回 <code>a / b</code>；如果 <code>b</code> 是 0 就返回 <code>None</code>。用 <code>try</code> / <code>except</code>。</p>'),
    starter: C`def safe_divide(a, b):
    return a / b
`,
    solution: C`def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return None`,
    hints: [T('Dividing by zero raises <code>ZeroDivisionError</code>.', '除以零会引发 <code>ZeroDivisionError</code>。')],
    explain: T('Catching one specific error keeps other, unexpected bugs visible.', '只捕获一种具体的错误，其他意外的错误仍然会显示出来。'),
    check: fn('safe_divide', [[10, 2], [1, 0], [-3, 4], [0, 5]]) });

  add({ id: 902, section: 'modules', level: 'easy',
    title: T('Text to Int, Safely', '安全地把文字转成整数'),
    desc: T('<p>Write <code>to_int(text)</code> that returns the whole number in <code>text</code>, or <code>0</code> if it is not a valid whole number.</p>', '<p>写一个函数 <code>to_int(text)</code>，返回 <code>text</code> 里的整数；如果不是有效的整数就返回 <code>0</code>。</p>'),
    starter: C`def to_int(text):
    pass
`,
    solution: C`def to_int(text):
    try:
        return int(text)
    except ValueError:
        return 0`,
    hints: [T('<code>int("abc")</code> raises <code>ValueError</code>.', '<code>int("abc")</code> 会引发 <code>ValueError</code>。')],
    explain: T('This "try to convert, fall back to a default" pattern is common when reading user input.', '"尝试转换，失败就用默认值"是读取用户输入时很常见的写法。'),
    check: fn('to_int', [['42'], ['abc'], ['-7'], [''], ['3.5']]) });

  add({ id: 903, section: 'modules', level: 'easy',
    title: T('Circle Area with math', '用 math 求圆面积'),
    desc: T('<p>Write <code>circle_area(r)</code> that returns the area πr² rounded to 2 decimals. Use <code>math.pi</code>.</p>', '<p>写一个函数 <code>circle_area(r)</code>，返回圆面积 πr²，保留 2 位小数。用 <code>math.pi</code>。</p>'),
    starter: C`import math

def circle_area(r):
    pass
`,
    solution: C`import math

def circle_area(r):
    return round(math.pi * r ** 2, 2)`,
    hints: [T('<code>math.pi * r ** 2</code>.', '<code>math.pi * r ** 2</code>。'), T('Wrap it in <code>round(…, 2)</code>.', '外面套上 <code>round(…, 2)</code>。')],
    explain: T('Modules keep constants like π accurate so you do not have to type them.', '模块里的 π 这类常数很精确，不需要自己输入。'),
    check: fn('circle_area', [[1], [2.5], [0], [10]]) });

  add({ id: 904, section: 'modules', level: 'medium',
    title: T('Days Between Dates', '两个日期相差几天'),
    desc: T('<p>Write <code>days_between(d1, d2)</code>. Both are dates written as <code>"YYYY-MM-DD"</code>. Return the number of days between them, always as a positive number (or 0).</p>', '<p>写一个函数 <code>days_between(d1, d2)</code>。两个参数都是 <code>"YYYY-MM-DD"</code> 格式的日期。返回它们相差的天数，结果永远是正数（或 0）。</p>'),
    starter: C`from datetime import date

def days_between(d1, d2):
    pass
`,
    solution: C`from datetime import date

def days_between(d1, d2):
    a = date.fromisoformat(d1)
    b = date.fromisoformat(d2)
    return abs((b - a).days)`,
    hints: [T('<code>date.fromisoformat("2026-01-01")</code> turns text into a date.', '<code>date.fromisoformat("2026-01-01")</code> 把文字转成日期。'), T('Subtract, take <code>.days</code>, then <code>abs()</code>.', '相减，取 <code>.days</code>，再用 <code>abs()</code>。')],
    explain: T('datetime knows month lengths and leap years, so date maths is safe.', 'datetime 知道每个月有几天、哪年是闰年，所以日期计算不会出错。'),
    check: fn('days_between', [['2026-01-01', '2026-03-01'], ['2024-12-25', '2024-12-24'], ['2025-05-05', '2025-05-05'], ['2024-02-01', '2024-03-01']]) });

  add({ id: 905, section: 'modules', level: 'hard',
    title: T('Find Email Addresses', '找出电子邮件地址'),
    desc: T('<p>Write <code>find_emails(text)</code> that returns a list of the email addresses in <code>text</code>, in order. An address is letters/digits/dots/<code>_</code>/<code>+</code>/<code>-</code>, then <code>@</code>, then a domain like <code>shop.com.my</code>. A full stop that ends a sentence is not part of the address.</p>',
      '<p>写一个函数 <code>find_emails(text)</code>，按顺序返回 <code>text</code> 里所有电子邮件地址组成的列表。地址的格式是：字母/数字/点/<code>_</code>/<code>+</code>/<code>-</code>，然后是 <code>@</code>，再接一个像 <code>shop.com.my</code> 这样的域名。句子末尾的句号不属于地址。</p>'),
    starter: C`import re

def find_emails(text):
    pass
`,
    solution: C`import re

def find_emails(text):
    return re.findall(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+", text)`,
    hints: [T('Use <code>re.findall(pattern, text)</code>.', '用 <code>re.findall(pattern, text)</code>。'), T('Before <code>@</code>: <code>[\\w.+-]+</code>. The domain is a name followed by one or more <code>.part</code> groups: <code>[\\w-]+(?:\\.[\\w-]+)+</code>.', '<code>@</code> 前面：<code>[\\w.+-]+</code>。域名是一个名字后面跟一个或多个 <code>.xxx</code>：<code>[\\w-]+(?:\\.[\\w-]+)+</code>。')],
    explain: T('<code>(?: )</code> groups without capturing, so <code>findall</code> still returns whole matches.', '<code>(?: )</code> 是不捕获的分组，所以 <code>findall</code> 仍然返回完整的匹配。'),
    check: fn('find_emails', [['Contact ali@shop.my or mei.tan@uni.edu.my.'], ['no emails here'], ['a@b.co,c-d@e.org'], ['x+tag@mail.example.com is mine']]) });

  // ================================================================ 10. Files
  lesson('files', {
    intro: T('<p>Programs save and load data with files. In this app each run gets fresh copies of the sample files <code>notes.txt</code> and <code>sales.csv</code>; anything you write is reset on the next run.</p>',
      '<p>程序用文件来保存和读取数据。在本应用里，每次运行都会拿到一份全新的示例文件 <code>notes.txt</code> 和 <code>sales.csv</code>；你写入的内容在下次运行时会被重置。</p>'),
    cards: [
      { title: T('Reading a whole file', '读取整个文件'),
        body: T('<p><code>with open(…) as f:</code> opens the file and closes it automatically at the end of the block.</p>', '<p><code>with open(…) as f:</code> 打开文件，并在代码块结束时自动关闭。</p>'),
        code: C`with open("notes.txt") as f:
    content = f.read()
print(content)
print(len(content), "characters")`, files: ['notes.txt'] },
      { title: T('Line by line', '一行一行读'),
        body: T('<p>Looping over a file gives one line at a time, each ending in <code>\\n</code>; <code>.strip()</code> removes it.</p>', '<p>遍历文件会一次得到一行，每行末尾有 <code>\\n</code>；用 <code>.strip()</code> 去掉它。</p>'),
        code: C`with open("notes.txt") as f:
    for number, line in enumerate(f, start=1):
        print(number, line.strip())`, files: ['notes.txt'] },
      { title: T('Writing and appending', '写入和追加'),
        body: T('<p>Mode <code>"w"</code> replaces the file, <code>"a"</code> adds to the end. <code>write</code> does not add newlines for you.</p>', '<p>模式 <code>"w"</code> 会覆盖文件，<code>"a"</code> 会加到末尾。<code>write</code> 不会自动换行。</p>'),
        code: C`with open("diary.txt", "w") as f:
    f.write("Day 1: started Python\n")
with open("diary.txt", "a") as f:
    f.write("Day 2: wrote a file\n")
with open("diary.txt") as f:
    print(f.read())`},
      { title: T('CSV files', 'CSV 文件'),
        body: T('<p><code>csv.DictReader</code> reads each row as a dictionary keyed by the header. Values are text — convert numbers yourself.</p>', '<p><code>csv.DictReader</code> 把每一行读成以表头为键的字典。值都是文字——数字需要自己转换。</p>'),
        code: C`import csv

with open("sales.csv") as f:
    for row in csv.DictReader(f):
        if row["item"] == "pen":
            print(row["date"], int(row["qty"]) * float(row["price"]))`, files: ['sales.csv'] },
      { title: T('Does the file exist?', '文件存在吗？'),
        body: T('<p><code>os.path.exists</code> checks first; otherwise catch <code>FileNotFoundError</code>.</p>', '<p>可以先用 <code>os.path.exists</code> 检查；或者捕获 <code>FileNotFoundError</code>。</p>'),
        code: C`import os

print(os.path.exists("notes.txt"), os.path.exists("missing.txt"))
try:
    open("missing.txt")
except FileNotFoundError:
    print("No such file")`, files: ['notes.txt'] }
    ],
    quiz: [
      { q: T('Which mode adds to the end of an existing file?', '哪种模式会把内容加到已有文件的末尾？'), options: [T('"r"', '"r"'), T('"w"', '"w"'), T('"a"', '"a"')], answer: 2, why: T('"a" means append.', '"a" 表示追加（append）。') },
      { q: T('Why use <code>with open(…)</code>?', '为什么用 <code>with open(…)</code>？'), options: [T('It is faster', '更快'), T('It closes the file automatically', '会自动关闭文件'), T('It reads CSV', '能读 CSV')], answer: 1, why: T('The file is closed when the block ends, even after an error.', '代码块结束时文件会被关闭，即使中途出错也一样。') },
      { q: T('What type is <code>row["qty"]</code> from csv.DictReader?', 'csv.DictReader 读出的 <code>row["qty"]</code> 是什么类型？'), options: [T('int', 'int'), T('str', 'str'), T('float', 'float')], answer: 1, why: T('CSV is plain text; convert numbers with int() or float().', 'CSV 是纯文字；数字要用 int() 或 float() 转换。') }
    ]
  });

  add({ id: 1001, section: 'files', level: 'easy',
    title: T('Count the Lines', '数一数有几行'),
    desc: T('<p>Print how many lines <code>notes.txt</code> has.</p>', '<p>打印 <code>notes.txt</code> 有几行。</p>'),
    files: ['notes.txt'],
    cases: ['', 'open("notes.txt", "w").write("one\\ntwo\\n")', 'open("notes.txt", "w").write("just one line\\n")'],
    starter: C`with open("notes.txt") as f:
    pass
`,
    solution: C`with open("notes.txt") as f:
    lines = f.readlines()
print(len(lines))`,
    hints: [T('<code>f.readlines()</code> returns a list of lines.', '<code>f.readlines()</code> 返回由每一行组成的列表。'), T('Print its <code>len</code>.', '打印它的 <code>len</code>。')],
    explain: T('The hidden tests change the file, so the count must come from reading it.', '隐藏测试会改动文件内容，所以行数必须从文件里读出来。'),
    check: { type: 'stdout' } });

  add({ id: 1002, section: 'files', level: 'medium',
    title: T('Save a Name List', '保存名单'),
    desc: T('<p>Write every name in <code>names</code> to a new file <code>names.txt</code>, one name per line (each line ends with a newline). The checker reads the file afterwards.</p>', '<p>把 <code>names</code> 里的每个名字写进新文件 <code>names.txt</code>，每行一个名字（每行都以换行符结尾）。检查程序之后会读取这个文件。</p>'),
    given: T('<p><code>names</code> — a list of strings</p>', '<p><code>names</code>——字符串列表</p>'),
    cases: ['names = ["Ali", "Mei", "Raj"]', 'names = ["Solo"]', 'names = []'],
    starter: C`with open("names.txt", "w") as f:
    pass
`,
    solution: C`with open("names.txt", "w") as f:
    for name in names:
        f.write(name + "\n")`,
    hints: [T('Loop over <code>names</code> inside the <code>with</code> block.', '在 <code>with</code> 代码块里遍历 <code>names</code>。'), T('<code>f.write(name + "\\n")</code>.', '<code>f.write(name + "\\n")</code>。')],
    explain: T('<code>write</code> writes exactly what you give it; add <code>"\\n"</code> to end each line.', '<code>write</code> 只写你给它的内容；要加 <code>"\\n"</code> 才会换行。'),
    check: values(['open("names.txt").read()'], { asserts: [] }) });

  add({ id: 1003, section: 'files', level: 'medium',
    title: T('Total Sales from CSV', '从 CSV 算出总销售额'),
    desc: T('<p>Read <code>sales.csv</code> and print the total revenue (qty × price summed over all rows), rounded to 2 decimals.</p>', '<p>读取 <code>sales.csv</code>，打印总销售额（所有行的 qty × price 加起来），保留 2 位小数。</p>'),
    files: ['sales.csv'],
    cases: ['', 'open("sales.csv", "w").write("date,item,qty,price\\n2026-02-01,pen,3,1.50\\n")'],
    starter: C`import csv

total = 0
`,
    solution: C`import csv

total = 0
with open("sales.csv") as f:
    for row in csv.DictReader(f):
        total += int(row["qty"]) * float(row["price"])
print(round(total, 2))`,
    hints: [T('Use <code>csv.DictReader</code> and loop over the rows.', '用 <code>csv.DictReader</code>，遍历每一行。'), T('Convert: <code>int(row["qty"]) * float(row["price"])</code>.', '要转换：<code>int(row["qty"]) * float(row["price"])</code>。')],
    explain: T('Reading, converting and adding up rows is the heart of most data jobs — chapter 13 does it with pandas in one line.', '读取、转换、累加每一行，是大多数数据工作的核心——第 13 章会用 pandas 一行做到。'),
    check: { type: 'stdout' } });

  // ================================================================ 11. Classes & Objects
  lesson('oop', {
    intro: T('<p>A <b>class</b> is a blueprint; an <b>object</b> is one thing built from it. Objects bundle data (<b>attributes</b>) with the functions that work on it (<b>methods</b>). Every value in Python — a string, a list — is an object.</p>',
      '<p><b>类</b>是蓝图；<b>对象</b>是按蓝图造出来的一个东西。对象把数据（<b>属性</b>）和处理这些数据的函数（<b>方法</b>）放在一起。Python 里的每个值——字符串、列表——都是对象。</p>'),
    cards: [
      { title: T('A class and __init__', '类与 __init__'),
        body: T('<p><code>__init__</code> runs when an object is created. <code>self</code> is the object itself.</p>', '<p>创建对象时会运行 <code>__init__</code>。<code>self</code> 就是这个对象本身。</p>'),
        code: C`class Cat:
    def __init__(self, name, age):
        self.name = name
        self.age = age

tom = Cat("Tom", 3)
kitty = Cat("Kitty", 1)
print(tom.name, tom.age)
print(kitty.name)`},
      { title: T('Methods', '方法'),
        body: T('<p>Methods are functions inside the class. They can read and change the object’s attributes.</p>', '<p>方法就是写在类里面的函数。它们可以读取和修改对象的属性。</p>'),
        code: C`class Counter:
    def __init__(self):
        self.value = 0

    def click(self):
        self.value += 1

c = Counter()
c.click()
c.click()
print(c.value)`},
      { title: T('__str__ for printing', '用 __str__ 控制打印'),
        body: T('<p><code>__str__</code> decides what <code>print()</code> and <code>str()</code> show.</p>', '<p><code>__str__</code> 决定 <code>print()</code> 和 <code>str()</code> 显示什么。</p>'),
        code: C`class Money:
    def __init__(self, amount):
        self.amount = amount

    def __str__(self):
        return f"RM{self.amount:.2f}"

print(Money(7.5))`},
      { title: T('Inheritance', '继承'),
        body: T('<p>A child class gets everything from its parent and can add or replace methods. <code>super()</code> calls the parent’s version.</p>', '<p>子类继承父类的一切，还可以增加或替换方法。<code>super()</code> 调用父类的版本。</p>'),
        code: C`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof"

class Puppy(Dog):
    def speak(self):
        return super().speak() + " (tiny)"

for a in [Animal("x"), Dog("Rex"), Puppy("Bo")]:
    print(a.name, a.speak())`},
      { title: T('Polymorphism', '多态'),
        body: T('<p>Different classes can share a method name. Code that calls <code>.area()</code> works with any of them.</p>', '<p>不同的类可以有同名的方法。调用 <code>.area()</code> 的代码对它们都适用。</p>'),
        code: C`class Square:
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

class Circle:
    def __init__(self, r):
        self.r = r
    def area(self):
        return round(3.14159 * self.r ** 2, 2)

for shape in [Square(2), Circle(1)]:
    print(type(shape).__name__, shape.area())`},
      { title: T('Iterators and generators', '迭代器与生成器'),
        body: T('<p>A function with <code>yield</code> is a <b>generator</b>: it produces values one at a time, which <code>for</code> can loop over.</p>', '<p>带 <code>yield</code> 的函数是<b>生成器</b>：它一次产生一个值，可以用 <code>for</code> 遍历。</p>'),
        code: C`def evens(limit):
    n = 0
    while n <= limit:
        yield n
        n += 2

for x in evens(6):
    print(x)
it = iter(["a", "b"])
print(next(it), next(it))`}
    ],
    quiz: [
      { q: T('What is <code>self</code> in a method?', '方法里的 <code>self</code> 是什么？'), options: [T('The class', '这个类'), T('The object the method was called on', '调用这个方法的对象'), T('A keyword you must not use', '不能用的关键字')], answer: 1, why: T('obj.method() passes obj as self.', 'obj.method() 会把 obj 作为 self 传进去。') },
      { q: T('<code>class B(A)</code> means…', '<code>class B(A)</code> 的意思是……'), options: [T('B inherits from A', 'B 继承自 A'), T('A inherits from B', 'A 继承自 B'), T('B contains an A', 'B 里面有一个 A')], answer: 0, why: T('The parent class goes in the brackets.', '父类写在括号里。') },
      { q: T('Which method controls what <code>print(obj)</code> shows?', '哪个方法决定 <code>print(obj)</code> 显示什么？'), options: [T('__init__', '__init__'), T('__str__', '__str__'), T('show', 'show')], answer: 1, why: T('print calls str(obj), which calls __str__.', 'print 会调用 str(obj)，而 str 会调用 __str__。') }
    ]
  });

  add({ id: 1101, section: 'oop', level: 'easy',
    title: T('A Dog Class', '狗狗类'),
    desc: T('<p>Write a class <code>Dog</code>. <code>Dog("Rex")</code> stores the name in <code>.name</code>, and <code>.bark()</code> returns <code>"Rex says woof"</code>.</p>', '<p>写一个类 <code>Dog</code>。<code>Dog("Rex")</code> 把名字存在 <code>.name</code> 里，<code>.bark()</code> 返回 <code>"Rex says woof"</code>。</p>'),
    starter: C`class Dog:
    def __init__(self, name):
        pass

    def bark(self):
        pass
`,
    solution: C`class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return f"{self.name} says woof"`,
    hints: [T('In <code>__init__</code>: <code>self.name = name</code>.', '在 <code>__init__</code> 里：<code>self.name = name</code>。'), T('In <code>bark</code>, use <code>self.name</code>.', '在 <code>bark</code> 里使用 <code>self.name</code>。')],
    explain: T('Attributes set on <code>self</code> in <code>__init__</code> are available in every method.', '在 <code>__init__</code> 里设置在 <code>self</code> 上的属性，在每个方法里都能用。'),
    check: values(['Dog("Rex").name', 'Dog("Rex").bark()', 'Dog("Bo").bark()']) });

  add({ id: 1102, section: 'oop', level: 'medium',
    title: T('Bank Account', '银行账户'),
    desc: T('<p>Write <code>BankAccount(balance)</code> with:</p><ul><li><code>deposit(amount)</code> — adds to the balance, returns the new balance</li><li><code>withdraw(amount)</code> — if there is enough money, subtracts it and returns <code>True</code>; otherwise changes nothing and returns <code>False</code></li><li>attribute <code>balance</code></li></ul>',
      '<p>写一个类 <code>BankAccount(balance)</code>，包含：</p><ul><li><code>deposit(amount)</code>——存款，返回新的余额</li><li><code>withdraw(amount)</code>——如果钱够，就扣款并返回 <code>True</code>；否则什么都不改，返回 <code>False</code></li><li>属性 <code>balance</code></li></ul>'),
    setup: C`def _try(start, ops):
    acc = BankAccount(start)
    results = [getattr(acc, op)(x) for op, x in ops]
    return results, acc.balance`,
    starter: C`class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def deposit(self, amount):
        pass

    def withdraw(self, amount):
        pass
`,
    solution: C`class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            return False
        self.balance -= amount
        return True`,
    hints: [T('<code>deposit</code>: <code>self.balance += amount</code>, then return it.', '<code>deposit</code>：<code>self.balance += amount</code>，然后返回它。'), T('<code>withdraw</code>: check <code>amount &gt; self.balance</code> first.', '<code>withdraw</code>：先检查 <code>amount &gt; self.balance</code>。')],
    explain: T('Methods protect the data: the balance can never go negative because every change goes through <code>withdraw</code>.', '方法保护了数据：因为所有改动都经过 <code>withdraw</code>，余额永远不会变成负数。'),
    check: values(['_try(10, [("deposit", 50), ("withdraw", 20)])', '_try(10, [("withdraw", 30)])', '_try(0, [("deposit", 5), ("withdraw", 5), ("withdraw", 1)])']) });

  add({ id: 1103, section: 'oop', level: 'easy',
    title: T('Printable Point', '可以打印的点'),
    desc: T('<p>Write a class <code>Point(x, y)</code> whose <code>str()</code> is <code>"(x, y)"</code>, e.g. <code>str(Point(1, 2))</code> → <code>"(1, 2)"</code>.</p>', '<p>写一个类 <code>Point(x, y)</code>，它的 <code>str()</code> 是 <code>"(x, y)"</code>，例如 <code>str(Point(1, 2))</code> → <code>"(1, 2)"</code>。</p>'),
    starter: C`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
`,
    solution: C`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"`,
    hints: [T('Add a method <code>__str__(self)</code> that returns a string.', '加一个返回字符串的方法 <code>__str__(self)</code>。')],
    explain: T('Special "dunder" methods like <code>__str__</code> let your objects work with built-in functions.', '像 <code>__str__</code> 这样的双下划线特殊方法，让你的对象可以配合内置函数使用。'),
    check: values(['str(Point(1, 2))', 'str(Point(-3, 0.5))']) });

  add({ id: 1104, section: 'oop', level: 'medium',
    title: T('Shapes and Inheritance', '形状与继承'),
    desc: T('<p><code>Shape</code> is given. Write two child classes:</p><ul><li><code>Rectangle(w, h)</code> — <code>area()</code> returns w × h</li><li><code>Circle(r)</code> — <code>area()</code> returns π r² (use <code>math.pi</code>)</li></ul>',
      '<p>已经给出 <code>Shape</code>。写两个子类：</p><ul><li><code>Rectangle(w, h)</code>——<code>area()</code> 返回 w × h</li><li><code>Circle(r)</code>——<code>area()</code> 返回 π r²（用 <code>math.pi</code>）</li></ul>'),
    starter: C`import math

class Shape:
    def area(self):
        return 0

#: write Rectangle and Circle below || 在下面写 Rectangle 和 Circle
`,
    solution: C`import math

class Shape:
    def area(self):
        return 0

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return math.pi * self.r ** 2`,
    hints: [T('<code>class Rectangle(Shape):</code> makes Rectangle a child of Shape.', '<code>class Rectangle(Shape):</code> 让 Rectangle 成为 Shape 的子类。'), T('Each child needs its own <code>__init__</code> and <code>area</code>.', '每个子类都需要自己的 <code>__init__</code> 和 <code>area</code>。')],
    explain: T('Overriding <code>area</code> lets each shape answer the same question in its own way.', '重写 <code>area</code>，让每种形状用自己的方式回答同一个问题。'),
    check: values(['Rectangle(2, 3).area()', 'Circle(1).area()', 'Circle(2.5).area()', 'isinstance(Circle(2), Shape) and isinstance(Rectangle(1, 1), Shape)']) });

  add({ id: 1105, section: 'oop', level: 'medium',
    title: T('Total Area', '总面积'),
    desc: T('<p>The classes <code>Square</code> and <code>Triangle</code> already exist, and both have an <code>area()</code> method. Write <code>total_area(shapes)</code> that returns the sum of the areas of all shapes in the list.</p>', '<p>已经有 <code>Square</code> 和 <code>Triangle</code> 两个类，它们都有 <code>area()</code> 方法。写一个函数 <code>total_area(shapes)</code>，返回列表中所有形状面积的总和。</p>'),
    given: T('<p><code>Square(side)</code> and <code>Triangle(base, height)</code>, each with <code>.area()</code></p>', '<p><code>Square(side)</code> 和 <code>Triangle(base, height)</code>，都有 <code>.area()</code></p>'),
    setup: C`class Square:
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

class Triangle:
    def __init__(self, base, height):
        self.base = base
        self.height = height
    def area(self):
        return self.base * self.height / 2`,
    starter: C`def total_area(shapes):
    pass
`,
    solution: C`def total_area(shapes):
    return sum(s.area() for s in shapes)`,
    hints: [T('Call <code>.area()</code> on each shape — you do not need to know which class it is.', '对每个形状调用 <code>.area()</code>——不需要知道它是哪个类。')],
    explain: T('This is polymorphism: one piece of code works with any object that has the right method.', '这就是多态：同一段代码适用于任何拥有这个方法的对象。'),
    check: values(['total_area([Square(2), Triangle(3, 4)])', 'total_area([])', 'total_area([Triangle(1, 1)] * 3)']) });

  add({ id: 1106, section: 'oop', level: 'hard',
    title: T('Countdown Generator', '倒数生成器'),
    desc: T('<p>Write a <b>generator</b> <code>countdown(n)</code> that yields n, n − 1, …, 1. <code>list(countdown(3))</code> → <code>[3, 2, 1]</code>. It must use <code>yield</code>.</p>', '<p>写一个<b>生成器</b> <code>countdown(n)</code>，依次产生 n、n − 1、…、1。<code>list(countdown(3))</code> → <code>[3, 2, 1]</code>。必须使用 <code>yield</code>。</p>'),
    starter: C`def countdown(n):
    return list(range(n, 0, -1))
`,
    solution: C`def countdown(n):
    while n > 0:
        yield n
        n -= 1`,
    hints: [T('Replace <code>return</code> with a loop that does <code>yield n</code>.', '把 <code>return</code> 换成一个执行 <code>yield n</code> 的循环。')],
    explain: T('Generators produce values only when asked, so they can even describe endless sequences without using memory.', '生成器只在需要时才产生值，所以甚至可以表示无穷的序列而不占用内存。'),
    check: values(['list(countdown(3))', 'list(countdown(0))', 'list(countdown(6))'], { asserts: [{ expr: 'type(countdown(2)).__name__ == "generator"', msg: T('countdown must be a generator: use <code>yield</code>.', 'countdown 必须是生成器：要用 <code>yield</code>。') }] }) });
})();
