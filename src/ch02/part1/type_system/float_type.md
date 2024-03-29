# 浮点类型

如果想要表示一些有限小数，可以使用**浮点类型**（Floating point type）。

## 分类

和整型类似，浮点类型也包括以下三种：

| 类型说明符    | 浮点型分类       | 一般的长度      | 一般的有效位    | 范围                                                               |
| ------------- | ---------------- | --------------- | --------------- | ------------------------------------------------------------------ |
| `float`       | 单精度浮点型     | 32 位           | 7位             | $-3.4\times 10^{38}$ ~ $3.4\times 10^{38}$ <br> 6~7 位有效数字     |
| `double`      | 双精度浮点型     | 64 位           | 15位            | $-1.7\times 10^{308}$ ~ $1.7\times 10^{308}$ <br> 15~16 位有效数字 |
| `long double` | 扩展双精度浮点型 | 不少于 `double` | 不少于 `double` | ——                                                                 |

上表中也说明了，这三种类型的区别主要在于“精度”，它们具体的体现就是所能表示的有效数字的多少。请看这个例子：
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    float a{3.14159265358979323846l};
    double b{3.14159265358979323846l};
    long double c{3.14159265358979323846l};
    cout.precision(19);  // 这句话可以调整输出精度为 19 位有效数字；否则默认只输出 6 位
    cout << a << endl;
    cout << b << endl;
    cout << c << endl;
}
```
> 这里用到了关于输出的一些调整设置。更多的用法可以在[输入输出章节](/ch04/io/output.md)找到。

我们令 `a` 、 `b` 和 `c` 三个变量初始化为小数点后 20 位的圆周率值，并输出它们。最终得到的可能结果却是：

<pre class="language-plain"><code>3.141592<u>741012573242</u>
3.141592653589793<u>116</u>
3.14159265358979323<u>9</u></code></pre>

注意下划线部分的数值已经与我们期望的数值不符。这就是浮点型精度的体现，**超过对应精度的部分将无法准确存储**。之所以会有这个结果，是由于浮点型的存储方式所造成的。

## 存储细节

浮点数的存储方式由许多种。一般地，单精度浮点类型 `float` 按照 IEEE 754 标准进行存储。

![IEEE 754](https://s1.ax1x.com/2020/07/06/UCR8yj.png)

在这个标准里，4 字节的 `float` 内存被分成了 3 个部分：*符号位（Sign）*、*指数位（Exponent）*和*小数位（Fraction）*。它表示了形如：

$$(-1)^S\times 2^E\times M$$

这一记数法的数，其中：

- S(Sign)：可取 0 或 1，指示这个数是否为负数。用*符号位*存储该值。
- E(Exponent)：取 -127~127 的任意值。用指数位存储该值 $+127$ 的原码。
- M(Mantissa)：取 1.xxx 。用小数位存储 xxx 的二进制值。

关于浮点数的存储是一个较为复杂的知识，我不希望一开始就陷入这样的细节。因此感兴趣的读者可以参考 IEEE 754 标准进行学习，网上也有更多相关的资料可供参考。

## 注意事项

正因为浮点数特殊的存储方式，我们避免将较大的数与较小的数相加。因为这样得到的结果有效数字可能超过精度限制。例如：
```cpp codemo(show)
#include <iostream>
using namespace std;
int main() {
    float a{0.00042};
    float b{42000};
    float c{a + b};
    cout << c << endl;
}
```
以上代码编译运行的结果为 `42000` 。正如之前所说，较小的精度被丢失掉了。

## 练习

1. 编写一段程序，输入圆的半径（可能是小数），计算圆的面积的近似值。
1. 编写一段程序：先输入正整数 n ，然后输入 n 个数；输出这 n 个数的平均值。

## 练习参考答案

```cpp codemo(show, input=5)
#include <iostream>
using namespace std;
int main() {
    double r{0}, s{0}, pi{3.1415926};
    cin >> r;
    s = r * r * pi;
    cout << s << endl;
}
```
```cpp codemo(show, input=5\n1 2 3 4 5)
#include <iostream>
using namespace std;
int main() {
    int n{0};
    double average{0.0}, sum{0.0}, x{0.0};
    cin >> n;
    int i{1}; // 计数用
    while (i <= n) {
        cin >> x;
        sum = sum + x;
        i = i + 1;
    }
    average = sum / n;
    cout << average << endl;
}
```

