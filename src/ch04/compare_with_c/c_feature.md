# 需要注意的 C 特性

## 不同特性

就目前而言 C 和 C++ 的语法大致上相似，唯有如下不同：

### 无参函数声明

在 C 中，不接受实参的函数声明需要在参数列表处写上 `void`：

```c
void f(void);    /* 不是 void f(); */
int main(void) { /* 此处的 void 不是必需的，但也建议写上 */
    /* [...] */
}
```

> 这是因为，在 C 中空参数列表意味着“可传入任何参数”，而不是不接受参数。

### 字符字面量

在 C 中，字符字面量拥有 `int` 类型：
```c
sizeof('A'); /* 等价于 sizeof(int) */
```
而在 C++ 中，这种字符字面量是 `char` 类型的。

### 字符串字面量

在 C 中，字符串字面量拥有 `char[N]` 类型，其中 `N` 是追加空字符后的字符个数；而在 C++ 中，字符串字面量拥有 `const char[N]` 类型。

尽管 C 的字符串字面量没有 `const` 限定，但仍然不允许修改；更改字符串字面量是未定义行为。

### 循环或分支的条件

第一，C 中要求循环或分支的条件只能是表达式，不能是声明：
```cpp
if(bool r = getResult()); // 合法 C++，但 C 中错误
```
第二，C 中循环和分支的条件时按语境转换到 `int` 的：若转换到 `int` 的值非零，则进入真分支（或继续循环）；若转换到 `int` 的值为 `0`，则进入假分支（或退出循环）。在 C++ 中，条件会按语境转换到布尔类型。

### 详述类型说明符

在 C 中，若想声明并定义一个结构体，需要在类型说明符前加上详述类型说明符 `struct`。比如：
```c
struct Coord {
    int x, y;
};
Coord a;        /* C 中错误，C++ 中 OK */
struct Coord a; /* C 和 C++ 都合法 */
```
即你在使用结构体名字前必须再额外写一个 `struct`，否则 C 编译器无法理解这个名字。你可以通过 typedef 声明来避免这个啰嗦：
```c
struct Coord_impl {
    int x, y;
};
typedef struct Coord_impl Coord;
Coord a; /* 合法 C */
```
或者直接：
```c
typedef struct {
    int x, y;
} Coord;
Coord a; /* 合法 C */
```
这也被视为一种常见技巧。

### 其它

除了上述内容，C 和 C++ 的不同之处还有：
- 结构体不引入作用域（C++ 中引入）
- 关键字 `inline` 含义为优先内联（C++ 中为[容许重复定义](../../ch09/inline)）
- 全局作用域只读变量拥有外部连接（C++ 中拥有内部连接）
- 对齐相关关键字 `_Alignas` `_Alignof`（C++ 中 `alignas` `alignof`）
- 静态断言 `_Static_assert`（C++ 中 `static_assert`）
- 线程存储期 `_Thread_local`（C++ 中 `thread_local`）

## 独有特性

接下来列举 C 中特有而 C++ 中没有的语法。

### 从 `void*` 到其它指针类型的隐式转换

在 C++ 中，允许从任意指针类型 `T*` 到 `void*` 的隐式转换，但反过来不行。但是 C 中允许双向的转换。这使得以下代码
```c
/* 申请 sizeof(int) 这么多字节的内存，并将其地址初始化于 p */
int* p = malloc(sizeof(int));
```
得以正确编译。因为 `malloc` 是返回 `void*` 的函数，然后 `void*` 可以隐式转换到 `int*`。如果在 C++ 中，你需要加上显式转换才能编译通过：
```cpp
int* p = (int*)malloc(sizeof(int));
```

### 从 `int` 到枚举类型的隐式转换

C++ 中允许从枚举类型到其基类型（一般是 `int`）的隐式转换，但反过来不行。C 则允许双向的转换：
```c
enum Color {
    Red,
    Green,
    Blue
};
int a = Red; /* C/C++ 都合法 */
enum Color b = 1; /* C 合法，C++ 错误 */
```

### 无初始化器的只读变量

在 C 中，只读变量可以没有初始化器，然而在 C++ 中这是不允许的。
```c
const int a; /* 无初始化器：C 允许，C++ 错误 */
```

### 跨越声明语句的 goto 语句

在 C 中，goto 语句可以跳过带初始化器的声明语句，但在 C++ 中不允许。
```c
goto line; /* C 允许，C++ 错误 */
{
    int a = 42;
    line: printf("%d", a);
}
```

