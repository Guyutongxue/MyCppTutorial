# 输入

## 简单的输入


学会这么多输出，如果加上输入就完美了。下面就来看看怎么输入吧。先编译运行一下下面的代码，看看什么结果……
```cpp codemo(input=12 24)
#include <iostream>
int main() {
    int a{0};
    int b{0};
    std::cin >> a;
    std::cin >> b;
    std::cout << a + b << std::endl;
}
```

啊嘞，好像什么也没有发生诶？卡住了？不是，你可以尝试在输出的位置上（或者标有 Input 的地方）用键盘敲上

```io
¶12 24↵
```

其中，“`↵`”代表按下回车键。然后你就观察到了输出 `36` 。所以说，这是一个将用户输入的两个整数相加的程序。
让我们一行一行分析一下。第 3、4 行分别声明并定义了整数类型变量 `a` 和 `b` ，这件事情我们上一节学过了，而且它们目前的值都是 `0` 。那么第 5、6 行又在做什么呢？你会发现它的“形状”与输出那一行有些相似。没错，这就是输入了。第 5 行可以允许外界向计算机输入 `a` 的值；第 6 行可以允许外界向计算机输入 `b` 的值。（这里的外界就是我们计算机的键盘啦。）到现在，变量 `a` 和 `b`  的值就是刚刚得到的输入的值。第 7、8 行和上一节一样，将两者的和输出。

> 以后我有时会称“允许外界输入”为“允许用户输入”。这里的用户指的就是使用编译生成的程序的人，也就是运行的时候与程序交互的对象。

## 一块儿输入输出多个东西

感觉刚才的代码有点繁琐啊。实际上，刚才的代码还可以简化一下：把两个输入合在一行！
```cpp codemo(input)
#include <iostream>
int main() {
    int a{0};
    int b{0};
    std::cin >> a >> b;
    std::cout << a + b << std::endl;
}
```

这是什么操作？事实上这一段代码和刚才的代码是完全一致的：第 5 行要求获取两个输入，分别输入到变量 `a` 和变量 `b` 。因此总结下来，就是 `std::cin >>` 后面可以**接上一些变量，表示让外界**（用户的键盘）**输入这些变量的值。这些变量之间用 `>>` 分隔。别忘了结尾还要一个分号 `;`** 。

那么你可能会想，既然输入能这样搞，输出能不能呢？答案是肯定的。
```cpp codemo(input)
#include <iostream>
int main() {
    int a{0};
    int b{0};
    std::cin >> a >> b;
    std::cout << "The sum is " << a + b << std::endl;
}
```

请看这里的第 6 行，它会使编译运行结果变成这样：

```io
¶12 24↵
The sum is 36
```

::: tip
此处，输入和输出会用不同颜色的字体，以示区别。
:::

因此你观察到输出发生了变化。实际上这段代码中的第 6 行输出了两个东西：第一个是“一句话” `The sum is ` ，第二个是 `a + b` 这个简单的式子的值。于是最终你看到的输出就长成 `The sum is 36`  这个模样了。

总结一下，就是：`std::cout <<` 后面可以**输出一堆东西（变量、数或者“一句话”），这些东西之间用 `<<` 分隔，结尾还要一个分号`;`** 。那么细心的读者一定注意到了我似乎忘记了 `std::endl` ，那是个什么东西？其实 `std::endl` 你现在可以理解为换行。比如如果在输出这一行中间添加一个 `std::endl`：
```cpp codemo(input)
#include <iostream>
int main() {
    int a{0};
    int b{0};
    std::cin >> a >> b;
    std::cout << "The sum is " << std::endl << a + b << std::endl;
}
```

那么你得到编译运行的结果就是

```io
¶12 24↵
The sum is
36
```
可以注意到，输出出现 `std::endl` 的位置换了一行。我们默认在输出结尾换行，因此一般地输出结尾都要写上 `std::endl` 。

> 输出结尾换行只是一个约定俗成的习惯，如果你不愿意写也没关系。实际上 `std::endl` 的含义不仅仅是换行，但是目前我们理解为换行就足够了。

## 还能再简洁点吗？

你会发现我们用于控制输入输出的时候，都在不停地敲 `std::` 。这是 C++ 引入的叫做**命名空间**（Namespace）的玩意儿，如果你觉得这样写很烦的话，也有办法将它们省去。

```cpp codemo(input)
#include <iostream>
using namespace std;
int main() {
    int a{0};
    int b{0};
    cin >> a >> b;
    cout << "The sum is " << endl << a + b << endl;
}
```
这里，我在很靠近开头的地方加了一句 `using namespace std;` 。它的含义请你目前不要太纠结，你只需要知道有了这样一行，从此之后不用再写 `std::` 了。

> 事实上写 `using namespace std;` 并不是一个好习惯，在较大的项目中程序员都会避免这种做法。不过本书为了节约篇幅，将在前四章频繁使用；请读者自行决定是否使用这一写法。

## 练习

1. 编写这样一个程序，读入三个整数，并以 `The product is xxx` 的形式输出它们的积。（提示：三个数的积可以直接用 `a * b * c` 的形式给出。）
1. （选）尝试完成 [POJ 1000](http://poj.org/problem?id=1000) 这道题。熟悉注册账号、编写代码、提交等一系列在线评测的过程，这将有助于你未来的学习。
