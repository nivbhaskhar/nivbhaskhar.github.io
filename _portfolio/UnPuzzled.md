---
layout: portfolio_post
title: UnPuzzled
img: "assets/puzzle.png"
date: 2020-07-16
---

# What is UnPuzzled ?
{: style="background-color: #ccd9ff"}
It is a jigsaw puzzle solver using AI


# Web-app
{: style="background-color: #ccd9ff"}
Check out a web-application based on one of the solvers at [https://unpuzzler.herokuapp.com](https://unpuzzler.herokuapp.com)

# An overview
{: style="background-color: #ccd9ff"}
This project consists of two components :  _creation and solving of puzzles_ and _checking adjacency of puzzle pieces_.

I construct a _puzzle generator_, which takes a given image and cuts it up into a rectangular grid of  uniform square puzzle pieces with each puzzle piece being of a specified dimension. It further randomly rotates each square piece by 0/90/180/270 degrees counterclockwise and shuffles up the pieces, thus creating a puzzle. 

I construct several models (machine-learning based and non-machine learning based) which are trained to detect if two given puzzle pieces are adjacent or not. I create custom datasets for these models using a _puzzle-pieces-pair generator_ which is similar to the _puzzle generator_ mentioned above. The actual images to construct the custom datasets are taken from the [CUB-200 dataset](http://www.vision.caltech.edu/visipedia-data/CUB-200-2011). From the start, I split the images in the CUB-200 dataset into training, validation and test portions. I construct custom validation and test datasets to validate and evaluate the checking-adjacency models.

I design a _search algorithm_ which takes a puzzle board with the _top-left corner filled in_, searches for the _best_ pieces to fit into the board till the board is filled completely. The task of determining which pieces fit _better_ makes use of the _checking-adjacency models_. I create _solvers_, which integrate the models with the search algorithm. Finally, I evaluate and compare the performances of the solvers on a test-data set of puzzles which are constructed by the puzzle generator from the test-portion of the CUB-200 dataset split.

I also give a web-application built using [Gradio](https://github.com/gradio-app/gradio) which simulates the puzzle-solving by the solver which is deployed on Heroku



# GitHub repository
{: style="background-color: #ccd9ff"}
The code for this project can be found at [https://github.com/nivbhaskhar/UnPuzzled](https://github.com/nivbhaskhar/UnPuzzled/)



# Unpuzzling 
{: style="background-color: #ccd9ff"}

Here's an animation of the solver in action

![Animation](/assets/solver_animation.gif){:class="img-responsive"} 


# Results
{: style="background-color: #ccd9ff"}


I evaluated solvers based on three checking-adjacency models, namely _AdjacencyClassifier_NoML_ (a hand-engineered model), _FromScratch_ (a simple CNN) and _ResNetFT_ (a fine-tuned ResNet 18 model).



There were 67 _six-by-six_ puzzles, 11 _five-by-five_ puzzles and 2 _four-by-four_ puzzles in the evaluation set




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>puzzle_sizes</th>
      <th>no_of_puzzles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>36</td>
      <td>67</td>
    </tr>
    <tr>
      <th>1</th>
      <td>25</td>
      <td>11</td>
    </tr>
    <tr>
      <th>2</th>
      <td>16</td>
      <td>2</td>
    </tr>
  </tbody>
</table>
</div>




Both the _AdjacencyClassifier_NoML_ and the _ResNetFT_ solved 87.5 % of the puzzles completely correctly. _FromScratch_ underperformed by solving only 37.5 % of the puzzles completely correctly.




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>AdjacencyClassifier_NoML</th>
      <th>FromScratch</th>
      <th>ResNetFT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>avg_time_taken (sec)</th>
      <td>11.2126</td>
      <td>18.9795</td>
      <td>23.0482</td>
    </tr>
    <tr>
      <th>percentage_solved</th>
      <td>0.875</td>
      <td>0.375</td>
      <td>0.875</td>
    </tr>
    <tr>
      <th>avg_puzzle_sizes</th>
      <td>33.9875</td>
      <td>33.9875</td>
      <td>33.9875</td>
    </tr>
  </tbody>
</table>
</div>



# A venn diagram to visualize the comparisons
{: style="background-color: #ccd9ff"}


![Venn diagram](/assets/SolverComparisons_61_0.png){:class="img-responsive"} 



# Comments
{: style="background-color: #ccd9ff"}


I further visually investigated what the models did on puzzles they did not solve completely correctly. It turned out that the solvers were putting together several chunks of the puzzles correctly even if they were not placing the pieces in the correct positions in the puzzle board. Further, the solvers sometimes put back mostly correct but rotated versions of the images. The current evaluation classified all these puzzles as _unsolved_.


If there are several similar pieces, and a solver chose and fit an incorrect piece, the puzzle of course will not be completely correctly solved. However the solver might (and did often) recover and get local chunks of the puzzle right. Perhaps a non-binary evaluation metric would aid in gauging the efficacy of these puzzle-solvers.




