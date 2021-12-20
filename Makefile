DIRS = blogs css img json misc templates worksheets #mathjax
DEST = root@bwestbro:site/
TARGET = server
SRC = server.go

run:
	go run $(SRC)

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
