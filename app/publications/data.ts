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

export const publications: Publication[] = [
  // Conference Papers (2020 onwards, sorted by year descending)
  {
    id: 11,
    title: "A Combinatorial Approach to Hyperparameter Optimization",
    authors: "Khadka, Krishna; Chandrasekaran, Jaganmohan; Lei, Yu; Kacker, Raghu N; Kuhn, D Richard",
    venue: "Proceedings of the IEEE/ACM 3rd International Conference on AI Engineering – Software Engineering for AI (CAIN 2024)",
    url: "https://doi.org/10.1145/3656902.3656920",
    year: 2024,
    type: "conference"
  },
  {
    id: 12,
    title: "Assessing the Degree of Feature Interactions That Determine a Model Prediction",
    authors: "Khadka, Krishna; Shree, Sunny; Lei, Yu; Kacker, Raghu N; Kuhn, D Richard",
    venue: "Proceedings of the 2024 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW 2024)",
    url: "",
    year: 2024,
    type: "conference"
  },
  {
    id: 13,
    title: "Constructing Surrogate Models in Machine Learning Using Combinatorial Testing and Active Learning",
    authors: "S.Shree, K. Khadka, Y. Lei, R. N. Kacker, and D. R. Kuhn",
    venue: "ASE 2024",
    url: "",
    year: 2024,
    type: "conference"
  },
  {
    id: 14,
    title: "Proxima: A Proxy Model-Based Approach to Influence Analysis",
    authors: "S.Shree, Y. Lei, R. N. Kacker, and D. R. Kuhn",
    venue: "AITest 2024",
    url: "",
    year: 2024,
    type: "conference"
  },
  {
    id: 15,
    title: "Algorithmic Optimizations for Deriving Minimal Forbidden Tuples",
    authors: "M.Wagner, I. Hiess, L. Kampel, D. E. Simos, and Y. Lei",
    venue: "ICSTW 2024",
    url: "",
    year: 2024,
    type: "conference"
  },
  {
    id: 1,
    title: "Unleashing the Hidden Power of Compiler Optimization on Binary Code Difference: An Empirical Study",
    authors: "Xiaolei Ren, Michael Ho, Jiang Ming, Yu Lei, Li Li",
    venue: "Proceedings of the 42nd ACM SIGPLAN International Conference on Programming Language Design and Implementation (PLDI '21)",
    url: "https://doi.org/10.1145/3453483.3454035",
    year: 2021,
    type: "conference",
    acceptanceRate: "27.2%"
  },
  {
    id: 2,
    title: "Z-Fuzzer: Device-agnostic Fuzzing of Zigbee Protocol Implementation",
    authors: "Mengfei Ren, Xiaolei Ren, Huadong Feng, Jiang Ming, Yu Lei",
    venue: "Proceedings of the 14th ACM Conference on Security and Privacy in Wireless and Mobile Networks (WiSec '21)",
    url: "https://doi.org/10.1145/3448300.3468296",
    year: 2021,
    type: "conference",
    acceptanceRate: "28.1%"
  },
  {
    id: 3,
    title: "Evaluation of T-Way Testing of DNNs in Autonomous Driving Systems",
    authors: "Chandrasekaran, Jaganmohan, Ankita Ramjibhai Patel, Yu Lei, Raghu Kacker, and D. Richard Kuhn",
    venue: "Proceedings of 2021 IEEE International Conference on Artificial Intelligence Testing (AITest '21)",
    url: "https://doi.org/10.1109/AITEST52744.2021.00013",
    year: 2021,
    type: "conference"
  },
  {
    id: 4,
    title: "Effectiveness of Dataset Reduction in Testing Machine Learning Algorithms",
    authors: "Chandrasekaran, Jaganmohan, Huadong Feng, Yu Lei, Raghu Kacker, and D. Richard Kuhn",
    venue: "Proceedings of 2020 IEEE International Conference on Artificial Intelligence Testing (AITest '20)",
    url: "https://doi.org/10.1109/AITEST49225.2020.00027",
    year: 2020,
    type: "conference"
  },

  // Journal Papers (2020 onwards, sorted by year descending)
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
    id: 46,
    title: "Ensuring Reliability Through Combinatorial Coverage Measures",
    authors: "Raunak, M. S., D. R. Kuhn, R. N. Kacker, and Y. Lei",
    venue: "IEEE Reliability (2024)",
    url: "",
    year: 2024,
    type: "journal"
  },
  {
    id: 16,
    title: "Security Analysis of Zigbee Protocol Implementation via Device-agnostic Fuzzing",
    authors: "Mengfei Ren, Xiaolei Ren, Huadong Feng, Jiang Ming, Yu Lei",
    venue: "ACM Digital Threats: Research and Practice (DTRAP '22)",
    url: "https://doi.org/10.1145/3551894",
    year: 2022,
    type: "journal"
  },
  {
    id: 17,
    title: "A Theory of Pending Schemas in Combinatorial Testing",
    authors: "X. Niu, H. Wu, N. Changhai, Y. Lei and X. Wang",
    venue: "IEEE Transactions on Software Engineering (TSE '21)",
    url: "https://doi.org/10.1109/TSE.2021.3113920",
    year: 2021,
    type: "journal"
  },
  {
    id: 18,
    title: "Combinatorial Test Generation for Multiple Input Models with Shared Parameters",
    authors: "C. Rao, N. Li, Y. Lei, J. Guo, Y. Zhang, R. N. Kacker, D. R. Kuhn",
    venue: "IEEE Transactions on Software Engineering (TSE '21)",
    url: "https://doi.org/10.1109/TSE.2021.3065950",
    year: 2021,
    type: "journal"
  },
  {
    id: 19,
    title: "Factorials Experiments, Covering Arrays, and Combinatorial Testing",
    authors: "Kacker, R.N., Kuhn, D.R., Lei, Y",
    venue: "Mathematics in Computer Science volume 15 (2021)",
    url: "https://doi.org/10.1007/s11786-021-00502-7",
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
    url: "https://doi.org/10.1109/ICSTW58424.2023.00052",
    year: 2023,
    type: "workshop"
  },
  {
    id: 47,
    title: "A Combinatorial Approach to Explaining Image Classifiers",
    authors: "Chandrasekaran, Jaganmohan, Yu Lei, Raghu Kacker, and D. Richard Kuhn",
    venue: "Proceedings of 2021 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW '21)",
    url: "https://doi.org/10.1109/ICSTW52544.2021.00019",
    year: 2021,
    type: "workshop"
  },
  {
    id: 48,
    title: "A Combinatorial Approach to Testing Deep Neural Network-based Autonomous Driving Systems",
    authors: "Chandrasekaran, Jaganmohan, Yu Lei, Raghu Kacker, and D. Richard Kuhn",
    venue: "Proceedings of 2021 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW '21)",
    url: "https://doi.org/10.1109/ICSTW52544.2021.00022",
    year: 2021,
    type: "workshop"
  },
  {
    id: 49,
    title: "Combinatorial methods for explainable AI",
    authors: "Kuhn, D. Richard, Raghu N. Kacker, Yu Lei, and Dimitris E. Simos",
    venue: "Proceedings of 2021 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW '21)",
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
]; 