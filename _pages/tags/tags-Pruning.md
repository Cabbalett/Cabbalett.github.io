---
title: "Pruning"
layout: archive
permalink: /tags/Pruning/
author_profile: true
sidebar:
  nav: docs
---
{% assign posts = site.tags['Pruning'] %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}