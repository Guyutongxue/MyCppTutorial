# 数组的定义和初始化

## 数组的大小

首先来看下边这段代码。请问它有问题吗？
```cpp codemo
#include <iostream>
using namespace std;
int main() {
    int n{5};
    int a[n]{};
    for (int i{0}; i < 5; i++) {
        cout << a[i] << " ";
    }
}
```

答案是有的。因为 `n` 是一个变量但不是常量，所以它不能用作数组 `a` 的长度。（如果读者对此感到困惑：明明 `n` 初始化为 5 了啊，它的值应该能确定啊？事实上不是这样的，变量的初始化在运行时才会执行，而数组的大小要求在编译期间就能得到。编译器没办法“提前感知”这个大小。）所以如果编译器足够严格的话，会报类似 `ISO C++ forbids variable length array` 的错误。那么这样呢？
```cpp codemo
#include <iostream>
using namespace std;
int main() {
    int n{5};
    const int m{n};
    int a[m]{};
    for (int i{0}; i < 5; i++) {
        cout << a[i] << " ";
    }
}
```

这样也是不行的。因为变量 `m` 仅仅是[只读变量](/ch02/part1/readonly_variable.md)，但它不是常量（非常量初始化）。所以我们也不能这样写。正确的做法是使用常量作为数组大小。最简单的做法是只用字面量（如 `int a[5]{};`），但是这样的话会有一些小麻烦。在某些场合中，我们可能声明并定义了一堆相同长度的数组：
```cpp
int a[5]{};
int b[5]{};
int c[5]{};
// [...]
```
这个时候若想同时修改它们的长度，就需要进行多次改动。如果用 `constexpr` 变量来作为数组长度：
```cpp
constexpr int N{5};
int a[N]{};
int b[N]{};
int c[N]{};
// [...]
```

则只需修改一次 `N` 的值就能实现批量修改数组大小。回到最初的代码，这是我更推荐的写法。
```cpp codemo
#include <iostream>
using namespace std;
int main() {
    constexpr int N{5};
    int a[N]{};
    for (int i{0}; i < 5; i++) {
        cout << a[i] << " ";
    }
}
```

> C++ 对数组大小是常量有着严格的限制，但是 C 语言没有这样的要求。因此许多编译器也允许那些不标准的用法。如果你使用 GCC 编译器的话，我建议将 `-pedantic` 或 `-pedantic-errors` （可理解为严格模式）开关启用以防止这种错误的用法。

除此之外，很显然地，数组的大小必须是正数（意味着不存在拥有零个元素的数组）。

> C++ 要求数组的大小求值后可隐式转换为 `std::size_t` 类型。在某些编译器下，这个类型与 `unsigned long long` 等价。

## 初始化器

最容易理解的初始化器长成这样：
```cpp
int a[5]{1, 2, 3, 4, 5};
```
对于大小为 5 的数组，初始化器内恰好有 5 个值，分别对应 `a[0]` `a[1]` `a[2]` `a[3]` `a[4]`。其次是比元素个数少的初始化器，比如：
```cpp
int a[5]{1, 2, 3};
```

<h6 id="idx_零初始化"></h6>

这个时候，`a[0]` `a[1]` 和 `a[2]` 分别被初始化为 `1` `2` `3`，然后剩余的元素采用**零初始化**（Zero initialization）——也就是初始化为零值。因此这段代码
```cpp codemo
#include <iostream>
using namespace std;
int main() {
    int a[5]{1, 2, 3};
    for (int i{0}; i < 5; i++) {
        cout << a[i] << " ";
    }
}
```

的输出结果为 `1 2 3 0 0`。

如果初始化器内留空，那么所有元素都会采用零初始化。这段代码
```cpp codemo
#include <iostream>
using namespace std;
int main() {
    int a[5]{}; // 全部零初始化
    for (int i{0}; i < 5; i++) {
        cout << a[i] << " ";
    }
}
```

