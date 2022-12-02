---
title: "[Active Learning for Convolutional Neural Networks: A Core-set Approach]"
excerpt: "Paper review"
date:   2022-11-29 10:17:22 +0900
tags: ['Machine Learning','Paper Review','Active Learning','Deep Learning']
classes: wide
toc: true
---

## Motivation

A down-side of using convolutional neural networks is that they need a lot of labeled data, which is expensive. A concept called active-learning was introduced to solve this kind of problem, where it enables to choose images out of the large sample space to be labelled, that can maximize the effect of training. The authors argue that using past literature(up to 2018) is not suitable for a CNN-based model environment. Instead of choosing just one data point per iteration, they treat the problem as a **core-set selection**, where each iteration is consisted of selecting a subset that is expected to gain the best training performance.

## Background

Active learning is a method that can choose some set of data points to be labeled out of those who aren't. Former researches have shown that it is impossible to obtain an universally good active learning strategy. However, there are some heuristics that can form a strategy for subset-selection. Before we move on to the experiment, we formalize our problem.

### Dataset

The task is going to be a $C$ class classification problem, where the data is from the space $Z=X\times Y$, where $X$ is an $d$-dimensional space and $ Y=\\{1,\cdots,C\\} $. Then, an arbitrary loss function can be defined as $l(\cdot,\cdot;\textbf{w}):X\times Y\to R$, where $\textbf{w}$ is the parameters of the deep learning model. The authors also define the class-specific regression function $\eta_c(\textbf{x})=p(y=c\mid\textbf{x})$ that is $\lambda^\eta$-Lipschitz continuous for all $c$.

Then, we can define the dataset as the collection of i.i.d. sampled points from the space $Z$, which can be represented as $ \\{ \textbf{x}_i,y_i \\} _{i\in[n]}\sim p_Z$, where $ [n]= \\{ 1,\cdots, n \\} $.

The key aspect of the active-learning setting is that we only have access to some of the dataset, and the model must query the samples to be labelled. To express this concept, we define a new index as, $ \textbf{s}^k= \\{ s^k(j)\in [n] \\} _{j\in[m]}$ . Where $k$ means the $k$-th iteration.

### Batch Selection

From the definition of the available data, when we have the learning algorithm $A_{\textbf{s}}$, which outputs the parameter $\textbf{w}$ from the labelled set $\textbf{s}$, the total budget $b$, which means that the algorithm can choose at maximum $b$ additional points to be labelled, the algorithm for identifying the query set can be defined as follows.

$$
\min _{\mathbf{s}^{k+1}:\left|\mathbf{s}^{k+1}\right| \leq b} E_{\mathbf{x}, y \sim p_{\mathcal{Z}}}\left[l\left(\mathbf{x}, y ; A_{\mathbf{s}^0 \cup \ldots \mathbf{s}^{k+1}}\right)\right]
$$

Here, $l$ can be an arbitrary loss. Also for training the model $A_{\textbf{s}}$, you can choose two different methods.
1. Fully-supervised: Train the model using only the labelled data points.
2. Weakly-supervised: Train the model using the non-labelled points as well as the labelled ones.

### Active Learning

In case of the classical active learning, the budget $b$ is 1, which means that it selects single data points to be labelled. However, when we apply it to CNN, using $b=1$ may not be suitable for meaningful training results, for the following problems.

1. single point will not be statistically significant due to gradient descent algorithms.
2. It is not sufficient to repeat the training for every data point, when the tasks becomes a large scale setting.

Therefore, the authors considered applying the active learning as the core-set problem, where the model queries the next data points to be labelled as a batch.

To further analyze the optimization problem from above, the authors considered the upper bound of the problem.

$$
\begin{aligned}
E_{\mathbf{x}, y \sim p_{\mathcal{Z}}}\left[l\left(\mathbf{x}, y ; A_{\mathbf{s}}\right)\right] & \leq \underbrace{\left|E_{\mathbf{x}, y \sim p_{\mathcal{Z}}}\left[l\left(\mathbf{x}, y ; A_{\mathbf{s}}\right)\right]-\frac{1}{n} \sum_{i \in[n]} l\left(\mathbf{x}_i, y_i ; A_{\mathbf{s}}\right)\right|}_{\text {Generalization Error }}+\underbrace{\frac{1}{|\mathbf{s}|} \sum_{j \in \mathbf{s}} l\left(\mathbf{x}_j, y_j ; A_{\mathbf{s}}\right)}_{\text {Training Error }} \\
&+\underbrace{\left|\frac{1}{n} \sum_{i \in[n]} l\left(\mathbf{x}_i, y_i ; A_{\mathbf{s}}\right)-\frac{1}{|\mathbf{s}|} \sum_{j \in \mathbf{s}} l\left(\mathbf{x}_j, y_j ; A_{\mathbf{s}}\right),\right|}_{\text {Core-Set Loss }}
\end{aligned}
$$


