import { examRules } from "@/lib/examRules";

export default function RuleInfo({ exam }) {
  if (!exam) return null;

  const rule = examRules[exam];

  return (
    <div className="bg-gray-50 border rounded p-4 text-sm mt-4">
      <h3 className="font-semibold mb-2">Applied Rules:</h3>

      <p>
        📸 Photo: {rule.photo.minKB}-{rule.photo.maxKB} KB,
        {rule.photo.width}x{rule.photo.height}px,
        Background: {rule.photo.bg}
      </p>

      {rule.sign && (
        <p>
          ✍ Signature: {rule.sign.minKB}-{rule.sign.maxKB} KB
        </p>
      )}
    </div>
  );
}
