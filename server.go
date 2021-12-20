package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"text/template"
)

var (
	preview    int = 3
	pubs       Pubs
	blogs      Blogs
	worksheets Worksheets
)

// Flags
var (
	host = flag.String("host", "localhost:8000", "specify the port to use")
)

type Pub struct {
	Authors string
	Title   string
	Journal string
	Status  string
	Year    int
	DOI     string
	Cover   string
}

type Pubs struct {
	Items []*Pub
	Limit int
}

func (p Pubs) Count(i int) int {
	return len(p.Items) - i
}

type Blog struct {
	Title    string
	Filename string
	Date     string
	Content  string
}

type Blogs struct {
	Items []*Blog
}

type IndexData struct {
	Blog Blogs
	Pubs Pubs
}

type Worksheet struct {
	Title    string
	Filename string
	Type     string
}

type Worksheets struct {
	Items []*Worksheet
}

func Echo(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "%s\n", req.URL.Path)
}

// Load json data from filename into an object.
// The object must be a pointer.
func LoadData(filename string, object interface{}) error {
	data, err := ioutil.ReadFile(filepath.Join("json", filename))
	if err != nil {
		return err
	}
	err = json.Unmarshal(data, object)
	if err != nil {
		return err
	}
	return nil
}

func indexHandler(w http.ResponseWriter, req *http.Request) {
	// can move to global to parse only on server startup after testing
	templates := template.Must(template.ParseGlob("templates/*.html"))
	// default handler so check for wrong endpoints
	path := req.URL.Path[1:]
	if path != "" && path != "index.html" && path != "index" {
		http.Error(w, "Page not found", http.StatusNotFound)
		return
	}
	// need locks or cache or something on these unless I load in init
	err := LoadData("pubs.json", &pubs.Items)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	err = LoadData("blogs.json", &blogs.Items)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	pubs.Limit = preview
	if len(blogs.Items) > preview {
		blogs.Items = blogs.Items[:preview]
	}
	templates.ExecuteTemplate(w, "indexPage", &IndexData{Blog: blogs, Pubs: pubs})

}

func pubHandler(w http.ResponseWriter, req *http.Request) {
	templates := template.Must(template.ParseGlob("templates/*.html"))
	err := LoadData("pubs.json", &pubs.Items)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	pubs.Limit = len(pubs.Items)
	templates.ExecuteTemplate(w, "pubPage", pubs)
}

func blogHandler(w http.ResponseWriter, req *http.Request) {
	templates := template.Must(template.ParseGlob("templates/*.html"))
	err := LoadData("blogs.json", &blogs.Items)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	templates.ExecuteTemplate(w, "blogPage", blogs)
}

func blogsHandler(w http.ResponseWriter, req *http.Request) {
	filename := req.URL.Path[1:]
	var (
		show  Blog
		found bool
	)
	templates := template.Must(template.ParseGlob("templates/*.html"))
	err := LoadData("blogs.json", &blogs.Items)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	for _, blog := range blogs.Items {
		if blog.Filename == filename {
			show = *blog
			found = true
			break
		}
	}
	if !found {
		http.Error(w, "Page not found", http.StatusNotFound)
		return
	}
	content, err := ioutil.ReadFile(show.Filename)
	if err != nil {
		http.Error(w, "Page not found", http.StatusNotFound)
		return
	}
	show.Content = string(content)
	templates.ExecuteTemplate(w, "blogEntry", show)
}

func miscHandler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path[1:]
	fileHandler(path)(w, r)
}

func fileHandler(filename string) func(http.ResponseWriter, *http.Request) {
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		return func(w http.ResponseWriter, r *http.Request) {
			http.Error(w, err.Error(), http.StatusNotFound)
		}
	}
	return func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filename)
	}
}

func worksheetHandler(w http.ResponseWriter, req *http.Request) {
	filename := req.URL.Path[1:]
	templates := template.Must(template.ParseGlob("templates/*.html"))
	err := LoadData(filename+".json", &worksheets.Items)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	templates.ExecuteTemplate(w, "worksheets", worksheets)
}

// redirect to my github
func gitHandler(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "https://github.com/ntBre", http.StatusPermanentRedirect)
}

// redirect http to https
func redirectTLS(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "https://"+r.Host+r.RequestURI, http.StatusMovedPermanently)
}

func main() {
	flag.Parse()

	http.HandleFunc("/img/favicon.png", fileHandler("img/favicon.png"))
	http.HandleFunc("/img/", miscHandler)
	http.HandleFunc("/css/site.css", fileHandler("css/site.css"))
	http.HandleFunc("/pub", pubHandler)
	http.HandleFunc("/blog", blogHandler)
	http.HandleFunc("/blogs/", blogsHandler)
	http.HandleFunc("/misc/", miscHandler)
	http.HandleFunc("/blogs/figs/", miscHandler)
	http.HandleFunc("/sp18", worksheetHandler)
	http.HandleFunc("/fa18", worksheetHandler)
	http.HandleFunc("/sp19", worksheetHandler)
	http.HandleFunc("/worksheets/", miscHandler)
	http.HandleFunc("/mathjax/", miscHandler)
	http.HandleFunc("/git", gitHandler)
	http.HandleFunc("/", indexHandler)

	go http.ListenAndServeTLS(":443",
		"/etc/letsencrypt/live/bwestbro.com/fullchain.pem",
		"/etc/letsencrypt/live/bwestbro.com/privkey.pem", nil)

	if strings.Contains(*host, "localhost") {
		log.Fatal(http.ListenAndServe(*host, nil))
	} else {
		log.Fatal(http.ListenAndServe(*host, http.HandlerFunc(redirectTLS)))
	}
}
