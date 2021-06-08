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
| [Markdown Cheatsheet](#4)       |
| [Markdown with Specific HTML Tags](#5)       |
| [Uploading Article to Codebase](#6)                 |

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
2. title: The `title` mentions the title of the post. This defaults to the post title, if not provided.
3. description: Description describes the articles in few words. The default is the post title if not provided.
4. file: The file name! It's actually the filename without the date. For example,
    If your file name is `2021-05-18-hello-world.md`, then your file name is `hello-world`
    If it's not a file, then it could be a hyper link! In that case, clicking on the link will take you to other page in a new browser tab.
5. preview_image: This field determines the image to be shown in the index page! We will soon see where to upload images and assets.
6. tags: `tags` helps you to better categorize your post!
7. author: This field determines the author name. It could be your name.

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
* Upload your images
* To set the preview image, upload the image, and then in the post set preview_image: "main.jpg"

---

<h3 id="4">Markdown Cheatsheet</h3>
The articles that you upload should be a markdown, markdown files ends with .md or .markdown extension.

Here's a cheatsheet of markdown from
##### Basic Syntax:

| Element                                                   | Markdown Syntax                                           |
| --------------------------------------------------------- | --------------------------------------------------------- |
| [Heading](</basic-syntax/#headings>)                      | `# H1<br> ## H2<br> ### H3`                               |
| [Bold](</basic-syntax/#bold>)                             | `**bold text**`                                           |
| [Italic](</basic-syntax/#italic>)                         | `*italicized text*`                                       |
| [Blockquote](</basic-syntax/#blockquotes-1>)              | `&gt; blockquote`                                         |
| [Ordered List](</basic-syntax/#ordered-lists>)            | ` 1. First item<br> 2. Second item<br> 3. Third item<br>` |
| [Unordered List](</basic-syntax/#unordered-lists>)        | ` - First item<br> - Second item<br> - Third item<br>`    |

| [Code](</basic-syntax/#code>)                             | ``code``                                                  |
| [Horizontal Rule](</basic-syntax/#horizontal-rules>)      | `---`                                                     |
| [Link](</basic-syntax/#links>)                            | `[title](https://www.example.com)`                        |
| [Image](</basic-syntax/#images-1>)                        | `![alt text](image.jpg)`                                  |

##### Extended Syntax:

<table class="table table-bordered">
  <thead class="thead-light">
    <tr>
      <th>Element</th>
      <th>Markdown Syntax</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="/extended-syntax/#tables">Table</a></td>
      <td><code>
          | Syntax      | Description |<br>
          | ----------- | ----------- |<br>
          | Header      | Title       |<br>
          | Paragraph   | Text        |
      </code></td>
    </tr>
    <tr>
      <td><a href="/extended-syntax/#fenced-code-blocks">Fenced Code Block</a></td>
      <td><code>```<br>
      {<br>
      &nbsp;&nbsp;"firstName": "John",<br>
      &nbsp;&nbsp;"lastName": "Smith",<br>
      &nbsp;&nbsp;"age": 25<br>
      }<br>
      ```
      </code></td>
    </tr>
    <tr>
      <td><a href="/extended-syntax/#footnotes">Footnote</a></td>
      <td><code>
        Here's a sentence with a footnote. [^1]<br><br>

        [^1]: This is the footnote.
      </code></td>
    </tr>
    <tr>
      <td><a href="/extended-syntax/#heading-ids">Heading ID</a></td>
      <td><code>### My Great Heading {#custom-id}</code></td>
    </tr>
    <tr>
      <td><a href="/extended-syntax/#definition-lists">Definition List</a></td>
      <td><code>
        term<br>
        : definition
      </code></td>
    </tr>
    <tr>
      <td><a href="/extended-syntax/#strikethrough">Strikethrough</a></td>
      <td><code>~~The world is flat.~~</code></td>
    </tr>
    <tr>
      <td><a href="/extended-syntax/#task-lists">Task List</a></td>
      <td><code>
        - [x] Write the press release<br>
        - [ ] Update the website<br>
        - [ ] Contact the media
      </code></td>
    </tr>
  </tbody>
</table>

<h3 id="5">Markdown with Specific HTML Tags</h3>
But you can also integrate HTML into markdown!
If you want to align an image with text, you can add this:

##### HTML:
```
<grid-2>
  <div>Column 1</div>
  <div>Column 2</div>
</grid-2>
```

##### Output:
<grid-2>
  <div>Column 1</div>
  <div>Column 2</div>
</grid-2>

You can specifically get grid-2, grid-3 to grid-9, the last one adds 9 grids for example.
This way, you can add text beside images.

Other tags include <pre> with dollar ($) or hash (#) sign, which is not user-selectable while copying codes:

```
<pre><dollar>echo "hello world!"</dollar></pre>

<pre>
  <hash>whoami</hash>
  Root
</pre>
```

##### Output:
<pre><dollar>echo "hello world!"</dollar></pre>

<pre>
  <hash>whoami</hash>
  Root
</pre>

You can also add file names with pre tags:

```
<pre>
  <file>app/javascript/packs/application.js</file>
  require("@rails/ujs").start()
  require("turbolinks").start()
  require("channels")

  require('jquery')
  require('bootstrap')

  import Rails from '@rails/ujs'
</pre>
```

##### Output:

<pre>
  <file>app/javascript/packs/application.js</file>
  require("@rails/ujs").start()
  require("turbolinks").start()
  require("channels")

  require('jquery')
  require('bootstrap')

  import Rails from '@rails/ujs'
</pre>

**Remember to add html tags inside html tags.**

That's it! That's what we have for HTML specific tags.

If you want to add line breaks or you need some specific HTML tags, feel free to use them.

Make sure to close tags properly when required.

---

<h3 id="6">Uploading Article to Codebase</h3>
After you wrote an article, you need to push it to the codebase. For pushing an article to the codebase:

* You can fork the project, and write some articles there:
  + All the articles goes to `_posts/` directory
  + All the images goes to `_images/yyyy-mm-dd/` directory, where the yyyy is your post year, mm is the month and dd is the date.

* If your git skill is a bit rusty, feel free to drag-drop articles to your forked copy of this repo. And send us a Pull Request.

* You will be an author of that article once your contribution is merged by the moderators.
* You don't have to worry SEO and search features, everything is just automatic :)

##### Let us know your thoughts below in the comments!
