# 📦 Logistics Cargo Optimizer

A modern web application that optimizes cargo loading by comparing **Greedy** and **0/1 Knapsack** algorithms. The application helps maximize cargo value while respecting vehicle capacity constraints, providing a visual comparison of algorithm performance and efficiency.

---

## 🚀 Overview

Efficient cargo allocation is a critical challenge in logistics and supply chain management. Selecting the right combination of items while maximizing profit and utilizing available capacity can significantly reduce operational costs.

This project demonstrates two popular optimization approaches:

- **Greedy Algorithm** – Fast and efficient for making locally optimal choices.
- **0/1 Knapsack Algorithm** – Dynamic Programming approach that guarantees the optimal solution.

Users can compare both algorithms side-by-side to understand their strengths, trade-offs, and execution results.

---

## ✨ Features

- 📦 Cargo management interface
- ⚡ Greedy Algorithm implementation
- 🧠 0/1 Knapsack Algorithm implementation
- 📊 Side-by-side algorithm comparison
- 📈 Performance visualization
- 💻 Responsive user interface
- 🎨 Clean and modern design
- 🔄 Real-time optimization results

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- HTML5
- CSS3

### Development Tools

- npm
- Git
- GitHub
- VS Code

---

## 🧮 Algorithms Used

### Greedy Algorithm

The Greedy approach selects cargo items based on the best immediate choice, typically using value-to-weight ratio.

#### Advantages

- Very fast
- Simple implementation
- Suitable for large datasets

#### Limitations

- Does not always produce the optimal solution.

---

### 0/1 Knapsack Algorithm

The Dynamic Programming approach evaluates every possible combination efficiently to determine the maximum achievable value.

#### Advantages

- Produces the optimal solution
- Suitable for constrained optimization problems

#### Limitations

- Higher memory and computation requirements

---

## 📊 Algorithm Comparison

| Feature | Greedy | 0/1 Knapsack |
|---------|---------|--------------|
| Speed | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Accuracy | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Time Complexity | O(n log n) | O(n × W) |
| Optimal Solution | ❌ | ✅ |
| Memory Usage | Low | Moderate |

---

## 📂 Project Structure

```
logistics-cargo-optimizer/
│
├── public/
├── src/
│   ├── components/
│   ├── assets/
│   ├── pages/
│   ├── algorithms/
│   ├── utils/
│   ├── types/
│   └── App.tsx
│
├── package.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/SwaraH26/logistics-cargo-optimizer.git
```

### Navigate to the project

```bash
cd logistics-cargo-optimizer
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## 🎯 How It Works

1. Enter cargo information.
2. Specify vehicle capacity.
3. Run the Greedy Algorithm.
4. Run the 0/1 Knapsack Algorithm.
5. Compare the optimization results.
6. Analyze profit, capacity utilization, and execution performance.

---

## 📈 Future Enhancements

- Route optimization
- Multi-vehicle support
- Database integration
- Authentication system
- Export reports to PDF
- Interactive performance graphs
- AI-assisted cargo prediction
- Cloud deployment

---
