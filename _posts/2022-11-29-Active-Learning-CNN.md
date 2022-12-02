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

The task is going to be a $C$ class classification problem, where the data is from the space $Z=X\times Y$, where $X$ is an $d$-dimensional space and $Y={1,\cdots,C}$. Then, an arbitrary loss function can be defined as $l(\cdot,\cdot;\bold{w}):X\times Y\rarr R$, where $\bold{w}$ is the parameters of the deep learning model. The authors also define the class-specific regression function $\eta_c(\bold{x})=p(y=c|\bold{x})$ that is $\lambda^\eta$-Lipschitz continuous for all $c$.

Then, we can define the dataset as the collection of i.i.d. sampled points from the space $Z$, which can be represented as $\{\bold{x}_i,y_i\}_{i\in[n]}\sim p_Z$, where $[n]=\{1,\cdots,n\}$.

The key aspect of the active-learning setting is that we only have access to some of the dataset, and the model must query the samples to be labelled. To express this concept, we define a new index as, $\bold{s}^k=\{s^k(j)\in [n]\}_{j\in[m]}$. Where $k$ means the $k$-th iteration.

### Batch Selection

From the definition of the available data, when we have the learning algorithm $A_{\bold{s}}$, which outputs the parameter $\bold{w}$ from the labelled set $\bold{s}$, the total budget $b$, which means that the algorithm can choose at maximum $b$ additional points to be labelled, the algorithm for identifying the query set can be defined as follows.

$$
\min _{\mathbf{s}^{k+1}:\left|\mathbf{s}^{k+1}\right| \leq b} E_{\mathbf{x}, y \sim p_{\mathcal{Z}}}\left[l\left(\mathbf{x}, y ; A_{\mathbf{s}^0 \cup \ldots \mathbf{s}^{k+1}}\right)\right]
$$

Here, $l$ can be an arbitrary loss. Also for training the model $A_{\bold{s}}$, you can choose two different methods.
1. Fully-supervised: Train the model using only the labelled data points.
2. Weakly-supervised: Train the model using the non-labelled points as well as the labelled ones.

### Active Learning

In case of the classical active learning, the budget $b$ is 1, which means that it selects single data points to be labelled. However, when we apply it to CNN, using $b=1$ may not be suitable for meaningful training results, for the following problems.

1. single point will not be statistically significant due to gradient descent algorithms.
2. It is not sufficient to repeat the training for every data point, when the tasks becomes a large scale setting.

$$
\begin{aligned}
E_{\mathbf{x}, y \sim p_{\mathcal{Z}}}\left[l\left(\mathbf{x}, y ; A_{\mathbf{s}}\right)\right] & \leq \underbrace{\left|E_{\mathbf{x}, y \sim p_{\mathcal{Z}}}\left[l\left(\mathbf{x}, y ; A_{\mathbf{s}}\right)\right]-\frac{1}{n} \sum_{i \in[n]} l\left(\mathbf{x}_i, y_i ; A_{\mathbf{s}}\right)\right|}_{\text {Generalization Error }}+\underbrace{\frac{1}{|\mathbf{s}|} \sum_{j \in \mathbf{s}} l\left(\mathbf{x}_j, y_j ; A_{\mathbf{s}}\right)}_{\text {Training Error }} \\
&+\underbrace{\left|\frac{1}{n} \sum_{i \in[n]} l\left(\mathbf{x}_i, y_i ; A_{\mathbf{s}}\right)-\frac{1}{|\mathbf{s}|} \sum_{j \in \mathbf{s}} l\left(\mathbf{x}_j, y_j ; A_{\mathbf{s}}\right),\right|}_{\text {Core-Set Loss }}
\end{aligned}
$$


### Meta-evaluation

During the testing phase, the model will be freezed, and only the classification head will be trained, which can be represented as below, where the train-able parameter is only $W$ and $b$, with some regularization.

$$
\theta=\underset{\{\boldsymbol{W}, \boldsymbol{b}\}}{\arg \min } \sum_{t=1}^T \mathcal{L}_t^{c e}\left(\boldsymbol{W} f_\phi\left(\mathbf{x}_t\right)+\boldsymbol{b}, y_t\right)+\mathcal{R}(\boldsymbol{W}, \boldsymbol{b})
$$

### Sequential Self-distillation

The authors also used knowledge-distillation method to increase the performance, which trains the weighted sum of the cross-entropy loss of the original dataset and the KL divergence between predictions and soft labels from the parent model. We can repeat this process sequentially to perform sequential self-distillation. Using this method, the model is able to capture the metric distance between classes.

$$
\begin{aligned}
\phi_k=\underset{\phi}{\arg \min }(& \alpha \mathcal{L}^{c e}\left(\mathcal{D}^{n e w} ; \phi\right)+\\
&\left.\beta K L\left(f\left(\mathcal{D}^{n e w} ; \phi\right), f\left(\mathcal{D}^{n e w} ; \phi_{k-1}\right)\right)\right)
\end{aligned}
$$

The coefficient $\beta$ usually has the relation $\beta = 1-\alpha$.

## Experiments

To conduct a proper experiment, they used the ResNet12 as their backbone to produce embeddings. They conducted series of experiments to investigate the following arguments.

- Prove that only generating good-quality embedding is enough for few-shot classification
- Using self-distillation can further improve the performance
- Instead of using the classic supervised training, just using the self-supervised method is sufficient to generate good embedding.

## Results

### Baseline & Self-distillation

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/204145118-96b3c1dd-479d-4bee-9e4e-3de506ad5ffc.png" width = "90%"></p>

From the results, we can see that the simple baseline is comparable with the SOTA performances on both dataset. Moreover, the self-distillation version of the model exceeds all of the performances by 2-3%. From this result, we can know that just my using simple cross-entropy training is sufficient to generate good-quality embeddings or few-shot learning task.

### Self-supervised training

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/204145802-2139be5b-89b5-4ebc-9c17-25145459688c.png" width = "40%"></p>

Using the SOTA method of self-supervised training, you can see that the performance drop is not that big on the 1-shot classification task, and almost identical in the 5-shot case.

## Conclusion

From this paper, we found out that just by using the simple embedding model can outperform the current SOTA performances. Also combined with self-distillation, the performance can improve by 2-3%. However we must acknowledge that this paper is not denying the possibility of meta-learning's performance, but negating the use of meta-learning in the few-shot classification.

## References

Y. Tian, Y. Wang, D. Krishnan, J. B. Tenenbaum, και P. Isola, ‘Rethinking Few-Shot Image Classification: a Good Embedding Is All You Need?’ arXiv, 2020.

## Further References

These are the references for me, to study more in detail about active-learning.

1. Possibility of universally good active learning strategy ([Dasgupta, 2004](http://papers.nips.cc/paper/2636-analysis-of-a-greedy-active-learning-strategy.pdf))
2. Active Learning Survey ([Settles, 2010](https://burrsettles.com/pub/settles.activelearning.pdf))
3. uncertainty based active-learning ([Li&Guo, 2013](https://www.cv-foundation.org/openaccess/content_cvpr_2013/papers/Li_Adaptive_Active_Learning_2013_CVPR_paper.pdf))