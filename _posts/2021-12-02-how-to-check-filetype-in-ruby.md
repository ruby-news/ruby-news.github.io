---
active: "articles"
layout: article

description: "How to check filetype in Ruby"
file: "How to check filetype in Ruby"
preview_image: "libmagic-rb-folder.jpg"
tags: Rubygems
author: 'ruby_news'

###########################################
preview_full_background: false
preview_blur: true
article_preview_blur: true
round_borders: false
---

Unlike Windows systems which uses extensions to distinguish between files, in Unix philosophy
filetype is what used to recognize a file.

In other words, systems like BSD or Linux doesn't depend on the extension to know the type of a file whether it's mp3 or jpg or png, etc.
This is done by a command called `file`, and file uses magic(5) internally.

In Ruby however, there are gems like ruby-filemagic which is dead. There are still forked copy.
But we have created another alive gem called `libmagic_rb`.
It uses magic(5) for detecting the mimetype of a file. The differences between gem and other gems are:

+ It can work with older version of libmagic: libmagic_rb is written for older systems as well as newer system. It supports decade old systems like CentOS or AmazonLinux. It also supports Ruby 1.9+.
+ You can pass various options to libmagic_rb: LibmagicRb (class) can accept various options that are supported by magic(5) during compilation.
+ It's very fast: libmagic_rb is written in Pure C. Apart from C to Ruby datatype convertion, it just does what you are told to do. So checking millions of files isn't a time consuming thing.

Here's how it works!

Let's say you have a file called hello.jpg, here what it can do:

```ruby
require 'libmagic_rb'

LibmagicRb.check(file: 'hello.jpg')  # => "image/jpeg; charset=binary"

LibmagicRb.check(
  file: 'hello.jpg',
  mode: LibmagicRb::MAGIC_RAW
)  # => "JPEG image data, JFIF standard 1.01, aspect ratio, density 1x1, segment length 16, progressive, precision 8, 3072x2036, components 3"
```

It's as easy as that. Using the magic library, it also lets you dig through the EXIF data of the file.

The installation and other details can be found on the [https://github.com/cybergizer-hq/LibmagicRb/](GitHub page for libmagic_rb).
As usual, the gem can be found on [Rubygems.org](https://rubygems.org/gems/libmagic_rb).

###### Please Let us know your thoughts below!
