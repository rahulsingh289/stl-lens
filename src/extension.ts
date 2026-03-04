import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log("STL Lens is now active!");

    // 📚 STL Documentation Dictionary
   const stlDocs: Record<string, string> = {

vector: `🔵 **std::vector**

Dynamic array with contiguous memory.
Allows fast random access and amortized constant-time insertion at the end.

📦 **Header**
\`\`\`cpp
#include <vector>
\`\`\`

📊 **Time Complexity**
• Access (v[i]) → O(1)  
• push_back() → O(1) amortized  
• pop_back() → O(1)  
• insert/erase (middle) → O(n)  
• size() → O(1)

🧠 **Key Concepts**
• size() = elements stored  
• capacity() = allocated memory  
• Resizes automatically (usually doubles capacity)

📦 **Visual**
Index: 0   1   2   3  
Value: [1] [2] [3] [4]

💻 **Example**
\`\`\`cpp
vector<int> v = {1,2,3};
v.push_back(4);
cout << v[0];  // 1
\`\`\`

🚀 Use When:
• Need fast random access  
• Need dynamic resizing  

Avoid when frequent middle insertions (use list).`,
        

map: `🟢 **std::map**

Ordered key-value container.
Implemented using a Red-Black Tree.

📦 **Header**
\`\`\`cpp
#include <map>
\`\`\`

📊 **Time Complexity**
• Insert → O(log n)  
• Search → O(log n)  
• Erase → O(log n)

🧠 Keys are:
• Unique  
• Automatically sorted  

🌳 **Tree Concept**
Balanced Binary Search Tree

💻 **Example**
\`\`\`cpp
map<int,string> m;
m[1] = "Rahul";
cout << m[1];
\`\`\`

🚀 Use When:
• Need sorted keys  
• Need fast ordered lookup`,

set: `🟣 **std::set**

Stores unique sorted elements.
Implemented as Red-Black Tree.

📦 **Header**
\`\`\`cpp
#include <set>
\`\`\`

📊 **Time Complexity**
• Insert → O(log n)  
• Search → O(log n)  
• Erase → O(log n)

🧠 No duplicate values allowed.

💻 **Example**
\`\`\`cpp
set<int> s = {1,2,3};
s.insert(4);
\`\`\`

🚀 Use When:
• Need sorted unique elements`,

unordered_map: `⚡ **std::unordered_map**

Hash table based key-value container.

📦 **Header**
\`\`\`cpp
#include <unordered_map>
\`\`\`

📊 **Average Complexity**
• Insert → O(1)  
• Search → O(1)  
• Erase → O(1)

⚠ Worst case → O(n) (hash collisions)

🧠 Keys are:
• Unique  
• NOT sorted  

💻 **Example**
\`\`\`cpp
unordered_map<int,string> m;
m[1] = "Rahul";
\`\`\`

🚀 Use When:
• Need fastest lookup  
• Order doesn't matter`,

stack: `📚 **std::stack (LIFO)**

Last In First Out container adapter.

📦 **Header**
\`\`\`cpp
#include <stack>
\`\`\`

📊 **Time Complexity**
• push → O(1)  
• pop → O(1)  
• top → O(1)

📦 **Visual**
Top
[4]
[3]
[2]

💻 **Example**
\`\`\`cpp
stack<int> s;
s.push(10);
s.pop();
\`\`\`

🚀 Use When:
• Expression evaluation  
• Undo/Redo  
• DFS`,

queue: `🚶 **std::queue (FIFO)**

First In First Out container adapter.

📦 **Header**
\`\`\`cpp
#include <queue>
\`\`\`

📊 **Time Complexity**
• push → O(1)  
• pop → O(1)  
• front → O(1)

📦 **Visual**
Front → [1][2][3] ← Rear

💻 **Example**
\`\`\`cpp
queue<int> q;
q.push(5);
q.pop();
\`\`\`

🚀 Use When:
• BFS  
• Scheduling`,

priority_queue: `🔥 **std::priority_queue**

Heap-based container (Max Heap by default).

📦 **Header**
\`\`\`cpp
#include <queue>
\`\`\`

📊 **Time Complexity**
• push → O(log n)  
• pop → O(log n)  
• top → O(1)

🧠 Largest element stays at top.

💻 **Example**
\`\`\`cpp
priority_queue<int> pq;
pq.push(10);
pq.push(20);
cout << pq.top(); // 20
\`\`\`

🚀 Use When:
• Dijkstra  
• Scheduling by priority`,

deque: `📦 **std::deque**

Double-ended queue.
Allows insertion/removal from both ends.

📦 **Header**
\`\`\`cpp
#include <deque>
\`\`\`

📊 **Time Complexity**
• push_front/back → O(1)  
• pop_front/back → O(1)  
• Access → O(1)

💻 **Example**
\`\`\`cpp
deque<int> dq;
dq.push_front(1);
dq.push_back(2);
\`\`\`

🚀 Use When:
• Need fast front & back operations`,

// ================= ALGORITHMS =================

sort: `🔷 **std::sort**

Sorts range in ascending order.
Uses Introsort (Quick + Heap + Insertion).

📦 **Header**
\`\`\`cpp
#include <algorithm>
\`\`\`

📊 Time → O(n log n)

💻 Example:
\`\`\`cpp
sort(v.begin(), v.end());
\`\`\``,

binary_search: `🔷 **std::binary_search**

Searches in sorted range.

📦 Header:
\`\`\`cpp
#include <algorithm>
\`\`\`

📊 Time → O(log n)

⚠ Range must be sorted.

\`\`\`cpp
bool found = binary_search(v.begin(), v.end(), 5);
\`\`\``


};

 // 🔍 Hover Provider (Improved: supports std::)
