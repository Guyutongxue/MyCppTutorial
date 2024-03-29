# 迭代器的概念

让我讲一点数学。

我们都知道加法有结合律和交换律。数学家们觉得这个性质很好，发现（或者发明）了许多在新的集合上所做的新的运算，也满足类似加法的性质。他们给这种带着不错性质的集合起了个名字，叫做交换群（阿贝尔群）。具体而言，数学家们总结了 $+$ 这个二元运算这些美好性质：

设集合 $A$ 上定义了二元运算 $+$。
1. **封闭性**：运算 $+$ 总是得到 $A$ 中的一个元素。  
$\longrightarrow$ 称满足以上条件的 $A$ 为*原群*。
2. **结合律**：$(a+b)+c=a+(b+c)$ 总成立。  
$\longrightarrow$ 称满足以上条件的 $A$ 为*半群*。
3. **单位元**：存在元素 $0$，使得 $0+a=a+0=a$ 总成立。  
$\longrightarrow$ 称满足以上条件的 $A$ 为*幺半群*。
4. **逆元**：任意元素 $a$ 总存在一个 $b$ 使得 $a+b=0$。  
$\longrightarrow$ 称满足以上条件的 $A$ 为*群*。
5. **交换律**：$a+b=b+a$ 总成立。  
$\longrightarrow$ 称满足以上条件的 $A$ 为*交换群（阿贝尔群）*。

好的，数学问题到此结束。STL 的设计者采用了类似的想法来构造迭代器的概念。如同阿贝尔群是从加法的美好性质引出的定义，迭代器的概念也是从指针的美好性质引出的。

设 `It` 类型的变量 `p` `q` 可以“像指针一样访问容器”。
1. **可自增**：`++p` 合法，可以让它“指向下一个元素”。
2. **可读**：`*p` 合法，可以获得它所“指向的元素”。  
$\longrightarrow$ 称满足以上条件的 `It` 为*输入迭代器（Input iterator）*。
3. **可多趟**：`p == q` 合法，且表明 `*p` 和 `*q` “代表同一个元素”。  
$\longrightarrow$ 称满足以上条件的 `It` 为*前向迭代器（Forward iterator）*。
4. **可自减**：`--p` 合法，可以让它“指向上一个元素”。  
$\longrightarrow$ 称满足以上条件的 `It` 为*双向迭代器（Bidirectional iterator）*。
5. **任意访问**：`p += n` 合法，可以让它“指向 `n` 个后的元素”，且速度够“快”。  
$\longrightarrow$ 称满足以上条件的 `It` 为*随机访问迭代器（Random access iterator）*。
6. **连续存储**：`p - q` 恰好是其所“指向的元素”的地址的差。  
$\longrightarrow$ 称满足以上条件的 `It` 为*连续迭代器（Contiguous iterator）*。

> 这段只是非常笼统的描述，相比标准文本少了很多内容。但我在这段文本中努力描述了每一个迭代器概念的感性含义。更具体的要求还有：
> - 输入迭代器保证 `p++` 是合法表达式，但其返回的内容没有保障。
> - 前向迭代器还定义了 `p != q`。此外，它保证 `p++` 的含义和指针类似。
> - 双向迭代器还定义了 `p--`，含义和指针类似。
> - 随机访问迭代器还定义了 `p -= n` `p + n` `p - n` 和 `p - q`。规定 `p[n]` 总是理解为 `*(p + n)`。它们的含义和指针类似。
> 
> C++20 增加了一组迭代器概念的描述，并保留了 C++17 迭代器概念（又称“传统”（Legacy）迭代器）。这两组概念在细节上有一定差别，但它们的大致含义和上文是一致的。本书并不区分 C++20 迭代器和 C++17 迭代器。

我们来带入一些例子。显然，原生的指针满足了以上的六条全部要求。所以指针类型是连续迭代器。对于 `std::vector`，由于 `std::vector` 的行为和除了长度可变以外跟数组是一致的，所以它的迭代器理应也满足六条全部要求。所以，`std::vector<T>::iterator` 也是连续迭代器。