的输出为 `0 0 0 0 0`。

> 严格说，剩余的元素采用的是“值初始化”（Value initialization）。非类类型的值初始化就是零初始化（因此正文使用了“零初始化”来更形象地描述）；而类类型的值初始化则是[默认初始化](/ch05/defaulted_constructor#idx_默认初始化)。

但是，初始化器内部的值个数不能超过数组大小，否则导致编译错误：
```cpp
#include <iostream>
using namespace std;
int main() {
    int a[5]{1, 2, 3, 4, 5, 6}; // 错误
}
```

最后还有一种初始化方法。它写成这样：
```cpp
int a[]{1, 2, 3, 4, 5, 6};
```
这个时候，`a` 的大小留空；此时数组 `a` 的大小则根据初始化器中值的个数自动推导。比如这里 `a` 被推导为拥有 6 个 `int` 类型元素的数组，即 `int[6]`，因为初始化器中提供了 6 个值。这是一种简略的写法，在某些情形下比较有用。

> 省略数组大小的前提是必须拥有初始化器，否则编译错误：不含初始化器且未指明大小的数组类型属于不完整类型；不完整类型的对象只能声明而不能定义。这种不完整类型称为“未知边界数组”，它在 C 语言里有一定用处，但是在 C++ 里经常招致麻烦。

## 关于类型标识

你应当知道对于一般的变量来说，如下声明语句
```cpp
int a, b;
```
会引入两个名为 `a` `b` 的 `int` 类型变量。但是对于数组来说，
```cpp
int a, b[10];
```
并不是将 `a` 和 `b` 都声明并定义为数组。实际上，这里 `a` 仍然是一个 `int` 型变量，只有 `b` 是一个 `int[10]` 数组。

所以道理就是，在一行声明语句声明多个名字时，只有中括号贴着的那个名字才能成为数组。比如
```cpp
int a[10], b;
```
中，`a` 是类型为 `int[10]` 的数组，而 `b` 只是一个 `int`。如果想要让两者都成为数组，必须这样写：
```cpp
int a[10], b[10];
```
嗯，别忘了加上初始化器，否则里面的东西是不确定的：
```cpp
int a[10]{}, b[10]{};
```

<h6 id="idx_类型标识"></h6>

借此机会，我们正式地介绍一下类型标识（Type ID）这个概念。类型标识是指明一个类型的文本，比如 `int` 指明了一个普通整型，`double` 指明一个双精度浮点型，`bool` 指明一个布尔类型。与类型说明符不同，数组、函数也拥有类型标识（但它们没有默认的类型说明符）。比如 `int[10]` 就是拥有 10 个 `int` 的数组的类型标识，而 `bool(int)` 是一个接受一个 `int` 参数，返回值类型为 `bool` 的函数的类型标识。获得一个变量的类型标识很简单，直接把所有变量名从声明中拿走就是了。比如：
```cpp
long long result;
char a[42];
int f(int, bool);
```
第一个声明语句中，把 `result` 拿走剩下的 `long long` 就是 `result` 的类型标识（这和类型说明符一致）；把 `a` 拿走得到的 `char[42]` 就是 `a` 的类型标识；把 `f` 拿走剩下的 `int(int, bool)` 就是 `f` 的类型标识。

类型标识可以用在[类型转换运算符](/ch02/part2/other_operator.md#类型转换运算符)和 [sizeof 运算符](/ch02/part2/other_operator.md#sizeof-运算符)中。比如下面的例子：
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    int a[5]{};
    cout << sizeof(a) << endl;
    cout << sizeof(int[5]) << endl;
}
```
当 `int` 类型占 4 个字节的时候，`int[5]` 这个数组类型就占 20 字节。因为数组类型中每一个元素都是连续、紧密地存储的：

![array_storage](https://s1.ax1x.com/2020/08/02/aJQsgg.png)
