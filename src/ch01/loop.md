# 循环

## `while` 循环


现在来想这样一个问题，我想输出从 1 到 20 的所有自然数，我该怎么样通过 C++ 来实现呢？当然你可以直接写 20 行输出语句：
```cpp codemo
#include <iostream>
using namespace std;
int main() {
    cout << 1 << endl;
    cout << 2 << endl;
    cout << 3 << endl;
    cout << 4 << endl;
    cout << 5 << endl;
    cout << 6 << endl;
    cout << 7 << endl;
    cout << 8 << endl;
    cout << 9 << endl;
    cout << 10 << endl;
    cout << 11 << endl;
    cout << 12 << endl;
    cout << 13 << endl;
    cout << 14 << endl;
    cout << 15 << endl;
    cout << 16 << endl;
    cout << 17 << endl;
    cout << 18 << endl;
    cout << 19 << endl;
    cout << 20 << endl;
}
``
但是这样真的很繁琐乏味，复制粘贴都得折腾半天。这个时候，循环就派上了用场。看看这段代码。

```cpp codemo
#include <iostream>
using namespace std;
int main() {
    int a{1};
    while (a <= 20) {
        cout << a << endl;
        a = a + 1;
    }
}
```

嗯……这个 `int a{1};` 我们明白，是声明并定义整数变量 `a` 为 `1` 的意思——然后是什么鬼？

这个 `while(a <= 20)` 的意思就是“当 `a <= 20` 这个条件成立的时候，不断地做……”不断地做什么？就是做后面大括号括起来的内容啦。看到后面大括号括起来的两行分别是“输出 `a` 的值”和“把 `a + 1` 的结果赋值给 `a` 自己”，因此整个意思就是当 `a` 小于等于 `20` 的时候，不断地做输出、赋值、输出、赋值……这样的操作。

这样就够了吗？没错。你可以尝试运行这段代码，可以得到我们想要的结果。为什么这样就是正确的呢？我们一步步模拟一下计算机在运行的时候会发生什么：

- 首先我们在第 4 行声明并定义了一个整数变量 `a` 为 `1` 。
- 然后到了 `while` 。 `a <= 20` 这个条件满足吗？1 比 20 小，当然满足。因此应该开始执行大括号里面的内容——
- 大括号里面第一行输出了 `a` 的值——输出了 `1` 。这是我们想要输出的第一个数。
- 然后执行赋值：式子 `a + 1` 的结果是 `2` ，因此这个赋值相当于把 `a` 的值变成 `2` 。
- 因为是不断地执行这两行内容，所以应该回到开头……不过在此之前需要检查一下 `a <= 20` 这个条件是否还满足。如果不满足的话，就不再执行了。
- 检查 `a <= 20` 这个条件。很好， `a` 现在是 `2` ，满足条件。那么继续执行输出和赋值。
- 输出 `2` 。
- 赋值：式子 `a + 1` 的结果为 `3` ，因此赋值之后 `a` 的值变成了 `3` 。（每次赋值实际上就是 `a` 自增 1。）
- 在继续下一次“轮回”之前检查条件，发现条件 `a <= 20` 仍然满足。于是继续执行……
- 输出 `3` ，赋值之后 `a` 变成了 `4` 。
- 继续一直这样做下去……
- ……
- …
- 现在输出了 `19` ，然后赋值之后 `a` 变成了 `20` 。
- 好，检查条件来决定是否继续循环： `a <= 20` 它成立吗？因为是小于等于，所以当 `a` 为 `20` 时条件也满足。因此仍然进入循环——
- 输出 `a` 的值 `20` 。然后进行赋值；和原来一样， `a` 赋值后增加了 1，变成了 `21` 。
- 现在再来检查条件来决定是否继续不断地执行： `a <= 20` ……好像不成立了；21 比 20 要大。因此循环不再继续。
- 现在我们刚好输出了从 1 到 20 的全部自然数。


<script setup>
import "@src/ch03/fig.css";
</script>
<details>
<summary>显示动画</summary>
<div class="fig" style="height: 650px; overflow: hidden">
<iframe width="800" height="500" frameborder="0" src="http://pythontutor.com/iframe-embed.html#code=%23include%20%3Ciostream%3E%0Ausing%20namespace%20std%3B%0Aint%20main%28%29%20%7B%0A%20%20%20%20int%20a%7B1%7D%3B%0A%20%20%20%20while%20%28a%20%3C%3D%2020%29%20%7B%0A%20%20%20%20%20%20%20%20cout%20%3C%3C%20a%20%3C%3C%20endl%3B%0A%20%20%20%20%20%20%20%20a%20%3D%20a%20%2B%201%3B%0A%20%20%20%20%7D%0A%7D%0A&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=2&heapPrimitives=nevernest&origin=opt-frontend.js&py=cpp&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>
</div>
</details>

循环是一个非常强大的工具。有了循环，基本上许多问题都可以一定程度上得到解决。最后我用一张图来总结循环：

<table style="float: left"><tr><td>
    <pre><em>开始</em>
while (<em>条件</em>) {
    <em>不断要做的事情</em>
}
<em>结束</em></pre>
</td></tr></table>

```flow
st=>start: 开始
e=>end: 结束
bd=>operation: 不断要做的事情
cond=>condition: 条件成立？

st->cond
cond(yes)->bd
bd(left)->cond
cond(no)->e
```

> 除了 `while` 循环之外，还有许多种其它的循环；其中更常见的是 `for` 循环。但是任何其它的循环都可以简单地转换为 `while` 循环，因此现阶段只需理解 `while` 循环就足够了。

## 练习

1. 尝试编写一个程序，使其输出 1 到 20 的偶数。请使用循环。
2. 尝试编写一个程序，求出 1 到 20 之间所有奇数的和。
3. 想一想，怎样编写一个无限循环的程序？试着写出来。（提示：如果你要运行它，请注意：按下 <kbd>Ctrl + C</kbd> 键可以强制退出程序的运行。）

## 练习参考答案

```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    int a{2};
    while (a <= 20) {
        cout << a << endl;
        a = a + 2;
    }
}
```
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    int a{1};
    int s{0};
    while (a <= 20) {
        s = s + a;
        a = a + 2;
    }
    cout << s << endl;
}
```
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    while (2 > 1) {
        cout << "Loop forever..." << endl;
    }
}
```

> 没有输出的无限循环可能导致[未定义行为](/ch02/part2/incdec_operator.md#未定义行为)。
