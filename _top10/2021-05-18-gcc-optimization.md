---
active: "articles"
layout: article
date: 2021-05-18 10:22:58 +0530

title:  "How to Make Ruby Fast with GCC Optimization"
description: "Make Ruby Fast with GCC Optimization"
file: "gcc-optimization"
preview_image: "main.jpg"
tags: Ruby Optimization GCC
author: 'Ruby News'
---

<initial>R</initial>uby is quite fast compared to Python or Perl:

[Which language is faster, Python or Ruby?](https://www.quora.com/Which-language-is-faster-Python-or-Ruby/answer/Sourav-Goswami-17)

But if you are using Linux, chances are you are using Ruby built by someone else for x64 processors. x64 means AMD + Intel + some other russian or chinese processors that you have never heard of before. The binary from the Linux repo is not native to your own system, and you likely compromise performance in the name of platform independence, which you don't even need.

So to make ruby working faster, you can built it yourself for your system, will just take < 20 MB internet and 10 minutes of your precious time.

Easiest way: Compile Original Ruby for Native Binary

It takes 3 - 5 minutes to compile Ruby. To compile Ruby:

#### 1. Install packages

Arch:
<pre><hash>pacman -S gcc base-devel make git autoconf ncurses gdbm openssl libffi libyaml gmp zlib</hash></pre>

Debian:
<pre><hash>apt install gcc build-essential make git autoconf openssl</hash></pre>

You can also use Clang instead of GCC, but that slowed down Ruby a little bit in my careful benchmark!

#### 2. Download Ruby
[https://cache.ruby-lang.org/pub/ruby/](https://cache.ruby-lang.org/pub/ruby/)

Get a tarball for small file size :)

Just a Tips: Faster Build

It's not a necessity, just a suggestion...

Move it to /tmp/ (or any other ramdisk you have) directory for faster read/write. Ruby is quite small, and will fit in < 300 - 400 MB RAM space.

#### 3. Decompress
<pre><hash>tar -xvf ruby-major_ver-minor_ver-teeny_ver.tar.xz</hash></pre>

#### 4. Configure
cd into the decompressed directory.

Run `autoconf`

Then run:

<pre><dollar>./configure optflags="-O3 -pipe -fno-plt -march=native -mtune=native"</dollar></pre>

Run `make test` to check if everything is expected to work fine or not...

You can also specify the compiler to the CC environment variable, for example CC=clang / CC=gcc / CC=icc / CC=zapcc etc.

#### ⚠️⚠️⚠️ Warning!

<grid-2>
  Using different flags like -ffast-math or -Ofast will make ruby fail to round numbers, say 3.14159.round(2) will return 3.139999999999999.
  <img src="/assets/posts/images/3/ffast-math.jpg">
</grid-2>

<grid-2>
  <img src="/assets/posts/images/3/ffast-math-rails.jpg">
  Here's how Rails looks after using Ofast optimization level! 🤦‍♂️🤦‍♂️
</grid-2>

This can be problematic! Don't go beyond `-O3` optimization level, you can also use <code>-O2</code> (that's the default) flags if you don't have time to experiment.

#### 5. Build
<pre><hash>make -j$(( $(nproc) * 2 + 1 ))</hash></pre>

This <code>$(( $(nproc) * 2 + 1 ))</code> will return 9 if you have a 4 threaded processor (Hyper Threading or not). It will return 17 on if your CPU has 8 threads.

#### 6. Install
<pre><hash>make install</hash></pre>

You have done installing a faster Ruby on your system! You have access to ruby and ruby's `gem` command.

#### 7. Confirm that Proper Flags are in Use
<pre><dollar>ruby -e "puts RbConfig::CONFIG.then { |x| %Q(\e[1;33mCFLAGS\e[0m => #{x['CFLAGS']}\n\n\e[1;34mCXXFLAGS\e[0m => #{x['CXXFLAGS']}) }"</dollar></pre>

The output should be something like this:

```
CFLAGS => -O3 -pipe -fno-plt -march=native -mtune=native -ggdb3 -Wall -Wextra -Wdeprecated-declarations -Wduplicated-cond -Wimplicit-function-declaration -Wimplicit-int -Wmisleading-indentation -Wpointer-arith -Wwrite-strings -Wimplicit-fallthrough=0 -Wmissing-noreturn -Wno-cast-function-type -Wno-constant-logical-operand -Wno-long-long -Wno-missing-field-initializers -Wno-overlength-strings -Wno-packed-bitfield-compat -Wno-parentheses-equality -Wno-self-assign -Wno-tautological-compare -Wno-unused-parameter -Wno-unused-value -Wsuggest-attribute=format -Wsuggest-attribute=noreturn -Wunused-variable
CXXFLAGS => -g -O2
```