### 在函数声明中定义结构体

C 允许将结构体的定义放在函数的声明中：
```c
struct S { int x, y; } f(void) {
    struct S result = {1, 2};
    return result;
}
```
……甚至放在参数列表中：
```c
void f( struct S { int x, y; } a);
```

显然这样做会让程序变得更加晦涩，我们不太推荐。

::: tip
以下介绍的特性都是 C99/C11/C23 标准引入的，它们可能不在老编译器上支持。
:::

### 可变长数组（C99）

不同于 C++，C 在声明数组时允许它的大小不是常量（前提是该数组拥有自动存储期）：
```c
int n;
scanf("%d", &n);
int a[n]; // 大小不是常量，C 中 OK 但 C++ 中不允许
```
这种数组称为可变长数组（Variable Length Array, VLA）。此时，作用于 VLA 的 sizeof 表达式也不一定是常量了；sizeof 表达式会对 VLA 类型的操作数求值，并在运行时计算 VLA 的大小。

亦存在指向 VLA 的指针和由 VLA 构成的数组（这可以是二维 VLA）。

> 正因为 C 中 VLA 的存在，许多编译器也不严格地允许 C++ 中使用 VLA（如 g++）。但是我们应当尽量避免。
>
> C11 后，编译环境是否提供 VLA 是实现决定的。比如 MSVC 就不提供 VLA。

### 柔性数组（C99）

在 C 的结构体声明中，允许最后一个成员是不指定长度的数组，称为柔性数组：
```c
struct S {
    int data;
    char d[];
};
```
对于非动态存储期的 `S` 类型结构体，柔性数组成员如同其不存在：
```c
struct S a = {42};
struct S b = {42, {'A'}}; // 错误：如同柔性数组不存在
a.d[0] = 'A';             // 此时访问柔性数组成员是未定义行为
sizeof(struct S);         // 相当于 sizeof(int)，柔性数组此时不占用大小
```
但是，你可以在动态分配内存时为柔性数组提供存储空间：
```c
struct S* ptr1 = malloc(sizeof(struct S) + 30); // 相当于拥有成员 char d[30];
struct S* ptr2 = malloc(sizeof(struct S) + 50); // 相当于拥有成员 char d[50];
ptr1->d[0] = 'A'; // OK
```
但在结构体赋值时，仍然不考虑柔性数组的存在：
```c
*ptr2 = *ptr1; // 只赋值了 ptr2->data，ptr2->d 中的元素维持原样
```

### `restrict` 关键字（C99）

`restrict` 关键字只能在指针声明中出现（注意是在 `*` 的后面）：
```sdsc
基类型"* restrict" 指针名 [直接初始化器]";"
```
比如：
```c
int a;
int* restrict p = &a;
```
`restrict` 关键字指明：若其限定的指针 `p` 指向了变量 `a`，则任何对 `a` 的写入操作都必须经由 `p`。也就是说，此时任何不通过 `p` 而对 `a` 做修改都是未定义行为。这样的限制允许编译器做更多的优化。

### “数组做形参”的额外语法（C99）

在 C 中，数组传入形参依然会转换到指针：
```c
void f(int a[10]) {
    a; // 类型为 int* 的指针
}
```
但 C 可以让这个转换结果带 `const` 限定，即转换到 `T* const` 类型（C++不存在此类语法）：
```c
void f(int a[const 10]) {
    a; // 类型为 int* const，即指向 int 的只读指针
}
```

类似地，C 还可以让转换结果带 `restrict` 限定：
```c
void f(int a[restrict 10]) {
    a; // int* restrict 类型
}
```

C 还可以在编译期间检查传入数组的大小，并限定某个参数的最小大小。比如：
```c
// 限定传入 f 的参数 a 是一个数组，且至少有 10 个元素
void f(int a[static 10]) {
    a; // 仍然转换到 int*
}
```
这样可以提示编译器做更多的优化。

如果传入参数是一个指向 VLA 的指针或者由 VLA 构成的数组，则可以这样写：
```c
void f(int(*a)[*]) {
    a; // a 是指针，指向 VLA 类型 int[*]
}
void g(int a[10][*]) {
    a; // a 还是指针，指向 VLA 类型 int[*]
}
```
即用 `T[*]` 代表由 T 类型构成的 VLA。

### 复合字面量（C99）

