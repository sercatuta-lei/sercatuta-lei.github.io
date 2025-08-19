export interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  url: string;
  year: number;
  type: "conference" | "journal" | "workshop" | "book";
  acceptanceRate?: string;
}

<<<<<<< HEAD
// Lazy load publications data to improve initial page load
const publicationsData: Publication[] = [
  // Conference Papers (2020 onwards, sorted by year descending)
  // 2025 Papers
  {
    id: 55,
    title: "Resolving Indirect Calls in Binary Code via Cross-Reference Augmented Graph Neural Networks",
    authors: "Haotian Zhang, Kun Liu, Cristian Garces, Chenke Luo, Yu Lei, Jiang Ming",
    venue: "arXiv preprint arXiv:2507.18801",
    url: "https://doi.org/10.48550/arXiv.2507.18801",
    year: 2025,
    type: "conference"
  },
  {
    id: 56,
    title: "Efficient Adaptation of Large Language Models for Smart Contract Vulnerability Detection",
    authors: "Fadul Sikder, Yu Lei, Yuede Ji",
    venue: "Proceedings of the 21st International Conference on Predictive Models and Data Analytics in Software Engineering",
    url: "https://doi.org/10.1145/3727582.3728688",
    year: 2025,
    type: "conference"
  },
  {
    id: 58,
    title: "Fairness Testing of Machine Learning Models using Combinatorial Testing in Latent Space",
    authors: "Arjun Dahal, Sunny Shree, Yu Lei, Raghu N Kacker, D Richard Kuhn",
    venue: "2025 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW), Pages 268-277",
    url: "https://ieeexplore.ieee.org/abstract/document/10962484",
    year: 2025,
    type: "conference"
  },
  {
    id: 59,
    title: "ABLE: Using Adversarial Pairs to Construct Local Models for Explaining Model Predictions",
    authors: "Yu Lei, Raghu Kacker, David Kuhn",
    venue: "2025",
    url: "",
    year: 2025,
    type: "conference"
  },
  // 2024 Papers
=======
export const publications: Publication[] = [
  // Conference Papers (2020 onwards, sorted by year descending)
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
  {
    id: 11,
    title: "A Combinatorial Approach to Hyperparameter Optimization",
    authors: "Khadka, Krishna; Chandrasekaran, Jaganmohan; Lei, Yu; Kacker, Raghu N; Kuhn, D Richard",
    venue: "Proceedings of the IEEE/ACM 3rd International Conference on AI Engineering – Software Engineering for AI (CAIN 2024)",
<<<<<<< HEAD
    url: "https://dl.acm.org/doi/abs/10.1145/3644815.3644941",
=======
    url: "https://doi.org/10.1145/3656902.3656920",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2024,
    type: "conference"
  },
  {
    id: 12,
    title: "Assessing the Degree of Feature Interactions That Determine a Model Prediction",
    authors: "Khadka, Krishna; Shree, Sunny; Lei, Yu; Kacker, Raghu N; Kuhn, D Richard",
    venue: "Proceedings of the 2024 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW 2024)",
<<<<<<< HEAD
    url: "https://ieeexplore.ieee.org/abstract/document/10675910",
=======
    url: "",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2024,
    type: "conference"
  },
  {
    id: 13,
    title: "Constructing Surrogate Models in Machine Learning Using Combinatorial Testing and Active Learning",
<<<<<<< HEAD
    authors: "Sunny Shree, Krishna Khadka, Yu Lei, Raghu N Kacker, D Richard Kuhn",
    venue: "Proceedings of the 39th IEEE/ACM International Conference on Automated Software Engineering (ASE 2024), Pages 1645-1654",
    url: "https://dl.acm.org/doi/abs/10.1145/3691620.3695532",
=======
    authors: "S.Shree, K. Khadka, Y. Lei, R. N. Kacker, and D. R. Kuhn",
    venue: "ASE 2024",
    url: "",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2024,
    type: "conference"
  },
  {
    id: 14,
    title: "Proxima: A Proxy Model-Based Approach to Influence Analysis",
    authors: "S.Shree, Y. Lei, R. N. Kacker, and D. R. Kuhn",
    venue: "AITest 2024",
<<<<<<< HEAD
    url: "https://ieeexplore.ieee.org/abstract/document/10685198",
=======
    url: "",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2024,
    type: "conference"
  },
  {
    id: 15,
    title: "Algorithmic Optimizations for Deriving Minimal Forbidden Tuples",
    authors: "M.Wagner, I. Hiess, L. Kampel, D. E. Simos, and Y. Lei",
    venue: "ICSTW 2024",
<<<<<<< HEAD
    url: "https://ieeexplore.ieee.org/abstract/document/10675974",
=======
    url: "",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2024,
    type: "conference"
  },
  {
<<<<<<< HEAD
    id: 52,
    title: "SmartExecutor: Coverage-Driven Symbolic Execution Guided by a Function Dependency Graph",
    authors: "Qiping Wei, Fadul Sikder, Huadong Feng, Yu Lei",
    venue: "Proceedings of the 2023 IEEE International Conference on Brain-inspired Intelligent Systems (BRAINS 2023)",
    url: "https://ieeexplore.ieee.org/abstract/document/10316942",
    year: 2023,
    type: "conference"
  },
  {
    id: 53,
    title: "MagicMirror: Towards High-Coverage Fuzzing of Smart Contracts",
    authors: "Huadong Feng, Xiaolei Ren, Qiping Wei, Yu Lei",
    venue: "Proceedings of the 2023 IEEE International Conference on Software Testing, Verification and Validation (ICST 2023)",
    url: "https://ieeexplore.ieee.org/abstract/document/10132195",
    year: 2023,
    type: "conference"
  },
  {
    id: 61,
    title: "Intelligent Zigbee Protocol Fuzzing via Constraint-Field Dependency Inference",
    authors: "Mengfei Ren, Haotian Zhang, Xiaolei Ren, Jiang Ming, Yu Lei",
    venue: "Computer Security – ESORICS 2023, Lecture Notes in Computer Science, vol 14345, Pages 467-486",
    url: "https://link.springer.com/chapter/10.1007/978-3-031-51476-0_23",
    year: 2023,
    type: "conference"
  },
  {
    id: 54,
    title: "DeltaExplainer: A Software Debugging Approach to Generating Counterfactual Explanations",
    authors: "Sunny Shree, Jaganmohan Chandrasekaran, Yu Lei",
    venue: "Proceedings of the 2022 IEEE International Conference on Artificial Intelligence Testing (AITest 2022)",
    url: "https://ieeexplore.ieee.org/abstract/document/9898123",
    year: 2022,
    type: "conference"
  },
  {
    id: 63,
    title: "One Size Does Not Fit All: Security Hardening of MIPS Embedded Systems via Static Binary Debloating for Shared Libraries",
    authors: "Haotian Zhang, Mengfei Ren, Yu Lei, Jiang Ming",
    venue: "Proceedings of the 27th ACM International Conference on Architectural Support for Programming Languages and Operating Systems (ASPLOS 2022), Pages 255-270",
    url: "https://dl.acm.org/doi/abs/10.1145/3503222.3507768",
    year: 2022,
    type: "conference"
  },
  {
    id: 64,
    title: "A Combinatorial Approach to Fairness Testing of Machine Learning Models",
    authors: "Ankita Ramjibhai Patel",
    venue: "Master's Thesis, The University of Texas at Arlington",
    url: "https://www.proquest.com/openview/e13b4362b073bbeb77e7438d919921c6/1?pq-origsite=gscholar&cbl=18750&diss=y",
    year: 2022,
    type: "book"
  },
  {
=======
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    id: 1,
    title: "Unleashing the Hidden Power of Compiler Optimization on Binary Code Difference: An Empirical Study",
    authors: "Xiaolei Ren, Michael Ho, Jiang Ming, Yu Lei, Li Li",
    venue: "Proceedings of the 42nd ACM SIGPLAN International Conference on Programming Language Design and Implementation (PLDI &apos;21)",
<<<<<<< HEAD
    url: "https://dl.acm.org/doi/abs/10.1145/3453483.3454035",
=======
    url: "https://doi.org/10.1145/3453483.3454035",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2021,
    type: "conference",
    acceptanceRate: "27.2%"
  },
  {
    id: 2,
    title: "Z-Fuzzer: Device-agnostic Fuzzing of Zigbee Protocol Implementation",
    authors: "Mengfei Ren, Xiaolei Ren, Huadong Feng, Jiang Ming, Yu Lei",
    venue: "Proceedings of the 14th ACM Conference on Security and Privacy in Wireless and Mobile Networks (WiSec &apos;21)",
    url: "https://doi.org/10.1145/3448300.3468296",
    year: 2021,
    type: "conference",
    acceptanceRate: "28.1%"
  },
  {
    id: 3,
    title: "Evaluation of T-Way Testing of DNNs in Autonomous Driving Systems",
    authors: "Chandrasekaran, Jaganmohan, Ankita Ramjibhai Patel, Yu Lei, Raghu Kacker, and D. Richard Kuhn",
    venue: "Proceedings of 2021 IEEE International Conference on Artificial Intelligence Testing (AITest &apos;21)",
<<<<<<< HEAD
    url: "https://ieeexplore.ieee.org/abstract/document/9564319",
=======
    url: "https://doi.org/10.1109/AITEST52744.2021.00013",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2021,
    type: "conference"
  },
  {
    id: 4,
    title: "Effectiveness of Dataset Reduction in Testing Machine Learning Algorithms",
    authors: "Chandrasekaran, Jaganmohan, Huadong Feng, Yu Lei, Raghu Kacker, and D. Richard Kuhn",
    venue: "Proceedings of 2020 IEEE International Conference on Artificial Intelligence Testing (AITest &apos;20)",
    url: "https://doi.org/10.1109/AITEST49225.2020.00027",
    year: 2020,
    type: "conference"
  },

  // Journal Papers (2020 onwards, sorted by year descending)
<<<<<<< HEAD
  // 2025 Journal Papers
  {
    id: 57,
    title: "Revisiting Optimization-Resilience Claims in Binary Diffing Tools: Insights from LLVM Peephole Optimization Analysis",
    authors: "Xiaolei Ren, Mengfei Ren, Yu Lei, Jiang Ming",
    venue: "Proceedings of the ACM on Software Engineering, Volume 2, Issue FSE, Pages 2689-2711",
    url: "https://doi.org/10.1145/3729389",
    year: 2025,
    type: "journal"
  },
  {
    id: 60,
    title: "SmartExecutor: Coverage-Driven Symbolic Execution Guided via State Prioritization and Function Selection",
    authors: "Qiping Wei, Fadul Sikder, Huadong Feng, Yu Lei, Raghu Kacker, Richard Kuhn",
    venue: "Distributed Ledger Technologies: Research and Practice, Volume 4, Issue 1, Pages 1-29",
    url: "https://dl.acm.org/doi/full/10.1145/3678188",
    year: 2025,
    type: "journal"
  },
  {
    id: 62,
    title: "RATE: A model‐based testing approach that combines model refinement and test execution",
    authors: "Andrea Bombarda, Silvia Bonfanti, Angelo Gargantini, Yu Lei, Feng Duan",
    venue: "Software Testing, Verification and Reliability, Volume 33, Issue 2, Pages e1835",
    url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/stvr.1835",
    year: 2023,
    type: "journal"
  },
  // 2024 Journal Papers
  {
=======
  {
    id: 44,
    title: "Fairness Testing of Machine Learning Models using Combinatorial Testing in Latent Space",
    authors: "Arjun Dahal, Sunny Shree, Yu Lei, Raghu N. Kacker, D. Richard Kuhn",
    venue: "IEEE Transactions on Software Engineering (TSE)",
    url: "",
    year: 2024,
    type: "journal"
  },
  {
    id: 45,
    title: "SmartExecutor: Coverage-Driven Symbolic Execution Guided via State Prioritization and Function Selection",
    authors: "Qiping Wei, Fadul Sikder, Huadong Feng, Yu Lei, Raghu Kacker, Richard Kuhn",
    venue: "ACM Transactions on Software Engineering and Methodology (TOSEM)",
    url: "",
    year: 2024,
    type: "journal"
  },
  {
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    id: 46,
    title: "Ensuring Reliability Through Combinatorial Coverage Measures",
    authors: "Raunak, M. S., D. R. Kuhn, R. N. Kacker, and Y. Lei",
    venue: "IEEE Reliability (2024)",
<<<<<<< HEAD
    url: "https://ieeexplore.ieee.org/abstract/document/10530482",
=======
    url: "",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2024,
    type: "journal"
  },
  {
    id: 16,
    title: "Security Analysis of Zigbee Protocol Implementation via Device-agnostic Fuzzing",
    authors: "Mengfei Ren, Xiaolei Ren, Huadong Feng, Jiang Ming, Yu Lei",
    venue: "ACM Digital Threats: Research and Practice (DTRAP &apos;22)",
<<<<<<< HEAD
    url: "https://dl.acm.org/doi/full/10.1145/3551894",
=======
    url: "https://doi.org/10.1145/3551894",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2022,
    type: "journal"
  },
  {
    id: 17,
    title: "A Theory of Pending Schemas in Combinatorial Testing",
    authors: "X. Niu, H. Wu, N. Changhai, Y. Lei and X. Wang",
    venue: "IEEE Transactions on Software Engineering (TSE &apos;21)",
<<<<<<< HEAD
    url: "https://ieeexplore.ieee.org/abstract/document/9543605",
=======
    url: "https://doi.org/10.1109/TSE.2021.3113920",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2021,
    type: "journal"
  },
  {
    id: 18,
    title: "Combinatorial Test Generation for Multiple Input Models with Shared Parameters",
    authors: "C. Rao, N. Li, Y. Lei, J. Guo, Y. Zhang, R. N. Kacker, D. R. Kuhn",
    venue: "IEEE Transactions on Software Engineering (TSE &apos;21)",
    url: "https://doi.org/10.1109/TSE.2021.3065950",
    year: 2021,
    type: "journal"
  },
  {
    id: 19,
    title: "Factorials Experiments, Covering Arrays, and Combinatorial Testing",
    authors: "Kacker, R.N., Kuhn, D.R., Lei, Y",
    venue: "Mathematics in Computer Science volume 15 (2021)",
<<<<<<< HEAD
    url: "https://link.springer.com/article/10.1007/s11786-021-00502-7",
    year: 2021,
    type: "journal"
  },
  {
    id: 65,
    title: "Correction to: Factorials Experiments, Covering Arrays, and Combinatorial Testing",
    authors: "Raghu N Kacker, D Richard Kuhn, Yu Lei, Dimitris E Simos",
    venue: "Mathematics in Computer Science, Volume 15, Issue 4, Page 741",
    url: "https://link.springer.com/article/10.1007/s11786-021-00516-1",
    year: 2021,
    type: "journal"
  },
  {
    id: 66,
    title: "Enhance Combinatorial Testing with Metamorphic Relations",
    authors: "Xintao Niu, Yanjie Sun, Huayao Wu, Gang Li, Changhai Nie, Lei Yu, Xiaoyin Wang",
    venue: "IEEE Transactions on Software Engineering, Volume 48, Issue 12, Pages 5007-5029",
    url: "https://ieeexplore.ieee.org/abstract/document/9629275",
    year: 2021,
    type: "journal"
  },
  {
    id: 67,
    title: "Measuring the Adequacy of a Test Suite With Respect to a Modeled Test Space",
    authors: "Raghu N Kacker, D Richard Kuhn, Yu Lei, Dimitris E Simos",
    venue: "IEEE Software, Volume 39, Issue 5, Pages 62-67",
    url: "https://ieeexplore.ieee.org/abstract/document/9523533",
=======
    url: "https://doi.org/10.1007/s11786-021-00502-7",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2021,
    type: "journal"
  },
  {
    id: 20,
    title: "Input Space Coverage Matters",
    authors: "R. Kuhn, R. Kacker, Y. Lei, D. Simos",
    venue: "Computer 53.1 (2020): 37-44",
    url: "https://doi.org/10.1109/MC.2019.2951980",
    year: 2020,
    type: "journal"
  },

  // Workshop Papers (2020 onwards, sorted by year descending)
  {
    id: 50,
    title: "Synthetic Data Generation Using Combinatorial Testing and Variational Autoencoder",
    authors: "Khadka, Krishna; Chandrasekaran, Jaganmohan; Lei, Yu; Kacker, Raghu N; Kuhn, D Richard",
    venue: "Proceedings of the 2023 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW 2023)",
<<<<<<< HEAD
    url: "https://ieeexplore.ieee.org/abstract/document/10132195/",
=======
    url: "https://doi.org/10.1109/ICSTW58424.2023.00052",
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
    year: 2023,
    type: "workshop"
  },
  {
    id: 47,
    title: "A Combinatorial Approach to Explaining Image Classifiers",
    authors: "Chandrasekaran, Jaganmohan, Yu Lei, Raghu Kacker, and D. Richard Kuhn",
    venue: "Proceedings of 2021 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW &apos;21)",
    url: "https://doi.org/10.1109/ICSTW52544.2021.00019",
    year: 2021,
    type: "workshop"
  },
  {
    id: 48,
    title: "A Combinatorial Approach to Testing Deep Neural Network-based Autonomous Driving Systems",
    authors: "Chandrasekaran, Jaganmohan, Yu Lei, Raghu Kacker, and D. Richard Kuhn",
    venue: "Proceedings of 2021 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW &apos;21)",
    url: "https://doi.org/10.1109/ICSTW52544.2021.00022",
    year: 2021,
    type: "workshop"
  },
  {
    id: 49,
    title: "Combinatorial methods for explainable AI",
    authors: "Kuhn, D. Richard, Raghu N. Kacker, Yu Lei, and Dimitris E. Simos",
    venue: "Proceedings of 2021 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW &apos;21)",
    url: "https://doi.org/10.1109/ICSTW50294.2020.00037",
    year: 2021,
    type: "workshop"
  },

  // Book Chapters (2020 onwards, sorted by year descending)
  {
    id: 51,
    title: "2 Effective Uncertainty Evaluation in Large-Scale Systems",
    authors: "Xie Junfei, Yan Wan, Yi Zhou, Kevin Mills, James J. Filliben, and Yu Lei",
    venue: "Principles of Cyber-Physical Systems: An Interdisciplinary Approach",
    url: "https://doi.org/10.1007/978-3-030-31551-6_2",
    year: 2020,
    type: "book"
  }
<<<<<<< HEAD
];

// Export function to get publications (enables code splitting)
export const getPublications = (): Publication[] => publicationsData;

// Export for backward compatibility
export const publications = publicationsData;
=======
]; 
>>>>>>> a63b755777e2f1d41c50db7713d1c6a61fdfb143