You can ignore the CXXFLAGS, it's for C++, which isn't necessary at all. Ruby is written in C!
But in case of installing gems, this value may be required.

<hr>

#### If you want to create native binary using rvm, follow this:
###### 1. You need RVM first.

###### 2. Add CFLAGS that Should be Passed:
<pre><dollar>CC=gcc CFLAGS="-O3 -pipe -fPIC -fno-plt -march=native -mtune=native" ~/.rvm/bin/rvm install ruby-2.7.1</dollar></pre>

Your RVM Ruby is built with the defined CC and CFlags!

###### 3. Confirm (after installation)
<pre>
  <dollar>~/.rvm/rubies/ruby-2.7.1/bin/ruby -e "puts RbConfig::CONFIG.then { |x| %Q(\n\e[1;33mCFLAGS\e[0m => #{x['CFLAGS']}\n\n\e[1;34mCXXFLAGS\e[0m => #{x['CXXFLAGS']}) }"</dollar>
</pre>

The output will be something like this:

```
CFLAGS => -O3 -pipe -fno-plt -march=native -mtune=native -fPIC
CXXFLAGS => -O3 -pipe -fno-plt -march=native -mtune=native
```

<hr>

Benchmarks

[ source code given after the benchmarks ]

#### Original ruby (Any x64, arch community)

<pre>
  <dollar>sleep 2 ; ruby benchmark.rb</dollar>
  :: Details:
  Ruby Version: 2.7.1 (x86_64-linux)

  CC: gcc
  CFLAGS: -march=x86-64 -mtune=generic -O2 -pipe -fno-plt -fPIC
  --------------------------------------------------------------------------------
  :: Please stop all your apps, perhaps reboot your system, and run the benchmark
  :: Don't even move your mouse during the benchmark for consistent result!
  - Ready?.....................................................................
  CPU Blowfish Test
  :: CPU Blowfish Iteration 1: 0.098s
  :: CPU Blowfish Iteration 2: 0.072s
  :: CPU Blowfish Iteration 3: 0.072s
  :: CPU Blowfish Iteration 4: 0.072s
  :: CPU Blowfish Iteration 5: 0.072s
  :: CPU Blowfish Iteration 6: 0.071s
  :: CPU Blowfish Iteration 7: 0.070s
  :: CPU Blowfish Iteration 8: 0.070s
  :: CPU Blowfish Iteration 9: 0.068s
  :: CPU Blowfish Iteration 10: 0.071s
  Total time taken: 0.736s
  --------------------------------------------------------------------------------
  FPU Test
  :: FPU Math Iteration 1: 0.068s
  :: FPU Math Iteration 2: 0.068s
  :: FPU Math Iteration 3: 0.068s
  :: FPU Math Iteration 4: 0.068s
  :: FPU Math Iteration 5: 0.068s
  :: FPU Math Iteration 6: 0.068s
  :: FPU Math Iteration 7: 0.068s
  :: FPU Math Iteration 8: 0.069s
  :: FPU Math Iteration 9: 0.066s
  :: FPU Math Iteration 10: 0.066s
  Total time taken: 0.677s
  --------------------------------------------------------------------------------
  CPU Fibonacci Test
  :: CPU Fibonacci Iteration 1: 0.126s
  :: CPU Fibonacci Iteration 2: 0.114s
  :: CPU Fibonacci Iteration 3: 0.116s
  :: CPU Fibonacci Iteration 4: 0.113s
  :: CPU Fibonacci Iteration 5: 0.110s
  :: CPU Fibonacci Iteration 6: 0.110s
  :: CPU Fibonacci Iteration 7: 0.111s
  :: CPU Fibonacci Iteration 8: 0.111s
  :: CPU Fibonacci Iteration 9: 0.111s
  :: CPU Fibonacci Iteration 10: 0.112s
  Total time taken: 1.134s
  --------------------------------------------------------------------------------
  CPU Anagram Hunt
  :: CPU Anagram Iteration 1: 0.310s
  :: CPU Anagram Iteration 2: 0.311s
  :: CPU Anagram Iteration 3: 0.309s
  :: CPU Anagram Iteration 4: 0.304s
  :: CPU Anagram Iteration 5: 0.302s
  :: CPU Anagram Iteration 6: 0.302s
  :: CPU Anagram Iteration 7: 0.302s
  :: CPU Anagram Iteration 8: 0.301s
  :: CPU Anagram Iteration 9: 0.303s
  :: CPU Anagram Iteration 10: 0.301s
  Total time taken: 3.045s
  --------------------------------------------------------------------------------
  CPU 8 Million Prime Numbers
  :: Prime Numbers Iteration 1: 1.366s
  :: Prime Numbers Iteration 2: 1.367s
  :: Prime Numbers Iteration 3: 1.365s
  :: Prime Numbers Iteration 4: 1.366s
  :: Prime Numbers Iteration 5: 1.367s
  :: Prime Numbers Iteration 6: 1.370s
  :: Prime Numbers Iteration 7: 1.369s
  :: Prime Numbers Iteration 8: 1.367s
  :: Prime Numbers Iteration 9: 1.368s
  :: Prime Numbers Iteration 10: 1.370s
  Total time taken: 13.675s
  --------------------------------------------------------------------------------
  CPU 3k Pi Digits
  :: 3K Pi Digits Iteration 1: 1.013s
  :: 3K Pi Digits Iteration 2: 0.941s
  :: 3K Pi Digits Iteration 3: 0.907s
  :: 3K Pi Digits Iteration 4: 0.956s
  :: 3K Pi Digits Iteration 5: 0.885s
  :: 3K Pi Digits Iteration 6: 0.932s
  :: 3K Pi Digits Iteration 7: 0.877s
  :: 3K Pi Digits Iteration 8: 0.889s
  :: 3K Pi Digits Iteration 9: 0.903s
  :: 3K Pi Digits Iteration 10: 0.890s
  Total time taken: 9.193s
  --------------------------------------------------------------------------------
  All test time: 28.460000000000004s
