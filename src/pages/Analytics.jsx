import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js"

ChartJS.register(BarElement, CategoryScale, LinearScale)

function Analytics() {

  const data = {
    labels: ["Hemashree", "Dareen", "Charishma", "Chethan"],
    datasets: [
      {
        label: "Tasks Completed",
        data: [5, 3, 4, 2],
        backgroundColor: "blue"
      }
    ]
  }

  return (
    <div className="container mt-4">
      <h2>Team Contribution</h2>
      <Bar data={data} />
    </div>
  )
}

export default Analytics