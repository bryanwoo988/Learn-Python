/* One plain-language line under each common Python error, for beginners. */
(function (root) {
  'use strict';
  const E = {
    SyntaxError: ['Python could not read this line. Look for a missing colon (:), bracket or quote, or a typo near the line shown.',
      'Python 看不懂这一行。检查附近是否少了冒号（:）、括号或引号，或者有拼写错误。'],
    IndentationError: ['The spaces at the start of a line are wrong. Lines inside if / for / def must be indented the same amount (4 spaces is usual).',
      '行首的空格不对。if / for / def 里面的代码要缩进相同的距离（通常是 4 个空格）。'],
    TabError: ['Tabs and spaces are mixed in the indentation. Use spaces only.', '缩进里混用了 Tab 和空格。请只用空格。'],
    NameError: ['You used a name Python does not know. Check the spelling and capital letters, and that the variable was created before this line.',
      '你用了一个 Python 不认识的名字。检查拼写和大小写，并确认这个变量在这一行之前已经创建。'],
    TypeError: ['An operation got the wrong kind of value, e.g. adding a number to a string ("3" + 4) or calling a function with the wrong number of arguments.',
      '某个操作拿到了错误类型的值，例如把数字和字符串相加（"3" + 4），或者调用函数时参数个数不对。'],
    ValueError: ['The type is right but the value is not, e.g. int("abc").', '类型对了但值不对，例如 int("abc")。'],
    IndexError: ['The position is outside the list. A list of 3 items has positions 0, 1 and 2.', '位置超出了列表范围。有 3 个元素的列表，位置只有 0、1、2。'],
    KeyError: ['That key is not in the dictionary (or the column is not in the table). Check the spelling, or use .get() to be safe.',
      '字典里没有这个键（或者表格里没有这一列）。检查拼写，或改用 .get() 更安全。'],
    ZeroDivisionError: ['You divided by zero. Check the value of the number below the division sign.', '除数是 0。检查除号后面那个数的值。'],
    AttributeError: ['This value does not have that method or attribute. Check the spelling and what type the value really is (print(type(x))).',
      '这个值没有这个方法或属性。检查拼写，以及它实际是什么类型（print(type(x))）。'],
    ModuleNotFoundError: ['This module is not available here. The app includes the standard library plus numpy, pandas, matplotlib, scipy and scikit-learn.',
      '这里没有这个模块。本应用包含标准库，以及 numpy、pandas、matplotlib、scipy 和 scikit-learn。'],
    ImportError: ['Something could not be imported. Check the spelling of the name after import.', '有东西无法导入。检查 import 后面名字的拼写。'],
    UnboundLocalError: ['A variable was used inside a function before it got a value there.', '在函数里，某个变量在赋值之前就被使用了。'],
    RecursionError: ['A function called itself too many times. Make sure the recursion has a stopping case.', '函数调用自己太多次了。确认递归有终止条件。'],
    FileNotFoundError: ['There is no file with that name. Check the spelling; the files available are listed above the editor.', '没有这个名字的文件。检查拼写；可用的文件列在编辑器上方。'],
    EOFError: ['input() ran out of lines. Add more lines to the Input box.', 'input() 没有可读的行了。在「输入」框里多加几行。'],
    Timeout: ['Your code ran too long and was stopped. Is there a loop that never ends (e.g. a while condition that stays True)?',
      '代码运行太久，已被停止。是否有一个永远不会结束的循环（例如 while 的条件一直为 True）？'],
    Stopped: ['You stopped the run.', '你停止了运行。'],
    OutputLimit: ['Your code printed too much (over 2,000 lines) and was stopped. Is a print() inside a loop that never ends?',
      '代码输出太多（超过 2,000 行），已被停止。是否有 print() 放在一个停不下来的循环里？']
  };
  root.PyErrors = { explain: (type, lang) => (E[type] ? E[type][lang === 'zh' ? 1 : 0] : null) };
})(typeof window !== 'undefined' ? window : globalThis);
