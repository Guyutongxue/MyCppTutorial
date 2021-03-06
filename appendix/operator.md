# 运算符优先级和结合方向

<div class="table-wrapper">
<table>
<thead>
    <tr>
        <th>结合方向</th>
        <th>优先级</th>
        <th>运算符</th>
        <th>名称</th>
        <th>说明</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td rowspan="9">&#10230;<br> 从左向右</td>
        <td>1</td>
        <td><code>::</code></td>
        <td>作用域解析运算符</td>
        <td><a href="#/ch03/review_cpp.md?id=idx_作用域解析运算符">说明</a></td>
    </tr>
    <tr>
        <td rowspan="8">2</td>
        <td><code>a++</code></td>
        <td>后缀自增运算符</td>
        <td><a href="#/ch02/part2/incdec_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>a--</code></td>
        <td>后缀自减运算符</td>
        <td><a href="#/ch02/part2/incdec_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>type()</code></td>
        <td>函数风格转型运算符</td>
        <td><a href="#/ch02/part2/other_operator?id=类型转换运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>type{}</code></td>
        <td>列表风格转型运算符</td>
        <td><a href="#/ch06/cast_overload.md?id=idx_列表风格转型运算符">说明</a></td>
    </tr>
    <tr>
        <td><code>a()</code></td>
        <td>函数调用运算符</td>
        <td><a href="#/ch03/function_definition?id=函数调用运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>a[]</code></td>
        <td>下标运算符</td>
        <td><a href="#/ch04/array/README?id=下标运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>.</code></td>
        <td>成员运算符</td>
        <td><a href="#/ch04/struct/struct_usage?id=成员运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>-></code></td>
        <td>指针成员运算符</td>
        <td><a href="#/ch04/list/list_construct?id=指针成员运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td rowspan="15">&#10229;<br> 从右向左</td>
        <td rowspan="15">3</td>
        <td><code>++a</code></td>
        <td>前缀自增运算符</td>
        <td><a href="#/ch02/part2/incdec_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>--a</code></td>
        <td>前缀自减运算符</td>
        <td><a href="#/ch02/part2/incdec_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>+a</code></td>
        <td>一元加运算符</td>
        <td>主要用于执行算术类型转换。</td>
    </tr>
    <tr>
        <td><code>-a</code></td>
        <td>一元减运算符</td>
        <td>相当于 <code>0-a</code>，并执行算术类型转换。</td>
    </tr>
    <tr>
        <td><code>!</code></td>
        <td>逻辑非运算符</td>
        <td><a href="#/ch02/part2/logical_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>~</code></td>
        <td>取反运算符</td>
        <td><a href="#/ch02/part2/bit_operator?id=取反运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>(type)</code></td>
        <td>C 风格转型运算符</td>
        <td><a href="#/ch02/part2/other_operator?id=类型转换运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>*a</code></td>
        <td>解地址运算符</td>
        <td><a href="#/ch04/pointer/pointer?id=取地址与解地址" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>&amp;a</code></td>
        <td>取地址运算符</td>
        <td><a href="#/ch04/pointer/pointer?id=取地址与解地址" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>sizeof</code></td>
        <td>sizeof 运算符</td>
        <td><a href="#/ch02/part2/other_operator?id=sizeof-运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>co_await</code></td>
        <td>await 运算符</td>
        <td>用于协程，暂停当前协程的执行，直至可等待体返回。</td>
    </tr>
    <tr>
        <td><code>new</code></td>
        <td>new 运算符</td>
        <td><a href="#/ch04/list/storage_duration?id=动态存储期" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>new[]</code></td>
        <td>new[] 运算符</td>
        <td><a href="#/ch04/list/arr_new_del" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>delete</code></td>
        <td>delete 运算符</td>
        <td><a href="#/ch04/list/storage_duration?id=动态存储期" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>delete[]</code></td>
        <td>delete[] 运算符</td>
        <td><a href="#/ch04/list/arr_new_del" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td rowspan="21">&#10230;<br> 从左向右</td>
        <td rowspan="2">4</td>
        <td><code>.*</code></td>
        <td>直接成员指针运算符</td>
        <td>杂项</td>
    </tr>
    <tr>
        <td><code>->*</code></td>
        <td>间接成员指针运算符</td>
        <td>杂项</td>
    </tr>
    <tr>
        <td rowspan="3">5</td>
        <td><code>a*b</code></td>
        <td>乘法运算符</td>
        <td><a href="#/ch02/part2/arithmetic_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>a/b</code></td>
        <td>除法运算符</td>
        <td><a href="#/ch02/part2/arithmetic_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>a%b</code></td>
        <td>模运算符</td>
        <td><a href="#/ch02/part2/arithmetic_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td rowspan="2">6</td>
        <td><code>a+b</code></td>
        <td>加法运算符</td>
        <td><a href="#/ch02/part2/arithmetic_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>a-b</code></td>
        <td>减法运算符</td>
        <td><a href="#/ch02/part2/arithmetic_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td rowspan="2">7</td>
        <td><code><<</code></td>
        <td>左移运算符</td>
        <td><a href="#/ch02/part2/bit_operator?id=左移运算符和右移运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>>></code></td>
        <td>右移运算符</td>
        <td><a href="#/ch02/part2/bit_operator?id=左移运算符和右移运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td>8</td>
        <td><code><=></code></td>
        <td>三路比较运算符</td>
        <td>若左侧大于右侧，返回“正数”，反之返回“负数”；相等返回“零”。</td>
    </tr>
    <tr>
        <td rowspan="4">9</td>
        <td><code><</code></td>
        <td>小于运算符</td>
        <td><a href="#/ch02/part2/comparison_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code><=</code></td>
        <td>小于等于运算符</td>
        <td><a href="#/ch02/part2/comparison_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>></code></td>
        <td>大于运算符</td>
        <td><a href="#/ch02/part2/comparison_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>>=</code></td>
        <td>大于等于运算符</td>
        <td><a href="#/ch02/part2/comparison_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td rowspan="2">10</td>
        <td><code>==</code></td>
        <td>等于运算符</td>
        <td><a href="#/ch02/part2/comparison_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>!=</code></td>
        <td>不等于运算符</td>
        <td><a href="#/ch02/part2/comparison_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td>11</td>
        <td><code>a&amp;b</code></td>
        <td>逐位与运算符</td>
        <td><a href="#/ch02/part2/bit_operator?id=逐位与运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td>12</td>
        <td><code>a^b</code></td>
        <td>逐位异或运算符</td>
        <td><a href="#/ch02/part2/bit_operator?id=逐位异或运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td>13</td>
        <td><code>a|b</code></td>
        <td>逐位或运算符</td>
        <td><a href="#/ch02/part2/bit_operator?id=逐位或运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td>14</td>
        <td><code>&amp;&amp;</code></td>
        <td>逻辑与运算符</td>
        <td><a href="#/ch02/part2/logical_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td>15</td>
        <td><code>||</code></td>
        <td>逻辑或运算符</td>
        <td><a href="#/ch02/part2/logical_operator" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td rowspan="14">&#10229;<br> 从右向左</td>
        <td rowspan="14">16</td>
        <td><code>a?b:c</code></td>
        <td>条件运算符</td>
        <td><a href="#/ch02/part2/other_operator?id=条件运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>throw</code></td>
        <td>throw 运算符</td>
        <td>用于异常处理，抛出异常或者重抛异常</td>
    </tr>
    <tr>
        <td><code>co_yield</code></td>
        <td>yield 运算符</td>
        <td>用于协程，暂停执行并返回值</td>
    </tr>
    <tr>
        <td><code>=</code></td>
        <td>简单赋值运算符</td>
        <td><a href="#/ch02/part2/assignment_operator?id=简单赋值运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>+=</code></td>
        <td>加法复合赋值运算符</td>
        <td><a href="#/ch02/part2/assignment_operator?id=复合赋值运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>-=</code></td>
        <td>减法复合赋值运算符</td>
        <td><a href="#/ch02/part2/assignment_operator?id=复合赋值运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>*=</code></td>
        <td>乘法复合赋值运算符</td>
        <td><a href="#/ch02/part2/assignment_operator?id=复合赋值运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>/=</code></td>
        <td>除法复合赋值运算符</td>
        <td><a href="#/ch02/part2/assignment_operator?id=复合赋值运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>%=</code></td>
        <td>模复合赋值运算符</td>
        <td><a href="#/ch02/part2/assignment_operator?id=复合赋值运算符" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code><<=</code></td>
        <td>左移复合赋值运算符</td>
        <td><a href="#/ch02/part2/bit_operator?id=复合赋值运算符的扩充" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>>>=</code></td>
        <td>右移复合赋值运算符</td>
        <td><a href="#/ch02/part2/bit_operator?id=复合赋值运算符的扩充" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>&amp;=</code></td>
        <td>逐位与复合赋值运算符</td>
        <td><a href="#/ch02/part2/bit_operator?id=复合赋值运算符的扩充" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>^=</code></td>
        <td>逐位异或复合赋值运算符</td>
        <td><a href="#/ch02/part2/bit_operator?id=复合赋值运算符的扩充" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td><code>|=</code></td>
        <td>逐位或复合赋值运算符</td>
        <td><a href="#/ch02/part2/bit_operator?id=复合赋值运算符的扩充" target="_blank">说明</a></td>
    </tr>
    <tr>
        <td>&#10230;<br> 从左向右</td>
        <td>17</td>
        <td><code>,</code></td>
        <td>逗号运算符</td>
        <td><a href="#/ch02/part2/other_operator?id=逗号运算符" target="_blank">说明</a></td>
    </tr>
</tbody>
</table>
</div>

## 注释

1. 条件表达式的 `?` 和 `:` 之间如同视有小括号，不考虑优先级；
2. sizeof 表达式的操作数不能是 C 风格转型；
3. 以下运算符没有列入表中，因为它们不存在优先级和结合方向：
   - `const_cast`
   - `static_cast` 
   - `dynamic_cast` 
   - `reinterpret_cast` 
   - `typeid` 
   - `sizeof...` 
   - `noexcept` 
   - `alignof`  
