---
active: "contribute"
layout: article
date: 2021-05-18 10:22:58 +0530
permalink: /contribute/

title:  "Contribute to Ruby News"
description: "Learn how to Contribute to Ruby News"
file: "contribute"
tags: RubyNews Contribute
author: 'Ruby News'
---

### Welcome to Ruby News Contribution Guide!

<initial>R</initial>uby News is a webiste where we weekly tips, tricks and guides about the Ruby programming language!

Not only this site is open source, but anyone can contribute to Ruby News!

Here in this guide, we are going to take a look at how we can contribute articles to Ruby News.

---

### Writing Article Guide

| Section                                                          |
--------------------------------------------------------|
| [File formats](#1)                                            |
| [Writing a new Post - Front Matter Guide](#2)   |
| [Uploading Images](#3)                                     |
| [Full Markdown Syntax and Tags Guide](#4)       |
| [Uploading Article to Codebase](#5)                 |

---

<h3 id="1">File Formats</h3>
An article can be either in **HTML** or **Markdown** format

##### 1. HTML:
HTML formatting can be easy but it can consume a lot of time becuase all the tags

* HTML files have .html extension.
* HTML documents have opening and closing tags, and sometimes empty tags
* HTML documents can be long compared to markdown

##### 2. Markdown:
We recommend using markdown because:

* Markdown files can have either .md or .markdown extension.
* It's Simple and fast to finish an article in markdown.
* It doesn't need any opening and closing tag.
* Uniform styles are automatically fetched from our codebase.

<h3 id="2">Writing a new Post - Front Matter Guide</h3>
We would prefer markdown files for article creation.

To write a new post:

* Move to the _posts directory
* Create a markdown file with the YYYY-MM-DD-article-title.md format. Some examples:

```
2021-05-18-my-first-article.md
2021-05-18-hello-world.md
2021-05-18-this-is-another-article.md
```

* The file should have a front-matter - front-matters are simple YAML code that determines
  the post title, date, description, the preview image, etc.

  All files should start with this lines of code:

```
---
layout: article
date: 2021-05-18 10:22:58 +0530


title:  "How to Make Ruby Fast with GCC Optimization"
description: "Make Ruby Fast with GCC Optimization"
file: "gcc-optimization"
# link: https://...
preview_image: "main.jpg"
tags: Ruby Optimization GCC
author: 'Ruby News'


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
```

Right, the code is wrapped inside `---`.

###### Let's take a look at the mandatory fields:

1. layout: The `layout` line determines the layout - it's always `article`
2. date: The `date` mentions the date when the article is written.
3. title: The `title` mentions the title of the post, which will be shown in homepage and while sharing the article.
4. description: Description describes the articles in few words.
5. file: The file name! It's actually the filename without the date. For example,
    If your file name is `2021-05-18-hello-world.md`, then your file name is `hello-world`
    If it's not a file, then it could be a hyper link! In that case, clicking on the link will take you to other page in a new browser tab.
6. preview_image: This field determines the image to be shown in the index page! We will soon see where to upload images and assets.
7. tags: `tags` helps you to better categorize your post!
8. author: This field determines the author name. It could be your name.

###### Let's take a look at the non-mandatory fields:

```
preview_full_background: false
preview_blur: true
article_full_background: true
article_preview_blur: true
round_borders: false
```

These fields determines the image styling done on the index page and in your post!
These fields have a default value, and you may or may not include them.

---

<h3 id="3">Uploading Images</h3>
Images are very easy to mess up, and it's hard to track which image belongs to which article - if we have tonnes of unneeded images, we can't find them.

To prevent this situation, we have a very specific way to upload images.
Neverthless, uploading an image is simple, you need to keep these points in mind:

* Go inside post_images
* Create a new directory as the date of your post. For example: `2021-05-18`
* Upload your images.
* To set the preview image, upload the image, and then in the post set preview_image: "main.jpg"

 They have
