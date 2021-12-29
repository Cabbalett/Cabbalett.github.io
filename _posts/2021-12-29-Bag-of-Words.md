---
title: "[Bag-of-Words]"
excerpt: "자연어를 처리하는 가장 간단한 모델 중 하나인 Bag-of-Words와 이를 이용해 문서를 분류하는 Naive Bayes Classifier에 대해"
date:   2021-12-29 00:08:22 +0900
tags: [NLP]
classes: wide
toc: true
---

## Bag-of-Words Representation

아래 두 문장이 있다고 가정을 해보자.

    "I really really like this movie"
    "You really like this song"

두 문장에서 사용된 vocabulary를 정리하면 아래와 같다.

    {I, You, really, like, this, movie, song}

각각의 단어들을 one-hot vector로 encoding을 할 수 있다.

    I: [1 0 0 0 0 0 0]
    You: [0 1 0 0 0 0 0]
    really: [0 0 1 0 0 0 0]
    like: [0 0 0 1 0 0 0]
    this: [0 0 0 0 1 0 0]
    movie: [0 0 0 0 0 1 0]
    song: [0 0 0 0 0 0 1]

위와 같은 방식으로 단어들을 encoding 했을 때, 각 단어 간의 거리는 $\sqrt{2}$, 내적 값은 0으로 동일하게 계산될 수 있다.

이런 식으로 표현을 했을 때는 각 단어들 간의 관계가 모두 동일한 형식으로 표현이 된다.

Encoding한 vocabulary로 다시 문장을 표현하면:

1. "I really like this movie"
    
    [1 0 2 1 1 1 0]

2. "You really like this song"

    [0 1 1 1 1 0 1]

이를 bag-of-words vector라고 부른다.

## NaiveBayes Classifier

위의 bag-of-words vector로 나타낸 문서를 정해진 class로 분류하는 NaiveBayes classifier에 대해서 알아보자.

문서 $d$가 분류될 수 있는 class가 총 $c$개 라고 했을 때,

$$\begin{aligned}
c_{MAP} &=\underset{c \in C}{\operatorname{argmax}} P(c \mid d) \\
&=\underset{c \in C}{\operatorname{argmax}} \frac{P(d \mid c) P(c)}{P(d)} \\
&=\underset{c \in C}{\operatorname{argmax}} P(d \mid c) P(c)
\end{aligned}$$

문서 $d$가 특정 class가 될 수 있는 확률이 가장 큰 class를 $c_{MAP}$로 결정하는 형식이다.

$$P(d \mid c) \mathrm{P}(c)=P\left(w_{1}, w_{2}, \ldots, w_{n} \mid c\right) \mathrm{P}(c) \rightarrow \mathrm{P}(c) \prod_{w_{i} \in W} P\left(\mathrm{w}_{i} \mid c\right)$$

결국에 구해야 하는 것은 특정 class에 $w_1$부터 $w_n$까지 나올 수 있는 확률을 구해야 한다.

예를 들어, 다음과 같은 문서가 주어졌다고 가정해보자.

|          | Doc(d) | Document(w)                                           | Class(c) |
| -------- | ------ | ----------------------------------------------------- | -------- |
| Training | 1      | Image recognition uses convolutional neural networks  | CV       |
|          | 2      | Transformer can be used for image classification task | CV       |
|          | 3      | Language modeling uses transformer                    | NLP      |
|          | 4      | Document classification task is language task         | NLP      |
| Test     | 5      | Classification task uses transformer                  | ?        |

위와 같이 4개의 문장들이 각각 CV와 NLP class로 분류되어 있을 때, test 문장을 classify하는 예제를 생각해보자.

어떤 문서가 등장하기 이전에, 각 class가 등장할 수 있는 확률은 다음과 같다.

$$P(c_{CV})=\frac{2}{4}=\frac{1}{2}$$

$$P(c_{NLP})=\frac{2}{4}=\frac{1}{2}$$

Test 문장의 단어 $w_i$의 class $c$에 대한 conditional probability를 각각 계산을 하면 다음과 같다.

$$P(w_k|c_i) = \frac{n_k}{n}$$

이때 $n_k$는 class $c_i$의 문장들에서 단어 $w_k$의 빈도수다.

1. CV:
   
    | Word                                | Prob           |
    | ----------------------------------- | -------------- |
    | $P(w_{classification}\vert c_{CV})$ | $\frac{1}{14}$ |
    | $P(w_{task}\vert c_{CV})$           | $\frac{1}{14}$ |
    | $P(w_{uses}\vert c_{CV})$           | $\frac{1}{14}$ |
    | $P(w_{transformer}\vert c_{CV})$    | $\frac{1}{14}$ |

2. NLP

    | Word                                 | Prob           |
    | ------------------------------------ | -------------- |
    | $P(w_{classification}\vert c_{NLP})$ | $\frac{1}{10}$ |
    | $P(w_{task}\vert c_{NLP})$           | $\frac{2}{10}$ |
    | $P(w_{uses}\vert c_{NLP})$           | $\frac{1}{10}$ |
    | $P(w_{transformer}\vert c_{NLP})$    | $\frac{1}{10}$ |


따라서, test가 특정 class일 확률을 계산해보면,

$$\begin{aligned}
&P\left(\mathrm{c}_{\mathrm{CV}} \mid d_{5}\right)=\mathrm{P}\left(\mathrm{c}_{\mathrm{CV}}\right) \prod_{\mathrm{w} \in \mathrm{W}} P\left(\mathrm{w} \mid \mathrm{c}_{\mathrm{CV}}\right)=\frac{1}{2} \times \frac{1}{14} \times \frac{1}{14} \times \frac{1}{14} \times \frac{1}{14} \approx 0.00001 \\
&P\left(\mathrm{c}_{\mathrm{NLP}} \mid d_{5}\right)=\mathrm{P}\left(\mathrm{c}_{\mathrm{NLP}}\right) \prod_{\mathrm{w} \in \mathrm{W}} P\left(\mathrm{w} \mid \mathrm{c}_{\mathrm{NLP}}\right)=\frac{1}{2} \times \frac{1}{10} \times \frac{2}{10} \times \frac{1}{10} \times \frac{1}{10} \approx 0.0001
\end{aligned}$$

NaiveBayes classifier를 통해 test문장을 NLP class로 분류하는 것을 확인할 수 있다.