var leetcode = {
  //Binary Search
  "sorted insert position": "https://leetcode.com/problems/search-insert-position/description/",
  "find a peak element": "https://leetcode.com/problems/find-peak-element/description/",
  "rotated sorted array search": "https://leetcode.com/problems/search-in-rotated-sorted-array/description/",
  "single element in sorted array": "https://leetcode.com/problems/single-element-in-a-sorted-array/description/",
  "median of two sorted arrays": "https://leetcode.com/problems/median-of-two-sorted-arrays/description/",
  "smallest good base": "https://leetcode.com/problems/smallest-good-base/description/",

  //Bit Manipulation
  "single number": "https://leetcode.com/problems/single-number/description/",
  "number of 1 bits": "https://leetcode.com/problems/number-of-1-bits/description/",
  "reverse bits": "https://leetcode.com/problems/reverse-bits/description/",
  "single number II": "https://leetcode.com/problems/single-number-ii/description/",
  "single number III": "https://leetcode.com/problems/single-number-iii/description/",
  "min xor value": "https://leetcode.com/problems/minimize-xor/description/",
  "single number III": "https://leetcode.com/problems/single-number-iii/description/",
  "single number III": "https://leetcode.com/problems/single-number-iii/description/",

  // 2 Pointer's
  "container with most water": "https://leetcode.com/problems/container-with-most-water/",
  "single number III": "https://leetcode.com/problems/single-number-iii/description/",

  // Linked List
  "reverse linked list": "https://leetcode.com/problems/reverse-linked-list/description/",
  "reverse link list II": "https://leetcode.com/problems/reverse-linked-list-ii/description/",
  "merge two sorted lists": "https://leetcode.com/problems/merge-two-sorted-lists/description/",
  "copy list": "https://leetcode.com/problems/copy-list-with-random-pointer/description/",
  "sort list": "https://leetcode.com/problems/sort-list/description/",
  "remove duplicates from sorted list": "https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/",
  "remove duplicates from sorted list II": "https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/",
  "list cycle": "https://leetcode.com/problems/linked-list-cycle/description/",
  "lru cache": "https://leetcode.com/problems/lru-cache/description/",

  // Stacks and Queue
  "min stack": "https://leetcode.com/problems/min-stack/description/",
  "next greater": "https://leetcode.com/problems/next-greater-element-i/description/",
  "largest rectangle in histogram": "https://leetcode.com/problems/largest-rectangle-in-histogram/description/",
  "queue using stacks": "https://leetcode.com/problems/implement-queue-using-stacks/description/",
  "min stack": "https://leetcode.com/problems/min-stack/description/",
  //Trees Question
  "level order": "https://leetcode.com/problems/binary-tree-level-order-traversal/description/",
  "right view of binary tree": "https://leetcode.com/problems/binary-tree-right-side-view/description/",
  "binary tree from inorder and preorder": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/",
  "preorder traversal": "https://leetcode.com/problems/binary-tree-preorder-traversal/description/",
  "postorder traversal": "https://leetcode.com/problems/binary-tree-postorder-traversal/description/",
  "valid binary search tree": "https://leetcode.com/problems/validate-binary-search-tree/description/",
  "balanced binary tree": "https://leetcode.com/problems/balanced-binary-tree/description/",
  // Add more entries as needed...
};




















// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vikramaditya23bcs10061:TXK0mnvj4j9iv2z3@cluster0.mlrgeqy.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

const addQuestion = async (doc) => {
  await client.connect();
  const db = client.db('QuestLinker')
  const questions = db.collection("questionMap");
  const result = await questions.insertOne(doc)
  return result;
}

var qa = [];
for(var i in leetcode) {
  qa.push(i);
}

function adder() {
  qa.forEach(async function(question) {
    const doc = {
      question_name: question,
      question_link: leetcode[question],
      contributor: "Vikram"
    }
    await addQuestion(doc);
  })
}


app.post("/contribute", async function contributeQuestion(req, res){
  const questionBody = req.body;
  const doc = {
    question_name: questionBody['questionId'],
    question_link: questionBody['questionLink'],
    contributor: questionBody['contributorName']
  }
  await addQuestion(doc);
  return JSON.stringify({
    status: 200
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});






