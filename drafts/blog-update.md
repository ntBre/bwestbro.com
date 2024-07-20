changequote(`{{', `}}')dnl

# Introduction

If you've been following the blog for a while, you'll know that I don't post
very frequently. At the time of writing this (9 July 2024), my last post was on
12 December 2021. One of the biggest reasons for this is that I haven't come up
with a good pipeline for writing and publishing posts. Each of my blog posts is
simply an HTML file in the `blogs` subdirectory of my website
[repo](https://github.com/ntBre/bwestbro.com). Originally I would just write
them in HTML directly, but because I spend so much time in Emacs, I started
experimenting with writing my posts in Org Mode. This is quite nice for the
actual writing part of the process because I'm very familiar with Org, and I can
use all of my normal editing snippets for inserting code blocks and equations
and stuff like that. However, I don't really like the process of exporting from
Org to HTML for publication on my site. At first glance, `org-export-dispatch`
looks really nice, and it has a handy default binding of `C-c C-e`. On the other
hand, this interactive approach makes it more difficult to perform this export
as part of a script or Makefile[^1]. One other quibble I have with Org export is
that it includes a lot of junk in the generated HTML. Here's a snippet from the
top of one of my Org-exported posts:

``` html
     <?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<!-- 2021-12-12 Sun 21:12 -->
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Emacs for LaTeX</title>
<meta name="generator" content="Org Mode" />
</head>
<body>
<div id="content" class="content">
<p>
If you're here to copy and paste the full config
file, <a href="#org79ab8f7">use this link</a>. Otherwise enjoy
reading!
</p>
```

Again, I'm sure there is a way to configure this, and I vaguely remember trying
that in the past, but it's just annoying to me.

The approach most people seem to take is to use a tool like
[pandoc](https://pandoc.org) to convert from Markdown to HTML, so that is what
I'm trying with this post. Despite resisting Markdown for a while in favor of
Org Mode (including `README.org` files on GitHub), I already use `markdown-mode`
in Emacs for editing most of my READMEs, so I'm fairly familiar with the key
bindings and useful functions. I have also used `pandoc` a bit in the past and
expect it to be more amenable to scripting as part of my website repo.

One other minor issue I've run into in the past before we get to some `pandoc`
code is that I don't really know where to keep draft blog posts. I have my
website repo set to public in case it's useful for others to see how to write a
small web server in Go, but I don't necessarily want to keep draft blog posts in
public. In the past, I've kept these drafts in another private repo to keep them
backed up and then export them into the main site repo when they are ready to
publish. However, that introduces a couple of layers of friction from my
perspective. Namely, when I go three years without publishing a blog post, it's
easy to forget where I kept old drafts if they aren't alongside the published
versions. Secondarily, it slightly complicates the export process that I want to
streamline. Thus, I've decided to keep a git-ignored `drafts` directory in my
website repo, at least for now.

A final minor "issue" is that I also have my YouTube channel to consider. Many
of the topics I want to blog about also make for good video topics, which has
led me to procrastinate both writing and video production. On that front, I've
decided that if I feel like writing, I should just write[^2], not delay the writing
for a hypothetical video. If anyone reads my blog at all, the audience is likely
much smaller than my YouTube audience and also likely disjoint, so I don't think
I'm really going to bore anyone with duplicate content. Further, putting my
thoughts down in writing first should lead to better videos if I get around to
them eventually.

# Exporting with pandoc

Now that I've motivated the code in this post, let me lay out the (relevant)
structure of my repo:

``` text
├── Makefile
├── blogs
├── css
├── drafts
│   └── blog-update.md
├── go.mod
├── img
├── json
│   ├── blogs.json
├── misc
├── server.go
├── server_test.go
├── templates
└── worksheets
```

I've omitted most of the subdirectories and files within these directories for
clarity. You can see this very blog post in Markdown form in my `drafts`
directory under the name `blog-update.md`. My server populates the list of blog
posts based on the contents of the `json/blogs.json` file. Because it reads the
filename from the JSON entries, I don't necessarily *have* to put the output
HTML into the `blogs` directory, but that's where I want them to go. In Go, the
`Blog` struct is this:

``` go
type Blog struct {
	Title    string
	Filename string
	Date     string
	Content  string
}
```

but I only include `Title`, `Filename`, and `Date` in the JSON data, loading
`Content` at runtime only when the page is requested. Anyway, the two main
things I need to do to preview a new blog post are:

1. Add an entry to `blogs.json`
2. Export the Markdown file to HTML in the `blogs` directory.

As much as [I hate Python](https://youtu.be/tTnImV8fmwc), it has a fairly
convenient `json` module in the standard library, and it seems like overkill to
bust out Rust and `serde` for a simple task like this[^3]. One of the things I
hate about Python is using dictionaries where I would typically use a `struct`
in Rust or Go.

This is a bit of an aside, but if you can't guess it already, we're building up
to another issue with my current blogging setup. I'm about to start working on a
Python file that will be included in the repo and also including snippets of
that file in this blog post. In previous posts I have simply copy-pasted code,
which leads to it getting out of sync between the actual code file and the blog
post. Somewhat surprisingly, it seems that `pandoc` cannot handle inclusion of
code files by default[^4], so this seems like an opportunity to try out the
[m4](https://www.gnu.org/software/m4/) macro processor. Unfortunately, m4 also
cannot handle ranges of lines by default, but it at least has a `syscmd` macro
that will let me shell out to sed to grab the lines I need. Including ranges
like this should make it easier to structure my code however I want. For
example, this snippet should expand into itself(!):

``` m4
syscmd({{sed -n 144p drafts/blog-update.md}})dnl
```

As long as I remember to keep the line number updated if I edit anything above
it. If I have to adjust the line too many times, I'll switch to a regular
expression in the sed command to remove that issue.

Because m4 also defaults to using \`' as its quoting characters, I also have to
include this at the top of the file:

``` m4
syscmd({{sed -n 1p drafts/blog-update.md}})dnl
```

to change the quoting scheme to something more like Go or jinja templates and
something that will not conflict with the backticks all over Markdown. The
trailing `{{dnl}}` keeps m4 from including any extra whitespace. Now all I have
to do to include code snippets is to preprocess my Markdown files with m4. Let's
start a publish script to keep track of the steps. In this case, I won't mess
with m4, as I expect that the actual steps I use will change as the project goes
along. For now, all I know to do is

``` shell
m4 blog-update.md
```

which produces the macro-expanded version of the file on stdout. I'll either
pipe that to a temporary file later or send it directly into pandoc on stdin.

For now, let's get back to the original issue at hand: modifying `blogs.json`
programmatically. Again, the first thing I want to do is define a simple `Blog`
class that mirrors the Go version above:

``` python
syscmd({{sed -n '/@dataclass/,/^$/p' scripts/publish.py | sed '$d'}})dnl
```

Here I'm using a `dataclass` to take advantage of the automatic constructor
generation and, more importantly, the `asdict` function provided for these
classes in my JSON serialization code. It's not very Pythonic, but I'm keeping
the Go casing for the variable names to make deserializing a little easier.
Speaking of that, we can load a sequence of `Blog`s from a file with this
function:

``` python
syscmd({{sed -n '/def load_blogs/,/^$/p' scripts/publish.py | sed '$d'}})dnl
```

For a simple interface, I'll just pass the existing blogs file as the first
command line argument, and the name of the new blog file as the second argument.
Then, I just check if a blog with that filename already exists, and if not, I
add it to the front of the list and overwrite the file with the new contents.
For now, I'll just expect to edit the `Title` manually, so I'll use the filename
for that as well:

``` python
syscmd({{sed -n '/if __name/,/^$/p' scripts/publish.py}})dnl
```

At this point, I have code snippets handled with m4 and updating `blogs.json`
with this `publish.py` script. The only step missing is converting to HTML with
pandoc. One other minor issue is where to plan to run this code. When writing,
my working directory will be `drafts`, and there are two easy ways of compiling
code in Emacs. The first is simply to use `M-x compile`, which uses the current
directory as its working directory. The second, and the one I use more often, is
`projectile-compile-project`, which compiles at the root of the project. I think
it probably makes more sense then to run my script for publishing a blog post in
this way. That really only requires me to make every file path (such as in the
m4 macros) relative to the project root instead of the drafts directory.

First, let's modify the m4 command above to pipe through pandoc. According to
the manual, if no input file is specified and no input file type is provided,
pandoc defaults to reading Markdown from stdin, which is exactly what we want.
All we need to do is provide the output format, HTML in this case:

``` shell
m4 drafts/blog-update.md | pandoc -o blogs/blog-update.html
```

There are a couple of convenience issues to fix with this when we promote it to
an actual script, but it works well enough for now. Unfortunately, my site's
current styling looks absolutely horrible with the HTML generated by pandoc, but
that is also a fairly separate issue from this post. I think I'll try writing a
new style sheet for these new posts to avoid too many conflicts with my existing
pages.

Anyway, styling aside, we now have all of the necessary components for a publish
script:

``` shell
#!/bin/bash

m4 drafts/blog-update.md | pandoc -o blogs/blog-update.html
scripts/publish.py json/blogs.json drafts/blog-update.md
```

The only finishing touches are to pass in (and process) some command line
arguments and then I should be back into blogging! Here's the final shell script
after applying two of my favorite bash tricks for removing prefixes and suffixes:

``` shell
include(scripts/publish)
```

For completeness, here are the full contents of `scripts/publish.py` too:

``` python
include(scripts/publish.py)
```

# Conclusion

I'm glad I decided to do this today. It took a couple of hours, but I now feel
like I am well-equipped to write a post about anything that strikes my fancy. My
workflow throughout this process has been to run `./scripts/publish
drafts/blog-update.md` with `projectile-compile-project` and use my `recompile`
key binding on F5 to recompile the HTML after changing the Markdown file. With
the Go server running locally in a background terminal window, this means I can
preview the changes basically in real time. If I ever write about something
chemistry-related, I'll have to extend these scripts to handle LaTeX blocks in
addition to code blocks, but hopefully that won't be too bad. The combination of
m4 and pandoc already seems much nicer than my previous setup with Org Mode, and
I look forward to writing my next post!

# Footnotes

[^1]: Of course you can run Emacs in batch mode and provide code either in a
    script or from the command line, but I think it's still not ideal.

[^2]: And I've been feeling this itch a lot more recently. When I was doing my
    PhD, writing papers was a major part of my regular work and one that I
    enjoyed. My current position involves basically no writing, so I should try
    to keep in practice somehow.

[^3]: Go and its JSON package would be more natural than Rust, but I don't
    really have much interest in writing Go these days. I'd be more likely to
    rewrite the whole server in Rust than to write any additional features in
    Go.

[^4]: There is a promising-looking filter called
    [pandoc-include-code](https://github.com/owickstrom/pandoc-include-code)
    with all of the features I'm looking for, but it appears to be unmaintained
    with potentially annoying issues remaining open.

<!--  LocalWords:  programmatically
 -->
