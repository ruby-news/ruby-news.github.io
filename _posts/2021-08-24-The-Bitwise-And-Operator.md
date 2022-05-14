---
active: "articles"
layout: article
date: 2021-08-24 10:20:00

title:  "Demystifying the Bitwise AND Operator"
description: "Bitwise AND Operator in Ruby"
file: "Bitwise AND Operators in Ruby"
preview_image: "bitwise-and.jpg"
tags: August2021
author: 'Sourav Goswami'
author_image_link: 'https://avatars.githubusercontent.com/u/37468605?v=4'


###########################################
#
# Allows you to control behaviour on the index page cards
# > Background shown on index page as list, default: true
# > Blurring is only shown when full_background is set to false
#    and the image doesn't fit the card. This is helpful for
#    preview images with transparent background
#    default: true
preview_full_background: false
preview_blur: true


# Allows you to control behaviour on the article page
# > Background shown on index page as list
# > Blurring is only shown when full_background is set to false,
#    and the image doesn't fit the grid
#    article_full_background: false
# > round_borders allows you to round the border of the home image,
#    defualts to false
article_preview_blur: true
round_borders: false
---

### Introduction to the Bitwise AND - &
Bitwise AND operation is denoted by `&`. In Ruby, it's a method on Integer objects.
It has a very wide application and it's used by colour parsers and Linux chmod command for example as we will see later.
You can write minimal lines of code for impressive results!

For starters, the operator works like this:

| A | B | A & B |
|---|---|--------|
| 0 | 0  | 0       |
| 0 | 1  | 0       |
| 1 | 0  | 0       |
| 1 | 1  | 1       |

As you can see, it will be true (1) only when both of the bits are true.

### Some examples in Ruby

```ruby
5 & 6          # => 4
35 & 22        # => 2
50 & 12        # => 0
100 & 1        # => 0
101 & 1        # => 1
5023 & 1       # => 1
1 & 100        # => 0
1 & 101        # => 1
1 & 5023       # => 1
```

Now let's take a look at the first example:
5 & 6
If you translate each digit to binary, you get:

```ruby
5.to_s(2)    # => "101"
6.to_s(2)    # => "110"
```

That means:

```
  101
& 110
  ---
  100
```

See, how a zero makes the whole column zero? Anyways, we get 100 in binary, which is 4. So `5 & 6` is 4.

Here's another example:

35.digits(2).reverse.join # => "100011"
22.digits(2).reverse.join # => "10110"

That means:

```
  100011
& 010110
  ------
  000010
```

As you can see, if we have a shortage of digits, we add zeroes to the left. Here we get 10, which is 2 in decimal.

### How can Bitwise AND be Helpful?
Well, there is a tonne of practical applications for bitwise AND. Let's take a look at some day-to-day cool usages of AND operator.

#### Usage 1: Finding Odd or Even number in The most Performant Way
You can detect if a number is odd or even with bitwise AND! For example:

```ruby
200 & 1 == 1    # => false
201 & 1 == 1    # => true
```

How does this work? Well, let's explore!

200 to binary is 11001000 and  1 is always 1! So we are extracting the last bit and performing our operation:

```
11001000
00000001
--------
00000000
```

As you can see, the output is just 0, which is also 0 in binary. So 200 & 1 == 0 is true, but 200 & 1 == 1 is false.

Take a look at the second example:

```ruby
201 & 1 == 1 # => true
```

201 in binary is 11001001, and we are getting the last 1 & 1, which is 1. In this case, it will return 1.

Now the more numbers you try, the more convinced you get that all the odd numbers, when translated to binary have 1 at the end.
Not convinced? Try it yourself: `1000.times.map { |x| x.digits(2)[0] }`

BTW, this operator is only one instruction in C level for example.
If you use N % 2 instead of 5 & 1, you are performing a division operation, and then working with the remainder, which is a wastage of computational power.
This doesn't matter for a small list of numbers, but if you do data science and such, you want this. Also, in Arduino, and other low-level code, you might use & instead of %.

Did you know that Ruby also has `Integer.odd?()` and `Integer.even?()` methods?
Both of the odd and even methods run `Fixnum & 2` in this case because Fixnum always has object_id of odd.
So in this example, `201.object_id & 2` will return 2, but `200.object_id & 2` will return 0. Same for all odd and even Fixnums!

#### Usage 2: Parse Hex Colours
We all know about hex colours. They are syntactically sugary. For starters, a hex colour looks like this:


+ <span style="color:#ff00aa">#ff00aa</span>
+ <span style="color:#ffaa00">#ffaa00</span>
+ <span style="color:#00aa00">#00aa00</span>
+ <span style="color:#5555ff">#5555ff</span>
+ <span style="color:#ff00ff">#ff00ff</span>

Take a look at the very first hex colour we gave.
The first 2 letter pairs are the red, the 2nd two pairs are green, the final pairs are blue:

<span style="color:#f00">Red is ff</span>

<span style="color:#0f0">Green is 00</span>

<span style="color:#00f">Blue is aa</span>

