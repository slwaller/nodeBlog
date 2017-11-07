const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")


// App Config
const app = express()
app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
mongoose.connect("mongodb://localhost/node_blog")

//Mongoose / Model Config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

const Blog = mongoose.model("Blog", blogSchema)

// Routes

app.get("/", function(req, res){
    res.redirect("/blogs")
})

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err)
        } else {
            res.render("index", {blogs: blogs})
        }
    })
})

app.get("/blogs/new", function(req, res){
    res.render("new")
})

app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new")
            alert("Couldn't create blog, Try Again!")
        } else {
            res.redirect("/blogs")
        }
    })
})

app.listen(3000, function(){
    console.log("Blog running on port 3000")
})