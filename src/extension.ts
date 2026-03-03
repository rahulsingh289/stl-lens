import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log("STL Lens is now active!");

    // 📚 STL Documentation Dictionary
    const stlDocs: Record<string, string> = {

        vector: `🔵 **std::vector**

A dynamic array that can grow or shrink in size.

📊 **Time Complexity**
- Access: O(1)
- Insert (end): O(1)
- Insert (middle): O(n)

📦 **Visual**
[1] → [2] → [3] → [4]

\`\`\`cpp
#include <vector>
using namespace std;

vector<int> v = {1,2,3};
v.push_back(4);
\`\`\``,

        map: `🟢 **std::map**

Stores key-value pairs in sorted order (Red-Black Tree).

📊 **Time Complexity**
- Insert: O(log n)
- Search: O(log n)

🌳 **Visual**
    (2)
   /   \\
 (1)   (3)

\`\`\`cpp
#include <map>
using namespace std;

map<int,string> m;
m[1] = "Rahul";
\`\`\``,

        set: `🟣 **std::set**

Stores unique sorted elements.

📊 **Time Complexity**
- Insert: O(log n)
- Search: O(log n)

\`\`\`cpp
#include <set>
using namespace std;

set<int> s = {1,2,3};
s.insert(4);
\`\`\``,

        unordered_map: `⚡ **std::unordered_map**

Hash table based key-value store.

📊 **Time Complexity**
- Insert: O(1)
- Search: O(1)

\`\`\`cpp
#include <unordered_map>
using namespace std;

unordered_map<int,string> m;
m[1] = "Rahul";
\`\`\``,

        stack: `📚 **std::stack (LIFO)**

Last In First Out structure.

📦 **Visual**
Top → [4]
       [3]
       [2]
       [1]

\`\`\`cpp
#include <stack>
using namespace std;

stack<int> s;
s.push(1);
s.pop();
\`\`\``,

        queue: `🚶 **std::queue (FIFO)**

First In First Out structure.

📦 **Visual**
Front → [1][2][3][4] ← Rear

\`\`\`cpp
#include <queue>
using namespace std;

queue<int> q;
q.push(1);
q.pop();
\`\`\``,

        priority_queue: `🔥 **std::priority_queue**

Max Heap structure.

📊 **Time Complexity**
- Insert: O(log n)
- Top: O(1)

\`\`\`cpp
#include <queue>
using namespace std;

priority_queue<int> pq;
pq.push(10);
\`\`\``,

        deque: `📦 **std::deque**

Double-ended queue.

📊 **Time Complexity**
- Insert front/back: O(1)

\`\`\`cpp
#include <deque>
using namespace std;

deque<int> dq;
        dq.push_front(1);
        dq.push_back(2);
        \`\`\``,

 
        // ================= ALGORITHMS =================

        sort: `🔷 **std::sort**

Sorts elements in ascending order.

📊 **Time Complexity**
O(n log n)

🧠 Uses Introsort (Quick + Heap + Insertion)

📦 **Visual**
Before: [4,1,3,2]
After:  [1,2,3,4]

\`\`\`cpp
#include <algorithm>
sort(v.begin(), v.end());
\`\`\``,

        stable_sort: `🔷 **std::stable_sort**

Preserves order of equal elements.

📊 Time: O(n log n)

\`\`\`cpp
stable_sort(v.begin(), v.end());
\`\`\``,

        binary_search: `🔷 **std::binary_search**

Works only on sorted range.

📊 Time: O(log n)

\`\`\`cpp
bool found = binary_search(v.begin(), v.end(), 5);
\`\`\``,

        lower_bound: `🔷 **std::lower_bound**

Returns first element ≥ target.

📊 Time: O(log n)

\`\`\`cpp
auto it = lower_bound(v.begin(), v.end(), 4);
\`\`\``,

        upper_bound: `🔷 **std::upper_bound**

Returns first element > target.

📊 Time: O(log n)

\`\`\`cpp
auto it = upper_bound(v.begin(), v.end(), 4);
\`\`\``,

        next_permutation: `🔷 **std::next_permutation**

Generates next lexicographic permutation.

📊 Time: O(n)

\`\`\`cpp
next_permutation(v.begin(), v.end());
\`\`\``,

        prev_permutation: `🔷 **std::prev_permutation**

Generates previous permutation.

📊 Time: O(n)

\`\`\`cpp
prev_permutation(v.begin(), v.end());
\`\`\``,

        accumulate: `🔷 **std::accumulate**

Returns sum of elements.

📊 Time: O(n)

\`\`\`cpp
#include <numeric>
int sum = accumulate(v.begin(), v.end(), 0);
\`\`\``,

        count: `🔷 **std::count**

Counts occurrences of a value.

📊 Time: O(n)

\`\`\`cpp
int c = count(v.begin(), v.end(), 2);
\`\`\``,

        find: `🔷 **std::find**

Finds first occurrence of value.

📊 Time: O(n)

\`\`\`cpp
auto it = find(v.begin(), v.end(), 5);
\`\`\``,

        reverse: `🔷 **std::reverse**

Reverses elements.

📊 Time: O(n)

\`\`\`cpp
reverse(v.begin(), v.end());
\`\`\``,

        max_element: `🔷 **std::max_element**

Returns iterator to maximum element.

📊 Time: O(n)

\`\`\`cpp
auto it = max_element(v.begin(), v.end());
\`\`\``,

        min_element: `🔷 **std::min_element**

Returns iterator to minimum element.

📊 Time: O(n)

\`\`\`cpp
auto it = min_element(v.begin(), v.end());
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