Now, what are those ff, 00, aa? Well, they are hexadecimal characters.
In Ruby, if you write `0xff`, you get 255. Similarly `0x00` gives you 0, and `0xaa` gives you 170.

Combine the red with the green and blue, and you get <span style="color:#f0a">this nice looking hot pink color!</span>

Now we want to create an object method in Ruby, or maybe a proc, lambda or even a stabby lambda that would return us the RGB values from a hex string, how might you do that?

For example, if I give your method `0x3ce3b4` as integer, you have to return me an array: `[60, 227, 180]`...
Do you know the trick? Well, here bitwise AND comes handy again.

Let's give it a try for a moment without any String conversion (tip, it also requires some division). If you can't solve it, read on...

Well, so my solution looks like this:

```ruby
def rgb(col) [255 & col / 65536, 255 & col / 256, 255 & col] end
```

Now you can pass this method any colour, and it will happily return the RGB as an array:

```ruby
rgb(0x3ce3b4)        # => [60, 227, 180]
rgb(0xffaa00)        # => [255, 170, 0]
rgb(0xff5555)        # => [255, 85, 85]
rgb(0x0)             # => [0, 0, 0]
rgb(0xffffff)        # => [255, 255, 255]
rgb(0x00ffffff)      # => [255, 255, 255]
rgb(0xff00ffffff)    # => [255, 255, 255]
```
As you can see, it will work even for invalid colours because 255 & col, for example, will clamp it to 255.
You can also pass this method an integer colour directly. For example, 0 will give you black, 16732326 (0xff50a6) will give you hot pink, that's what we are doing here as well.
But nobody uses decimal colours because it's hard to imagine, how on earth do you know `16732326` is `0xff50a6`, which is `255` <span style="color:#f55">red</span>, `80` <span style="color:#0a0">green</span>, and `166` <span style="color:#55f">blue</span>?

#### Usage 3: Getting File Modes
Now it also becomes handy when you want to calculate Linux's octal permissions. They work much like hex but in octal.

If you ever used the `chmod` command, you have probably used the command `chmod 755 file` to make the file executable + writable + readable to the user,
but executable + readable to group and others.

But do you know how to parse it?

Well, it becomes very simple with the `&` operator.

For this example:

+ Let's create a file called `file`, and run `chmod 754 file`. Check the mode of the file in Ruby:

```ruby
File.stat('file').mode    # => 33260
```

As you can see, the mode is 33260, but it's actually 754, so what's going on. Well, the mode is actually in octal.
To convert to octal, you can run

```ruby
33260.to_s(8)    # => 100754
```

Ignore the sticky bits 100, and let's concentrate on 754. We can still extract it with string. But we can also use our bitwise AND and division skills to extract them:

```ruby
7 & 33260 / 64    # => 7    # For owner
7 & 33260 / 8     # => 5    # For group
7 & 33260         # => 4    # For others
```

Isn't this magical?

You might be wondering why we are dividing by 64.
Well, in decimal we use 1000, 100, 10, 1
If we had 9876 in decimal, and we wanted to extract the first 9, we would divide it by 1000.
To obtain 8, we will divide it with 100 and % 10 - % 10 because we can't do 98 & 10 in decimal to get the correct result!

Similarly in octal, the first digit is the multiplication of `64`, the second one is of `8`, and the 3rd field is of `1`.
`7` is `111`, so it extracts the last `3` bits from the number as we saw in the hex example, which used `255` (`11111111`) instead.

#### Usage 4: Parse Linux Octal Permissions

In the previous example, we just saw how to get the permissions for owner, group and all other users in a system with `File.stat('file').mode`, and bitwise AND.

Now let's see, how we can know if the owner has read, write or executable permissions!

Wait a second... Doesn't Ruby already have `File.readable?('file')`, `File.writable?('file')`, `File.executable?('file')`?

Yes, true. But what if we want to check if the group has the permissions? Well in our previous example, we say we have `5` for groups.
In octal this means 1 + 0 + 4 => 5. As you can see, we only allow execute + read, writing to the file isn't permitted.

To parse this, we can again, use our bitwise AND operator:

```ruby
modes = File.stat('file').mode

owner = 7 & modes / 64    # => 7    # For owner
group = 7 & modes / 8     # => 5    # For group
others = 7 & modes        # => 4    # For others

# Group has permission 5, this means it's executable and readable, but not writable
group_execute = 1 & group != 0    # => true
group_write = 2 & group != 0      # => false
group_read = 4 & group != 0       # => true
```

It means that the group can read and write, but not execute. That’s how the bits are usually extracted using the bitwise AND operator! Imagine how much line of `if` condition or `switch case` it saves!

---

### Final thoughts

The Bitwise AND operator is truly magical. It can save you a lot of lines of code if you know about it.
On the other hand, this operator is very fast as we discussed in our odd-even example.

So that's all about bitwise AND, we will soon have articles about other Bitwise operators and their cool usages.
Feel free to check our other guides, and leave a comment.
Don't forget to subscribe to our newsletter for other weekly cool tips and tricks in Ruby!
