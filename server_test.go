package main

import (
	"fmt"
	"os"
	"testing"
	"text/template"
)

func TestLoadData(t *testing.T) {
	pubs := new(Pubs)
	err := LoadData("pubs.json", &pubs.Items)
	if err != nil {
		panic(err)
	}
	for _, item := range pubs.Items {
		fmt.Println(*item)
	}
	pubs.Limit = 11
	templates := template.Must(template.ParseGlob("templates/*.html"))
	templates.ExecuteTemplate(os.Stdout, "pubPage", *pubs)
}
