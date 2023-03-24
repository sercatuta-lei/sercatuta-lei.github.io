---
title: "News"
layout: textlay
excerpt: "Jeff Lei Lab at UT Arlington."
sitemap: false
permalink: /allnews/
---

# News

{% for article in site.data.news %}
<p><span style="color: #0064B1;">{{ article.date }} </span><br />
<b>{{ article.keyword }}</b> <em>{{ article.headline }}</em></p>
{% endfor %}

### ... and more.
