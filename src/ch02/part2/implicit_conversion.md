# 算术类型隐式转换

有人说，C++ 是一门弱类型语言，因为它允许自由的隐式转换。我们姑且不对这种说法作评价，但是 C++ 中的隐式转换确实存在且出现很频繁。比如分支和循环、[赋值运算](/ch02/part2/assignment_operator.md)、[显式类型转换](/ch02/part2/other_operator.md#类型转换运算符)，以及各种数组和指针的用法中，甚至在面向对象的部分也需要有所考虑。

> 实际上 C++ 的隐式转换规则非常隐晦和复杂，本书很难在保证可读性的基础上给出完整、正确的讲解。因此若有需要，可参见 [cppreference](https://zh.cppreference.com/w/cpp/language/implicit_conversion)。

接下来我将介绍目前需要掌握的一种隐式转换：算术类型隐式转换。

## 浮点类型之间的转换

浮点类型之间可以任意转换，保持值不变，但是从高精度转向低精度会损失精度。

## 浮点类型与非布尔整数类型之间的转换

- 浮点类型转向非布尔整数类型时，会**舍去小数部分，向零取整**。若整数部分超过目标整数类型的表示范围时，属于未定义行为。
- 非布尔整数类型转向浮点类型时，会保持值不变。

## 非布尔整数类型之间的转换

- 若源值可以被目标类型所表示，则保持值不变；（参见例1.1、例1.2）
- 若源值超出了目标类型的标识范围，则：
   - 若源类型的内存长度大于目标类型的内存长度，则直接截取源类型的低位。（参见例2）
   - 若源类型的内存长度等于目标类型的内存长度，则保持内存存储不变。（参见例3）

## 布尔类型与其它算术类型之间的转换

布尔类型转向其它算术类型时， `true` 将转换为 `1` ， `false` 将转换为 `0` 。
其它算术类型转向布尔类型时，非零值将转换为 `true` ，零值将转换为 `false` 。

## 例子

### 例1.1
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    short s1{-123}, s2{42};
    int i1{0}, i2{0};
    i1 = s1;
    i2 = s2;
    cout << i1 << " " << i2 << endl;
}
```
结果保持源值：

```io
-123 42
```

### 例1.2
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    signed int si{42};
    unsigned int ui{0};
    ui = si;
    cout << ui << endl;
}
```
结果保持源值：

```io
42
```

### 例2
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    unsigned int ui{0x0042abcd};
    short s{0};
    s = ui;
    cout << hex; // 这一行用于调整输出为十六进制格式，不是输出语句
    cout << s << endl;
}
```
结果保留低 16 位：

```io
abcd
```

### 例3
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    signed int si{-1};  // 0xffffffff
    unsigned int ui{0};
    ui = si;
    cout << ui << endl;
    cout << hex;        // 调整为以十六进制格式输出
    cout << ui << endl;
}
```
不管是否有符号，保持内存存储不变：

```io
4294967295
ffffffff
```

## 注意事项

目前我们只知道在赋值和 `if` 、 `while` 的条件中会发生隐式转换。实际上，还有一种常见的场景会发生隐式转换——初始化。

在使用初始化器进行初始化的过程中，若初始化器中的初始化值类型和目标类型不吻合，会进行如上文所述的隐式转换规则：
```cpp
int a{42LL};  // 从 long long 类型转换为 int
double b{42}; // 从 int 类型转换为 double
```
这个过程和赋值类似。但是有一些转换是被禁止的：

- 任何从浮点类型到整数类型的转换被禁止；
- 从整数类型到浮点类型的转换被禁止，常量初始化除外；
- 从“高层级”类型到“低层级”类型（见[算术运算符](/ch02/part2/arithmetic_operator)章节）的转换被禁止，常量初始化除外；

其中常量初始化（Constant initialization）是指初始化值为常量的初始化器。故下列初始化都是不可行的：
```cpp
int a{3.14}; // 任何情形不允许从浮点类型转为整数类型
double b{a}; // 不允许从整数类型转为浮点类型，因为这不是常量初始化
float c{b};  // 不允许从“高层级”的浮点类型 double 转换到“低层级”的浮点类型 float
short d{a};  // 不允许从“高层级”的整数类型 int 转换到“低层级”的整数类型 short
```
这三种被禁止的转换称为窄化转换（Narrowing conversion）。窄化转换有潜在的丢失数据的危险，因此它们在关键的初始化步骤被禁止。如果你确实有这样的需求，可以：

使用赋值：
```cpp
int a{42};
// double b{a}; 禁止窄化转换
double b;
b = a;
```
或者使用显式类型转换：
```cpp
int a{42};
// double b{a}; 禁止窄化转换
double b{double(a)};
```

> 实际上这个转换的限制只作用于列表初始化；对于复制初始化无此限制。所以你完全可以使用 `int a = 3.14` 这一写法来防止错误。但是请注意，在初始化中进行窄化转换是不好的编程习惯（Code smell），本书也不推荐通过复制初始化来绕开此限制。

> 对于部分编译器（如 [GCC](https://gcc.gnu.org/wiki/FAQ#Wnarrowing)）来说，某些窄化转换可能只报编译警告（Warning）而非编译错误（Error）。

