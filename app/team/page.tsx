"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// Director data
const director = {
  name: "Dr. Yu (Jeff) Lei&apos;s",
  photo: "DrLei.jpg",
  info: "Professor, Computer Science and Engineering",
  education: [
    "Ph.D. Computer Science, University of Texas at Arlington, 2000",
    "M.S. Computer Science, University of Texas at Arlington, 1996",
    "B.S. Computer Science, University of Texas at Arlington, 1994"
  ],
  experience: "Professor, Computer Science and Engineering, University of Texas at Arlington, 2000-present",
  research: "Software Engineering, Software Testing, Program Analysis, Software Security"
};

// Current PhD Students
const currentPhDStudents = [
  {
    name: "Arjun Dahal",
    photo: "arjun.jpeg",
    info: "Ph.D. Student",
    research: "Software Testing, AI/ML"
  },
  {
    name: "Fadul Sikder",
    photo: "fadul.jpg",
    info: "Ph.D. Student",
    research: "Software Security, IoT"
  },
  {
    name: "Krishna Khadka",
    photo: "krishna.jpg",
    info: "Ph.D. Student",
    research: "Software Testing, Blockchain"
  },
  {
    name: "Pujan Budhathoki",
    photo: "pujan.png",
    info: "Ph.D. Student",
    research: "Software Engineering, AI/ML"
  },
  {
    name: "Qiping Wei",
    photo: "qiping.jpg",
    info: "Ph.D. Student",
    research: "Smart Contracts, Security"
  },
  {
    name: "Saif Uddin Mahmud",
    photo: "saif-pic.jpg",
    info: "Ph.D. Student",
    research: "Software Testing, IoT"
  },
  {
    name: "Shovon Niverd",
    photo: "bio-photo.jpg",
    info: "Ph.D. Student",
    research: "AI/ML, Software Testing"
  }
];

// Alumni PhD Students
const alumniPhDStudents = [
  {
    name: "Feng Duan",
    photo: "Feng_Duan.jpeg",
    info: "Ph.D. 2021, now Software Engineer at Google",
    research: "Software Testing, Program Analysis"
  },
  {
    name: "Huadong (Jack) Feng",
    photo: "Huadong_Feng.png",
    info: "Ph.D. 2021, now Software Engineer at Microsoft",
    research: "Smart Contracts, Security Testing"
  },
  {
    name: "Jaganmohan Chandrasekaran",
    photo: "Jagan.jpg",
    info: "Ph.D. 2021, now Research Scientist at Amazon",
    research: "AI Testing, Machine Learning"
  },
  {
    name: "Mengfei Yang",
    photo: "mengfei.jpg",
    info: "Ph.D. 2020, now Security Researcher at Toyota",
    research: "IoT Security, Protocol Testing"
  },
  {
    name: "Xiaolei Ren",
    photo: "Xiaolei.jpg",
    info: "Ph.D. 2020, now Software Engineer at Google",
    research: "Compiler Optimization, Binary Analysis"
  }
];

  // Alumni Master&apos;s Students
const alumniMastersStudents = [
  {
    name: "Ankita Patel",
    photo: "Ankita.jpg",
    info: "Graduated in 2022, now Application Delivery Lead at Zurich North America",
    link: "https://www.linkedin.com/in/patelankitar/"
  },
  {
    name: "Ruben Martinez",
    photo: "bio-photo.jpg",
    info: "Graduated in 2023"
  },
  {
    name: "Dengfeng Xia",
    photo: "Dengfeng_Xia.jpeg",
    info: "Graduated in 2012, now Sr. SWE Test at Twitter"
  },
  {
    name: "Anthony Opara",
    photo: "bio-photo.jpg",
    info: "Graduated in 2008, now Senior Solutions Architect at Ericsson",
    link: "https://www.linkedin.com/in/anthony-opara-6681649b/"
  },
  {
    name: "Keerthika Koteeswaran",
    photo: "Keerthika_Koteeswaran.jpeg",
    info: "Graduated in 2007, now Senior Data Engineer at Adobe",
    link: "https://www.linkedin.com/in/kkoteeswaran/"
  },
  {
    name: "Arun Ramani",
    photo: "Arun_Ramani.jpeg",
    info: "Graduated in 2007, now Senior Software Development Manager at PayPal"
  },
  {
    name: "Andres Yanes",
    photo: "bio-photo.jpg",
    info: "Graduated in 2007"
  },
  {
    name: "Kallol Mahata",
    photo: "Kallol_Mahata.jpeg",
    info: "Graduated in 2007, now PCIC Co-founder and CEO",
    link: "https://www.linkedin.com/in/kallolmahata/"
  },
  {
    name: "Daxa Patel",
    photo: "bio-photo.jpg",
    info: "Graduated in 2006"
  },
  {
    name: "Chinmay Jayaswal",
    photo: "Chinmay_Jayaswal.jpeg",
    info: "Graduated in 2006, now Finance Manager at AT&T",
    link: "https://www.linkedin.com/in/chinmayjayaswal/"
  },
  {
    name: "Vidur Gupta",
    photo: "bio-photo.jpg",
    info: "Graduated in 2006, now Engineering Manager at Cisco",
    link: "https://www.linkedin.com/in/vidurg/"
  },
  {
    name: "Monica Hernandez",
    photo: "bio-photo.jpg",
    info: "Graduated in 2006, now CEO MAS Global",
    link: "https://www.linkedin.com/in/monicamhernandez/"
  },
  {
    name: "Gaurav Saini",
    photo: "Gaurav_Saini.jpeg",
    info: "Graduated in 2005, now Senior Practice Manager, Global and Strategic Accounts at Amazon Web Services (AWS)",
    link: "https://www.linkedin.com/in/g-gauravsaini/"
  },
  {
    name: "Mohammad Shaito",
    photo: "Mohammad_Shaito.jpeg",
    info: "Ph.D. Candidate, CSE at UTA",
    link: "https://www.linkedin.com/in/mshaito/"
  },
  {
    name: "Pichate Pluempatanakij",
    photo: "bio-photo.jpg",
    info: "Graduated in 2003"
  }
];

