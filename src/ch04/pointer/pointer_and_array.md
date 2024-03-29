# 指针和数组

## 指向元素的指针

首先来看指向元素的指针：
```cpp
int a[5]{};
int* p{&a[0]};
```
这里，用 `a[0]` 的地址初始化了指针 `p`，从而让 `p` 称为一个指向数组 `a` 首个元素的指针。然后，我们尝试
```cpp
int* q{p + 1};
```
请问，这时 `q` 指向什么呢？答案是 `q` 会指向 `a[1]`。这个原理可以从下面图中得出：

![](https://s1.ax1x.com/2020/08/15/dkKe3V.png)

当 `p + 1` 时，会自动向后移动一个 `sizeof(int)` 那么多：因为 `p` 拥有指向 `int` 的指针类型。同时，由于数组的元素是紧密、连续地存储的，所以当指向 `a[0]` 的指针向后移动一个 `sizeof(int)` 时，它恰好就指向了 `a[1]`。这就是指针加减法的用途了，基于此你也可以这样遍历：
```cpp
int* p{&a[0]};
for (int i{0}; i < 5; i++) {
    cout << *(p + i) << endl;
}
```
其中，`*(p + i)` 这个表达式就能获取到数组 `a` 的元素 `a[i]`。


## 数组到指针的转换

现在我们来看数组和指针最难的一块。刚才我们用了这样的初始化：
```cpp
int* p{&a[0]};
```
然而这个过程可以简化为：
```cpp
int* p{a};
```
这是什么意思呢？就是**数组可以隐式转换到指向其首元素的指针**。也就是，数组 `a` 可以转换为 `&a[0]`。在各种期望指针的语境下，如果你放一个数组进去，那么 C++ 就会自动执行这个隐式转换。比如：
```cpp
int a[5]{};
cout << a << endl;
```
当你把数组放在 `cout <<` 后面时，因为 `cout` 不能输出一个数组，但能输出一个指针的值，所以会发生数组到指针的转换。此时，输出的结果就是一个地址：
```io
0x62fe00
```

你还可以直接用数组名做加法来遍历：
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    int a[5]{1, 2, 3, 4, 5};
    for (int i{0}; i < 5; i++) {
        cout << *(a + i) << endl;
    }
}
```
这是因为，数组不能做加法，但指针却能。所以这时发生数组到指针的转换，`a + i` 理解为 `&a[0] + i`。接下来的过程就和上文中的内容一样了，这里不再赘述。

类似的情形还出现在函数调用上。我们之前提及过，函数的参数**不能是数组**。但是函数的参数**可以是一个指针**！所以当你把数组作为函数参数时——
```cpp codemo(show)
#include <iostream>
using namespace std;
void f(int x[5]) {
    // 此时 x 实际上是一个指针，下面输出的是 sizeof(int*)
    cout << sizeof(x) << endl;
}
int main() {
    int a[5];
    f(a);
}
```
会发生从数组到指针的转换。而且这个时候，别看形参长成一个数组的样子，但它仍然是一个指针。这个被称为形参数组到指针的退化（Decay）。换而言之，`void f(int x[5]);` 和 `void f(int* x);` 是完全等价的写法。

此外，默认的下标表达式 `a[b]` 总是会解析为 `*(a + b)` 来运算。因此如果你想获取数组的第四个元素，不仅可以写 `a[3]`，你甚至可以写 `3[a]`：因为它只会转换成 `*(3 + a)`，这和 `*(a + 3)` 是完全等价的。类似地，如果你想访问指针 `x` 指向元素往后第 `i` 个元素，除了 `*(x + i)` 这种写法，也可以直接用 `x[i]`。

## 数组的地址

最后来考虑这样一个事情。如果有 `int a[5]{};`，那么 `&a` 是什么意思呢？

字面上，`&a` 就是取数组 `a` 的地址。没错，就是这样。那么请看下面的代码：
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    int a[5]{};
    cout << &a << endl;
    cout << a << endl;
}
```
它的输出却是一样的：
```io
0x62fe00
0x62fe00
```
这时，`&a` 和 `a` 有什么区别呢？

首先我来解释为什么 `&a` 和 `a` 输出的是一个值。首先，`a` 会转换为 `&a[0]` 这个地址，此时你要注意到它是数组首元素的首字节地址——而 `&a` 是整个数组首字节的地址——所以它们两个地址的值是相同的。

不同点在于，这两个地址的基类型不一样。`a` 被转换为指向 `int` 的指针类型；而 `&a` 则是指向 `int[5]` 的指针类型。所以有了下面的结果：
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    int a[5]{};
    cout << sizeof(*(&a)) << endl;
    cout << sizeof(*( a)) << endl;
}
```
```io
20
4
```

## C 风格字符串库

既然函数可以处理转换为指针的数组，那么函数也可以处理转换为指针的字符串。比如之前“复制字符串”这个问题，就可以通过一个函数来解决：

```cpp
void copyString(char* dest, const char* src) {
    for (int i{0}; *(src + i) != '\0'; i++) {
        // 也可直接写作 dest[i] = src[i];
        *(dest + i)= *(src + i);
    }
}
```

这个函数通过遍历 `src` 指针所指向的字符串，逐一将内容复制到 `dest` 所指向的字符串中。不过，`<cstring>` 头文件中已经提供了这些操作 C 风格字符串的函数。常用的有：

| 函数                                        | 作用                                                        |
| ------------------------------------------- | ----------------------------------------------------------- |
| `unsigned strlen(const char*)`              | 求字符串长度（在[后续章节](/ch05/easy_string)中使用）        |
| `int strcmp(const char*, const char*)`      | 字典序比较字符串。相等时返回 0                              |
| `char* strcpy(char* dest, const char* src)` | 将 `src` 指向的字符串复制到 `dest` 所指位置上               |
| `char* strcat(char* dest, const char* src)` | 将 `src` 指向的字符串复制到 `dest` 所指字符串的末尾（拼接） |

使用它们的例子：
```cpp codemo(show)
#include <cstring>
#include <iostream>
int main() {
    char a[15]{"Hello"};
    char b[15]{};

    // a 隐式转换为指向 a[0] 的指针，作为 std::strlen 的实参
    std::cout << std::strlen(a) << std::endl; // 输出 5

    // 接下来尝试调用 std::strcpy 将 a 字符串复制到 b 数组内
    // （这需要保证 b 数组足够大，能够完整放下 a 字符串）
    std::strcpy(b, a);
    std::cout << b << std::endl; // 输出 Hello

    // 最后尝试调用 std::strcat 将 a 字符串拼接到 b 字符串后面
    // （这需要保证 b 数组足够大，能够放下拼接完的字符串）
    std::strcat(b, a);
    std::cout << b << std::endl; // 输出 HelloHello
}
```

可以看出，C 风格字符串的使用不是特别容易。因此，C++ 提供了 `std::string` 类来解决这些问题。但 `std::string` 的使用需要更多的知识，我把它的介绍放在了[第六章的结尾](/ch06/summary)。

## 注意事项

我们之前说到，如果 `cout <<` 后面接的是一个字符数组，那么可以做到输出一个字符串。然而这里应当发生数组到指针的隐式转换，所以 `cout <<` 实际上是**对 `char*` 类型的输出做了特殊的处理**。这也就是为什么我们不能直接通过 `cout` 输出指向 `char` 类型的指针：
```cpp
char a{};
char* p{&a};
cout << p << endl; // 输出空字符串，而非地址
```
我们将在下一节中解决这个问题。