C 中还提供一种新的字面量，称为复合字面量。它允许你创建一个数组或结构体字面量：
```sdsc
"("数组/结构体类型标识"){"初始化值列表"}"
```
比如
```c
(int[4]){1, 2, 3, 4}
```
创建了一个 `int[4]` 类型的数组，其中的四个元素分别为 `1` `2` `3` `4`。下面这个例子展示了创建结构体字面量，它可以减少一定的代码量：
```c
// 结构体：坐标
struct Coordinate {
    int x, y;
};
// 返回原点，只需一句 return
struct Coordinate getOrigin(void) {
    return (struct Coordinate){0, 0};
};
```

> 复合字面量是左值。在 C++ 可以通过转型表达式轻松得到类似的结构体“字面量”（但是是右值），如 `Coordinate{0, 0}`。C++ 需要类型别名才能实现数组右值“字面量”。

### 指派初始化（C99）

在 C 中，数组和结构体还允许一种特殊的初始化方法，称为指派初始化。用结构体举例：
```c
struct Coordinate {
    int x, y, z;
};
struct Coordinate a = {
    .y = 2,
    .x = 1,
    .z = 3
};
```
这里采用指派初始化结构体 `a`。其中 `a` 的 `y` 成员初始化为 `2`，`x` 成员初始化为 `1`，`z` 成员初始化为 `3`。即，结构体的指派初始化中，每一个初始化值由这样的形式（称为指派器）构成：
```sdsc
"."成员名 "=" 初始化值
```
数组的指派初始化例如：
```c
int a[10] = {
    [0] = 1,
    [1] = 2,
    [7] = 3,
    [8] = 4
};
```
这里，初始化 `a[0]` 为 `1`，`a[1]` 为 `2`，`a[7]` 为 `3`, `a[8]` 为 `4`。即，数组的指派初始化中，每一个初始化值由这样的形式构成：
```sdsc
"["下标"] =" 初始化值
```

> 指派初始化随后不带指派器的初始化初始化刚刚指派位置的下一个元素（成员）。（这句话又点绕，但我没找到更合适的说法。）意思就是：`int a[10] = {[7] = 3, 4, 5};` 中，初始化的是 `a[7]` `a[8]` 和 `a[9]`，即后面没有给出指派器的初始化接着 `[7]` 的位置往下走。

> C++20 中也提供了结构体的指派初始化（这是聚合初始化的一种），但它不允许乱序（初始化顺序不得和成员声明顺序不同），也不允许嵌套。

### `_Generic` 泛型选择（C11）

C 提供了 `_Generic` 这一关键字，它可以一定程度上模仿 C++ 的函数重载。
```sdsc
"_Generic("参数"," 关联列表")"
```
其中，`@关联列表@` 是一系列逗号分隔的：

```sdsc
(类型名|"default")": "表达式
```

`_Generic` 相当于一个表达式，当传入 `@参数@` 类型和 `@关联列表@` 中的某一 `@类型名@` 匹配时，则运算这个 `@类型名@` 对应的 `@表达式@`；若没有匹配的 `@类型名@`，就执行 `default` 对应的 `@表达式@`（若有，否则编译错误）。

比如：
```c codemo(show)
// 函数声明（于 <stdlib.h> 中）
int         abs(int       n);
long       labs(long      n);
long long llabs(long long n);
// 泛型选择的典型使用方法：通过宏实现仿重载
#define ABS(n) _Generic((n), \
    int      :   abs(n),     \
    long     :  labs(n),     \
    long long: llabs(n)      \
)
int main(void) {
    ABS(3);   // 调用 abs(3)
    ABS(3LL); // 调用 llabs(3)
}
```

### `typeof` 关键字（C23）

C 可以通过 `typeof` 关键字获取一个变量的类型。
```c
int main(void) {
    int a;
    typeof(a) b; // 等价于 int b;
}
```

而 `typeof_unqual` 可以移除类型的顶层限定符：

```c
int main(void) {
    const int        a;
    typeof(a)        b; // 等价于 const int b;
    typeof_unqual(a) c; // 等价于 int b;
}
```

> C++11 中的 `decltype` 关键字与此作用类似；但是 `decltype` 会保留引用性；一般结合 `std::remove_cv` 和/或 `std::remove_reference` 来使用。C 因为没有模板而引入了 `typeof_unqual` 关键字。

### 其它