</pre>

#### Ruby that I compiled myself

<pre>
  <dollar>sleep 2 ; ruby benchmark.rb</dollar>
  :: Details:
  Ruby Version: 2.7.1 (x86_64-linux)

  CC: clang
  CFLAGS: -O3 -pipe -fPIC -march=native -mtune=native -ggdb3 -Wall -Wextra -Wdeprecated-declarations -Wdivision-by-zero -Wimplicit-function-declaration -Wimplicit-int -Wmisleading-indentation -Wpointer-arith -Wshorten-64-to-32 -Wwrite-strings -Wmissing-noreturn -Wno-constant-logical-operand -Wno-long-long -Wno-missing-field-initializers -Wno-overlength-strings -Wno-parentheses-equality -Wno-self-assign -Wno-tautological-compare -Wno-unused-parameter -Wno-unused-value -Wunused-variable -Wextra-tokens
  --------------------------------------------------------------------------------
  :: Please stop all your apps, perhaps reboot your system, and run the benchmark
  :: Don't even move your mouse during the benchmark for consistent result!
  - Ready?.....................................................................
  CPU Blowfish Test
  :: CPU Blowfish Iteration 1: 0.096s
  :: CPU Blowfish Iteration 2: 0.068s
  :: CPU Blowfish Iteration 3: 0.067s
  :: CPU Blowfish Iteration 4: 0.067s
  :: CPU Blowfish Iteration 5: 0.068s
  :: CPU Blowfish Iteration 6: 0.067s
  :: CPU Blowfish Iteration 7: 0.068s
  :: CPU Blowfish Iteration 8: 0.067s
  :: CPU Blowfish Iteration 9: 0.071s
  :: CPU Blowfish Iteration 10: 0.066s
  Total time taken: 0.705s
  --------------------------------------------------------------------------------
  FPU Test
  :: FPU Math Iteration 1: 0.066s
  :: FPU Math Iteration 2: 0.066s
  :: FPU Math Iteration 3: 0.066s
  :: FPU Math Iteration 4: 0.066s
  :: FPU Math Iteration 5: 0.066s
  :: FPU Math Iteration 6: 0.066s
  :: FPU Math Iteration 7: 0.066s
  :: FPU Math Iteration 8: 0.068s
  :: FPU Math Iteration 9: 0.066s
  :: FPU Math Iteration 10: 0.066s
  Total time taken: 0.662s
  --------------------------------------------------------------------------------
  CPU Fibonacci Test
  :: CPU Fibonacci Iteration 1: 0.145s
  :: CPU Fibonacci Iteration 2: 0.141s
  :: CPU Fibonacci Iteration 3: 0.138s
  :: CPU Fibonacci Iteration 4: 0.138s
  :: CPU Fibonacci Iteration 5: 0.140s
  :: CPU Fibonacci Iteration 6: 0.138s
  :: CPU Fibonacci Iteration 7: 0.142s
  :: CPU Fibonacci Iteration 8: 0.137s
  :: CPU Fibonacci Iteration 9: 0.143s
  :: CPU Fibonacci Iteration 10: 0.143s
  Total time taken: 1.405s
  --------------------------------------------------------------------------------
  CPU Anagram Hunt
  :: CPU Anagram Iteration 1: 0.305s
  :: CPU Anagram Iteration 2: 0.304s
  :: CPU Anagram Iteration 3: 0.305s
  :: CPU Anagram Iteration 4: 0.299s
  :: CPU Anagram Iteration 5: 0.295s
  :: CPU Anagram Iteration 6: 0.298s
  :: CPU Anagram Iteration 7: 0.304s
  :: CPU Anagram Iteration 8: 0.300s
  :: CPU Anagram Iteration 9: 0.297s
  :: CPU Anagram Iteration 10: 0.295s
  Total time taken: 3.002s
  --------------------------------------------------------------------------------
  CPU 8 Million Prime Numbers
  :: Prime Numbers Iteration 1: 1.191s
  :: Prime Numbers Iteration 2: 1.195s
  :: Prime Numbers Iteration 3: 1.196s
  :: Prime Numbers Iteration 4: 1.196s
  :: Prime Numbers Iteration 5: 1.199s
  :: Prime Numbers Iteration 6: 1.200s
  :: Prime Numbers Iteration 7: 1.195s
  :: Prime Numbers Iteration 8: 1.196s
  :: Prime Numbers Iteration 9: 1.197s
  :: Prime Numbers Iteration 10: 1.194s
  Total time taken: 11.959s
  --------------------------------------------------------------------------------
  CPU 3k Pi Digits
  :: 3K Pi Digits Iteration 1: 0.944s
  :: 3K Pi Digits Iteration 2: 0.910s
  :: 3K Pi Digits Iteration 3: 0.905s
  :: 3K Pi Digits Iteration 4: 0.902s
  :: 3K Pi Digits Iteration 5: 0.985s
  :: 3K Pi Digits Iteration 6: 0.920s
  :: 3K Pi Digits Iteration 7: 0.920s
  :: 3K Pi Digits Iteration 8: 0.973s
  :: 3K Pi Digits Iteration 9: 0.906s
  :: 3K Pi Digits Iteration 10: 0.907s
  Total time taken: 9.272s
  --------------------------------------------------------------------------------
  All test time: 27.005000000000003s