const hoverProvider = vscode.languages.registerHoverProvider('cpp', {
    provideHover(document, position) {

        const range = document.getWordRangeAtPosition(position, /[\w:]+/);
        if (!range) return;

        const fullWord = document.getText(range);

        // Remove std:: if present
        const word = fullWord.split("::").pop();

        if (word && stlDocs[word]) {
            const markdown = new vscode.MarkdownString(stlDocs[word]);
            markdown.isTrusted = true;
            return new vscode.Hover(markdown);
        }

        return null;
    }
});

    context.subscriptions.push(hoverProvider);

    // 🎯 Command: Show all STL examples
    const showAllCommand = vscode.commands.registerCommand('stl-lens.showAll', () => {

        const panel = vscode.window.createWebviewPanel(
            'stlLens',
            '📚 STL Lens Library',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        panel.webview.html = getWebviewContent();
    });

    context.subscriptions.push(showAllCommand);
}

// 🌐 Webview HTML UI
function getWebviewContent(): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #0f172a;
                color: #e2e8f0;
                padding: 20px;
            }

            h1 {
                text-align: center;
                color: #38bdf8;
            }

            .section {
                background: #1e293b;
                padding: 20px;
                border-radius: 12px;
                margin-bottom: 25px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.4);
            }

            .visual {
                font-family: monospace;
                font-size: 18px;
                margin: 15px 0;
                min-height: 30px;
            }

            button {
                padding: 6px 12px;
                margin-right: 10px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                background: #22c55e;
                color: white;
                font-weight: bold;
            }

            button:hover {
                background: #16a34a;
            }

            input {
                padding: 6px;
                width: 60px;
                margin-right: 10px;
                border-radius: 6px;
                border: none;
            }
        </style>
    </head>
    <body>

        <h1>🚀 STL Lens Interactive Simulator</h1>

        <!-- VECTOR -->
        <div class="section">
            <h2>🔵 Vector (Dynamic Array)</h2>
            <input id="vectorInput" type="number" placeholder="Value">
            <button onclick="vectorPush()">Push Back</button>
            <button onclick="vectorPop()">Pop Back</button>
            <div class="visual" id="vectorVisual"></div>
        </div>

        <!-- STACK -->
        <div class="section">
            <h2>📚 Stack (LIFO)</h2>
            <input id="stackInput" type="number" placeholder="Value">
            <button onclick="stackPush()">Push</button>
            <button onclick="stackPop()">Pop</button>
            <div class="visual" id="stackVisual"></div>
        </div>

        <!-- QUEUE -->
        <div class="section">
            <h2>🚶 Queue (FIFO)</h2>
            <input id="queueInput" type="number" placeholder="Value">
            <button onclick="queuePush()">Enqueue</button>
            <button onclick="queuePop()">Dequeue</button>
            <div class="visual" id="queueVisual"></div>
        </div>

        <script>
            let vector = [];
            let stack = [];
            let queue = [];

            function renderArray(arr, elementId) {
                const el = document.getElementById(elementId);
                el.innerHTML = arr.map(v => "[" + v + "]").join(" ");
            }

            // VECTOR
            function vectorPush() {
                const val = document.getElementById("vectorInput").value;
                if (val !== "") {
                    vector.push(val);
                    renderArray(vector, "vectorVisual");
                }
            }

            function vectorPop() {
                vector.pop();
                renderArray(vector, "vectorVisual");
            }

            // STACK
            function stackPush() {
                const val = document.getElementById("stackInput").value;
                if (val !== "") {
                    stack.push(val);
                    renderArray([...stack].reverse(), "stackVisual");
                }
            }

            function stackPop() {
                stack.pop();
                renderArray([...stack].reverse(), "stackVisual");
            }

            // QUEUE
            function queuePush() {
                const val = document.getElementById("queueInput").value;
                if (val !== "") {
                    queue.push(val);
                    renderArray(queue, "queueVisual");
                }
            }

            function queuePop() {
                queue.shift();
                renderArray(queue, "queueVisual");
            }
        </script>

    </body>
    </html>
    `;
}

export function deactivate() {}