除了上述内容外，C 的额外语法还有：
- `_Atomic` 原子类型（作用类似 C++ 中 `std::atomic`）
- 原生复数运算支持（作用类似 C++ 中 `std::complex`）
- 任意宽度整数 `_BigInt` 
- C23 允许 `va_start` 不提供第二参数


## 被移除的语法

C 是一门富有悠久历史的语言，其中的许多特性也已经被删除。下面列举了这些自 C99 其就被删除的语法——我们绝不推荐读者书写，但是可以稍作了解，从而能够阅读更多的代码。


### 旧式（K&R 风格）函数定义

C23 之前，函数参数的类型可以和函数的声明分离开来：
```c
int max(a, b)
    int a;
    int b;
    {
    return a > b ? a : b;
}
```

这种写法称为旧式函数定义，它等价于这样的新式函数定义：
```c
int max(int a, int b) {
    return a > b ? a : b;
}
```

使用旧式函数定义时，编译器**不会**检查函数调用表达式中传入的参数。如果传入参数类型和定义不匹配，则导致运行时未定义行为。

### 布尔类型

在 C23 前，没有 `bool` `true` `false` 关键字。取而代之的是 `_Bool` 类型，以及定义于 `<stdbool.h>` 的三个宏 `bool` `true` `false`。

```c
/* <stdbool.h> 内容 */
#define bool _Bool
#define true 1
#define false 0
```

所以如果在 C23 之前的版本使用布尔类型，一般需要引入 `<stdbool.h>` 头文件。再退一步，**C99 前是没有布尔类型的**。你必须在那些场合用 `int` 来替代（这也是为什么循环和分支的条件会转换到 `int` 类型）。

### 无单行注释

在 C99 前，C 没有单行注释：
```c
int main(void) {
    // 单行注释，C99 前错误
    /* 多行注释 OK */
    return 0;
}
```

### 隐式函数声明

在 C99 前，返回 `int` 类型的函数无需声明只可使用：
```c codemo(show)
int main(void) {
    /* printf 未声明，但是可以使用：因为其返回 int */
    printf("Hello, world!");
    return 0;
}
```

### 省略全局的 `int`

在 C99 前，全局的 `int` 都可以省略（这是非标准用法）：
```c
a;        /* 声明变量 a，但类型 int 被省略：即 int a; */
b[10];    /* 声明数组 b，其类型为 int[10] */
extern c; /* 等价于 extern int c; */
main(void) {  /* main 函数的返回值类型 int 也可省略 */
    return 0;
}
```

### main 函数必须 return

在 C99 前，要求 main 函数必须 return：
```c
int main(void) {
    return 0; /* 不可省略 */
}
```
而且标准未规定 `0` 是代表成功执行的返回值，更合适的做法是返回 `EXIT_SUCCESS` 宏：
```c
#include <stdlib.h>
int main(void) {
    return EXIT_SUCCESS;
}
```
### for 初始语句的限制

在 C99 前，for 语句的初始语句只能为表达式，不能声明一个变量：
```c
for (int i = 0; i < 10; i ++) ; /* C99 前非法 */
```
```c
int i;
for (i = 0; i < 10; i++) ; /* C99 前合法*/
```

### 声明语句位置限制

在 C99 前，非全局的声明语句必须出现在复合语句的最开头：
```c
int main(void) {
    printf("Hello");
    int a = 0;       /* C99 前错误，声明语句没有出现在开头 */
    printf("%d", a);
    return 0;
}
```
```c
int main(void) {
    int a = 0;       /* OK */
    printf("Hello");
    printf("%d", a);
    return 0;
}
```

### 其它语法限制
- C23 前，标号必须出现在语句前（C++23 前同理）；
- C23 前，没有 `#warning`（C++23 前同理）；
- C23 前，`_Static_assert` 必须提供信息说明（C++17 前同理）；
- C23 前，没有 `__has_include`（C++17 前同理）；
- C23 前，没有二进制字面量（C++14 前同理）；
- C23 前，没有特性（`[[...]]`）（C++11 前同理）；
- C23 前，使用 `_Noreturn` 代替 `[[noreturn]]`；
- C23 前，列表初始化中必须包含一个元素；即 `int a[1] = { 0 };` 合法但 `int a[1] = {};` 非法；
- C23 前，没有 `nullptr`；使用 `NULL` 代替（C++11 前同理）；
- C23 前，没有 `constexpr`；使用 `const` 代替（C++11 前同理）。但在 VLA 不可用时，数组下标仍然期望常量，故此时需要用 `#define` 定义宏。
