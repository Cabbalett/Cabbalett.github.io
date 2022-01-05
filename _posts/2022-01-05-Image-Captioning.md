---
title: "[Image Captioning]"
excerpt: "Multi-modal Learning task 중 하나인 image captioning에 대해"
date:   2021-12-31 00:08:22 +0900
tags: [NLP, CNN]
classes: wide
toc: true
---

## Image Captioning

Cross modal translation의 예시 중 하나인 image captioning은 input으로 image가 주어졌을 때 그 image를 잘 서술해주는 text sequence를 출력해주는 task이다.

    image-to-sentence

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148149418-1911e722-de50-4686-8f2b-c51a01d45e5b.png" width = "70%"></p>

이런 문제의 경우에 Image에 대한 정보를 처리할 때는 CNN architecture, 그 처리된 정보를 text sequence를 처리할 때는 RNN architecture를 사용하는 것이 적합하다. 

### Show and Tell

Image가 들어왔을 때, 이를 RNN에 input으로 넣어줄 수 있는 fixed-dimentional vector를 만들기 위해서 CNN 기반의 architecture를 encoder로 사용한다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148149596-b547715c-84bb-41a5-be09-a033818b06a2.png" width = "70%"></p>

그 후, input vector와 시작 token을 받아 sentence를 형성하는 LSTM module을 decoder로 사용한다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148149627-3d700cc8-529f-41d3-a75e-276f052c61f5.png" width = "50%"></p>

이 방식을 show and tell 방식이라고 한다.


### Show, attend and tell

앞서 소개했던 show and tell 방식은 image 전체를 한번에 sentence로 번역하는 pipeline을 가지고 있다.

하지만, 아래의 사진과 같이 woman이라는 단어를 예측하기 위해서 image 전체 보다는 국지적인 부분에 대한 정보를 통해 예측하게 된다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148150508-0a03db27-587b-4985-b7d4-5fe3e1d506d4.png" width = "60%"></p>

    매 time step마다 사진의 국지적인 중요도를 계산하는 것이 더 정확한 translation을 이뤄낼 수 있다.

#### Pipeline

1. Input image를 convolution feature를 뽑기 위해 CNN architecture model에 넣어준다. 이때 Show and tell 방식과 같이 fixed dimension feature vector를 뽑는 것이 아닌, 공간 정보를 포함하고 있는 feature map 형태로 출력을 한다.
2. 이 feature map을 RNN에 넣어주어, 매번 word를 생성할 때마다 feature map을 referencing 하여 어떤 단어를 뽑고, 다음에는 어디를 중요도 있게 봐야하는 지를 예측을 하며 sentence를 생성한다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148150541-e72bc521-b082-45b0-bfec-7c09f135ac09.png" width = "60%"></p>

### Attention의 Ideology

사람은 아래와 같은 사진을 인식할 때 pixel 순서대로 살펴보지 않는다. 아래쪽의 그림은 사람의 attention, 즉 시선이 사진 속 어디를 바라보고 있는 지를 표현한 그림이다.

    주변의 특징들부터 훑어보는 특징을 attention mechanism으로 발전시킨 것이다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148184343-c394f1c0-f440-4df6-bea1-ff8fefe452d2.png" width = "40%"></p>

#### Attention Mechanism

1. $a$라는 CNN model을 통과한 spatial feature가 들어오게 되면, RNN에 condition으로 입력하여 어디를 referencing을 해야하는 지 heatmap을 뽑아낸다. 

2. Heatmap과 feature map을 잘 결함해 $z$라는 새로운 vector를 만들어주면서 soft-attention embedding(weighted sum)을 하게 된다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148184373-c28dfff8-26b5-4d44-95fd-876ca049a306.png" width = "50%"></p>

### Detailed Algorithm

1. Image를 CNN architecture model을 통해 spatial information이 남아있는 feature map 형태로 뽑아낸 후, 이를 LSTM의 condition으로 제공한다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148185692-0dc71fea-31f3-4488-bf1b-e6f1e2e655fc.png" width = "60%"></p>

