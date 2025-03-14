"use client"
import { useState } from "react"

export default function ReportPage() {
  const [reports] = useState([
    { name: "Daily Summary", url: "http://localhost:8080/api/reports/daily" },
    { name: "Monthly Overview", url: "http://localhost:8080/api/reports/monthly" }
  ])

  const downloadReport = (url: string) => {
    // Trigger file download using window.open, fetch, etc.
    window.open(url, "_blank")
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.name} className="flex items-center justify-between p-4 border rounded">
            <span>{report.name}</span>
            <button 
              onClick={() => downloadReport(report.url)} 
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
