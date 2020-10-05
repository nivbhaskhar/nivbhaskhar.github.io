---
layout: post
title: "Mean and Variance"
date: 2020-08-26 08:53:21 -0700
tags: [Statistics]
---



# One dimensional data
{: style="text-align: center; background-color: #ccd9ff"}

Let's assume we are working with a dataset whose data-points $$x_1, x_2, \ldots, x_N$$  are one dimensional.

The *mean*{: style="color: blue"} of the dataset is defined to be 
> $$\mu = \frac{x_1 + x_2 + \ldots x_N}{N}.$$ 
{: title="mean"}


The *variance*{: style="color: blue"} is defined to be 
>$$\sigma^2 = \frac{(x_1-\mu)^2 + (x_2-\mu)^2 + \ldots (x_N-\mu)^2}{N}.$$ 
{: title="variance"}


Code:

~~~ python
#imports
import numpy as np

#x is the 1-d numpy array of your 1 dimensional datapoints
x = np.array([1,2,3,4,-1,-2,-3,-4])

print(f" The mean is {x.mean()}")
print(f" The mean is also given by {np.mean(x)}")
print(f" The variance is {x.var()}")
print(f" The variance is also given by{np.var(x)}")
~~~

Output:


     The mean is 0.0
     The mean is also given by 0.0
     The variance is 7.5
     The variance is also given by 7.5





# Higher dimensional data
{: style="text-align: center; background-color: #ccd9ff"}


Say now we are working with a dataset whose data-points $$x_1, x_2, \ldots, x_N$$  are $$d$$ dimensional, i.e. each $$x_i$$ is a $$d\times 1$$ column vector.


The *mean*{: style="color: blue"} of the dataset is defined to be 
> $$\mu = \frac{x_1 + x_2 + \ldots x_N}{N}.$$ 
{: title="mean"}


The *covariance matrix*{: style="color: blue"} is defined to be 
>$$S= \frac{(x_1-\mu)(x_1-\mu)^T + (x_2-\mu)(x_2-\mu)^T + \ldots (x_N-\mu)(x_N-\mu)^T}{N}.$$ 
{: title="covariance-matrix"}


Note that since $$x_i, \mu$$ have shape $$d\times 1$$, $$(x_i-\mu)(x_i-\mu)^T$$ has shape $$d\times d$$. Thus the covariance matrix $$S$$ is a $$d\times d$$ matrix. 



# A more compact formula
{: style="text-align: center; background-color: #ccd9ff"}


To make the definition of the variance neater, let's assemble our data-points into a $$d\times N$$ matrix $$X$$.

$$X= \left(
 \begin{array}{cccc}
. & . & \ldots & . \\
. & . & \ldots & . \\
x_1 & x_2 & \ldots & x_N \\
. & . & \ldots & . \\
. & . & \ldots & . \\
\end{array}\right)$$

Define $$\tilde{X} = X-\mu$$, i.e. subtract $$\mu$$ from every column of $$X$$.

$$\tilde{X}= \left(
 \begin{array}{cccc}
. & . & \ldots & . \\
. & . & \ldots & . \\
x_1-\mu & x_2-\mu & \ldots & x_N-\mu \\
. & . & \ldots & . \\
. & . & \ldots & . \\
\end{array}\right)$$


By some matrix manipulation[^1], the covariance matrix turns out to be nothing but
> $$S = \frac{1}{N}\tilde{X}\tilde{X}^T$$


# Computation
{: style="text-align: center; background-color: #ccd9ff"}


Say we have 3 data-points, each of which is two-dimensional. Then we can represent the dataset as 

> $$X = \left(\begin{array}{ccc}1 & -1 & 1 \\ 2 & -2 & 2 \end{array}\right)$$


The mean would be 
> $$\mu = \left(\begin{array}{c}\frac{1 + -1 + 1}{3} \\ \frac{2 + -2 + 2}{3} \end{array}\right) = \left(\begin{array}{c}\frac{1}{3} \\ \frac{2}{3} \end{array}\right)$$


