---
title: "Jeff Lei Lab - Publications"
layout: gridlay
excerpt: "Jeff Lei Lab -- Publications."
sitemap: false
permalink: /publications/
---


# Publications
(For a full list of publications go to [Google Scholar](https://scholar.google.com/citations?hl=en&user=UEHiYcoAAAAJ))

<!-- ## Group highlights
{% assign number_printed = 0 %}
{% for publi in site.data.publist %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if publi.highlight == 1 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
 <div class="well">
  <pubtit>{{ publi.title }}</pubtit>
  <img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" class="img-responsive" width="33%" style="float: left" />
  <p>{{ publi.description }}</p>
  <p><em>{{ publi.authors }}</em></p>
  <p><strong><a href="{{ publi.link.url }}">{{ publi.link.display }}</a></strong></p>
  <p class="text-danger"><strong> {{ publi.news1 }}</strong></p>
  <p> {{ publi.news2 }}</p>
 </div>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endif %}
{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}

<p> &nbsp; </p> -->


## Conference Papers

{% for publi in site.data.publist %}

  {% if publi.conference == 1 %}

  <b>{{ publi.title }}</b> <br />
  <em>{{ publi.authors }} </em><br /><a href="{{ publi.link.url }}">{{ publi.link.display }}</a>

  {% endif %}

{% endfor %}
<p> &nbsp; </p>

## Journal Papers

{% for publi in site.data.publist %}

  {% if publi.journal == 1 %}

  <b>{{ publi.title }}</b> <br />
  <em>{{ publi.authors }} </em><br /><a href="{{ publi.link.url }}">{{ publi.link.display }}</a>

  {% endif %}

{% endfor %}
<p> &nbsp; </p>

## Book Chapters

{% for publi in site.data.publist %}

  {% if publi.book == 1 %}

  <b>{{ publi.title }}</b> <br />
  <em>{{ publi.authors }} </em><br /><a href="{{ publi.link.url }}">{{ publi.link.display }}</a>

  {% endif %}

{% endfor %}
<p> &nbsp; </p>


## Workshops/Demos/Abstracts/Posters

{% for publi in site.data.publist %}

  {% if publi.workshop == 1 %}

  <b>{{ publi.title }}</b> <br />
  <em>{{ publi.authors }} </em><br /><a href="{{ publi.link.url }}">{{ publi.link.display }}</a>

  {% endif %}

{% endfor %}

<p> &nbsp; </p>

<!-- ## Patents

{% for publi in site.data.publist %}

  {% if publi.patent == 1 %}

  {{ publi.title }} <br />
  <em>{{ publi.authors }} </em><br /><a href="{{ publi.link.url }}">{{ publi.link.display }}</a>

  {% endif %}

{% endfor %} -->