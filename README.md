# 前言

## 为什么写这本书

受某位提问箱的匿名朋友的建议，我建立了这份文档，用于记录我所希望的一套 C++ 教学方案。**请注意，我只负责讲解 C++ 语法层面的知识。对于超过语法的问题（比如算法设计等）不在本书的讨论范围之内**；书中所引用的算法仅作为例子使用。尽管许多批评家说这是不负责任的行为，但是我认为一份教材应当只做好一件事情。有关算法部分的学习，我建议阅读本书的前五章（第〇章~第四章）作为 C++ 的基础，然后选用任意一本算法教材进行学习即可。

最初我计划将这些想法纳入尚未成型的北京大学《计算概论》教材中，但是由于指导教师没有（时间或精力）领导团队，我只得暂时将这些想法暂且记录在这里。因此这份文档的大体框架仍然与《计算概论》授课思路一致。

为了防止版权问题，此文档未经授权**禁止转载**。

> 我尝试了各大电子书（文档）发布平台，如 GitBook 、看云和语雀等，但是都不甚满意：
> - GitBook 国内连接速度堪忧，且对中文输入支持不好；
> - 看云太丑，免费功能较少，编辑体验不佳；
> - 语雀导入导出功能偏弱，还有待发展；
> 
> 因此选择了 Docsify 工具自行搭建文档的方法。经过长时间的调试目前已经可以很好地阅读了，但仍然可能存在排版错误还清谅解，并希望您能及时指出。

## 联系方式

如果您对书中的内容存在疑问、建议或意见，请通过邮箱 [guyutongxue@163.com](mailto:guyutongxue@163.com) 联系我，谢谢您的支持与配合。

## 一些约定

本文中用“我”来指代作者，用“你”来指代读者；“我们”一词一般用于指明过去或接下来需要做的事情，仅用于补足主语，没有更多意义。本文的一些地方可能用词不是特别严谨，还请各位读者见谅。

本文中“引用的部分”（指灰色底纹的那些，比如——
> 引用

这样的），属于对正文的补充。对于那些有一定基础的读者，这些内容会有助于架构更加完善的知识体系；而没有基础的读者完全可以跳过这些部分。

本书是面向 C++20 标准的（模块除外，因为编译器未能广泛支持）。因此对于有基础的读者来说，至少请将你的编译器升级到能完整支持 C++11 标准（GC除外）的版本。对于常见的编译器，要求：

- GCC 版本 4.8.1 及以上
- Clang 版本 3.8 及以上
- MSVC （Visual Studio）版本 19.26 及以上

## 其它

> 厚颜无耻地放个码……如果你觉得这本书有帮助或者还不错的话，就打个赏呗。
> 
> <center><img alt="QR code" src="assets/alipay.jpg" width="200"></center>
