---
layout: post
title: UnPuzzled
img: "assets/puzzle.png"
date: 2020-07-16
---

# What is UnPuzzled ?
{: style="background-color: pink"}
It is a jigsaw puzzle solver using AI




# An overview
{: style="background-color: pink"}
This project consists of two components :  _creation and solving of puzzles_ and _checking adjacency of puzzle pieces_.

We construct a _puzzle generator_, which takes a given image and cuts it up into a rectangular grid of  uniform square puzzle pieces with each puzzle piece being of a specified dimension. It further randomly rotates each square piece by 0/90/180/270 degrees counterclockwise and shuffles up the pieces, thus creating a puzzle. 

We construct several models (machine-learning based and non-machine learning based) which are trained to detect if two given puzzle pieces are adjacent or not. We create custom datasets for these models using a _puzzle-pieces-pair generator_ which is similar to the _puzzle generator_ mentioned above. The actual images to construct our custom datasets are taken from the [CUB-200 dataset](http://www.vision.caltech.edu/visipedia-data/CUB-200-2011). From the start, we split the images in the CUB-200 dataset into training, validation and test portions. We construct custom validation and test datasets to validate and evaluate our checking-adjacency models.

We design a _search algorithm_ which takes a puzzle board with the _top-left corner filled in_, searches for the _best_ pieces to fit into the board till the board is filled completely. The task of determining which pieces fit _better_ makes use of the _checking-adjacency models_. We create _solvers_, which integrate the models with the search algorithm. Finally, we evaluate and compare the performances of the solvers on a test-data set of puzzles which are constructed by our puzzle generator from the test-portion of the CUB-200 dataset split.

We are currently in the process of writing an interactive web-application which simulates puzzle-solving by these solvers.



# GitHub repository
{: style="background-color: pink"}
The code for this project can be found at [https://github.com/nivbhaskhar/UnPuzzled](https://github.com/nivbhaskhar/UnPuzzled/)



# Unpuzzling 
{: style="background-color: pink"}

Here's an animation of the solver in action

![Animation](/assets/solver_animation.gif){:class="img-responsive"} 