2. 어느 부분에 attention을 줄 지 spatial attention을 weight 형태 $s_1$으로 출력한다. 그 후, feature map과 inner product를 통해 $z_1$을 생성한다.

$$ z = \sum_{i=1}^L s_i a_i $$

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148185740-59c8bcb7-a36f-4e7d-827b-d58e48ea7cdb.png" width = "50%"></p>

3. $z_1$과 start word token $y_1$을 LSTM의 input으로 넣어주어 어떤 단어가 나와야 할지 $h_1$이 그 정보를 담게 된다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148185782-7f93841d-964b-4fc0-ab45-4dc96567341f.png" width = "50%"></p>

4. $h_1$이라는 hidden state vector에서 새로운 attention map $s_2$를 생성하여 feature map과 weighted sum을 통해 새로운 vector $z_2$를 생성한다. 또한, $d_1$을 통해 첫 단어를 생성한다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148185831-44c81fc4-415f-41a4-aae5-17cf62db31a9.png" width = "60%"></p>

5. 이전에 출력했던 단어를 $y_2$ vector로 넣어준다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148185864-de655521-8612-42fd-a0fe-47bfaa90262a.png" width = "60%"></p>

6. Step 4를 반복하여 새로운 단어를 다시 출력한다. 

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148185914-d22a4c64-a93c-470b-b8f2-eb32b94d6aaa.png" width = "60%"></p>

### Results and Implementation

앞서 소개했듯이, LSTM의 condition으로 spatial information이 담겨 있는 feature map을 넣어주게 된다. 예를 들어서 $14 \times 14 \times 2048$의 feature map이 condition으로 주어지게 된다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148188826-a8f2d5bd-4c3c-403a-a7e6-c0dea10a600f.png" width = "60%"></p>  

#### Beam Search

결국 RNN 구조의 decoder가 word classifier이라고 생각할 수 있는데, 만약 매 time step 마다 best score의 word만을 계속해서 선택하게 되면, 최종 결과물로 봤을 때는 그 성능이 좋지 못할 수 있다. 예를 들어, "a"라는 단어가 "an"이라는 단어보다 더 score가 높다고 하더라도, 뒤에 나오는 단어가 "owl"이라는 단어라면, "a"보다는 "an"이 더 정확한 문장이 될 것이다.

따라서, best score만을 선택하는 것이 아닌, 확률이 어느정도 높은 sequence들을 계속 기억하면서 최적의 sentence를 찾는 beam search algorithm이 제시되었다.

Beam search는 매 step 별로 top K(아래의 예시에서는 $K=3$) sequence를 찾게 된다. 예를 들어 아래의 그림의 첫번째 step에서는 "an", "a", "oh"가 top 3 sequence인데, 다음 step의 top 3를 결정하기 위해서 RNN model에 3가지 input을 모두 넣어서 나올 수 있는 top 3 sequence를 각각 뽑아낸다. 그 중에서 top 3(9개에서 3개)를 다시 간추리는 algorithm이다. 그런 식으로 "an man", "a god", "a man"을 뽑아낸 것이다. 이를 매 time step마다 반복한다.

이를 반복하다 end token이 나오게 되면, 그때 하나의 sentence 후보가 결정되는 것이고 score도 정해진다. 그 뒤에 모든 sentence 후보들 중에 가장 score가 높은 sentence를 최종 translation으로 결정하는 것이다.

<p style="text-align:center;"><img src="https://user-images.githubusercontent.com/79649470/148188872-6f472f9f-ca17-4831-83f8-deb263cf086d.png" width = "60%"></p>


## References

1. https://arxiv.org/abs/1502.03044
2. https://www.cv-foundation.org/openaccess/content_cvpr_2015/html/Vinyals_Show_and_Tell_2015_CVPR_paper.html
3. https://github.com/sgrvinod/a-PyTorch-Tutorial-to-Image-Captioning