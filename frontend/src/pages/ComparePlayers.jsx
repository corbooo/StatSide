import ComparePage from "../components/ComparePage";

function ComparePlayers({ onBack }) {
  return (
    <ComparePage
      onBack={onBack}
      title="Players"
      itemLabel="Player"
      subtitle="Choose two soccer players and compare their stats side by side."
    />
  );
}

export default ComparePlayers;