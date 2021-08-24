---
active: "articles"
layout: article
date: 2021-08-23 10:20:00

title:  "TypeProf: Abductive Reasoning for Abstract Interpretation"
description: "TypeProf is a Ruby interpreter that abstractly executes Ruby programs at the type level, acting as a new type analysis tool"
file: "TypeProf-Abductive-Reasoning-for-Abstract-Interpretation"
preview_image: "ruby-typeprof.png"
tags: Ruby TypeProf
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

<img width="250" src="/post_images/2021-08-23/ruby-typeprof-2.png">

> *When I see a bird that walks like a duck and swims like a duck and quacks like a duck, I call that bird a duck* - **Heim, Michael. Exploring Indiana Highways**

TypeProf is a Ruby interpreter that abstractly executes Ruby programs at the type level. It executes a given program and observes what types are passed to and returned from methods and what types are assigned to instance variables. All values are, in principle, abstracted to the class to which the object belongs, not the object itself.

<pre><code>class User
  def initialize(name:, age:)
    @name, @age = name, age
  end
  attr_reader :name, :age
end

# A test case to tell TypeProf what types are expected by the class and methods
User.new(name: "John", age: 20)
</code></pre>

Result:

<pre><code>$ typeprof -v test.rb
# Classes
class User
  attr_reader name : String
  attr_reader age : Integer
  def initialize : (name: String, age: Integer) -> [String, Integer]
end
</code></pre>

##### Abstract values

TypeProf abstracts almost all Ruby values to the type level, with some exceptions like class objects. To avoid confusion with normal Ruby values, we use the word "abstract value" to refer the values that TypeProf handles.

TypeProf handles the following abstract values.
* Instance of a class
* Class object
* Symbol
* untyped
* Union of abstract values
* Instance of a container class
* Proc object

Instances of classes are the most common values. A Ruby code `Foo.new` returns an instance of the class `Foo`. This abstract value is represented as `Foo` in the RBS format, though it is a bit confusing. The integer literal `42` generates an instance of `Integer` and the string literal "str" generates an instance of `String`.

##### Limitations

Some Ruby language features cannot be handled because they abstract values.

Basically, it ignores language features whose object identity is important, such as singleton methods for general objects. Note that class method definitions are handled correctly; class objects are not abstracted for the sake. Currently, TypeProf only handles instance methods and class methods; it has no general concept of metaclasses (a class of a class).
Meta programming is only partially supported.

* `Module#attr_reader` and `Object#send` handle correctly only when symbol abstract value is passed (for example, when written in a symbol literal).
* `Kernel#instance_eval` only supports the function to replace the receiver object when a block is passed (the contents of the string are not tracked).
* `Class.new` is not supported; it always returns untyped.
* `Kernel#require` has a dedicated support only when the argument string is a literal.

Read more by the [Link to Github](https://github.com/ruby/typeprof)

###### Please Let us know your thoughts below!
