import { useListLabels } from "@shipengine/alchemy";
import { Label } from "../label/label";
// import { PurchaseLabel, ViewShipment } from "@shipengine/elements";

export const LabelsGrid = () => {
  const { data: labels, isLoading: labelsLoading } = useListLabels();

  console.log(labels, labelsLoading);

  if (labelsLoading) return <div>Loading...</div>;

  return (
    <div>
      {labels && (
        <section css={{ width: "100%" }} role="radiogroup">
          {labels.map((label) => (
            <Label key={label.labelId} label={label} />
          ))}
        </section>
      )}
    </div>
  );
};
