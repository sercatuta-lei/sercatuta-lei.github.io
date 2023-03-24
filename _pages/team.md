---
title: "Jeff Lei Lab - Team"
layout: gridlay
excerpt: "Jeff Lei Lab: Team members"
sitemap: false
permalink: /team/
---

# Team Members

**We are  looking for passionate new PhD students and Master students to join the team** [(more info)]({{ site.url }}{{ site.baseurl }}/future) **!**

<!-- Jump to [staff](#staff), [master and bachelor students](#master-and-bachelor-students), [alumni](#alumni), [administrative support](#administrative-support), [lab visitors](#lab-visitors). -->

## Director
{% assign number_printed = 0 %}
{% for member in site.data.director %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-md clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="18%" style="float: left" />
  <h4>{{ member.name }}</h4>
  <i>{{ member.info }}</i>
  <ul style="overflow: hidden">

  {% if member.number_educ == 1 %}
  <li> {{ member.education1 }} </li>
  {% endif %}

  {% if member.number_educ == 2 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  {% endif %}

  {% if member.number_educ == 3 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  {% endif %}

  {% if member.number_educ == 4 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  <li> {{ member.education4 }} </li>
  {% endif %}

  {% if member.number_educ == 5 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  <li> {{ member.education4 }} </li>
  <li> {{ member.education5 }} </li>
  {% endif %}

  </ul>
  <p>{{ member.experience }}</p>
  <p><b>Research Interests:</b> {{ member.research }}</p>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}
<br />


## Current PhD Students
{% assign number_printed = 0 %}
{% for member in site.data.team_phd %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
  <h4>{{ member.name }}</h4>
  <i>{{ member.status }}</i>
  <ul style="overflow: hidden">

  {% if member.number_info == 1 %}
  <li> {{ member.info1 }} </li>
  {% endif %}

  {% if member.number_info == 2 %}
  <li> {{ member.info1 }} </li>
  <li> {{ member.info2 }} </li>
  {% endif %}

  {% if member.number_info == 3 %}
  <li> {{ member.info1 }} </li>
  <li> {{ member.info2 }} </li>
  <li> {{ member.info3 }} </li>
  {% endif %}

  {% if member.number_info == 4 %}
  <li> {{ member.info1 }} </li>
  <li> {{ member.info2 }} </li>
  <li> {{ member.info3 }} </li>
  <li> {{ member.info4 }} </li>
  {% endif %}

  {% if member.number_info == 5 %}
  <li> {{ member.info1 }} </li>
  <li> {{ member.info2 }} </li>
  <li> {{ member.info3 }} </li>
  <li> {{ member.info4 }} </li>
  <li> {{ member.info5 }} </li>
  {% endif %}

  </ul>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}
<br />


## Current Master and Bachelor Students
{% assign number_printed = 0 %}
{% for member in site.data.team_bsms %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
  <h4>{{ member.name }}</h4>
  <i>{{ member.status }}</i>
  <ul style="overflow: hidden">

  {% if member.number_info == 1 %}
  <li> {{ member.info1 }} </li>
  {% endif %}

  {% if member.number_info == 2 %}
  <li> {{ member.info1 }} </li>
  <li> {{ member.info2 }} </li>
  {% endif %}

  {% if member.number_info == 3 %}
  <li> {{ member.info1 }} </li>
  <li> {{ member.info2 }} </li>
  <li> {{ member.info3 }} </li>
  {% endif %}

  {% if member.number_info == 4 %}
  <li> {{ member.info1 }} </li>
  <li> {{ member.info2 }} </li>
  <li> {{ member.info3 }} </li>
  <li> {{ member.info4 }} </li>
  {% endif %}

  </ul>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}
<br />

## Alumni - PhD Students

{% assign number_printed = 0 %}
{% for member in site.data.alumni_phd %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
  <h4>{{ member.name }}</h4>
  <i>{{ member.duration }}</i>
  <p>{{ member.link }}</p>
  <ul style="overflow: hidden">

  </ul>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}
<br />

## Alumni - Master Students
{% assign number_printed = 0 %}
{% for member in site.data.alumni_msc %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
  <h4>{{ member.name }}</h4>
  <i>{{ member.duration }}</i>
  <p>{{ member.link }}</p>
  <ul style="overflow: hidden">

  </ul>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}
<br />


## Former Visit Scholars
{% assign number_printed = 0 %}
{% for member in site.data.alumni_visitors %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
  <h4>{{ member.name }}</h4>
  <i>{{ member.duration }}</i>
  <p>{{ member.link }}</p>
  <ul style="overflow: hidden">

  </ul>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}