// Former Visiting Scholars
const formerVisitingScholars = [
  {
    name: "Chang Rao",
    photo: "chang_rao.jpeg",
    info: "Researcher scholar 2017-2019, now Researcher at Chongqing Jiaotong University",
    link: "https://www.linkedin.com/in/chang-rao-79a785b6/"
  }
];

// Removed unused renderHtml function

export default function TeamPage() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Director */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <Card className="bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-gray-900 dark:to-gray-950 border border-slate-200/60 dark:border-gray-800 shadow-lg rounded-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <Image
                src={`/images/teampic/${director.photo}`}
                alt="Director photo"
                width={200}
                height={200}
                className="rounded-xl object-cover w-48 h-48 flex-shrink-0 shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{director.name}</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">{director.info}</p>
                <div className="space-y-2 mb-4">
                  <h4 className="text-slate-700 dark:text-white font-semibold">Education:</h4>
                  <ul className="text-slate-600 dark:text-gray-300 text-sm space-y-1">
                    {director.education.map((edu, i) => (
                      <li key={i} className="ml-4">• {edu}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-slate-600 dark:text-gray-300 text-sm mb-2">{director.experience}</p>
                <p className="text-slate-600 dark:text-gray-300 text-sm">Research: {director.research}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Current PhD Students */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8">Current PhD Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPhDStudents.map((student, index) => (
            <motion.div
              key={student.name}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ 
                y: -5, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="bg-white/80 dark:bg-gray-800 border border-slate-200/60 dark:border-gray-700 shadow-lg hover:shadow-xl rounded-2xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    {student.photo ? (
                      <Image
                        src={`/images/teampic/${student.photo}`}
                        alt={`${student.name} photo`}
                        width={120}
                        height={120}
                        className="rounded-full object-cover w-24 h-24 mx-auto mb-4 shadow-md"
                      />
                    ) : (
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-md">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">No Photo</span>
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{student.name}</h3>
                    <p className="text-slate-600 dark:text-gray-300 text-sm mb-2">{student.info}</p>
                    <p className="text-slate-500 dark:text-gray-400 text-xs">{student.research}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Alumni PhD Students */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8">Alumni PhD Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumniPhDStudents.map((student, index) => (
            <motion.div
              key={student.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800 border border-slate-200/60 dark:border-gray-700 shadow-lg hover:shadow-xl rounded-2xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Image
                      src={`/images/teampic/${student.photo}`}
                      alt={`${student.name} photo`}
                      width={120}
                      height={120}
                      className="rounded-full object-cover w-24 h-24 mx-auto mb-4 shadow-md"
                    />
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{student.name}</h3>
                    <p className="text-slate-600 dark:text-gray-300 text-sm mb-2">{student.info}</p>
                    <p className="text-slate-500 dark:text-gray-400 text-xs">{student.research}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

              {/* Alumni Master&apos;s Students */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8">Alumni Master&apos;s Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {alumniMastersStudents.map((student, index) => (
            <motion.div
              key={student.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.05 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800 border border-slate-200/60 dark:border-gray-700 shadow-lg hover:shadow-xl rounded-2xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Image
                      src={`/images/teampic/${student.photo}`}
                      alt={`${student.name} photo`}
                      width={100}
                      height={100}
                      className="rounded-full object-cover w-20 h-20 mx-auto mb-3 shadow-md"
                    />
                    <h3 className="text-base font-semibold text-slate-800 dark:text-white mb-2">{student.name}</h3>
                    <p className="text-slate-600 dark:text-gray-300 text-xs leading-relaxed mb-2">{student.info}</p>
                    {student.link && (
                      <a
                        href={student.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Former Visiting Scholars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8">Former Visiting Scholars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formerVisitingScholars.map((scholar, index) => (
            <motion.div
              key={scholar.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
            >
              <Card className="bg-white/80 dark:bg-gray-800 border border-slate-200/60 dark:border-gray-700 shadow-lg hover:shadow-xl rounded-2xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Image
                      src={`/images/teampic/${scholar.photo}`}
                      alt={`${scholar.name} photo`}
                      width={120}
                      height={120}
                      className="rounded-full object-cover w-24 h-24 mx-auto mb-4 shadow-md"
                    />
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{scholar.name}</h3>
                    <p className="text-slate-600 dark:text-gray-300 text-sm mb-2">{scholar.info}</p>
                    {scholar.link && (
                      <a
                        href={scholar.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 