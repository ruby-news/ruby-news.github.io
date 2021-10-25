---
active: "articles"
layout: article

title: "Parallel Testing with Ractors"
description: "Parallel Testing with Ractors"
file: "Parallel Testing With Ractors"
preview_image: "main.jpg"
tags: Rubygems
author: 'ruby_news'

###########################################
preview_full_background: false
preview_blur: true
article_preview_blur: true
round_borders: false
---

###### Parallel Testing With Ractors
Test Execution Strategies
Introduction to Ractors
Build a Test Framework
Parallelize with Ractors
Highlights

##### Test Execution Strategies
Tests are snippets of codes that we organize and run. It's doesn't matter if we are using mini-test where the blocks are test methods, or if we are using rspec where the blocks are regular Ruby blocks.
They are just pieces of code that we can just execute.
Some tests can take a very long time to run while some can take less time. Running them on a single core can take a lot of time and patience. So it makes more sense to utilize multiple cores of a system to execute the tests faster.
It's where parallelizing tests come into play. The idea is you put the tests on different CPU (let's say different cores) and utilize the benefit of multitasking.
To let our tests run on multiple CPU, there are several clever approaches we can take to address this issue.

######  1. Groups
Let's consider the first strategy where:
+ We divide the tests into different groups.
+ We then figure out the test we want to run and we then randomize the test into groups.
+ Our randomized groups are assigned to different CPU.
+ We run the tests on the assigned CPU.

![execution strategy](/post_images/2021-10-25/execution strategy 1 - groups.jpg)

But the drawback of such is that it doesn't guarantee even distribution in terms of the time it takes to run the tests.

![Utilities and Reporting](/post_images/2021-10-25/execution strategy 1 - cpu.jpg)

In this case, CPU 1 can complete the tasks (highlighted with green) quicker while CPU 2 can take much more time to finish off all the time-consuming tasks (highlighted in blue).
So here CPU 1 gets a little bit luckier and spends most time sleeping instead of speeding up our parallel tests.
On the other hand, CPU2 is loaded with tasks.
Therefore, we can say execution strategy with groups is not efficient when it comes to parallelizing our tasks.

###### 2. Queue
Execution strategy #2 tries to address the issue by using the queue mechanism. In this strategy:

+ We first figure out which tests to run.
+ We then randomize and organize tests in a queue.
+ Our workers or CPUs can take items from the queue as soon as they complete the previous tasks.

![execution strategy](/post_images/2021-10-25/strategy - queue.gif)

In this case, each CPU is taking the job when they are finished with their given tasks.

But the problem is that Ruby didn't have the support to take advantage of the different CPU we have.
Rails had *minitest* plugin which used `Process.fork()` to fork new child processes which will run in parallel.
But to share the memory location ruby used DRb gem, which used the internal core Ruby classes to fork process and manage tasks.

###### 3. Ractors
Ruby 3.0 now has Ractor. Let's see if it can perform any better than forking process.

To create a new Ractor, we can just use it like any other Ruby object:

```ruby
worker = Ractor.new do
    item = Ractor.receive
    process(item)
end
```

Here we are creating a worker which receives an item with `Ractor.receive()`, and we are doing some operations on that.

To send any information to the Ractor and use `.take()` to wait until the worker is done and return the value. For example:

```ruby
worker.send({ important: 'information' })
worker.take
```

Let's consider a more involved example!

```ruby
queue = Array(0..99)
results = []

workers = 10.times.map {
    Ractor.new do
        while true
            number = Ractor.receive
            Ractor.yield(number * 5)
        end
    end
}

workers.each { |w| w.send(queue.pop) }
until queue.empty?
    idle_worker, result = Ractor.select(*workers)
    results << result
    idle_worker.send(queue.pop)
end

workers.each { |w| results << w.take }

p results
```

Here in the Ractor we are getting a number, and returning the number multiplied by 5.
This program is fairly simple, but if you have a lot of items in the array, in a task manager you can see ruby is using significantly more CPU.

This is the way we were looking, which can speed up our tasks significantly.

##### Test Frameworks

Let's take a look at how test frameworks work to build one and parallelize it.
We can divide them into three areas of concern:

1. Execution: Defines how to organize all of the pieces of tests, how to create a queue and dispatch the work to different parallel workers.
2. Utility and Syntax: This is how to test our application code. Do we use assertions, expectations, are there marks and stubs available?
3. Reporting: How do we display information to the user?


###### Execution
![execution strategy](/post_images/2021-10-25/Test Frameworks - Execution.jpg)

+ Just regular classes in minitest. So we can just require the file under the test folder to be able to load them.
+ We should be able to keep track of them to be able to reference them later.
+ We should also be able to loop through each one of the test classes but also run each one of the tests defined in them.

###### Utilities
![utilities](/post_images/2021-10-25/Test Frameworks - Utilities.jpg)

+ Define the Syntax: Now if we zoom inside a specific test we start getting into how do we verify that our application code works? So we start with assertions and how we define the syntax to be able to write our tests.
+ Assist Execution Flow: It needs to assist with the execution flow as well, so if an assertion fails, there's no point in continuing to run that test, mark it as a failure, and move on to the next test we have to run.
+ Delegate Information: It needs to save information about failures and any other statistics we like to display that to the user.
+ Provide Helpers: It can provide any helpers, like mocks, stubs, date helpers, etc.

###### Reporting
![reporting](/post_images/2021-10-25/Test Frameworks - Reporting.gif)

Reporting needs to display the progress to the user so the user knows how many tests are running.
It also needs to display the aggregated results about the assertions, failures, etc.

##### Implementing
To implementing parallel testing, let's first consider these cases:

+ How do we keep track of the classes?
+ How do we model our test queue?

