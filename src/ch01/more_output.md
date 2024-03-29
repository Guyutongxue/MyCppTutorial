# 更多的输出

## 尝试四则运算

上一章讲述了如何输出一句话和输出一个数（整数或小数）。但是这样未免太无聊了。尝试下面这段代码：
```cpp codemo
#include <iostream>
int main() {
    std::cout << 1 + 1 << std::endl;
}
```
当我将代码中输出的部分写成 `1 + 1` 时，你会发现它编译运行的结果是 `2` 。应该能猜到这段代码做了什么：它执行了“一加一”这条运算，也就是说计算机在我们的控制之下运算了 $1 + 1$ 这个式子。那么你也应该能举一反三地想到如何进行减法、乘法和除法运算。

```cpp codemo
#include <iostream>
int main() {
    std::cout << 5 - 3 << std::endl;
}
```
```cpp codemo
#include <iostream>
int main() {
    std::cout << 6 * 7 << std::endl;
}
```
```cpp codemo
#include <iostream>
int main() {
    std::cout << 9 / 3 << std::endl;
}
```
右侧这些代码编译运行的输出分别为 `2` , `42` , `3` 。其中加法和减法的写法与数学上相同；但乘法和除法的写法略有不同；在 C++ 中，乘法用星号 `*` 表示，而除法（除以）用斜杠 `/` 表示。

> 注意斜杠的方向是从右上方到左下方，键盘上位于 `.` 键的右侧。反过来的符号 `\` 叫做*反斜杠*。

> 这时您可以尝试在 `1 + 1` 的两侧用双引号引起（ `"1 + 1"` )，编译运行看看会发生什么。这个实验能让你理解双引号的作用，以及“输出一句话”的含义。

现在你知道了，放在 `std::cout <<`  和  `<< std::endl` 之间的东西**还可以是一个简单的式子，这样会输出这个式子运算的结果**。

## 初识变量

我们来看看除了“一句话”、数和简单的式子之外，还能输出些什么。
```cpp codemo
#include <iostream>
int main() {
    int a{42};
    std::cout << a << std::endl;
}
```
这里展示的代码貌似比原来复杂许多！没关系，我来解释一下。首先第一个不同之处是多了一行。在原来放输出的那一行（第4行）上面增加了一堆不明所以的东西。这一行的意思可以用一个数学上常见的说法描述： 令整数 `a` 的值为 `42` 。也就是说，这句话很像在数学上设一个变量那样，因此这一行叫做“变量的声明和定义”， `a` 就是一个变量。

如果细看的话， `int` 指明变量是整数类型（**Int**eger Type）。 `a` 叫做变量名。后面的 `{42}` 意思是指，这个变量的值现在为 `42` 。那么现在， `a` 就是一个值为 `42` 的整数。在声明和定义的最后，需要加一个分号 `;` 作为结尾。

> 变量、声明和定义的严格定义参见后续章节。变量名不一定是一个字母，还可以是字母、下划线和（或）数字的组合，但有着一些限制。详细的说明参见后续章节。 `{42}` 被称作初始化器，大括号（brace，或者称花括号）内部的东西会作为变量的初始值。

这一行理解之后，那么下面的输出那一行也不难。现在输出的是 `a` ，实际上就是输出变量 `a` 的值。所以最终编译运行的结果也是输出 `42` 。

你还可以将变量和简单的式子结合。
```cpp codemo
#include <iostream>
int main() {
    int a{42};
    int b{15};
    std::cout << a + b << std::endl;
}
```
这里声明并定义了两个变量 `a` 和 `b` ，然后想要输出的是 `a` 和 `b` 的值加起来的和。最终编译运行的结果显然是输出 `57` 。总结一下，目前你知道了如何去输出一句话、一个数、一个变量，或者一个由变量和数构成的简单的式子。

## 练习

1. 声明并定义变量 `a` 为整数，随便设置一个初始值；尝试编写代码，使得编译运行结果输出 `a` 的二倍。
1. 声明并定义变量 `a` 为整数，初始值为 `5` ；声明并定义变量 `b` 为整数，初始值为 `3` 。尝试编写代码，使得编译运行结果输出 `a` 和 `b` 的和与差。
1. 声明并定义变量 `a` 和 `b` ，初始值与上题相同。尝试编写代码，使得编译运行结果输出 `a` 和 `b` 的积与商。观察结果是否符合预期。（如果不符合预期也没关系。）
