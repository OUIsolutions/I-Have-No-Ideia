
Tag23 it's a library for coding inside html, it allows defining conditions, loops and 
easy evaluations of values

In these example we are creating an counter, that uses the **case** and **unless** keywords
to show the value based on colors
[Runable exemple](https://ouisolutions.github.io/OUIsolutions/Tag23/internal/exemples/counter.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Counter</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/Tag23@main/versions/Tag23_v0.1.4.js"></script>
</head>
<body>

<button onclick="a-=1"> Decrement a</button>
<button onclick="a+=1"> Increment a</button>
<br>
<h1 unless="a >= 0" style="color: red;">the value of a is <span print="a"/> </h1>
<h1 case="a >= 0" style="color: blue;" >the value of a is <span print="a"/> </h1>


</body>
</html>
```