Further, 
$$\tilde{X} = \left(\begin{array}{ccc}1- \frac{1}{3} & -1 - \frac{1}{3} & 1-\frac{1}{3} \\ 2-\frac{2}{3} & -2-\frac{2}{3} & 2-\frac{2}{3} \end{array}\right) = \left(\begin{array}{ccc}\frac{2}{3} & - \frac{4}{3} & \frac{2}{3} \\ \frac{4}{3} & -\frac{8}{3} & \frac{4}{3} \end{array}\right) $$

The covariance-matrix would be $$\frac{1}{N}\tilde{X}\tilde{X}^T$$ which is 
> $$\begin{align*} S &= \frac{1}{3}\left(\begin{array}{ccc}\frac{2}{3} & - \frac{4}{3} & \frac{2}{3} \\ \frac{4}{3} & -\frac{8}{3} & \frac{4}{3} \end{array}\right)\left(\begin{array}{cc}\frac{2}{3} & \frac{4}{3} \\ -\frac{4}{3} & -\frac{8}{3} \\  \frac{2}{3} & \frac{4}{3} \end{array}\right)\\ & = \frac{1}{3}\left(\begin{array}{cc}\frac{24}{9} & \frac{48}{9} \\ \frac{48}{9} & \frac{96}{9} \end{array}\right) \\
& =  \left(\begin{array}{cc}\frac{8}{9} & \frac{16}{9} \\ \frac{16}{9} & \frac{32}{9} \end{array}\right)\end{align*} $$



Code:

~~~ python
#imports
import numpy as np

#x is the d x N numpy array of your d-dimensional datapoints
x = np.array([[1,-1,1], [2,-2,2]])

print(f" The mean is  {np.mean(x, axis=1)}")
print(f" The covariance matrix is {np.cov(x,bias=True)}")
~~~

Output:


     The mean is [0.33333333 0.66666667]
     The covariance matrix is  
     [[0.88888889 1.77777778]
      [1.77777778 3.55555556]]



# Caution
{: style="text-align: center; background-color: #ccd9ff"}


* When you input the dataset as a numpy array (think of it as a list $$L$$ of lists $$r_i$$), each $$r_i$$ is the list of the $$i$$-th coordinates of the data-points. The size of $$L$$ which is the number of $$r_i$$s would be the dimension of the data-points, while the size of each $$r_i$$ would be the number of data-points


* The $$i$$-coordinate of each data-point can be thought of as the value of the $$i$$-th attribute for the datapoint. Thus dimension of the data-point is the number of attributes. 
Some people might refer to the attributes as $$x_1,x_2,\ldots$$. So take a moment to look at the notations used!


* By default, bias is set to False in np.cov. This would give the so-called *sample-covariance matrix*. If you want the usual covariance, remember to set bias=True

# Symmetry
{: style="text-align: center; background-color: #ccd9ff"}

Notice that the covariance matrix in the previous example is symmetric. This is in fact true for every covariance matrix. Why ?

Well, a matrix $$M$$ is symmetric provided $$M=M^T$$. The covariance matrix looks like $$S = \frac{1}{N}\tilde{X}\tilde{X}^T$$. Then,

$$S^T = \frac{1}{N}\left(\tilde{X}\tilde{X}^T\right)^T = \frac{1}{N} (\tilde{X}^T)^T\tilde{X}^T = S !$$

Et voila!


&nbsp;

Footnotes
{: style="color: blue"}

[^1]: $$\begin{align*} \tilde{X}\tilde{X^T} &= \sum_{i=1}^{N}  \left(\begin{array}{ccccc} \overline{0} &  \ldots &  \overline{0} & x_i-\mu & \overline{0} \ldots & \overline{0} \\ \end{array}\right)\tilde{X}^T  \\  & = \sum_{i=1}^N \left(\begin{array}{ccccc} \overline{0} &  \ldots &  \overline{0} & x_i-\mu & \overline{0} \ldots & \overline{0} \end{array}\right)\left[\sum_{j=1}^{N} \left(\begin{array}{c} \overline{0} \\  \ldots \\ \overline{0} \\ (x_j-\mu)^T \\ \overline{0}^T \\ \ldots \\ \overline{0}^T \end{array}\right) \right] \\ &= \sum_{i=1}^{N} (x_i-\mu)(x_i-\mu)^T  = NS \end{align*}$$





  
  
  
 
















  


