---
title: "[Rethinking Few-Shot Image Classification: a Good Embedding is All You Need?]"
excerpt: "Paper about criticizing the recent meta-learning research"
date:   2022-11-27 10:17:22 +0900
tags: ['Machine Learning','Paper Review','Meta Learning','Deep Learning']
classes: wide
toc: true
---

## Motivation

Recent studies of the meta-learning was focused on developing new algorithms, based on either metric-based, or optimization-based methods. A ProtoNet is an example of metric-based meta-learning, and MAML is the optimization-based method. This paper proposes that simply learning a supervised or self-supervised representation on the aggregated meta-training set, then training just the classifier head for every episode of meta-test set can easily outperform the SOTA few-shot learning algorithms. Also, they used knowledge-distillation method that increased around 2-3% of their baseline model.

## Background

Before we move on to the actual experiment, we formalize the problem.

### Dataset

- Meta-training set: The total distribution of meta-training set is defined as follows.

$$T = \{(D_i^{train}, D_i^{test})\}_{i=1}^I$$

- Training set: each element of training examples can be defined as follows.

$$D^{train} = \{(\boldsymbol{x_t}, y_t)\}_{t=1}^T$$

- Test set: each element of test examples can be defined as follows.

$$D^{test} = \{(\boldsymbol{x_q}, y_q)\}_{q=1}^Q$$

Each training and test set elements tuple needs to be sampled from the same distribution of the dataset.

I will neglect the part of the meta-learning algorithm, since it's not the method the paper is using.

### Learning the embedding

unlike using the each episode during training, denying the performance of previous meta-learning method, the authors focus on making a better-quality embedding. Therefore, they proposed a new method, which pre-trains a model on a classification task. Therefore, the dataset for this method is as follows, which means the new dataset is the result of merging all of the meta-training set.

$$
\begin{align*}
D^{new}&=\{(\boldsymbol{x_i},y_i)\}_{k=1}^K\\
&=\cup\{D_1^{train},\cdots, D_I^{train}\}
\end{align*}
$$

The classification loss will be the cross-entropy loss.

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