再来看看 `std::forward_list`。作为单向链表，在访问的时候，除了解地址外，我只能做到通过 `next` 指针向后移动。此外，我能保证 `p == q` 表达式的含义，但 `--p` 就无法做到了。因此，`std::forward_list` 的迭代器只满足前三条要求，它是一个前向迭代器。

对应的，`std::list` 虽然满足第四条 `--p` 的要求，但做不到短时间内的 `p += n`（需要 `n` 次自增或自减，很慢）。所以，`std::list` 是一个双向迭代器。

`std::deque` 可以通过 `a[n]` 的形式访问元素，也就意味着能够短时间内访问 `begin + n` 这个元素（其中 `begin` 是指向头部的迭代器），侧面证明了其迭代器满足第五条要求。但正如之前所述，`std::deque` 的元素在存储上并不连续，所以其迭代器是一个随机访问迭代器。

和 `std::vector` 一样，所有的 STL 容器都定义了 `iterator` 成员别名，来指代该容器的迭代器类型：

| 迭代器类型                       | 对应概念 |
| -------------------------------- | -------- |
| （数组）`T*`                     | 连续     |
| `std::vector<T>::iterator`       | 连续     |
| `std::array<T>::iterator`        | 连续     |
| `std::deque<T>::iterator`        | 随机访问 |
| `std::list<T>::iterator`         | 双向     |
| `std::forward_list<T>::iterator` | 前向     |

所有的 STL 容器都定义了 `begin` 和 `end` 成员函数。`begin` 成员函数返回指向容器首个元素的迭代器，而 `end` 成员函数返回指向容器最后一个元素的**下一位置**的迭代器。（换而言之，对 `end` 成员函数返回值“解地址”导致未定义行为。）

<img src="/assets/range-begin-end.svg" alt="begin and end iterator">

所以，我们得到了访问 `std::forward_list` 元素的正确方法：
```cpp codemo(show)
#include <iostream>
#include <forward_list>
int main() {
    std::forward_list<int> a{1, 2, 3};
    std::forward_list<int>::iterator i{};
    // 获取指向链表头结点的迭代器
    std::forward_list<int>::iterator begin{a.begin()};
    // 获取指向链表尾节点的下一结点的迭代器
    // （其实就是 nullptr）
    std::forward_list<int>::iterator end{a.end()};
    // 迭代器的 ++ 运算可以让其指向下一个元素
    // 迭代器的 != 运算可以判断遍历是否完成
    for (i = begin; i != end; ++i) {
        // 迭代器的一元 * 运算可以获取其指向的元素
        std::cout << *i << " ";
    }
}
```

在本文的最后，我介绍一种新语法，叫做占位类型说明符。类型说明符我们都认识，就是 `int` 啊 `char` 啊这些，但刚才的几段代码中，类型说明符的长度变得不可理喻地长：`std::forward_list<int>::iterator` 云云，这未免让人很懊恼。于是，C++ 引入了**占位类型说明符** `auto`。

<h6 id="idx_占位类型说明符"></h6>

声明并定义变量时，本应该出现类型说明符的位置，可以使用关键字 `auto` 代替。当这样做时，**变量的类型取决于初始化值的类型**。
```cpp
auto a{42};   // 等同于 int a{42};
auto b{3.14}; // 等同于 double b{3.14};
```
那么，在之前的例子中，`std::forward_list<int> a;` 即表明 `a.begin()` 具有 `std::forward_list<int>::iterator` 类型。因此，如果使用 `a.begin()` 初始化变量，则直接用 `auto` 占位类型说明符即可避免书写如此之长的玩意儿了。之前的代码可以简化为：
```cpp codemo(show)
#include <iostream>
#include <forward_list>
int main() {
    std::forward_list a{1, 2, 3};
    auto begin{a.begin()};
    auto end{a.end()};
    for (auto i{begin}; i != end; ++i) {
        std::cout << *i << " ";
    }
}
```

> 当初始化器中含有多个值时（如聚合初始化、构造函数调用），无法使用 `auto`。

如果需要指定占位类型说明符是引用类型，则需要用 `auto&`；如果需要指定它是只读的，则需要用 `const auto`。当然，还有 `const auto&`。
