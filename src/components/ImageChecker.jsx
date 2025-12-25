"use client";
import { useEffect, useState } from "react";
import { validateImage } from "@/utils/imageValidator";
import { examRules } from "@/lib/examRules";

export default function ImageChecker({ file, exam }) {
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (!file) return;

    const rules = exam ? examRules[exam]?.photo : null;

    validateImage(file, rules).then(setReport);
  }, [file, exam]);

  if (!report) return null;

  return (
    <div className="border rounded p-4 mt-4 bg-gray-50">
      <h3 className="font-semibold mb-2">Image Validation Report</h3>

      {report.warnings.length === 0 ? (
        <p className="text-green-600">✅ Image is acceptable</p>
      ) : (
        <ul className="text-red-600 list-disc pl-5">
          {report.warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
