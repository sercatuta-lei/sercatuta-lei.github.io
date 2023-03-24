---
title: "Jeff Lei Lab - Projects"
layout: textlay
excerpt: "Jeff Lei Lab -- Projects"
sitemap: false
permalink: /projects/
---

# Current Projects

Here are some active projects that we currently work on:

<!-- Project Grid -->
{% for member in site.data.projects %}

<div class="row">
  <img src="{{ site.url }}{{ site.baseurl }}/images/projpic/{{ member.image }}" style="width: 25%; float:left; margin: 0 10px;">
  <b>{{ member.name }}.</b>&nbsp;
  <span>{{ member.summary }}</span>
  <a href="{{ member.link }}">[More Details]</a>

</div>
<br />

{% endfor %}
