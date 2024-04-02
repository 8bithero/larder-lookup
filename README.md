# Pennylane Tech Test - Larder Lookup

[ToDo]

---

## Setup

### Get code
```bash
git clone https://github.com/8bithero/larder-lookup
cd larder-lookup
```

### Install gems/packages
```bash
bundle install
yarn install
```


### Create database
```bash
rails db:setup
rails recipes:import
```

### Populate data
For all data you can run:
```bash
rails recipes:import
```
If you would like to populate the database with a subset of the data, you can run the below, replacing the number with the number of records you want to populate the database with.

```bash
rails 'recipes:import[500]'
```

### Start Server
```bash
bin/dev
```
Please note you will need to start the server with `bin/dev` rather than `rails s` to ensure the React frontend is also started.

---

## Notes


### Points of interest

[ToDo]

---
## Problem statement

> **It's dinner time ! Create an application that helps users find the most relevant recipes that they can prepare with the ingredients that they have at home**

## Objective

Deliver an application prototype to answer the above problem statement.

By prototype, we mean:
- something usable, yet as simple as possible
- UI / design is not important
- we do not expect features which are outside the basic scope of the problem

We expect to use this prototype as a starting point to discuss current implenentation details, as well as ideas for improvement.

#### Tech must-haves
- [x] MySQL / PostgreSQL or any other MySQL-compatible database.
- [x] A backend application which responds to queries
- [x] A web interface (can be VERY simple)
- [x] Ruby on Rails (if you're not familiar with Ruby on Rails, use something you're familiar with)

#### Bonus points
- [x] React
- [x] Application is hosted on fly.io

## Data
We provide two datasets to choose from:
- [french-language recipes](https://pennylane-interviewing-assets-20220328.s3.eu-west-1.amazonaws.com/recipes-fr.json.gz) scraped from www.marmiton.org with [python-marmiton](https://github.com/remaudcorentin-dev/python-marmiton)
- [english-language recipes](https://pennylane-interviewing-assets-20220328.s3.eu-west-1.amazonaws.com/recipes-en.json.gz) scraped from www.allrecipes.com with [recipe-scrapers](https://github.com/hhursev/recipe-scrapers)

Download it with this command if the above link doesn't work:
```shell
wget https://pennylane-interviewing-assets-20220328.s3.eu-west-1.amazonaws.com/recipes-en.json.gz && gzip -dc recipes-en.json.gz > recipes-en.json
```

## Deliverable
- the 2-3 user stories which the application implements
- the codebase : in a git repo (share it with @quentindemetz @tdeo @soyoh @lucasbonin @sforsell @clemalfroy @dmilon @pointcom @evangelos-fotis @thecodehunter)
- the database structure
- the application, running on fly.io or on a personal server.
- please submit links to the GitHub repo and the hosted application [via this form](https://forms.gle/siH7Rezuq2V1mUJGA) and if you're on Mac, make sure your browser has permission to share the screen
