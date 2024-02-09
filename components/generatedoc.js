export default function Generatereport() {
  function gen() {
    if (window != undefined) {
      const newWindow = window.open("", "_blank");
      newWindow.document.body.innerHTML = `<h1>hello</h1>`;

      // Wait for the content to be loaded before printing
      newWindow.onload = () => {
        newWindow.print();
      };
    }
  }
  return (
    <>
      <button onClick={gen}>Generate Report</button>
    </>
  );
}