The expression above is the upper bound since the right side of the relation includes absolute operators. Again, the optimization target can be informally described as: the average loss(risk) of the model trained via $\textbf{s}$ labelled data points. As considered above, the total error can be divided into: Generalization, Training and Core-Set Loss.

1. Generalization Loss: How well the model generalizes; How well the model generalizes on the unseen data. This loss can be described the difference of error between the actual distribution of the data and the average loss of the dataset.
2. Training Error: Error of the model only on the labelled dataset $\textbf{s}$.
3. Core-Set Loss: Difference of between the average loss over the entire dataset and the average loss over the labelled dataset $\textbf{s}$.

The authors mention that CNNs are highly expressive and theoretically shown to be bounded by previous researches, which makes generalization and training error will be expected to be small. Therefore, the important part of the expression above will be the core-set loss. From this, the authors re-define the optimization problem as finding $\textbf{s}^{k+1}$ that satisfies:

$$
\min _{\mathbf{s}^{k+1}:\left|\mathbf{s}^{k+1}\right| \leq b}\left|\frac{1}{n} \sum_{i \in[n]} l\left(\mathbf{x}_i, y_i ; A_{\mathbf{s}^0 \cup \ldots \mathbf{s}^{k+1}}\right)-\frac{1}{\left|{\mathbf{s}^0 \cup \ldots \mathbf{s}^{k+1}}\right|} \sum_{j \in {\mathbf{s}^0 \cup \ldots \mathbf{s}^{k+1}}} l\left(\mathbf{x}_j, y_j ; A_{\mathbf{s}^0 \cup \ldots \mathbf{s}^{k+1}}\right)\right|
$$

Informally explaining, we are trying to find a subset $\textbf{s}^{k+1}$ when the model trained on it generates the loss closest to the case where the model is trained with all of the dataset(label provided).

### Details of the Objective Function

However, the optimization target above is not computable, since we will not be able to generate the comparative model, which is trained with all of the dataset. For example, the labels that are not in $\textbf{s}^k$ will not be provided during training-time. Therefore, the authors come up with an greedy algorithm to optimize to the upper bound of the objective function.

I still have to fully understand the proof of the following theorem, therefore will informally describe what the theorem is about.

$$
\begin{align}
\left|\frac{1}{n} \sum_{i \in[n]} l\left(\mathbf{x}_i, y_i ; A_{\mathbf{s}}\right)-\frac{1}{|\mathbf{s}|} \sum_{j \in \mathbf{s}} l\left(\mathbf{x}_j, y_j ; A_{\mathbf{s}}\right)\right| &\leq \delta\left(\lambda^l+\lambda^\mu L C\right)+\sqrt{\frac{L^2 \log (1 / \gamma)}{2 n}}\\
\frac{1}{n} \sum_{i \in[n]} l\left(\mathbf{x}_i, y_i ; A_{\mathbf{s}}\right) &\leq \delta\left(\lambda^l+\lambda^\mu L C\right)+\sqrt{\frac{L^2 \log (1 / \gamma)}{2 n}}
\end{align}
$$

From the previous discussions, we can understand that the objective function can change as the left hand side of the relation. Here we assume that there are zero training error, which means that $l\left(\textbf{x}_j, y_j; A_s\right)$ will always be zero where $j\in\textbf{s}$, making the relation (1) equal to (2).

There are further assumption of the theorem. 
- The loss function $l(\cdot,y,A_{\textbf{s}})$ is a $\lambda^l$-Lipschitz continuous for all $y$ and $A$ and bounded by $L$. 
- $\textbf{s}$ is $\delta_{\textbf{s}}$ cover of $ \\{ \textbf{x}_i, y_i \\} _{i\in[n]} $.
  - This means that a set of "balls" with the radius $\delta_{\textbf{s}}$ will cover the entire dataset.

