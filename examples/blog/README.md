# Blog - A demo app for firebase-saga

A library for connecting `redux-saga` middleware to <a href="https://firebase.google.com/">Firebase</a>.

## Getting started

### Install

```
$ npm install
```

## Example JSON to import into Firebase

You can import a JSON file similar to following into **Firebase**.

```
{
  "posts" : [ null, {
    "body" : "Hi there! this is my first post!",
    "id" : 1000,
    "title" : "First Post"
  }, {
    "body" : "This is my second post",
    "id" : 1001,
    "title" : "Second Post"
  } ]
}
```
