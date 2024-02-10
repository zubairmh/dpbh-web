export default function Generatereport() {
  function gen() {
    if (window != undefined) {
      const newWindow = window.open("", "_blank");
      newWindow.document.body.innerHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doughnut Chart with Chart.js and Tailwind CSS</title>
    <!-- Include Tailwind CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet">
    <!-- Include Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.0"></script>
  </head>
  <body class="bg-gray-200 p-8">

    <!-- Website logo and name -->
    <div class="max-w-md mx-auto mb-4 text-center">
      <img src="your-logo.png" alt="Website Logo"
        class="w-12 h-12 mx-auto mb-2">
      <h2 class="text-xl font-semibold">Your Website Name</h2>
    </div>

    <!-- Doughnut chart container -->
    <div class="max-w-md mx-auto bg-white p-4 rounded-md shadow-md">
      <!-- Canvas for the doughnut chart -->
      <canvas id="myDoughnutChart" class="w-full h-auto"></canvas>
    </div>

    <!-- Script to create the doughnut chart -->
    <script>
    document.addEventListener('DOMContentLoaded', function () {
      // Sample data for the doughnut chart with a transparent center
      var data = {
        labels: ['Empty Center', 'Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7'],
        datasets: [{
          data: [0, 15, 15, 15, 15, 15, 15, 15],
          backgroundColor: ['rgba(0,0,0,0)', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#48A877'],
          hoverBackgroundColor: ['rgba(0,0,0,0)', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#48A877'],
          borderWidth: 1  // Adjust the border width to create an outer ring
        }]
      };

      // Get the canvas element
      var ctx = document.getElementById('myDoughnutChart').getContext('2d');

      // Create the doughnut chart
      var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
          plugins: {
            legend: {
              position: 'right' // Place the legend on the right side
            }
          }
        }
      });
    });
  </script>

  </body>
</html>
      `;

      // Wait for the content to be loaded before printing
      newWindow.onload = () => {
        newWindow.print();
      };
    }
  }
  return (
    <>
      <button
        className="flex flex-col w-full h-full items-center justify-center bg-[#6a7076] rounded-lg "
        onClick={gen}
      >
        Generate Report
      </button>
    </>
  );
}