Following these assumption, we can define the upper bound for the objective function, making it bound to the radius and a term inversely proportional to $n$. From this, we now know selecting the new $s^{k+1}$ reduces the covering radius.

The image below depicts the concept of our objective function.

<!-- <p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/205305559-fa9f0d24-997d-4a61-bd66-14c6fcc56458.png" width = "60%"></p> -->

Now we must prove that any loss function from the CNN based model has a Lipschitz-continuity. I still have to fully understand the process of proving the following lemma, but according to the authors, the following lemma is true.

*Lemma 1*. Loss function defined as the 2-norm between the class probabilities and the softmax output of a convolutional neural network with $n_c$ convolutional (with max-pool and ReLU) and $n_{f c}$ fully connected layers defined over C classes is $\left(\frac{\sqrt{C-1}}{C} \alpha^{n_c+n_{f c}}\right)$-Lipschitz function of input for fixed class probabilities and network parameters.

Using *Lemma 1*, we justify our upper bound and proceed to even simplify our problem as minimizing the radius.

$$
\min _{\mathbf{s}^{k+1}:\left|\mathbf{s}^{k+1}\right| \leq b}\delta_{\mathbf{s}^0 \cup \ldots \mathbf{s}^{k+1}}
$$

Which is a equivalent to solving the k-Center problem.

### Solving the k-Center Problem

The informal definition of the k-Center problem applied to our tasks is: to choose $b$ center points that minimizes the largest distance between a data point and its nearest center. The formal definition can be expressed as follows.

$$
\min _{\mathbf{s}^{k+1}:\left|\mathbf{s}^{k+1}\right| \leq b} \max _i \min _{\mathbf{s}^0 \cup \ldots \mathbf{s}^{k+1}} \Delta\left(\mathbf{x}_i, \mathbf{x}_j\right)
$$

The inner $\min$ operator is to define the nearest center. This algorithm can be executed as a 2-OPT solution using the algorithm below.

<!-- <p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/205307500-8c004753-a837-4791-bf7b-fd6900c7150f.png" width = "40%"></p> -->

The authors also propose a Mixed integer program(MIP), but I couldn't understand fully how the algorithm works.

The authors used the l2-distance for the metric $\Delta(\cdot, \cdot)$.

## Experiments

The authors proved the loss function based on CNN architecture is Lipschitz continuous when the loss function is l2-norm. However, the actual experiment was performed by using the Cross-entropy loss, and propose that the resulting algorithm is still effective based on the experiments.

### Dataset

They used CIFAR and SVHN as their dataset.

## Results

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/205309134-a62c429f-1407-4d15-b1ad-a3b59e61dba7.png" width = "80%"></p>

From the results, we can say that the active learning algorithm has a novelty.

### Weakly-Supervised Learning

From the results above, we can see that the performance is even better when weakly-supervised learning was performed. The authors say that this is the case since weakly-supervised learning is capable of forming a better-quality feature space, which is highly related to the geometry-based optimization function.

### Uncertainty Oracle vs. Diversity Oracle

The image below shows the data points with different colors.

1. blue: initial labeled points
2. green: points that are chosen to be labelled
3. red: remainders

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/205310745-43be9eb4-9823-4a1a-86e7-c02154722c4d.png" width = "40%"></p>

You can see that the uncertainty-based active learning, which chooses the next set of data points in terms of how much the model is confused, is failing to cover the whole sample space.

## Conclusion

From this paper, I learned about how to apply active-learning problem in a core-set selection setting and the resulting performance exceeds the traditional uncertainty-based algorithms.

## References

O. Sener and S. Savarese, ‘Active Learning for Convolutional Neural Networks: A Core-Set Approach’. arXiv, 2017.

## Further References

These are the references for me, to study more in detail about active-learning.

1. Possibility of universally good active learning strategy ([Dasgupta, 2004](http://papers.nips.cc/paper/2636-analysis-of-a-greedy-active-learning-strategy.pdf))
2. Active Learning Survey ([Settles, 2010](https://burrsettles.com/pub/settles.activelearning.pdf))
3. uncertainty based active-learning ([Li&Guo, 2013](https://www.cv-foundation.org/openaccess/content_cvpr_2013/papers/Li_Adaptive_Active_Learning_2013_CVPR_paper.pdf))