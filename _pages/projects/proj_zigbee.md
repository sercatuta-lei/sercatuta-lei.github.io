---
title: "Jeff Lei Lab - Project Fuzzing of Zigbee Protocol"
layout: textlay
excerpt: "Jeff Lei Lab - Project Fuzzing of Zigbee Protocol"
sitemap: false
permalink: /projects/zigbee_fuzzing/
---

# Fuzz Testing of Zigbee Protocol Implementation #

** Lead by Mengfei Ren **

## Description ##

<figure class="fourth">
  <img src="{{ site.url }}{{ site.baseurl }}/images/projpic/mengfei/zigbee_detail.png" style="width: 100%; margin: 10px">
</figure>

In recent years, we have witnessed the increasing of IoT devices deployed in various areas, e.g., home automation, healthcare, industry and smart vehicle. Zigbee is one of global most popular IoT wireless standards used by million devices and customers. Particularly, Zigbee is now on Mars as well! In March 2021, it was used in NASA Mars mission as the communication radio between flying drone and Perseverance rover.

![]({{ site.url }}{{ site.baseurl }}/images/projpic/zigbee.png){: style="width: 250px; float: left; margin: 0px 10px"} Why we need Zigbee? Zigbee is designed as low-power, low-cost, and low-speed, for the communication between resource-constraint embedded devices. However, when both simplicity and low cost are goals, security often suffers since productivity has high priority and security service may have limited resources. Recently, server vulnerabilities in Zigbee protocol implementations have compromised IoT dvices from different manufactuers. It becomes imperative to perform security testing on Zigbee protocol implementations. <b>This research project amis to apply state-of-art software testing techniques, such as fuzzing and data flow analysis, for detecting security vulnerability in Zigbee protocol implementations.</b>


## Publications ##
<ul>
  <li><a href="https://dl.acm.org/doi/abs/10.1145/3551894" target="_blank">Security Analysis of Zigbee Protocol Implementation via Device-agnostic Fuzzing</a>
  <br>by <b>Mengfei Ren</b>, Xiaolei Ren, Huadong Feng, Jiang Ming, Yu Lei 
  <br><i><a href="https://dl.acm.org/journal/dtrap/cfp" target="_blank">ACM Digital Threats: Research and Practice (DTRAP)</a></i>
  </li>

  <li><a href="https://dl.acm.org/doi/10.1145/3448300.3468296" target="_blank">Z-Fuzzer: Device-agnostic Fuzzing of Zigbee Protocol Implementation</a>
  <br>by <b>Mengfei Ren</b>, Xiaolei Ren, Huadong Feng, Jiang Ming, Yu Lei 
  <br>In <i>Proceedings of the 14th ACM Conference on Security and Privacy in Wireless and Mobile Networks</i>. Abu Dhabi, UAE, 2021
  <br><span style="color: green;"><i class="fa-solid fa-star fa-sm"></i> <b>ACM Badges: 
    <img class="badge" title="Artifacts Evaluated & Functional" src="{{ site.url }}{{ site.baseurl }}/images/projpic/mengfei/artifacts_evaluated_functional_dl.jpg" alt="Functional">Functional 
    <img class="badge"  title="Artifacts Available" src="{{ site.url }}{{ site.baseurl }}/images/projpic/mengfei/artifacts_available_dl.jpg" alt="Available">Available 
    <img class="badge"  title="Artifacts Reproduced" src="{{ site.url }}{{ site.baseurl }}/images/projpic/mengfei/results_reproduced_dl.jpg" alt="Reproduced">Reproduced
  </b></span>
  <br><span style="color: indianred;"><i class="fa-solid fa-bug fa-sm"></i> <b>Zero-day Vulnerabilities Detected:</b>
  <a href="https://nvd.nist.gov/vuln/detail/CVE-2020-27890" target="_blank">CVE-2020-27890</a>, 
  <a href="https://nvd.nist.gov/vuln/detail/CVE-2020-27891" target="_blank">CVE-2020-27891</a>, 
  <a href="https://nvd.nist.gov/vuln/detail/CVE-2020-27892" target="_blank">CVE-2020-27892</a>
  </span>
  </li>

  <li>Intelligent Mutation Strategy of Zigbee Protocol Fuzzing via Constraint-Field Dependency Inference
  <br>by <b>Mengfei Ren</b>, Haotian ZHang, Xiaolei Ren, Jiang Ming, Yu Lei 
  </li>
</ul>

**[Back to Project Page]({{ site.url }}{{ site.baseurl }}/projects/)**