DIRS = blogs css img json misc templates worksheets #mathjax
DEST = root@bwestbro.com:site/
TARGET = server
SRC = server.go

ifeq ($(DEBUG), 1)
FLAGS = -debug
endif

run:
	go run $(SRC) $(FLAGS)

build: server.go
	go build -o $(TARGET) -tags netgo .

files:
	rsync -avz $(DIRS) $(DEST)

deploy: build
	rsync -avz $(DIRS) $(TARGET) $(DEST)

# this should be a suffix rule, for converting large cover images to
# reasonable sized ones
# cover:
# 	convert infile -resize 518400@ outfile
