---
layout: about
title: about
permalink: /
subtitle: 

profile:
  align: right
  image: prof_pic_color.jpg
  image_circular: true # crops the image to make it circular
  more_info: >
    <p>School of Computing, KAIST</p>
    <p>291 Daehak-ro</p>
    <p>Daejeon, South Korea</p>

news: true # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---

I am a PhD candidate in the [Data Mining Lab](https://dm.kaist.ac.kr/) at KAIST, advised by Prof. [Jae-Gil Lee](https://www.kaistdmlab.org/jaegil). My research interest is on data-centric AI for LLM post-training, studied along two axes: *how* we train on supervision so weak signals become useful learning, and *where* the supervision comes from (human, AI, or both).

#### Post-training data is naturally weak supervision.
We often describe LLMs as generative models, but in practice they predict the next token. For any prompt, infinite continuations may be valid, so any finite dataset shows only a subset of what “correct” is, making post-training data *weakly supervised*. My interest is in strengthening that weak signal by using what the model already knows.

#### Where humans fit in a world of synthetic data.
As synthetic data becomes more common, a key question remains: can we train LLMs without human input, and if not, where are humans still necessary? I’m interested in the differences between AI-generated and human supervision: the roles each plays, the mistakes each tends to make, and how each shapes model learning.