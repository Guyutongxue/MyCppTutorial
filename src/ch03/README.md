# 第三章 过程式编程

现在我们审视前两章学过的内容。请思考一下，当我们写一段 C++ 程序的时候，我们实际上做了些什么？细节上，我们通过声明语句来让计算机存储一些东西，通过表达式语句让计算机进行一些运算，通过循环和分支让计算机按照我们控制的流程运作；但这一切都可以概括为“命令”。也就是说，我们一直在“命令”计算机做某些事情——命令它存储、命令它运算，仿佛就是向计算机发号施令。这种让计算机工作起来的方法被称为**命令式编程（Imperative programming，又译指令式编程）**。它是一种典型的**编程范式（Programming paradigm）**（编程范式的意思就是编程上的“方法论”）。

在命令式编程这个大框架下，我们可以认为整个程序为一些命令的序列，然后计算机会按照这段序列的顺序依次执行其中的命令。我们称这种由命令组成的序列为**过程（Procedure）**。如果我们编写程序的时候始终是通过完善一个过程来驱使计算机工作的话，则称这种编程方法为**过程式编程（Procedual programming，又称面向过程编程）**。显然，过程式编程是指令式编程的一种。

接下来的一章，我们要通过 C++ 来实现过程式编程的完整学习。过程式编程是比较直接的，不会占用太多的篇幅；尽管如此，它仍然是学习其他形式的编程范式的基础，不能轻视。