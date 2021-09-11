---
layout: post
title: "Karush–Kuhn–Tucker conditions"
date: 2021-09-10 08:53:21 -0700
tags: [Optimization]
---


*Ref: Foundations of optimization by Bazaraa and Shetty ([link](https://www.springer.com/gp/book/9783540076803)), Chapter 5*

# The problem (A)
{: class="sectiontitle" }

Minimize $$f(x)$$ under the constraints $$x\in X$$ and $$g_i(x) \leq 0$$ for $$1\leq i\leq n$$, where
- $$X$$ is a subset of $$\mathbb{R}^n$$
- $$f,g_i$$ are functions $$U\to\mathbb{R}$$ for some open set $$U\supset X$$

# Feasible set, feasible solutions and optimal solutions
{: class="sectiontitle" }

- The set of points in $$\mathbb{R}^n$$ which satisfy the constraints make up the *feasible set* $$S$$
- Any $$x\in S$$ is called a *feasible solution* to (A)
- Any $$x^*\in S$$ such that $$f(x^*)$$ is minimum among $$\{f(x): x\in S\}$$ is called an *optimal solution* to (A)

# Necessary conditions for optimality
{: class="sectiontitle" }


In general, one would like to find optimal solutions to (A). However, let us flip the problem over instead and query the following: *What are some conditions that are necessary for a feasible $$x_0\in S$$ to be optimal ?*


Let's rephrase what it means for $$x_0$$ to be optimal. Let $$B=\{x\in S:f(x)-f(x_0) < 0\}$$. Clearly $$x_0$$ is optimal exactly when $$B=\emptyset$$. The idea then is to express $$B$$ as an intersection $$F\cap G\cap X$$ where,

- $$G=\cap G_i$$ where $$G_i = \{x: g_i(x)\leq 0\}$$ captures one portion of the constraints
- $$X$$ captures the other portion of the constraints
- $$F=\{x: f(x)<f(x_0)\}$$ captures all points which violate optimality of $$x_0$$

It is an easy check to see indeed that $$B=F\cap G\cap X$$. Thus $$x_0$$ is optimal exactly when $$F\cap G\cap X$$ is empty.

Let's get back to the necessary conditions for optimality. Assuming $$x_0$$ is optimal, we'll try to find convex sets $$F', G', X'$$ which are non intersecting (related to $$F,G,X$$). Once we have non-intersecting convex sets, we can invoke  [separation theorems](https://en.wikipedia.org/wiki/Hyperplane_separation_theorem) to get some necessary conditions for optimality! Let's try and make this idea more precise.
