import { useListLabels } from "@shipengine/alchemy";
import { Label } from "../label/label";
// import { PurchaseLabel, ViewShipment } from "@shipengine/elements";
export type LabelsGridProps = {
  setSelectedLabel: (shipmentId: string) => void;
};

export const LabelsGrid = ({ setSelectedLabel }: LabelsGridProps) => {
  const { data: labels, isLoading: labelsLoading } = useListLabels();

  console.log(labels, labelsLoading);

  if (labelsLoading) return <div>Loading...</div>;

  return (
    <div>
      {labels && (
        <section css={{ width: "100%" }} >
          {labels.map((label) => (
            <Label
              handleClick={setSelectedLabel}
              key={label.labelId}
              label={label}
            />
          ))}
        </section>
      )}
    </div>
  );
};
