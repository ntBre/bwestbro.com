// TODO worksheets pages
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"text/template"
)

var (
	preview    int = 3
	pubs       Pubs
	blogs      Blogs
	worksheets Worksheets
)

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
	templates := template.Must(template.
		ParseGlob("templates/*.html"))
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
	if len(pubs.Items) > preview {
		pubs.Items = pubs.Items[:preview]
	}
	if len(blogs.Items) > preview {
		pubs.Items = pubs.Items[:preview]
	}
	templates.ExecuteTemplate(w, "indexPage", &IndexData{Blog: blogs, Pubs: pubs})

}

func pubHandler(w http.ResponseWriter, req *http.Request) {
	templates := template.Must(template.ParseGlob("templates/*.html"))
	err := LoadData("pubs.json", &pubs.Items)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
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

func main() {
	http.HandleFunc("/img/favicon.png", fileHandler("img/favicon.png"))
	http.HandleFunc("/css/site.css", fileHandler("css/site.css"))
	http.HandleFunc("/pub", pubHandler)
	http.HandleFunc("/blog", blogHandler)
	http.HandleFunc("/blogs/", blogsHandler)
	http.HandleFunc("/misc/", miscHandler)
	http.HandleFunc("/sp18", worksheetHandler)
	http.HandleFunc("/fa18", worksheetHandler)
	http.HandleFunc("/sp19", worksheetHandler)
	http.HandleFunc("/worksheets/", miscHandler)
	// different endpoints for different blog posts?
	// need some part of blog struct to identify, hash maybe on the title
	http.HandleFunc("/", indexHandler)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

type Pub struct {
	Authors string
	Title   string
	Journal string
	Status  string
	Year    int
	DOI     string
}

type Pubs struct {
	Items []*Pub
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