Ruby has exactly what we need! We can create a class method called inherited in a class, ruby is going to invoke that for us everything something inherits from the class!
So we can define that all the tests need to inherit from our base class and Ruby invokes this callback for us, and we can just save the class that has inherited our base class in an Array which is already enough to keep track of all of the test classes we require.
For example:

```ruby
module TestFramework
    class Test
        class << self
            def inherited(child)
                classes << child
            end

            def classes
                @classes ||= []
            end
        end
    end
end
```

Now when it comes to modelling our test queue,
we are saving the test classes but we know that each one of them can define multiple tests that can have different test methods.

![execution](/post_images/2021-10-25/Test Frameworks - Execution.jpg)

So we need each one of these test methods to become an individual item in our queue.
We need something that looks kind of like this:

```ruby
[
    [PostTest, :test_author],
    [PostTest, :test_title],
]
```

An array of tuples where each tuple is composed of the test that we want to run and the class it belongs to.


![execution](/post_images/2021-10-25/Test Frameworks - Executions.gif)

Here we have the list of classes we can try to remap them and build the queue in the format that we are expecting.

So we remap each one of the classes and for each class, we are going to list all of the available instance_methods and `false` ignores inherited methods. And then we are going to filter them out based on whether they begin with `test` or not - because we are just interested in the test methods.
When we have the test methods, we can return the class and the method name for what we are exactly expecting for our queue.

We also need to take each one of the entries and execute them.
We begin by creating a test class, we are receiving from the queue. This is very important for isolation, so if each one of the tests runs on a separate instance then we don't have to worry about changing instance variables or any data inside the test, they are going to be isolated.

And with the instance, we can invoke methods to define each one of the steps for running a single test.

![execution](/post_images/2021-10-25/Test Frameworks - Execution - method calls.jpg)

Here we are:

+ Setup in the beginning
+ Dynamically dispatch the method names we received from the queue
+ Teardown to finalize the test

This is enough for the basic execution. So let's build assertions.

##### Assertions
The most basic assertion is just knowing if something is truthy and falsey.
There are only true possibilities:

1. Either the test passes and it's truthy in this case we want to continue running our test
2. The test fails and it's falsey and we save information about the failure, maybe using a Reporter that gathers the summary of all failed tests in the end. And then skip to the next item in the queue.

So this is what it looks like in code:

```ruby
# lib/test_framework/test

module TestFramework
    class Test
        def assert(something, failure_message = nil)
            TestFramework.reporter.increment_assertions

            return if something

            failure_message ||= "Expected #{something} to be truthy"
            TestFramework.reporter.register_failure(self, failure_message)
            raise AssertionFailed
        end
    end
end
```

We begin the assert method by incrementing the total number of assertions. If it's truthy we return it, and if we fail we set the failure, and also `raise AssertionFailed` error. Finally, we will be able to skip to the next item in the queue so we can raise the custom error class that we control to rescue it to the higher level and move on to the next item in the queue. For each one of the failures, we can print `F` or just print `.` if the test passes.

A few more statistics we can add if we go back to our execution steps, after we have the instance we can begin by incrementing the total number of tests.
We know that for each of these items in the queue we are running an individual test. We can the total number that we ran as we end execution.

![utilities and reporting](/post_images/2021-10-25/Test Frameworks - Utilities and Reporting final.jpg)

###### Executing
We begin by requiring each one of the files under test, and we can loop through each one of our test queues, and for each one of them we'll take the class and method name and we will run the execution flow that we defined.
As we go through the queue we know that we are going to be populating our reporter with information about the test in our singleton reporter, so at the end, we can print the summary. The singleton instances have the entire information about our tests.

![execution](/post_images/2021-10-25/Test Frameworks - Execution 3.jpg)

This is enough for a very simple execution. But we are interested in parallelizing it.

Here we will build an array of examples, and shuffle them to randomize them.

Then we are going to create a worker pool of ractors and then execute the methods:

```ruby
Dir["#{Dir.pwd}/test/**/*_test.rb"].each(&method(:require))

queue = TestFramework::Test.examples_list.shuffle

require 'etc'
workers = Array(0...Etc.nprocessors).map do
    Ractor.new do
        loop do
            klass, method_name = Ractor.receive
            klass.run(method_name)
        end
    end
end

workers.each { |x| w.send(queue.pop) }

until queue.empty?
    idle_worker, _ = Ractor.select(*workers)
    idle_worker.send(queue.pop)
end
```

But the biggest problem is we can't run this code! We will get:

```
can not access instance variables of classes/modules from non-main Ractors (Ractor::IsolationError)
```

This is coming from our singleton reporter instance.
So we need to find a different way of aggregating information that doesn't involve class variables.
One possible way of achieving this is:

```ruby
Dir["#{Dir.pwd}/test/**/*_test.rb"].each(&method(:require))

queue = TestFramework::Test.examples_list.shuffle

require 'etc'
workers = Array(0...Etc.nprocessors).map do
    Ractor.new do
        loop do
            klass, method_name = Ractor.receive
            Ractor.yield klass.run(method_name)
        end
    end
end

workers.each { |x| w.send(queue.pop) }

until queue.empty?
    idle_worker, temp_reporter = Ractor.select(*workers)
    reporter << temp_reporter
    idle_worker.send(queue.pop)
end

workers.each { |w| reporter << w.take }
```

And now we can run tests in parallel!

---

If you have followed along so far, you might also be interested in a <a href="https://github.com/vinistock/loupe"><span style="color:#f55">Rubygem called Loupe</span></a> .
This gem allows you to parallelize your tests easily! For more info, please <a href="https://github.com/vinistock/loupe">follow this GitHub link</a>!

###### Please Let us know your thoughts below!
