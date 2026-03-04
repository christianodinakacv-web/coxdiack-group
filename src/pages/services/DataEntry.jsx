import React from "react";

export default function DataEntry() {
  return (
    <div className="min-h-screen bg-[#0A1837] text-white pt-24 pb-20 px-6">

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-[#00FFA3] text-center mb-6">
        Data Entry & Administrative Portfolio
      </h1>

      <p className="text-center text-gray-300 max-w-3xl mx-auto mb-14">
        Detail-oriented Data Entry Specialist and Administrative Virtual Assistant
        with hands-on experience in spreadsheet cleaning, reporting, and workflow automation.
      </p>

      {/* Spreadsheet Case Study Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-[#00FFA3] mb-8 text-center">
          Sales Data Cleaning & Reporting Project
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Messy Sheet */}
          <div className="bg-[#10214F] p-5 rounded-xl border border-[#00FFA3]/30 shadow-md">
            <img
              src="/images/messy-sheet.png"
              alt="Messy Raw Spreadsheet"
              className="rounded-md w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-[#00FFA3] mb-2">
              Raw Data (Before Cleaning)
            </h3>
            <p className="text-gray-300 text-sm">
              Dataset containing inconsistent formatting, duplicates, and structural errors.
            </p>
          </div>

          {/* Processing Sheet */}
          <div className="bg-[#10214F] p-5 rounded-xl border border-[#00FFA3]/30 shadow-md">
            <img
              src="/images/processing-sheet.png"
              alt="Processing Spreadsheet"
              className="rounded-md w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-[#00FFA3] mb-2">
              Processing & Formula Application
            </h3>
            <p className="text-gray-300 text-sm">
              Applied formulas, duplicate removal, conditional formatting,
              and structured column normalization.
            </p>
          </div>

          {/* Clean Sheet */}
          <div className="bg-[#10214F] p-5 rounded-xl border border-[#00FFA3]/30 shadow-md">
            <img
              src="/images/clean-sheet.png"
              alt="Clean Final Spreadsheet"
              className="rounded-md w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-[#00FFA3] mb-2">
              Final Structured Dataset
            </h3>
            <p className="text-gray-300 text-sm">
              Clean, validated data with summary metrics and organized reporting dashboard.
            </p>
          </div>

        </div>
      </div>

      {/* Automation Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-[#00FFA3] mb-6 text-center">
          Workflow Automation (Make.com)
        </h2>

        <div className="bg-[#10214F] p-6 rounded-xl border border-[#00FFA3]/30 shadow-md">
          <img
            src="/images/make-automation.png"
            alt="Make Automation Scenario"
            className="rounded-md w-full h-64 object-cover mb-6"
          />

          <p className="text-gray-300 text-center max-w-3xl mx-auto">
            Designed and implemented automation workflows connecting Google Sheets
            with web tools using Make.com to streamline data processing and reduce
            repetitive manual tasks.
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-[#00FFA3] mb-6">
          Core Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
          <div>
            <h3 className="font-semibold text-white mb-2">Data & Spreadsheet Skills</h3>
            <ul className="space-y-2">
              <li>Google Sheets & Microsoft Excel</li>
              <li>Data Cleaning & Formatting</li>
              <li>Duplicate Removal & Validation</li>
              <li>Formulas (SUM, IF, INDEX, QUERY)</li>
              <li>Reporting & Summary Dashboards</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-2">Administrative & Automation</h3>
            <ul className="space-y-2">
              <li>Email & File Management</li>
              <li>Calendar Scheduling</li>
              <li>Online Research</li>
              <li>Workflow Automation (Make.com)</li>
              <li>Process Optimization</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}