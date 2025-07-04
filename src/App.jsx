import { useState, useEffect } from 'react';

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('student'); // student | teacher
  const [activeTab, setActiveTab] = useState('home');
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState('beginner');
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizResults, setQuizResults] = useState({});
  const [completedUnits, setCompletedUnits] = useState(() => {
    const saved = localStorage.getItem('completedUnits');
    return saved ? JSON.parse(saved) : {};
  });

  // Simulated database
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "student", password: "123", classId: null },
    { id: 2, name: "Mr. Thompson", email: "teacher@example.com", role: "teacher", password: "123" }
  ]);

  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState({}); // { studentId_unitId: { score, feedback } }
  const [classes, setClasses] = useState([
    { id: 1, name: "Grade 7A", teacherId: 2 }
  ]);

  // Save state
  useEffect(() => {
    localStorage.setItem('completedUnits', JSON.stringify(completedUnits));
  }, [completedUnits]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Translations
  const translations = {
    en: {
      welcome: "Welcome to Grade 7 Biology!",
      choosePath: "Choose your learning path:",
      home: "Home", units: "Units", library: "Library", about: "About", dashboard: "Dashboard",
      logout: "Logout", login: "Login", signup: "Sign Up", begin: "Beginner", intermediate: "Intermediate", challenging: "Challenging",
      progress: "Your Progress", completed: "out of", complete: "Completed", notComplete: "Not Completed",
      exportCSV: "Export as CSV", exportPDF: "Print as PDF", difficulty: "Select Difficulty Level",
      quiz: "Quiz", worksheet: "Worksheet", view: "View", toggleComplete: "Toggle Completion",
      quizScore: "Score", questionOf: "Question", submitAnswer: "Submit Answer",
      loginPrompt: "Please log in to continue.",
      name: "Name", status: "Status", actions: "Actions", viewDetails: "View Details", downloadReport: "Download Report",
      alreadyAccount: "Already have an account?", signIn: "Sign In", signUpNow: "Sign Up Now",
      studentSignup: "Student Sign Up", teacherSignup: "Teacher Sign Up",
      email: "Email", password: "Password", createAccount: "Create Account",
      myProgress: "My Progress", studentProgress: "Student Progress",
      createClass: "Create Class", className: "Class Name", assignTask: "Assign Task",
      selectClass: "Select Class", selectUnit: "Select Unit", assign: "Assign",
      assignedTasks: "Assigned Tasks", noTasks: "No tasks assigned yet.",
      gradeSubmission: "Grade Submissions", submitted: "Submitted", notSubmitted: "Not Submitted", graded: "Graded",
      grade: "Grade", feedback: "Feedback", saveGrade: "Save Grade",
      myGrades: "My Grades & Feedback", noGradesYet: "No grades available yet.", exportGrades: "Export Grades"
    },
    cn: {
      welcome: "欢迎来到七年级生物课程！",
      choosePath: "选择你的学习路径：",
      home: "主页", units: "单元", library: "资料库", about: "关于", dashboard: "教师面板",
      logout: "登出", login: "登录", signup: "注册", begin: "初级", intermediate: "中级", challenging: "挑战级",
      progress: "你的进度", completed: "完成的", complete: "已完成", notComplete: "未完成",
      exportCSV: "导出为CSV", exportPDF: "打印为PDF", difficulty: "选择难度级别",
      quiz: "测验", worksheet: "练习纸", view: "查看", toggleComplete: "切换完成状态",
      quizScore: "得分", questionOf: "第", submitAnswer: "提交答案",
      loginPrompt: "请登录以继续。",
      name: "姓名", status: "状态", actions: "操作", viewDetails: "查看详情", downloadReport: "下载报告",
      alreadyAccount: "已有账号？", signIn: "登录", signUpNow: "立即注册",
      studentSignup: "学生注册", teacherSignup: "教师注册",
      email: "邮箱", password: "密码", createAccount: "创建账号",
      myProgress: "我的进度", studentProgress: "学生进度",
      createClass: "创建班级", className: "班级名称", assignTask: "分配任务",
      selectClass: "选择班级", selectUnit: "选择单元", assign: "分配",
      assignedTasks: "已分配任务", noTasks: "暂无任务。",
      gradeSubmission: "评分提交内容", submitted: "已提交", notSubmitted: "未提交", graded: "已评分",
      grade: "评分", feedback: "反馈", saveGrade: "保存评分",
      myGrades: "我的成绩与反馈", noGradesYet: "尚无评分记录。", exportGrades: "导出成绩"
    }
  };

  const t = (key) => translations[lang][key] || key;

  // Units Based on Your PDF
  const unitSections = [
    {
      id: 1,
      title: {
        en: "1. Characteristics of Living Things",
        cn: "1. 生物的特征"
      },
      units: [
        {
          id: '1.1',
          title: {
            en: "Characteristics of Living Organisms",
            cn: "生物体的特征"
          },
          glossary: {
            en: ["Organism", "Cell", "Metabolism"],
            cn: ["生物体", "细胞", "新陈代谢"]
          },
          content: {
            beginner: {
              en: "All living things have certain characteristics like growth, reproduction, and response to their environment.",
              cn: "所有生物都有某些特征，如生长、繁殖和对环境的反应。"
            },
            intermediate: {
              en: "Living organisms share features such as respiration, excretion, sensitivity, and nutrition.",
              cn: "生物具有呼吸、排泄、敏感性和营养等共同特征。"
            },
            challenging: {
              en: "Explore how these characteristics differentiate living from non-living matter through scientific definitions.",
              cn: "通过科学定义探索这些特征如何区分生物与非生物物质。"
            }
          },
          exercise: {
            beginner: {
              en: "List 5 characteristics of living organisms.",
              cn: "列出生物的五个特征。"
            },
            intermediate: {
              en: "Explain why viruses are not considered living organisms.",
              cn: "解释为什么病毒不被视为生物。"
            },
            challenging: {
              en: "Compare and contrast plant and animal cells based on life characteristics.",
              cn: "根据生命特征比较植物和动物细胞。"
            }
          },
          worksheetUrl: "#worksheet1",
          quiz: {
            beginner: [
              {
                question: {
                  en: "What is one characteristic of all living things?",
                  cn: "所有生物的一个特征是什么？"
                },
                options: {
                  en: ["Grow", "Fly", "Talk"],
                  cn: ["生长", "飞", "说话"]
                },
                answer: {
                  en: "Grow",
                  cn: "生长"
                }
              },
              {
                question: {
                  en: "Which of these is alive?",
                  cn: "以下哪一个是活的？"
                },
                options: {
                  en: ["Rock", "Tree", "Water"],
                  cn: ["石头", "树", "水"]
                },
                answer: {
                  en: "Tree",
                  cn: "树"
                }
              },
              {
                question: {
                  en: "Do plants grow?",
                  cn: "植物会生长吗？"
                },
                options: {
                  en: ["No", "Yes"],
                  cn: ["不会", "会"]
                },
                answer: {
                  en: "Yes",
                  cn: "会"
                }
              }
            ],
            intermediate: [
              {
                question: {
                  en: "What do all living things need?",
                  cn: "所有生物都需要什么？"
                },
                options: {
                  en: ["Food", "Shoes", "Money"],
                  cn: ["食物", "鞋子", "钱"]
                },
                answer: {
                  en: "Food",
                  cn: "食物"
                }
              },
              {
                question: {
                  en: "What is metabolism?",
                  cn: "什么是新陈代谢？"
                },
                options: {
                  en: ["Chemical reactions in cells", "A type of cell"],
                  cn: ["细胞内的化学反应", "一种细胞"]
                },
                answer: {
                  en: "Chemical reactions in cells",
                  cn: "细胞内的化学反应"
                }
              },
              {
                question: {
                  en: "Can viruses reproduce on their own?",
                  cn: "病毒能自行繁殖吗？"
                },
                options: {
                  en: ["Yes", "No"],
                  cn: ["可以", "不可以"]
                },
                answer: {
                  en: "No",
                  cn: "不可以"
                }
              }
            ],
            challenging: [
              {
                question: {
                  en: "Define homeostasis.",
                  cn: "定义稳态。"
                },
                options: {
                  en: ["Maintaining internal balance", "Growing fast"],
                  cn: ["维持内部平衡", "快速生长"]
                },
                answer: {
                  en: "Maintaining internal balance",
                  cn: "维持内部平衡"
                }
              },
              {
                question: {
                  en: "Why are viruses controversial?",
                  cn: "为什么病毒存在争议？"
                },
                options: {
                  en: ["They aren’t made of cells", "They don’t eat"],
                  cn: ["它们不是由细胞构成的", "它们不吃东西"]
                },
                answer: {
                  en: "They aren’t made of cells",
                  cn: "它们不是由细胞构成的"
                }
              },
              {
                question: {
                  en: "How do organisms respond to stimuli?",
                  cn: "生物如何对刺激作出反应？"
                },
                options: {
                  en: ["By moving away or toward it", "By sleeping"],
                  cn: ["远离或朝向它移动", "睡觉"]
                },
                answer: {
                  en: "By moving away or toward it",
                  cn: "远离或朝向它移动"
                }
              }
            ]
          }
        },
        {
          id: '1.2',
          title: {
            en: "Testing Predictions",
            cn: "测试预测"
          },
          glossary: {
            en: ["Hypothesis", "Experiment", "Variable"],
            cn: ["假设", "实验", "变量"]
          },
          content: {
            beginner: {
              en: "A prediction can be tested through experiments.",
              cn: "预测可以通过实验进行测试。"
            },
            intermediate: {
              en: "Scientific predictions require controlled variables and repeated testing.",
              cn: "科学预测需要控制变量并重复测试。"
            },
            challenging: {
              en: "Design an experiment to test a hypothesis using proper controls and measurements.",
              cn: "设计一个实验来测试假设，并使用正确的对照组和测量方法。"
            }
          },
          exercise: {
            beginner: {
              en: "Name the steps of the scientific method.",
              cn: "说出科学方法的步骤。"
            },
            intermediate: {
              en: "Write a simple hypothesis about plant growth.",
              cn: "写一个关于植物生长的简单假设。"
            },
            challenging: {
              en: "Design an experiment to test if sunlight affects plant growth.",
              cn: "设计一个实验来测试阳光是否影响植物生长。"
            }
          },
          worksheetUrl: "#worksheet2",
          quiz: {
            beginner: [
              {
                question: {
                  en: "What is a hypothesis?",
                  cn: "什么是假设？"
                },
                options: {
                  en: ["An educated guess", "A lie"],
                  cn: ["有根据的猜测", "谎言"]
                },
                answer: {
                  en: "An educated guess",
                  cn: "有根据的猜测"
                }
              },
              {
                question: {
                  en: "What is a variable?",
                  cn: "什么是变量？"
                },
                options: {
                  en: ["Something you change in an experiment", "A number"],
                  cn: ["你在实验中改变的东西", "一个数字"]
                },
                answer: {
                  en: "Something you change in an experiment",
                  cn: "你在实验中改变的东西"
                }
              },
              {
                question: {
                  en: "Which part of the experiment stays the same?",
                  cn: "实验中哪个部分保持不变？"
                },
                options: {
                  en: ["Control", "Variable"],
                  cn: ["对照组", "变量"]
                },
                answer: {
                  en: "Control",
                  cn: "对照组"
                }
              }
            ],
            intermediate: [
              {
                question: {
                  en: "What does independent variable mean?",
                  cn: "自变量是什么意思？"
                },
                options: {
                  en: ["What you change", "What you measure"],
                  cn: ["你改变的变量", "你测量的变量"]
                },
                answer: {
                  en: "What you change",
                  cn: "你改变的变量"
                }
              },
              {
                question: {
                  en: "What is a dependent variable?",
                  cn: "因变量是什么？"
                },
                options: {
                  en: ["What you observe", "What you ignore"],
                  cn: ["你观察到的变量", "你忽略的变量"]
                },
                answer: {
                  en: "What you observe",
                  cn: "你观察到的变量"
                }
              },
              {
                question: {
                  en: "What is a control group?",
                  cn: "什么是对照组？"
                },
                options: {
                  en: ["Group without treatment", "Group with treatment"],
                  cn: ["没有接受处理的组", "接受处理的组"]
                },
                answer: {
                  en: "Group without treatment",
                  cn: "没有接受处理的组"
                }
              }
            ],
            challenging: [
              {
                question: {
                  en: "How many variables should you change at once?",
                  cn: "一次应该改变多少个变量？"
                },
                options: {
                  en: ["One", "Three"],
                  cn: ["一个", "三个"]
                },
                answer: {
                  en: "One",
                  cn: "一个"
                }
              },
              {
                question: {
                  en: "What makes an experiment reliable?",
                  cn: "什么使实验可靠？"
                },
                options: {
                  en: ["Repeating it", "Guessing"],
                  cn: ["重复实验", "猜测"]
                },
                answer: {
                  en: "Repeating it",
                  cn: "重复实验"
                }
              },
              {
                question: {
                  en: "Why is sample size important?",
                  cn: "样本量为什么重要？"
                },
                options: {
                  en: ["More accurate results", "Looks better"],
                  cn: ["结果更准确", "看起来更好"]
                },
                answer: {
                  en: "More accurate results",
                  cn: "结果更准确"
                }
              }
            ]
          }
        }
      ]
    },
    {
      id: 2,
      title: {
        en: "2. Habitats & Ecosystems",
        cn: "2. 栖息地与生态系统"
      },
      units: [
        {
          id: '2.1',
          title: {
            en: "Habitats",
            cn: "栖息地"
          },
          glossary: {
            en: ["Ecosystem", "Biome", "Biodiversity"],
            cn: ["生态系统", "生物群系", "生物多样性"]
          },
          content: {
            beginner: {
              en: "A habitat is where an organism lives and finds food and shelter.",
              cn: "栖息地是生物生活和寻找食物及庇护所的地方。"
            },
            intermediate: {
              en: "Different habitats support different types of life depending on environmental conditions.",
              cn: "不同的栖息地支持不同类型的生物，取决于环境条件。"
            },
            challenging: {
              en: "Discuss how biodiversity affects ecosystem stability and sustainability.",
              cn: "讨论生物多样性如何影响生态系统的稳定性和可持续性。"
            }
          },
          exercise: {
            beginner: {
              en: "Draw and label a local habitat.",
              cn: "绘制并标注本地栖息地。"
            },
            intermediate: {
              en: "Describe two differences between land and aquatic habitats.",
              cn: "描述陆地和水生栖息地之间的两个差异。"
            },
            challenging: {
              en: "Create a report comparing two biomes and their biodiversity.",
              cn: "创建一份报告，比较两种生物群落及其生物多样性。"
            }
          },
          worksheetUrl: "#worksheet3",
          quiz: {
            beginner: [
              {
                question: {
                  en: "Where does a fish live?",
                  cn: "鱼生活在哪儿？"
                },
                options: {
                  en: ["Forest", "River"],
                  cn: ["森林", "河流"]
                },
                answer: {
                  en: "River",
                  cn: "河流"
                }
              },
              {
                question: {
                  en: "What is a habitat?",
                  cn: "什么是栖息地？"
                },
                options: {
                  en: ["Home of an organism", "Type of rock"],
                  cn: ["生物的家", "岩石类型"]
                },
                answer: {
                  en: "Home of an organism",
                  cn: "生物的家"
                }
              },
              {
                question: {
                  en: "Name one thing animals need in a habitat.",
                  cn: "说出动物在栖息地中需要的一样东西。"
                },
                options: {
                  en: ["Water", "Clothes"],
                  cn: ["水", "衣服"]
                },
                answer: {
                  en: "Water",
                  cn: "水"
                }
              }
            ],
            intermediate: [
              {
                question: {
                  en: "What is a biome?",
                  cn: "什么是生物群系？"
                },
                options: {
                  en: ["Large area with similar climate", "A city"],
                  cn: ["具有相似气候的大区域", "城市"]
                },
                answer: {
                  en: "Large area with similar climate",
                  cn: "具有相似气候的大区域"
                }
              },
              {
                question: {
                  en: "What is biodiversity?",
                  cn: "什么是生物多样性？"
                },
                options: {
                  en: ["Many species in one place", "One species only"],
                  cn: ["一个地方有很多物种", "仅有一个物种"]
                },
                answer: {
                  en: "Many species in one place",
                  cn: "一个地方有很多物种"
                }
              },
              {
                question: {
                  en: "Why are habitats important?",
                  cn: "为什么栖息地很重要？"
                },
                options: {
                  en: ["Provide shelter", "Look pretty"],
                  cn: ["提供庇护所", "看起来好看"]
                },
                answer: {
                  en: "Provide shelter",
                  cn: "提供庇护所"
                }
              }
            ],
            challenging: [
              {
                question: {
                  en: "What threatens biodiversity?",
                  cn: "什么威胁生物多样性？"
                },
                options: {
                  en: ["Pollution", "Clean water"],
                  cn: ["污染", "干净的水"]
                },
                answer: {
                  en: "Pollution",
                  cn: "污染"
                }
              },
              {
                question: {
                  en: "How does deforestation affect habitats?",
                  cn: "森林砍伐如何影响栖息地？"
                },
                options: {
                  en: ["Destroys them", "Improves them"],
                  cn: ["破坏它们", "改善它们"]
                },
                answer: {
                  en: "Destroys them",
                  cn: "破坏它们"
                }
              },
              {
                question: {
                  en: "Give one example of an endangered species.",
                  cn: "举一个濒危物种的例子。"
                },
                options: {
                  en: ["Tiger", "Dog"],
                  cn: ["老虎", "狗"]
                },
                answer: {
                  en: "Tiger",
                  cn: "老虎"
                }
              }
            ]
          }
        },
        {
          id: '2.2',
          title: {
            en: "Changing the Planet",
            cn: "改变星球"
          },
          glossary: {
            en: ["Deforestation", "Pollution", "Climate Change"],
            cn: ["森林砍伐", "污染", "气候变化"]
          },
          content: {
            beginner: {
              en: "Humans affect the planet through pollution and cutting down trees.",
              cn: "人类通过污染和砍伐树木影响地球。"
            },
            intermediate: {
              en: "Human activity leads to changes in ecosystems, affecting plants and animals.",
              cn: "人类活动导致生态系统变化，影响动植物。"
            },
            challenging: {
              en: "Analyze the long-term effects of climate change on global habitats.",
              cn: "分析气候变化对全球栖息地的长期影响。"
            }
          },
          exercise: {
            beginner: {
              en: "Name three ways humans harm the environment.",
              cn: "说出三种人类危害环境的方式。"
            },
            intermediate: {
              en: "Suggest one solution to reduce plastic waste.",
              cn: "提出一个减少塑料垃圾的方案。"
            },
            challenging: {
              en: "Design a poster about reducing carbon footprint.",
              cn: "设计一张关于减少碳足迹的海报。"
            }
          },
          worksheetUrl: "#worksheet4",
          quiz: {
            beginner: [
              {
                question: {
                  en: "What is pollution?",
                  cn: "什么是污染？"
                },
                options: {
                  en: ["Putting harmful things in nature", "Cleaning up"],
                  cn: ["将有害物质放入自然", "清理"]
                },
                answer: {
                  en: "Putting harmful things in nature",
                  cn: "将有害物质放入自然"
                }
              },
              {
                question: {
                  en: "What happens when we cut too many trees?",
                  cn: "当我们砍伐太多树木时会发生什么？"
                },
                options: {
                  en: ["Loss of homes", "More homes for animals"],
                  cn: ["失去家园", "动物更多家园"]
                },
                answer: {
                  en: "Loss of homes",
                  cn: "失去家园"
                }
              },
              {
                question: {
                  en: "What causes air pollution?",
                  cn: "什么造成空气污染？"
                },
                options: {
                  en: ["Cars", "Plants"],
                  cn: ["汽车", "植物"]
                },
                answer: {
                  en: "Cars",
                  cn: "汽车"
                }
              }
            ],
            intermediate: [
              {
                question: {
                  en: "What is climate change?",
                  cn: "什么是气候变化？"
                },
                options: {
                  en: ["Long-term weather change", "Short storm"],
                  cn: ["长期天气变化", "短期风暴"]
                },
                answer: {
                  en: "Long-term weather change",
                  cn: "长期天气变化"
                }
              },
              {
                question: {
                  en: "How can we help the environment?",
                  cn: "我们如何帮助环境？"
                },
                options: {
                  en: ["Recycle", "Throw trash everywhere"],
                  cn: ["回收利用", "到处扔垃圾"]
                },
                answer: {
                  en: "Recycle",
                  cn: "回收利用"
                }
              },
              {
                question: {
                  en: "What is deforestation?",
                  cn: "什么是森林砍伐？"
                },
                options: {
                  en: ["Cutting down forests", "Planting trees"],
                  cn: ["砍伐森林", "植树"]
                },
                answer: {
                  en: "Cutting down forests",
                  cn: "砍伐森林"
                }
              }
            ],
            challenging: [
              {
                question: {
                  en: "What are greenhouse gases?",
                  cn: "温室气体是什么？"
                },
                options: {
                  en: ["Gases trapping heat", "Gases making rain"],
                  cn: ["捕获热量的气体", "产生雨水的气体"]
                },
                answer: {
                  en: "Gases trapping heat",
                  cn: "捕获热量的气体"
                }
              },
              {
                question: {
                  en: "How do oceans absorb CO2?",
                  cn: "海洋如何吸收二氧化碳？"
                },
                options: {
                  en: ["Through algae", "Through waves"],
                  cn: ["通过藻类", "通过波浪"]
                },
                answer: {
                  en: "Through algae",
                  cn: "通过藻类"
                }
              },
              {
                question: {
                  en: "What is a carbon footprint?",
                  cn: "碳足迹是什么？"
                },
                options: {
                  en: ["Total emissions from activities", "Size of foot"],
                  cn: ["活动产生的总排放", "脚的大小"]
                },
                answer: {
                  en: "Total emissions from activities",
                  cn: "活动产生的总排放"
                }
              }
            ]
          }
        }
      ]
    },
    {
      id: 3,
      title: {
        en: "3. Cells & Microbes",
        cn: "3. 细胞与微生物"
      },
      units: [
        {
          id: '3.1',
          title: {
            en: "Plant and Animal Cells",
            cn: "植物和动物细胞"
          },
          glossary: {
            en: ["Cell Membrane", "Nucleus", "Cytoplasm"],
            cn: ["细胞膜", "细胞核", "细胞质"]
          },
          content: {
            beginner: {
              en: "Cells are building blocks of life. Plant and animal cells have some parts in common.",
              cn: "细胞是生命的组成部分。植物和动物细胞有一些相同的部分。"
            },
            intermediate: {
              en: "Both cell types contain nucleus, cytoplasm, and cell membrane but differ in structure.",
              cn: "两种细胞都含有细胞核、细胞质和细胞膜，但结构不同。"
            },
            challenging: {
              en: "Compare plant and animal cells under electron microscopy.",
              cn: "在电子显微镜下比较植物和动物细胞。"
            }
          },
          exercise: {
            beginner: {
              en: "Label a basic plant or animal cell.",
              cn: "标注一个基本的植物或动物细胞。"
            },
            intermediate: {
              en: "List three differences between plant and animal cells.",
              cn: "列出植物和动物细胞的三个不同之处。"
            },
            challenging: {
              en: "Write a paragraph explaining the function of each cell part.",
              cn: "写一段文字解释每个细胞部分的功能。"
            }
          },
          worksheetUrl: "#worksheet5",
          quiz: {
            beginner: [
              {
                question: {
                  en: "What is a cell?",
                  cn: "什么是细胞？"
                },
                options: {
                  en: ["Smallest unit of life", "A type of organ"],
                  cn: ["生命的基本单位", "一种器官"]
                },
                answer: {
                  en: "Smallest unit of life",
                  cn: "生命的基本单位"
                }
              },
              {
                question: {
                  en: "Do all cells have a nucleus?",
                  cn: "所有细胞都有细胞核吗？"
                },
                options: {
                  en: ["No", "Yes"],
                  cn: ["不", "是"]
                },
                answer: {
                  en: "No",
                  cn: "不"
                }
              },
              {
                question: {
                  en: "What is cytoplasm?",
                  cn: "细胞质是什么？"
                },
                options: {
                  en: ["Liquid inside the cell", "Outer layer of cell"],
                  cn: ["细胞内的液体", "细胞的外层"]
                },
                answer: {
                  en: "Liquid inside the cell",
                  cn: "细胞内的液体"
                }
              }
            ],
            intermediate: [
              {
                question: {
                  en: "Which cell has a cell wall?",
                  cn: "哪种细胞有细胞壁？"
                },
                options: {
                  en: ["Plant", "Animal"],
                  cn: ["植物", "动物"]
                },
                answer: {
                  en: "Plant",
                  cn: "植物"
                }
              },
              {
                question: {
                  en: "What protects the cell?",
                  cn: "什么保护细胞？"
                },
                options: {
                  en: ["Cell membrane", "Nucleus"],
                  cn: ["细胞膜", "细胞核"]
                },
                answer: {
                  en: "Cell membrane",
                  cn: "细胞膜"
                }
              },
              {
                question: {
                  en: "What is the powerhouse of the cell?",
                  cn: "细胞的能量工厂是什么？"
                },
                options: {
                  en: ["Mitochondria", "Nucleus"],
                  cn: ["线粒体", "细胞核"]
                },
                answer: {
                  en: "Mitochondria",
                  cn: "线粒体"
                }
              }
            ],
            challenging: [
              {
                question: {
                  en: "What is the nucleus responsible for?",
                  cn: "细胞核负责什么？"
                },
                options: {
                  en: ["DNA storage", "Energy production"],
                  cn: ["储存DNA", "能量生产"]
                },
                answer: {
                  en: "DNA storage",
                  cn: "储存DNA"
                }
              },
              {
                question: {
                  en: "What is a eukaryotic cell?",
                  cn: "真核细胞是什么？"
                },
                options: {
                  en: ["Has a nucleus", "Has no nucleus"],
                  cn: ["有细胞核", "没有细胞核"]
                },
                answer: {
                  en: "Has a nucleus",
                  cn: "有细胞核"
                }
              },
              {
                question: {
                  en: "What kind of cell is bacteria?",
                  cn: "细菌属于什么细胞？"
                },
                options: {
                  en: ["Prokaryotic", "Eukaryotic"],
                  cn: ["原核", "真核"]
                },
                answer: {
                  en: "Prokaryotic",
                  cn: "原核"
                }
              }
            ]
          }
        }
      ]
    }
  ];

  const totalUnits = unitSections.reduce((sum, sec) => sum + sec.units.length, 0);
  const completedCount = Object.values(completedUnits).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalUnits) * 100);

  const handleLogin = (email, password) => {
    const found = users.find(s => s.email === email && s.password === password);
    if (found) {
      setUser(found);
      setRole(found.role);
      setActiveTab('home');
    } else {
      alert(t("loginFailed"));
    }
  };

  const handleLogout = () => {
    setUser(null);
    setRole('student');
    setActiveTab('login');
  };

  const handleSignUp = (name, email, password, role) => {
    if (users.some(u => u.email === email)) {
      alert(t("emailExists"));
      return;
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      classId: null
    };
    setUsers([...users, newUser]);
    alert(t("signupSuccess"));
    setActiveTab('login');
  };

  const toggleUnitCompletion = (unitId) => {
    setCompletedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  const startQuiz = (unit) => {
    setSelectedUnit(unit);
    setQuizMode(true);
    setCurrentQuizIndex(0);
  };

  const submitAnswer = (answer) => {
    const correct = answer === selectedUnit.quiz[difficultyLevel]?.[currentQuizIndex]?.answer?.[lang];
    setQuizResults(prev => ({
      ...prev,
      [selectedUnit.id]: {
        ...(prev[selectedUnit.id] || {}),
        [currentQuizIndex]: correct
      }
    }));

    if (currentQuizIndex < selectedUnit.quiz[difficultyLevel].length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setTimeout(() => {
        setQuizMode(false);
        toggleUnitCompletion(selectedUnit.id);
      }, 800);
    }
  };

  const getQuizScore = () => {
    const results = quizResults[selectedUnit.id] || {};
    const total = Object.keys(results).length;
    const correct = Object.values(results).filter(Boolean).length;
    return `${correct} / ${total}`;
  };

  const exportProgress = (format = 'csv') => {
    const rows = [[t("name"), t("status")]];
    unitSections.forEach(sec =>
      sec.units.map(unit =>
        rows.push([unit.title[lang], completedUnits[unit.id] ? t("complete") : t("notComplete")]
      )
    );
    let data = "";
    if (format === 'csv') {
      data = rows.map(r => r.join(",")).join("\n");
      const blob = new Blob([data], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "progress_report.csv";
      link.click();
    } else if (format === 'pdf') {
      const html = `
        <h2>${t("progress")} ${user.name}</h2>
        <table border="1">
          <thead><tr><th>${t("name")}</th><th>${t("status")}</th></tr></thead>
          <tbody>${rows.slice(1).map(row => `<tr><td>${row.join("</td><td>")}</td></tr>`).join("")}</tbody>
        </table>`;
      const win = window.open("", "_blank");
      win.document.write(`<html><body>${html}</body></html>`);
      win.print();
    }
  };

  const addClass = (className) => {
    const newClass = {
      id: Date.now(),
      name: className,
      teacherId: user.id
    };
    setClasses([...classes, newClass]);
  };

  const assignTask = (classId, unitId) => {
    const newAssignment = {
      id: Date.now(),
      classId,
      unitId,
      assignedBy: user.id
    };
    setAssignments([...assignments, newAssignment]);
  };

  const updateGrade = (studentId, unitId, score, feedback) => {
    setGrades({
      ...grades,
      [`${studentId}_${unitId}`]: { score, feedback }
    });
  };

  const exportGrades = (format = 'csv') => {
    const rows = [["Student", "Unit", "Grade", "Feedback"]];
    const studentGrades = Object.entries(grades).map(([key, data]) => {
      const [studentId, unitId] = key.split('_');
      const studentName = users.find(u => u.id === parseInt(studentId))?.name || "未知";
      const unitTitle = unitSections.flatMap(sec => sec.units).find(u => u.id === unitId)?.title[lang] || unitId;
      return [studentName, unitTitle, data.score || '-', data.feedback || '-'];
    });

    if (format === 'csv') {
      const csv = [rows[0], ...studentGrades].map(r => r.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "grades_report.csv";
      link.click();
    } else if (format === 'pdf') {
      const html = `
        <h2>${t("gradeSubmission")}</h2>
        <table border="1">
          <thead><tr><th>Student</th><th>Unit</th><th>Grade</th><th>Feedback</th></tr></thead>
          <tbody>${studentGrades.map(row => `<tr><td>${row.join("</td><td>")}</td></tr>`).join("")}</tbody>
        </table>`;
      const win = window.open("", "_blank");
      win.document.write(`<html><body>${html}</body></html>`);
      win.print();
    }
  };

  const userGrades = Object.entries(grades).filter(([key]) => key.startsWith(`${user.id}_`));

  return (
    <>
      {!user ? (
        activeTab === 'signup' ? (
          <SignUp onSignUp={handleSignUp} lang={lang} t={t} setActiveTab={setActiveTab} />
        ) : (
          <Login onLogin={handleLogin} lang={lang} t={t} setActiveTab={setActiveTab} />
        )
      ) : (
        <div className="min-h-screen bg-gray-50 text-gray-800">
          {/* Header */}
          <header className="bg-teal-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Grade 7 Biology Explorer</h1>
              <nav className="flex gap-4 items-center">
                <button onClick={() => setLang('en')} disabled={lang === 'en'} className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-teal-700' : 'bg-teal-500 hover:bg-teal-700'} text-white`}>EN</button>
                <button onClick={() => setLang('cn')} disabled={lang === 'cn'} className={`px-2 py-1 rounded ${lang === 'cn' ? 'bg-teal-700' : 'bg-teal-500 hover:bg-teal-700'} text-white`}>中文</button>
                <ul className="flex gap-4">
                  <li><button onClick={() => setActiveTab('home')}>{t("home")}</button></li>
                  <li><button onClick={() => setActiveTab('units')}>{t("units")}</button></li>
                  <li><button onClick={() => setActiveTab('library')}>{t("library")}</button></li>
                  <li><button onClick={() => setActiveTab('about')}>{t("about")}</button></li>
                  {role === 'teacher' && <li><button onClick={() => setActiveTab('dashboard')}>{t("dashboard")}</button></li>}
                  {role === 'student' && <li><button onClick={() => setActiveTab('grades')}>{t("myGrades")}</button></li>}
                  <li><button onClick={handleLogout} className="text-red-200 hover:text-white">{t("logout")}</button></li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          {activeTab === 'home' && (
            <section className="container mx-auto py-10 px-4">
              <h2 className="text-3xl font-bold mb-4">{t("welcome")}</h2>
              <p className="mb-6">{t("choosePath")}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title={t("begin")} desc="Start here if you're new to biology!" color="bg-blue-100" />
                <Card title={t("intermediate")} desc="For those who know the basics." color="bg-green-100" />
                <Card title={t("challenging")} desc="Test yourself with advanced topics." color="bg-red-100" />
              </div>
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-2">{user.role === 'teacher' ? t("studentProgress") : t("myProgress")}</h3>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-teal-500 h-4 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <p className="text-sm mt-1">{completedCount} {t("completed")} {totalUnits} units</p>
                <div className="mt-4">
                  <button onClick={() => exportProgress('csv')} className="mr-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">{t("exportCSV")}</button>
                  <button onClick={() => exportProgress('pdf')} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">{t("exportPDF")}</button>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'units' && (
            <section className="container mx-auto py-10 px-4">
              <h2 className="text-3xl font-bold mb-6">{t("units")}</h2>
              <div className="mb-6">
                <label htmlFor="difficulty" className="block mb-2 font-medium">{t("difficulty")}</label>
                <select id="difficulty" value={difficultyLevel} onChange={(e) => setDifficultyLevel(e.target.value)} className="border rounded p-2">
                  <option value="beginner">{t("begin")}</option>
                  <option value="intermediate">{t("intermediate")}</option>
                  <option value="challenging">{t("challenging")}</option>
                </select>
              </div>
              <div className="space-y-6">
                {unitSections.map(section => (
                  <UnitSection key={section.id} section={section} lang={lang} expanded={expandedSection === section.id} onToggle={() => setExpandedSection(expandedSection === section.id ? null : section.id)} onSelectUnit={setSelectedUnit} difficulty={difficultyLevel} onStartQuiz={startQuiz} completedUnits={completedUnits} onToggleComplete={toggleUnitCompletion} t={t} />
                ))}
              </div>
            </section>
          )}

          {quizMode && selectedUnit && (
            <section className="container mx-auto py-10 px-4">
              <div className="max-w-2xl mx-auto bg-white border rounded-lg shadow p-6">
                <h3 className="text-2xl font-bold mb-4">{t("quiz")}: {selectedUnit.title[lang]}</h3>
                <p className="mb-4">{t("questionOf")} {currentQuizIndex + 1} {t("of")} {selectedUnit.quiz[difficultyLevel]?.length ?? 0}</p>
                <h4 className="font-semibold text-lg mb-2">{selectedUnit.quiz[difficultyLevel]?.[currentQuizIndex]?.question?.[lang] || "No quiz available."}</h4>
                <div className="space-y-2">
                  {selectedUnit.quiz[difficultyLevel]?.[currentQuizIndex]?.options?.[lang]?.map((opt, i) => (
                    <button key={i} onClick={() => submitAnswer(opt)} className="block w-full text-left p-3 border rounded hover:bg-gray-100">
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <span className="text-lg font-semibold">{t("quizScore")}: {getQuizScore()}</span>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'about' && (
            <section className="container mx-auto py-10 px-4">
              <h2 className="text-3xl font-bold mb-4">{t("about")}</h2>
              <p>This interactive biology learning platform is designed specifically for Grade 7 students.</p>
              <p className="mt-4">{t("loginPrompt")}</p>
            </section>
          )}

          {activeTab === 'dashboard' && role === 'teacher' && (
            <TeacherDashboard
              users={users}
              classes={classes}
              assignments={assignments}
              grades={grades}
              unitSections={unitSections}
              onAddClass={addClass}
              onAssignTask={assignTask}
              onUpdateGrade={updateGrade}
              onExportGrades={exportGrades}
              lang={lang}
              t={t}
            />
          )}

          {activeTab === 'grades' && role === 'student' && (
            <section className="container mx-auto py-10 px-4">
              <h2 className="text-3xl font-bold mb-6">{t("myGrades")}</h2>
              {userGrades.length > 0 ? (
                <div className="space-y-4">
                  {userGrades.map(([key, data]) => {
                    const [studentId, unitId] = key.split('_');
                    const unit = unitSections.flatMap(sec => sec.units).find(u => u.id === unitId);
                    return (
                      <div key={key} className="bg-white border rounded-lg shadow p-4">
                        <h3 className="font-semibold">{unit?.title[lang] || unitId}</h3>
                        <p className="mt-1"><strong>{t("grade")}:</strong> {data.score || '-'}</p>
                        <p><strong>{t("feedback")}:</strong> {data.feedback || '-'}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p>{t("noGradesYet")}</p>
              )}
              <div className="mt-6">
                <button onClick={() => exportGrades('csv')} className="mr-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">{t("exportCSV")}</button>
                <button onClick={() => exportGrades('pdf')} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">{t("exportGrades")}</button>
              </div>
            </section>
          )}

          {/* Footer */}
          <footer className="bg-teal-600 text-white p-4 mt-10">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 Grade 7 Biology Explorer | Designed for Learning</p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

// Reusable Components
function Card({ title, desc, color }) {
  return (
    <div className={`${color} border rounded-lg shadow p-6 text-center transition hover:scale-105`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function Login({ onLogin, lang, t, setActiveTab }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("login")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border rounded p-2" />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border rounded p-2" />
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">{t("login")}</button>
        </form>
        <p className="mt-4 text-center">
          {t("alreadyAccount")}{" "}
          <button onClick={() => setActiveTab('signup')} className="text-teal-600 hover:underline">{t("signUpNow")}</button>
        </p>
      </div>
    </div>
  );
}

function SignUp({ onSignUp, lang, t, setActiveTab }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(name, email, password, role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">{t("signup")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">{t("name")}</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">{t("email")}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border rounded p-2" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">{t("password")}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border rounded p-2" />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded p-2">
              <option value="student">{t("studentSignup")}</option>
              <option value="teacher">{t("teacherSignup")}</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">{t("createAccount")}</button>
        </form>
        <p className="mt-4 text-center">
          {t("signIn")}{" "}
          <button onClick={() => setActiveTab('login')} className="text-teal-600 hover:underline">{t("login")}</button>
        </p>
      </div>
    </div>
  );
}

function TeacherDashboard({ users, classes, assignments, grades, unitSections, onAddClass, onAssignTask, onUpdateGrade, onExportGrades, lang, t }) {
  const [newClassName, setNewClassName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [gradeInput, setGradeInput] = useState({});
  const [feedbackInput, setFeedbackInput] = useState({});

  const teacherClasses = classes.filter(c => c.teacherId === users.find(u => u.role === 'teacher')?.id);
  const studentInClass = users.filter(u => u.classId === parseInt(selectedClass));

  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    onAddClass(newClassName);
    setNewClassName('');
  };

  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!selectedClass || !selectedUnit) return;
    onAssignTask(parseInt(selectedClass), selectedUnit);
  };

  const handleGradeChange = (studentId, unitId, e) => {
    setGradeInput({ ...gradeInput, [`${studentId}_${unitId]`: e.target.value });
  };

  const handleFeedbackChange = (studentId, unitId, e) => {
    setFeedbackInput({ ...feedbackInput, [`${studentId}_${unitId]`: e.target.value });
  };

  const handleSaveGrade = (studentId, unitId) => {
    const grade = gradeInput[`${studentId}_${unitId}`] || '';
    const feedback = feedbackInput[`${studentId}_${unitId}`] || '';
    onUpdateGrade(studentId, unitId, grade, feedback);
  };

  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">{t("dashboard")}</h2>
      <form onSubmit={handleCreateClass} className="mb-10 flex gap-2">
        <input type="text" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder={t("className")} className="border rounded p-2 flex-1" />
        <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600">{t("createClass")}</button>
      </form>
      <form onSubmit={handleAssignTask} className="flex flex-wrap gap-4 mb-4">
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="border rounded p-2">
          <option value="">{t("selectClass")}</option>
          {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.name}</option>)}
        </select>
        <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)} className="border rounded p-2">
          <option value="">{t("selectUnit")}</option>
          {unitSections.flatMap(sec => sec.units).map(unit => (
            <option key={unit.id} value={unit.id}>{unit.title[lang]}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">{t("assign")}</button>
      </form>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">{t("name")}</th>
              <th className="p-3 text-left">Unit</th>
              <th className="p-3 text-left">{t("status")}</th>
              <th className="p-3 text-left">{t("grade")}</th>
              <th className="p-3 text-left">{t("feedback")}</th>
              <th className="p-3 text-left">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(task => {
              const unitTitle = unitSections.flatMap(sec => sec.units).find(u => u.id === task.unitId)?.title[lang] || task.unitId;
              return studentInClass.map(student => {
                const submissionKey = `${student.id}_${task.unitId}`;
                const currentGrade = grades[submissionKey] || {};
                const completed = !!completedUnits[task.unitId];
                return (
                  <tr key={submissionKey} className="border-t">
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{unitTitle}</td>
                    <td className="p-3">{completed ? t("submitted") : t("notSubmitted")}</td>
                    <td className="p-3">
                      <input type="text" value={currentGrade.score || ''} onChange={(e) => handleGradeChange(student.id, task.unitId, e)} className="border rounded p-2 w-full" placeholder="e.g. 8/10" />
                    </td>
                    <td className="p-3">
                      <textarea value={currentGrade.feedback || ''} onChange={(e) => handleFeedbackChange(student.id, task.unitId, e)} className="border rounded p-2 w-full" placeholder="Write feedback..."></textarea>
                    </td>
                    <td className="p-3">
                      <button onClick={() => handleSaveGrade(student.id, task.unitId)} className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">{t("saveGrade")}</button>
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
        <div className="mt-4">
          <button onClick={() => onExportGrades('csv')} className="mr-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">{t("exportCSV")}</button>
          <button onClick={() => onExportGrades('pdf')} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">{t("exportGrades")}</button>
        </div>
      </div>
    </section>
  );
}

function UnitSection({ section, lang, expanded, onToggle, onSelectUnit, difficulty, onStartQuiz, completedUnits, onToggleComplete, t }) {
  return (
    <div className="bg-white border rounded-lg shadow overflow-hidden">
      <button onClick={onToggle} className="w-full text-left p-4 font-semibold bg-gray-100 hover:bg-gray-200 flex justify-between items-center">
        {section.title[lang]}
        <span>{expanded ? '▼' : '▶'}</span>
      </button>
      {expanded && (
        <div className="p-4 space-y-2">
          {section.units.map(unit => (
            <div key={unit.id} className="bg-gray-50 border rounded p-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{unit.id} – {unit.title[lang]}</h4>
                <div className="flex gap-2">
                  <button onClick={() => onSelectUnit(unit)} className="text-sm px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600">{t("view")}</button>
                  <button onClick={() => onStartQuiz(unit)} className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">{t("quiz")}</button>
                  <a href={unit.worksheetUrl} download className="text-sm px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600">{t("worksheet")}</a>
                  <input type="checkbox" checked={!!completedUnits[unit.id]} onChange={() => onToggleComplete(unit.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}