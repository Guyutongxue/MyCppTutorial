# 只读变量

之前说过，变量的含义是拥有类型和名字的一段存储空间，因此变量不一定可变，也有可能是无法发生变化的。这一节介绍的就是限定无法变化的变量，称为**只读变量**（Readonly variable）。

> “只读”一词的来源：计算机的存储空间，可以进行两种操作“读取”（Read）和“写入”（Write）。因此对于变量来说，根据其所指代的存储空间的性质，有的既可以读取又可以写入，被称为“可读写”；而那些只能读取却不能写入的，就称为“只读”。

如何声明并定义一个变量为只读的？很简单，只需在类型说明符前加上 `const` 关键词修饰即可。比如：
```cpp
const int a{42};
```
这样 `a` 就成为了一个 `int` 类型的，只读的变量。从此以后 `a` 的值不能发生变化，如以下行为：
```cpp
cin >> a; // 编译错误：无法向 a 中输入，因为 a 无法发生变化
a = 56;   // 编译错误：无法为 a 赋值
```
都会导致编译错误。

对于一般的变量来说，初始化器可以省略；但是只读变量由于它的值初始化后不会再次更改，因此初始化器在此处必不可少。
```cpp
int a; // 没问题，只不过不知道 a 指代的存储空间里面放的什么罢了
const int b; // 编译错误：只读变量不能省去初始化器
```

> 例外：一些带默认构造函数的类类型可以在声明为只读的情况下省略初始化器。

## 只读变量和常量的关系

你可能已经注意到，只读变量和常量都有一个共同的特点，就是“无法在运行期间更改它的值”。那么能否说只读变量就是常量呢？

答案是否定的。请看下面这个例子：
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    int a{0};
    cin >> a;
    const int b{a};
    // b = 42;     // 编译错误
}
```
第 6 行声明了一个只读变量 `b` ，因此不能在第 7 行通过赋值更改它的值。但是你也注意到，程序在编译期间是无法得知 `b` 的值是多少的。因为 `b` 是用 `a` 初始化的，但是 `a` 的值则是在第 5 行由输入提供的。所以 `b` 的值只能在运行期间确定，无法在编译期间得知； `b` 不满足常量的定义。

上面这个例子表示，并非所有的只读变量都是常量。那么什么时候只读变量可以是常量呢？条件也很简单：**只有使用常量作为初始化值初始化的只读变量才是常量**。比如：
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    const int a{42};
    const int b{a};
    const int c{a + b};
}
```
在这种情况下，  `a` 是由 `42` 初始化的， `42` 是字面量，当然也是常量。因此 `a` 是由常量初始化的只读变量， `a` 就是一个常量。同理，只读变量 `b` 由 `a` 初始化， `a` 已经是一个常量了，那么 `b` 因而也是一个常量。再来看 `c` ， `a` 和 `b` 已经是常量了，那么由常量组成的表达式也是常量；故 `a + b` 也是常量。所以只读变量 `c` 也是常量。

你会发现这件事情并不是那么显然，尤其在更大的程序里，很难得知一个只读变量是否是常量。是不是常量这件事情有时候会显得很重要（比如将来会学的数组长度，以及模板泛型编程的时候常量与否也很关键）。因此 C++ 提供了一个关键字用于常量： `constexpr` 。

当 `constexpr` 出现在声明语句的时候，指明这个声明引入的变量是一个常量。如果不是常量的话，会导致编译错误。例如：
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    constexpr int a{42}; // a 是常量（当然常量必然是只读的。）
    int b;               // b 既不是只读变量，也不是常量
    const int c{b};      // c 不是常量，但它是只读变量
 // constexpr int d{b};  // 编译错误，因为要求 d 是常量，但 d 未用常量初始化
    constexpr int e{a};  // OK, e 是常量，由常量初始化
}
```
对于变量来说，关键字 `constexpr` 蕴含了 `const` 。（因为常量必然是只读的：运行时值不会发生更改。）因此在需要常量的场合，建议用 `constexpr` 代替 `const` ，避免意料之外的错误。

> `constexpr` 修饰的是**整个声明**，而 `const` 则是对某个**类型**的只读限定。所以，`const` 是可以出现在类型系统中的：`const T` 是一个单独的（与 `T` 不同的）类型，而 `const T*` 则是指向 `const T` 的指针类型。但 `constexpr` 不存在于类型系统中，它只是要求整个声明必须是常量。所以，不存在指向 `constexpr` 的指针之类的。`constexpr T*` 蕴含的其实是 `T* const` 而非 `const T*`。

我知道这一节的理解相对很有难度，但是它确实很有必要。如果无法完全理解的话，你可以暂且搁置下来，等到我们后续用到常量相关的细节的时候再做考虑。

## 练习

1. 再次编写一个程序，输入圆的半径，输出该圆的面积。这一次，尝试使用 `constexpr` 关键字。

## 练习参考答案
```cpp codemo(show, input=5)
#include <iostream>
using namespace std;
int main() {
    constexpr double PI{3.1415926};
    double r{0}, s{0};
    cin >> r;
    s = r * r * PI;
    cout << s << endl;
}
```
