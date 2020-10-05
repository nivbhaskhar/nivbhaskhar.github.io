---
layout: post
title: "k-fold cross-validation"
date: 2020-09-03 08:53:21 -0700
tags: [ML, Statistics, Python-libraries]
---

# To train or to test, that is the question..
{: style="text-align: center; background-color: #ccd9ff"}


[Previously](https://nivbhaskhar.github.io/2020/09/01/decision_tree_regressor.html), we built a decision tree regressor to predict the precipitation, given the other weather parameters. To do so, we split our dataset into 70% training data and 30% test data and fit a decision tree on the training data and evaluated it on the test data. However, this meant that the data reserved for testing could not be used for training and vice-versa. 

This poses a problem if you only have very limited data to work with. Do you train with all your data and give up on evaluation, or do you reserve a chunk for testing, making your training data set even smaller ? 


In this post, we'll see how to use all the data available for training *and* testing by using a method called *k-fold cross-validation*{: style="color: blue"}. A notebook with the complete code can also be found on [GitHub](https://github.com/nivbhaskhar/Tools/blob/master/scikit-learn/cross_validation.md).


# What is k-fold cross-validation ?
{: style="text-align: center; background-color: #ccd9ff"}

The basic idea is to split up your dataset into $$k$$ chunks or *folds*. Let's call the folds $$F_1, F_2, ...F_k$$. We'll proceed to train $$k$$ models $$M_1,\ldots,M_k$$ on different training and test-data splits as follows:

* Train the $$i$$-th model $$M_i$$ on training data comprising of all folds except the $$i$$-th fold $$F_i$$.
* Evaluate model $$M_i$$ on test data = $$F_i$$


Thus, for each of the $$k$$ models $$M_i$$, we get a validation-error estimate $$E_i$$. We report the $$k$$ validation-error estimates as *cross-validation scores*{: style="color: blue"}[^1]. 


The average of these $$k$$ error-estimates tells us how biased our model is. If the average error is low, this implies our model has *low bias*{: style="color: blue"}. Broadly speaking, this means our model is *flexible* enough to get a good notion of the actual *truth* underlying the data.


The standard deviation of these $$k$$ error-estimates tells us how our model's performance varies with the training dataset used. If the standard deviation is high, this means our model has *high variance*{: style="color: blue"}. That is, our model's performance is varying a lot with the training dataset. This is behaviour which we would like to avoid as it doesn't generalize well on unseen data.





# Imports
{: style="text-align: center; background-color: #ccd9ff"}

As before, we'll be using the pandas library as well as scikit-learn. So you'll have to preface your code with the following import statements.

~~~python
#imports
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_squared_error


from sklearn.model_selection import cross_val_score
from sklearn.model_selection import cross_val_predict
~~~




# Revisiting the weather dataset
{: style="text-align: center; background-color: #ccd9ff"}

As [before](https://nivbhaskhar.github.io/2020/09/01/decision_tree_regressor.html), let's use the weather dataset and prepare our *weather_features* which has three attributes, namely *avgtemp*, *wind-gut* and *sunshine*. Let's also prepare the *precipitation_targets* (which is the amount of precipitation recorded for each datapoint.

Code:

~~~python

col_names = ['date','avgtemp', 'mintemp', 'pp', 'snow', 'wind-dir', 'wind-speed', 'wind-gut', 'air-pressure', 'sunshine', 'dummy']

#Reads the comma separated csv into a pandas dataframe
daily_weather_df =pd.read_csv('KCQT0.csv', sep=',',names=col_names, header = None)

#Delete irrelevant cols
del daily_weather_df['dummy']
del daily_weather_df['air-pressure']
del daily_weather_df['wind-speed']
del daily_weather_df['snow']
del daily_weather_df['wind-dir']
del daily_weather_df['date']
del daily_weather_df['mintemp']

#Delete rows with NaN entries
daily_weather_df.dropna(inplace=True)

#Drop precipitation column to get weather_features
weather_features = daily_weather_df.drop(['pp'], axis=1)
precipitation_targets = daily_weather_df['pp']


print(weather_features.head())
print(precipitation_targets.head())
~~~

Features: 
<div>

<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>avgtemp</th>
      <th>wind-gut</th>
      <th>sunshine</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>10.4</td>
      <td>2.0</td>
      <td>1018.9</td>
    </tr>
    <tr>
      <th>1</th>
      <td>12.0</td>
      <td>8.1</td>
      <td>1021.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>11.4</td>
      <td>1.3</td>
      <td>1026.5</td>
    </tr>
    <tr>
      <th>3</th>
      <td>12.6</td>
      <td>3.0</td>
      <td>1024.9</td>
    </tr>
    <tr>
      <th>4</th>
      <td>13.3</td>
      <td>1.9</td>
      <td>1018.0</td>
    </tr>
  </tbody>
</table>
</div>



Target:



    0    13.9
    1    15.6
    2    18.9
    3    20.0
    4    21.7
    Name: pp, dtype: float64


# Regression tree
{: style="text-align: center; background-color: #ccd9ff"}

Let's set up our regression tree.

~~~python
tree_reg = DecisionTreeRegressor(max_depth=4)
~~~


# Cross validation scores
{: style="text-align: center; background-color: #ccd9ff"}

The syntax for computing cross validation scores over $$k$$ folds is 


```cross_val_score(model, features, labels, scoring=scoring_method, cv=k)```


* __model__ refers to our decision tree regressor
* __features__ refers to the *weather_features*
* __labels__ refers to the *precipitation_targets*
* __scoring__ refers to the scoring method being used
* __cv__ is the number of folds we want to split our data into


One thing to note is that the _scoring_ expects[^2] a scoring_method/function for which *greater is better* (i.e. it wants to maximize the score). So you should not give it a loss function for which *lesser is better*.


We used *mean_squared_error* as a loss function when we evaluated our Decision Tree regressor for just one training-test split. Here, we'll use *neg_mean_squared_error*, which is just the negative of the *mean_squared_error*. Minimizing mean_squared_error is maximizing *neg_mean_squared_error*, so we are good to go!


All this translates to the following code:

~~~python
scores = cross_val_score(tree_reg, weather_features, precipitation_targets,
                             scoring="neg_mean_squared_error", cv=5)
print(scores)
print(f"Mean is {scores.mean()}")
print(f"Standard deviation is {scores.std()}")
~~~


Output:

    [-4.21900535 -3.27126449 -3.13457551 -3.14451502 -3.38513429]
    Mean is -3.430898932367797
    Standard deviation is 0.40460168118423745


As you can see, the cross validation scores are negative. So the bigger they are, the better.



# Comparison to earlier validation-error estimate
{: style="text-align: center; background-color: #ccd9ff"}

The mean squared error on our test-data set from [earlier](https://nivbhaskhar.github.io/2020/09/01/decision_tree_regressor.html) was 3.13. (We reported the root-mean square error to be around 1.77). We see that the average cross validation score is -3.43, or the average mean-square error of test-datasets across the $$k=5$$ folds is 3.43.

The average of the cross-validation score gives a much better estimate of the error, as it uses every element in the dataset as a test-input (exactly once in some fold). 

# Predictions
{: style="text-align: center; background-color: #ccd9ff"}

The syntax for cross validation predictions over $$k$$ folds is 


```cross_val_predict(model, features, labels, cv=k)```

Note that every input datapoint is part of exactly one test-data split in exactly one fold. *cross_val_predict* returns this prediction for every input datapoint for when it was part of the test-dataset. 


Code:
~~~python
predictions = cross_val_predict(tree_reg, weather_features, precipitation_labels, cv=5)
print(predictions.shape)
print(predictions[:10])

~~~

Output:




    (1866,)
    array([16.495     , 17.51790123, 16.495     , 17.51790123, 17.51790123,
           17.51790123, 17.51790123, 16.495     , 16.495     , 17.51790123])







Footnotes
{: style="color: blue"}

[^1]: A slight technicality that you'll see later on in the post - the cross validation scores are thought of as the values taken on by the utility function. That is, the bigger the scores, the better. So we try to maximize cross validation scores, or at least scikit-learn does. However, errors have to be minimized. So usually, cross validation scores are taken to be the negative of the errors.
[^2]: See footnote 1.






  
  
  
 
















  


