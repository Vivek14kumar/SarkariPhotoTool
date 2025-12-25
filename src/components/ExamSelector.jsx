"use client";
import { examRules } from "@/lib/examRules";

export default function ExamSelector({ selected, onChange }) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded w-full"
    >
      <option value="">Auto Detect / Select Exam</option>

      {Object.entries(examRules).map(([key, exam]) => (
        <option key={key} value={key}>
          {exam.name}
        </option>
      ))}
    </select>
  );
}
