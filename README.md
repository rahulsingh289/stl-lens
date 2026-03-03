# 🔍 STL Lens

> Learn and understand C++ STL — without leaving your editor.

**STL Lens** is a Visual Studio Code extension that helps C++ developers quickly understand and visualize Standard Template Library (STL) containers and algorithms through intelligent hover tooltips.

Perfect for students, competitive programmers, and interview preparation.

---

## 🚀 Why STL Lens?

When learning C++, developers often:

- Forget time complexities
- Mix up containers (`map` vs `unordered_map`)
- Need quick syntax reminders
- Switch browser tabs repeatedly

**STL Lens solves this directly inside VS Code.**

> Hover. Learn. Continue coding.

---

## ✨ Features

### 🔎 Smart Hover Insights

Hover over STL components to instantly see:

- 📦 What it is  
- ⚙️ Time complexity  
- 🧠 Internal working  
- 💡 When to use it  
- ⚠️ Common mistakes  
- 🧾 Syntax examples  

---

## 📚 Supported Containers

- `vector`
- `map`
- `unordered_map`
- `set`
- `stack`
- `queue`
- `priority_queue`
- `deque`
- `list`

---

## 🔷 Supported Algorithms

- `sort`
- `stable_sort`
- `binary_search`
- `lower_bound`
- `upper_bound`
- `next_permutation`
- `prev_permutation`
- `accumulate`
- `count`
- `find`
- `reverse`
- `min_element`
- `max_element`

Works with both:

```cpp
vector<int>
std::vector<int>



📸 Preview
#include <vector>
using namespace std;

vector<int> v = {1, 2, 3};
Hover over vector and see:
Definition
Complexity
Code snippet
Usage guidance
No tab switching. No searching.


💻 Installation
From VS Code Marketplace (Recommended)
Open VS Code
Go to Extensions (Ctrl + Shift + X)
Search for STL Lens
Click Install
From VSIX (Manual Install)
Download the .vsix file
Open VS Code
Go to Extensions → ... → Install from VSIX
Select the file


🧑‍💻 Usage
Open any C++ file (.cpp, .h, .hpp)
Write STL code:
std::map<int, string> mp;
std::sort(v.begin(), v.end());
Hover over the STL keyword
Instantly see explanation 🎯



🎯 Who Is This For?
👨‍🎓 Students learning C++
💻 Competitive programmers
🧠 DSA / Interview preparation
👨‍💼 Developers needing quick STL references
🚀 Anyone tired of switching tabs



🛠 Extension Settings
Currently works out-of-the-box with zero configuration.
Planned customization features:
🎨 Custom hover themes
🔘 Enable/disable specific containers
📊 Complexity display toggle
📚 Beginner / Advanced explanation modes


🗺️ Roadmap
Upcoming improvements:
🔥 Interactive STL simulator
📊 Complexity comparison charts
🧪 Integrated practice problems
🎥 Guided learning mode
🤖 AI-assisted explanations

🤝 Contributing
Contributions are welcome!
1.Fork the repository
2.Create a branch
git checkout -b feature/your-feature
3.Make changes
4.Commit
git commit -m "Added new STL explanation"
5.Push
git push origin feature/your-feature
6.Open a Pull Request 🚀


🐛 Issues & Feedback
Found a bug?
Want a feature?
Open an issue on GitHub with:
Clear description
Steps to reproduce
Screenshots (if possible)



👨‍💻 Author
Rahul Singh
GitHub: https://github.com/rahulsingh289


📄 License
MIT License


⭐ Support
If you find STL Lens helpful:
⭐ Star the repository
🗣 Share with fellow developers
💡 Suggest new ideas


🙌 Acknowledgements
Inspired by C++ STL documentation and built for the developer community ❤️