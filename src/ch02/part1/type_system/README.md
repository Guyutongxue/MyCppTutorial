
# 类型系统

C++ 是一门静态类型语言。静态类型（Static typing）是指，**任何**引入的名字都需要拥有一个确定的、无法更改的类型。因此当我们写下 `int a{42};` 的时候，变量 `a` 的类型不会更改。请牢记这一点：**变量一旦声明，类型不会再次更改**。

> 有人还称 C++ 为强类型（Strong typing）语言。但是关于强类型和弱类型的定义目前仍有争论；按照主流的强类型定义是指不会发生隐式转换的类型系统：然而 C++ 并不满足。因此这里不提及强、弱类型的讨论。

C++ 拥有丰富的类型，这些类型共同构成了类型系统（Type system）。C++ 的类型系统可以简单地用下面这张图展示出来：

<img src="/assets/typesystem.svg" alt="Type System">

> 上图中灰色字体的部分不会在本书中涉及，仅在附录中稍作介绍。

在这一章节，我们将重点放在算术类型的讲解上。**算术类型**（Arithmetic type）是指能够参与数学运算的数据类型。首先从最常见的整型开始吧。
