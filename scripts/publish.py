#!/usr/bin/python

import json
import sys
from dataclasses import asdict, dataclass
from datetime import datetime
from pathlib import Path


@dataclass
class Blog:
    Title: str
    Filename: str
    Date: str


def load_blogs(filename):
    with open(filename) as f:
        return [Blog(**d) for d in json.load(f)]


if __name__ == "__main__":
    blogs = load_blogs(sys.argv[1])
    new_blog_name = Path(sys.argv[2]).name
    name = str(Path("blogs").joinpath(new_blog_name).with_suffix(".html"))
    if not any((b.Filename == name for b in blogs)):
        date = datetime.today().strftime("%Y-%m-%d")
        blogs.insert(0, Blog(name, name, date))
    with open(sys.argv[1], "w") as out:
        json.dump(blogs, out, default=lambda o: asdict(o), indent=4)
