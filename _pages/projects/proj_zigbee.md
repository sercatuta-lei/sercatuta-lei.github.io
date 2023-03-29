---
title: "Jeff Lei Lab - Project Fuzzing of Zigbee Protocol"
layout: textlay
excerpt: "Jeff Lei Lab - Project Fuzzing of Zigbee Protocol"
sitemap: false
permalink: /projects/zigbee_fuzzing/
---

# Fuzz Testing of Zigbee Protocol Implementation #

**Lead by Mengfei Ren**

## Description ##

![]({{ site.url }}{{ site.baseurl }}/images/projpic/mengfei/zigbee_example.png){: style="width: 100%; float: center; margin: 10px"}
<center><img src="{{ site.url }}{{ site.baseurl }}/images/projpic/mengfei/zigbee_example.png" width="80%"></center>

In recent years, we have witnessed the increasing of IoT devices deployed in various areas, e.g., home automation, healthcare, industry and smart vehicle. Zigbee is one of global most popular IoT wireless standards used by million devices and customers. Particularly, Zigbee is now on Mars as well! In March 2021, it was used in NASA Mars mission as the communication radio between flying drone and Perseverance rover.

![]({{ site.url }}{{ site.baseurl }}/images/projpic/zigbee-stack.png){: style="width: 300px; float: left; margin: 0px 10px"} **Why we need Zigbee?** Though WiFi and Bluetooth have been worked very well for many years, they are not ideal communication solutions for resource-constraint IoT devices. Suppose we have many small sensors deployed in a remote area to monitor equipments' status. Of course, we don't want to frequently replace their batteries. Thus, their daily communication should not spend too much power and resource. However, WiFi is complicated and its transceivers are usually expensive. Bluetooth devices also use too much power and too complex. Therefore, Zigbee is designed as a low-power, low-cost, and low-speed wireless protocol, for the communication between resource-constraint embedded devices.

 ![]({{ site.url }}{{ site.baseurl }}/images/projpic/fuzzing.png){: style="width: 300px; float: right; margin: 0px 10px"} However, when both simplicity and low cost are goals, security often suffers since productivity has high priority and security service may have limited resources. Recently, server vulnerabilities in Zigbee protocol implementations have compromised IoT dvices from different manufactuers. It becomes imperative to perform security testing on Zigbee protocol implementations. Fuzz testing is a mainstream for assessing security problems since 2000. It has posed thousands of vulnerabilities in various software applications. However, it is not a trivial task to directly apply state-of-the-art fuzzing tools to Zigbee protocol implementations. <b>Thus, this research project amis to apply state-of-art software testing techniques, such as fuzzing and data flow analysis, for detecting security vulnerability in Zigbee protocol implementations, especially addressing practical technical challenges of existing fuzzing solutions.</b>


## Publications ##
<ul>
  <li><a href="https://dl.acm.org/doi/abs/10.1145/3551894" target="_blank">Security Analysis of Zigbee Protocol Implementation via Device-agnostic Fuzzing</a>
  <br>by <b>Mengfei Ren</b>, Xiaolei Ren, Huadong Feng, Jiang Ming, Yu Lei 
  <br><i>ACM Digital Threats: Research and PracticeVolume 4Issue 1Article No.: 9pp 1–24</a></i>
  </li>

  <li><a href="https://dl.acm.org/doi/10.1145/3448300.3468296" target="_blank">Z-Fuzzer: Device-agnostic Fuzzing of Zigbee Protocol Implementation</a>
  <br>by <b>Mengfei Ren</b>, Xiaolei Ren, Huadong Feng, Jiang Ming, Yu Lei 
  <br>In <i>Proceedings of the 14th ACM Conference on Security and Privacy in Wireless and Mobile Networks (WiSec '21). Association for Computing Machinery, New York, NY, USA, 347–358.</i>
  <br><span style="color: green;"> <b>ACM Artifact Evaluation Badges: 
    <img style="width:40px;margin:1px 2px 1px 5px;" title="Artifacts Evaluated & Functional" src="{{ site.url }}{{ site.baseurl }}/images/projpic/mengfei/artifacts_evaluated_functional_dl.jpg" alt="Functional">Functional 
    <img style="width:40px;margin:1px 2px 1px 5px;" title="Artifacts Available" src="{{ site.url }}{{ site.baseurl }}/images/projpic/mengfei/artifacts_available_dl.jpg" alt="Available">Available 
    <img style="width:40px;margin:1px 2px 1px 5px;" title="Artifacts Reproduced" src="{{ site.url }}{{ site.baseurl }}/images/projpic/mengfei/results_reproduced_dl.jpg" alt="Reproduced">Reproduced
  </b></span>
  <br><span style="color: indianred;"> <b>Zero-day Vulnerabilities Detected:</b>
  <a href="https://nvd.nist.gov/vuln/detail/CVE-2020-27890" target="_blank">CVE-2020-27890</a>, 
  <a href="https://nvd.nist.gov/vuln/detail/CVE-2020-27891" target="_blank">CVE-2020-27891</a>, 
  <a href="https://nvd.nist.gov/vuln/detail/CVE-2020-27892" target="_blank">CVE-2020-27892</a>
  </span>
  </li>

  <li>Intelligent Mutation Strategy of Zigbee Protocol Fuzzing via Constraint-Field Dependency Inference
  <br>by <b>Mengfei Ren</b>, Haotian ZHang, Xiaolei Ren, Jiang Ming, Yu Lei (under review)
  </li>
</ul>

**[Back to Project Page]({{ site.url }}{{ site.baseurl }}/projects/)**