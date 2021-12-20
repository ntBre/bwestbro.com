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
