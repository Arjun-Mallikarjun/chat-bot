import Head from "next/head";
import React, { useState } from 'react';
import axios from "axios";
import TypingAnimations from "../components/TypingAnimation.jsx";  

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') return;

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);
    sendMessage(inputValue);
    setInputValue('');
  }

  const sendMessage = async (message) => {
    const url = '/api/chat';
    const data = {
      model: "gpt-3.5-turbo-0301",  
      messages: [{ "role": "user", "content": message }]
    };

    setIsLoading(true);
    try {
      let botResponse = "";
      const lowerCaseMessage = message.toLowerCase();

      if (lowerCaseMessage === "hi" || lowerCaseMessage === "hello") {
        botResponse = "Hello! How may I help you?<br /><br />" +
          "As a Programming Mentor, I'll assist you in learning programming languages and concepts.<br /><br />" +
          "I'll also provide app recommendations and suggest useful apps for various needs.";
      }   else if (message.toLowerCase().includes("learn") && message.toLowerCase().includes("languages")) {
        botResponse = "Great to hear that you want to learn computer languages! Here are some steps and resources to get you started:\n\n" +
          "1. **Choose a Language:** Depending on your goals, you might want to start with a language that suits your needs:\n" +
          "   - **Python:** Known for its simplicity and versatility, great for beginners and widely used in data science, web development, and automation.\n" +
          "   - **JavaScript:** Essential for web development, useful for creating interactive web pages and front-end frameworks.\n" +
          "   - **Java:** A robust, object-oriented language often used in enterprise applications and Android development.\n" +
          "   - **C++:** Offers performance and control over system resources, ideal for game development and systems programming.\n\n" +
          "2. **Online Tutorials:**\n" +
          "   - [Codecademy](https://www.codecademy.com/): Interactive lessons for various programming languages.\n" +
          "   - [freeCodeCamp](https://www.freecodecamp.org/): Free resources and projects to practice coding.\n\n" +
          "3. **Books and Courses:**\n" +
          "   - **\"Automate the Boring Stuff with Python\"** by Al Sweigart: A great book for beginners in Python.\n" +
          "   - **\"Eloquent JavaScript\"** by Marijn Haverbeke: A thorough introduction to JavaScript.\n" +
          "   - **Udemy** and **Coursera**: Offer numerous courses for different programming languages and skill levels.\n\n" +
          "4. **Practice Coding:**\n" +
          "   - **LeetCode**, **HackerRank**, and **Codewars**: Platforms where you can solve coding challenges to improve your skills.\n\n" +
          "Feel free to ask if you have any specific questions or need further recommendations!";
      }else if (lowerCaseMessage.includes("programming") || lowerCaseMessage.includes("learn") || lowerCaseMessage.includes("computer languages")) {
        botResponse = "To get started with learning programming languages, I can recommend several resources. "+
        "Could you please specify which programming language you're interested in?";
      } 
      else if (lowerCaseMessage.includes("java")) {
        botResponse = "Java is a high-level, class-based, object-oriented programming language. "+
        "For learning Java, I recommend the following resources:\n\n" +
        "1. **Website**: [Codecademy](https://www.codecademy.com/learn/learn-java)\n" +
        "2. **Website**: [Oracle's Java Tutorials](https://docs.oracle.com/javase/tutorial/)\n" +
        "3. **App**: [SoloLearn](https://play.google.com/store/apps/details?id=com.sololearn)\n" +
        "4. **App**: [Java Programming](https://play.google.com/store/apps/details?id=com.rizwan.java_programming)";
      }
      else if (lowerCaseMessage.includes("python")) {
        botResponse = "Python is a high-level, interpreted programming language known for its readability and simplicity. "+
        "For learning Python, check out these resources:\n\n" +
        "1. **Website**: [Python.org Tutorials](https://docs.python.org/3/tutorial/)\n" +
        "2. **Website**: [Learn Python](https://www.learnpython.org/)\n" +
        "3. **App**: [Py](https://play.google.com/store/apps/details?id=org.pycon.py)\n" +
        "4. **App**: [SoloLearn](https://play.google.com/store/apps/details?id=com.sololearn)";
      }
      else if (lowerCaseMessage.includes("javascript")) {
        botResponse = "JavaScript is a versatile programming language used for web development. "+
        "For learning JavaScript, you can use these resources:\n\n" +
        "1. **Website**: [Mozilla Developer Network (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)\n" +
        "2. **Website**: [W3Schools](https://www.w3schools.com/js/)\n" +
        "3. **App**: [JavaScript Anywhere](https://play.google.com/store/apps/details?id=com.jsanywhere)\n" +
        "4. **App**: [SoloLearn](https://play.google.com/store/apps/details?id=com.sololearn)";
      }
      else if (lowerCaseMessage.includes("c++")) {
        botResponse = "C++ is an extension of C that includes object-oriented features. "+
        "For learning C++, check these resources:\n\n" +
        "1. **Website**: [LearnCpp](https://www.learncpp.com/)\n" +
        "2. **Website**: [GeeksforGeeks](https://www.geeksforgeeks.org/c-plus-plus/)\n" +
        "3. **App**: [C++ Programming](https://play.google.com/store/apps/details?id=com.pascal.java.cpp)\n" +
        "4. **App**: [SoloLearn](https://play.google.com/store/apps/details?id=com.sololearn)";
      }
      else if (lowerCaseMessage.includes("ruby")) {
        botResponse = "Ruby is a dynamic, object-oriented programming language known for its simplicity and productivity. "+
        "To learn Ruby, check out these resources:\n\n" +
        "1. **Website**: [Ruby Docs](https://ruby-doc.org/)\n" +
        "2. **Website**: [Codecademy](https://www.codecademy.com/learn/learn-ruby)\n" +
        "3. **App**: [Ruby Programming](https://play.google.com/store/apps/details?id=com.rubyprogramming)\n" +
        "4. **App**: [SoloLearn](https://play.google.com/store/apps/details?id=com.sololearn)";
      }
      else if (lowerCaseMessage.includes("go")) {
        botResponse = "Go (or Golang) is a statically typed, compiled programming language designed for efficiency. "+
        "Here are some resources for learning Go:\n\n" +
        "1. **Website**: [Go Documentation](https://golang.org/doc/)\n" +
        "2. **Website**: [A Tour of Go](https://tour.golang.org/)\n" +
        "3. **App**: [Go Programming](https://play.google.com/store/apps/details?id=com.golang)\n" +
        "4. **App**: [SoloLearn](https://play.google.com/store/apps/details?id=com.sololearn)";
      }
      else if (lowerCaseMessage.includes("swift")) {
        botResponse = "Swift is a powerful and intuitive programming language for iOS, macOS, watchOS, and tvOS. "+
        "For learning Swift, you can use these resources:\n\n" +
        "1. **Website**: [Swift.org](https://swift.org/documentation/)\n" +
        "2. **Website**: [Ray Wenderlich](https://www.raywenderlich.com/ios/paths/learn)\n" +
        "3. **App**: [Swift Playgrounds](https://apps.apple.com/us/app/swift-playgrounds/id908519492)\n" +
        "4. **App**: [SoloLearn](https://play.google.com/store/apps/details?id=com.sololearn)";
      }
      else if (lowerCaseMessage.includes("php")) {
        botResponse = "PHP is a popular general-purpose scripting language that is especially suited for web development. "+
        "Check out these resources for learning PHP:\n\n" +
        "1. **Website**: [PHP Manual](https://www.php.net/manual/en/)\n" +
        "2. **Website**: [W3Schools](https://www.w3schools.com/php/)\n" +
        "3. **App**: [PHP Programming](https://play.google.com/store/apps/details?id=com.phpprogramming)\n" +
        "4. **App**: [SoloLearn](https://play.google.com/store/apps/details?id=com.sololearn)";
      }
      else if (lowerCaseMessage.includes("kotlin")) {
        botResponse = "Kotlin is a statically typed programming language for modern multiplatform applications. "+
        "To learn Kotlin, use these resources:\n\n" +
        "1. **Website**: [Kotlin Documentation](https://kotlinlang.org/docs/home.html)\n" +
        "2. **Website**: [JetBrains Academy](https://www.jetbrains.com/academy/)\n" +
        "3. **App**: [Kotlin Programming](https://play.google.com/store/apps/details?id=com.kotlin)\n" +
        "4. **App**: [SoloLearn](https://play.google.com/store/apps/details?id=com.sololearn)";
      }
      else if (lowerCaseMessage.includes("r")) {
        botResponse = "R is a programming language and free software environment used for statistical computing and graphics. "+
        "Here are some resources for learning R:\n\n" +
        "1. **Website**: [R Documentation](https://www.r-project.org/)\n" +
        "2. **Website**: [DataCamp](https://www.datacamp.com/courses/tech:r)\n" +
        "3. **App**: [R Programming](https://play.google.com/store/apps/details?id=com.rprogramming)\n" +
        "4. **App**: [SoloLearn](https://play.google.com/store/apps/details?id=com.sololearn)";
      }
      else if (lowerCaseMessage.includes("typescript")) {
        botResponse = "TypeScript is a strongly typed programming language that builds on JavaScript. "+
        "For learning TypeScript, you can use these resources:\n\n" +
        "1. **Website**: [TypeScript Documentation](https://www.typescriptlang.org/docs/)\n" +
        "2. **Website**: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)\n" +
        "3. **App**: [TypeScript Programming](https://play.google.com/store/apps/details?id=com.typescript)\n" +
        "4. **App**: [SoloLearn](https://play.google.com/store/apps/details?id=com.sololearn)";
   
           }     else if (lowerCaseMessage.includes("learn programming") || lowerCaseMessage.includes("computer languages")) {
        botResponse = "Great choice! I can help you with various programming languages. Are you interested in learning Python, JavaScript, Java, C++, or another language? Let me know what you're looking to achieve, and I can provide resources and guidance.";
      } else if (lowerCaseMessage.includes("coding tutorials") || lowerCaseMessage.includes("programming courses")) {
        botResponse = "Looking for coding tutorials? I can recommend platforms like Codecademy, Coursera, and freeCodeCamp for various programming languages. Just let me know which language or topic interests you!";
      } else if (lowerCaseMessage.includes("how to code")) {
        botResponse = "Coding can be learned step-by-step. Start with basic concepts like variables and loops, and then move on to more complex topics. Platforms like Khan Academy and freeCodeCamp offer beginner-friendly tutorials.";
      } else if (lowerCaseMessage.includes("learn python")) {
        botResponse = "Python is a great language for beginners and professionals alike. Check out resources like 'Automate the Boring Stuff with Python' and Python.org’s tutorials. If you need specific guidance or have questions, feel free to ask!";
      } else if (lowerCaseMessage.includes("learn javascript")) {
        botResponse = "JavaScript is essential for web development. You can start with 'Eloquent JavaScript' and Mozilla Developer Network's (MDN) resources. If you have specific projects or problems, let me know!";
      } else if (lowerCaseMessage.includes("programming challenges")) {
        botResponse = "Solving programming challenges is a great way to improve your skills. Websites like LeetCode, HackerRank, and CodeSignal offer a variety of challenges and competitions.";
      } else if (lowerCaseMessage.includes("best programming languages")) {
        botResponse = "The best programming language depends on your goals. For web development, JavaScript is essential. For data science, Python is highly recommended. For system programming, consider C++ or Rust.";
      } else if (lowerCaseMessage.includes("learn to code for beginners")) {
        botResponse = "If you're new to coding, I recommend starting with Python or JavaScript. Websites like Codecademy and freeCodeCamp offer beginner-friendly lessons and exercises to help you get started.";
      }


      else if (lowerCaseMessage.includes("best apps for productivity")) {
        botResponse = "For productivity, consider apps like Todoist, Trello, and Notion. They can help you manage tasks, organize projects, and stay on top of your goals.";
      } else if (lowerCaseMessage.includes("apps for learning")) {
        botResponse = "If you want to learn new skills, try apps like Duolingo for languages, Coursera for a variety of courses, and Khan Academy for a range of subjects.";
      } else if (lowerCaseMessage.includes("best apps for health")) {
        botResponse = "For health and wellness, MyFitnessPal for tracking nutrition, Headspace for meditation, and Strava for fitness tracking are great choices.";
      } else if (lowerCaseMessage.includes("apps for finance management")) {
        botResponse = "Apps like Mint, YNAB (You Need A Budget), and PocketGuard can help you manage your finances, track spending, and budget effectively.";
      } else if (lowerCaseMessage.includes("top educational apps")) {
        botResponse = "Educational apps like Khan Academy, Quizlet, and Coursera offer a wealth of knowledge and resources for students of all ages.";
      } else if (lowerCaseMessage.includes("best travel apps")) {
        botResponse = "For travel, consider using apps like Google Maps for navigation, Airbnb for accommodations, and TripIt for organizing your travel plans.";
      } else if (lowerCaseMessage.includes("apps for language learning")) {
        botResponse = "Duolingo, Babbel, and Rosetta Stone are popular apps for learning new languages. They offer various lessons and interactive exercises to help you practice.";
      } else if (lowerCaseMessage.includes("apps for relaxation")) {
        botResponse = "To relax, you might enjoy apps like Calm for meditation, Headspace for mindfulness, and Insight Timer for sleep and relaxation.";
      } else if (lowerCaseMessage.includes("best apps for writing")) {
        botResponse = "Apps like Scrivener for writing projects, Grammarly for grammar checks, and Ulysses for a distraction-free writing experience are highly recommended.";
      } else if (lowerCaseMessage.includes("apps for fitness")) {
        botResponse = "For fitness, check out MyFitnessPal for tracking exercise and diet, Fitbit for activity tracking, and Nike Training Club for workout routines.";
      } else{

        const keywordResponses = {
          "programming": "Here's a tip on programming: Practice regularly and build projects.",
          "code": "Coding is a great skill. Consider learning a popular language like JavaScript.",
          "python": "Python is a versatile language great for beginners and experts alike.",
          "javascript": "JavaScript is essential for web development and has a huge community.",
          "react": "React is a powerful library for building dynamic user interfaces.",
          "tailwind": "Tailwind CSS makes styling easier with utility-first CSS classes.",
          "api": "APIs allow different software systems to communicate effectively.",
          "backend": "Backend development involves server-side logic, databases, and APIs.",
          "frontend": "Frontend development focuses on the visual and interactive parts of a website.",
          "app": "For your needs, I recommend this app: Coursera.",
          "html": "HTML is the standard markup language for creating web pages and web applications.",
          "css": "CSS is used to style and layout web pages, including adjusting fonts, colors, and spacing.",
          "sql": "SQL (Structured Query Language) is used to manage and query relational databases.",
          "node.js": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine for building server-side applications.",
          "express": "Express.js is a web application framework for Node.js that simplifies the creation of web servers.",
          "mongodb": "MongoDB is a NoSQL database that uses a document-oriented data model.",
          "git": "Git is a version control system that helps track changes in source code during software development.",
          "docker": "Docker is a platform for developing, shipping, and running applications in containers.",
          "kubernetes": "Kubernetes is a system for automating the deployment, scaling, and management of containerized applications.",
          "typescript": "TypeScript is a superset of JavaScript that adds static types to the language.",
          "html": "HTML (HyperText Markup Language) is the standard language for creating web pages.",
          "css": "CSS (Cascading Style Sheets) is used to style HTML elements on a web page.",
          "javascript": "JavaScript is a versatile programming language that powers dynamic web content.",
          "react": "React is a popular JavaScript library for building user interfaces.",
          "node.js": "Node.js allows you to run JavaScript on the server side.",
          "express": "Express.js is a minimal and flexible Node.js web application framework.",
          "mongodb": "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.",
          "sql": "SQL (Structured Query Language) is used for managing and querying relational databases.",
          "git": "Git is a distributed version control system to track changes in source code.",
          "docker": "Docker helps in creating, deploying, and running applications using containerization.",
          "kubernetes": "Kubernetes is an orchestration system for automating containerized applications.",
          "typescript": "TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript.",
          "java": "Java is a high-level, class-based, object-oriented programming language.",
          "c++": "C++ is a powerful, high-performance programming language used for system/software development.",
          "ruby": "Ruby is a dynamic, open-source programming language with a focus on simplicity and productivity.",
          "php": "PHP is a popular server-side scripting language used for web development.",
          "swift": "Swift is a powerful and intuitive programming language for iOS and macOS development.",
          "android": "Android is a mobile operating system based on a modified version of the Linux kernel.",
          "ios": "iOS is a mobile operating system created by Apple for its iPhone and iPad devices.",
          "api": "An API (Application Programming Interface) allows different software systems to communicate with each other.",
          "version control": "Version control systems help track changes to files over time, especially in software development.",
          "agile": "Agile is a methodology that emphasizes iterative development and collaboration.",
          "scrum": "Scrum is an agile framework for managing and completing complex projects.",
          "machine learning": "Machine learning is a type of artificial intelligence that enables systems to learn from data and improve over time.",
          "artificial intelligence": "Artificial intelligence is the simulation of human intelligence in machines.",
          "data science": "Data science combines data analysis, machine learning, and statistics to extract insights from data."        
        
        };


        for (let keyword in keywordResponses) {
          if (lowerCaseMessage.includes(keyword)) {
            botResponse = keywordResponses[keyword];
            break;
          }
        }


        if (!botResponse) {
          const response = await axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
          });
          botResponse = response.data.choices[0].message.content;
        }
      }

      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: botResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: 'Sorry, something went wrong. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-[650px] h-[650px]">
      <div className="flex flex-col h-full bg-gray-900">
        <h1 className="bg-gradient-to-r from-green-400 text-transparent bg-clip-text text-center py-3 font-bold text-4xl">AI-BOT</h1>
        
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {chatLog.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`flex ${message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'} rounded-lg p-4 text-white max-w-sm`}
                  dangerouslySetInnerHTML={{ __html: message.message }}
                />
              </div>
            ))}
            {isLoading &&  
              <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                  <TypingAnimations />
                </div>
              </div>
            }
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input
              type="text"
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
              placeholder="Type Your Message Here...."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-color duration-300">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
