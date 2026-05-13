import ComparePage from "../components/ComparePage";

function CompareTeams({ onBack }) {
  return (
    <ComparePage
      onBack={onBack}
      title="Teams"
      itemLabel="Team"
      subtitle="Choose two soccer teams and compare their stats side by side."
    />
  );
}

export default CompareTeams;