</pre>

So it seems like Ruby is running 1.5seconds faster in this benchmark.

27.00 seconds of 28.46 is 94.86%. That means Ruby has become at least 5% faster. For a regular desktop user, it's nothing. For server users, 5% can mean a lot! At least it's running optimized code!

To calculate prime, the optimized takes 11.95 seconds while the unoptimized one takes 13.67 seconds = 12% improvement. For heavy computation, you will be really able to see improvements like this!

Here's a single file that you can Run and benchmark. It only works from Ruby 2.5+:

[https://github.com/Souravgoswami/simple-ruby-benchmark/blob/master/benchmark.rb](https://github.com/Souravgoswami/simple-ruby-benchmark/blob/master/benchmark.rb)

While test like CPU Blowfish doesn't test the Ruby's capability, it's more like your system benchmark! But apart from Blowfish, there are others that can help!

#### Is the hassle worth It?
If you are doing things like running rails, it's not probably worth it. Because
rails doesn't use a lot of computational power to serve users. But if you have
millions of visitors, it's worth the effort

For general computational things, it's really worth the effort. It takes just
20 minutes on my old laptop with i3 6th generation processor. So, if you
care about performance, this is worth it. It might save you minutes on
large computations.

So this is my speed-up tip 🏃‍♂️💨

<hr>
Final Words

This binary, for most cases will be faster than the ruby provided by your
system. It's natively compiled for your system.
That means you and similar or upgraded (backwards compatible)
processors can take this advantage. what `--native` does is,
it utilizes the correct CPU flags from your CPU, can be found at
`/proc/cpuinfo`.
Correctly using CPU flags to compile programs is yet another way to gain
performance for free!

###### Please Let us know your thoughts below!
