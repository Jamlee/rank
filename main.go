package main

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github/jamlee/ranks/pkg/log"

	"github.com/gocolly/colly"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Lang struct {
	Name  string
	Stars uint
	Page  uint
}

type Result struct {
	Name   string   `bson:"name"`
	Stars  float64  `bson:"stars"`
	Topics []string `bson:"topics"`
	Desc   string   `bson:"desc"`
	Lang   string   `bson:"lang"`
}

func main() {
	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		log.Panic("have not default env, %s", "export MONGO_URI=mongodb://user:passwd@127.0.0.1:27017")
	}

	// 连接数据库
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI))
	if err != nil {
		log.Panic("err: %v", err)
	}

	// 数据爬取
	c := colly.NewCollector()
	c.DetectCharset = true
	c.Limit(&colly.LimitRule{
		DomainGlob:  "*github.*",
		Parallelism: 1,
		Delay:       10 * time.Second,
	})
	c.OnHTML("li.repo-list-item", func(e *colly.HTMLElement) {
		result := &Result{}
		result.Name = e.ChildText("div.f4>a")
		stars := e.ChildText(".mr-3 a")
		result.Lang = e.ChildText("span[itemprop='programmingLanguage']")
		result.Desc = e.ChildText("p.mb-1")
		e.ForEach(".topic-tag", func(i int, topic *colly.HTMLElement) {
			result.Topics = append(result.Topics, strings.TrimSpace(topic.Text))
		})
		var starFloat float64
		var err error
		if strings.HasSuffix(stars, "k") {
			stars = stars[0 : len(stars)-1]
			starFloat, err = strconv.ParseFloat(stars, 64)
			starFloat = starFloat * 1000
		} else {
			starFloat, err = strconv.ParseFloat(stars, 64)
		}
		if err != nil {
			starFloat = -1
		}

		result.Stars = starFloat
		collection := client.Database("github").Collection(result.Lang)
		opts := options.Replace().SetUpsert(true)

		_, err = collection.ReplaceOne(context.TODO(),
			bson.D{{Key: "name", Value: result.Name}}, result, opts)
		if err != nil {
			log.Error("err: %v\n", err)
		}
	})
	c.OnRequest(func(r *colly.Request) {})

	urlTmpl := "https://github.com/search?l=%s&q=stars%%3A%%3E%d+%c&type=Repositories&p=%d&s=stars"
	langs := []Lang{
		{"C%2B%2B", 100, 100},
		{"C", 100, 100},
		{"Rust", 100, 100},
	}
	searchContent := "abcdefghijklmnopqrstuvwxyz"
	for _, lang := range langs {
		for i := 0; i < len(searchContent); i++ {
			ch := searchContent[i]
			for i := uint(1); i <= lang.Page; i++ {
				url := fmt.Sprintf(urlTmpl, lang.Name, lang.Stars, ch, i)
				log.Info("visit %s", url)
				c.Visit(url)
			}
		}
	}
}
