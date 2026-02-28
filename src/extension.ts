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
\`\`\``
    };

    // 🔍 Hover Provider
    const hoverProvider = vscode.languages.registerHoverProvider('cpp', {
        provideHover(document, position) {

            const range = document.getWordRangeAtPosition(position);
            if (!range) return;

            const word = document.getText(range);

            if (stlDocs[word]) {
                return new vscode.Hover(stlDocs[word]);
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
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 16px;
                margin-top: 20px;
            }
            .card {
                background: #1e293b;
                border-radius: 12px;
                padding: 15px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.4);
                transition: 0.3s;
            }
            .card:hover {
                transform: scale(1.05);
                background: #334155;
            }
            .title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
                color: #22c55e;
            }
            .visual {
                font-family: monospace;
                font-size: 14px;
                margin-top: 8px;
            }
        </style>
    </head>
    <body>

        <h1>📚 STL Lens Visual Guide</h1>

        <div class="grid">

            <div class="card">
                <div class="title">Vector</div>
                <div class="visual">[1] → [2] → [3] → [4]</div>
            </div>

            <div class="card">
                <div class="title">Stack (LIFO)</div>
                <div class="visual">
                Top → [4]<br>[3]<br>[2]<br>[1]
                </div>
            </div>

            <div class="card">
                <div class="title">Queue (FIFO)</div>
                <div class="visual">[1][2][3][4]</div>
            </div>

            <div class="card">
                <div class="title">Map (Tree)</div>
                <div class="visual">
                    &nbsp;&nbsp;&nbsp;&nbsp;(2)<br>
                    &nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;\\<br>
                    (1)&nbsp;&nbsp;&nbsp;&nbsp;(3)
                </div>
            </div>

            <div class="card">
                <div class="title">Priority Queue</div>
                <div class="visual">Max Heap Structure</div>
            </div>

        </div>

    </body>
    </html>
    `;
}

export function deactivate() {}