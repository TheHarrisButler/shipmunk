import { useListLabels } from "@shipengine/alchemy";
import { Label } from "../label/label";
import { useCallback, useState } from "react";
import { ViewShipment } from "@shipengine/elements";
import { styles } from "./labels-grid.styles";

export const LabelsGrid = () => {
  const { data: labels, isLoading: labelsLoading } = useListLabels();

  const [label, setLabel] = useState<null | string>(null);
  const [showViewShipment, setShowViewShipment] = useState(false);

  const updateLabel = useCallback(
    (labelId: string) => {
      setLabel(labelId);
      setShowViewShipment(true);
    },
    [label]
  );

  if (labelsLoading) return <div>Loading...</div>;
  // TODO: Display if no labels

  return (
    <div>
      {showViewShipment ? (
        <>
          <div css={{ display: "flex", justifyContent: "center" }}>
            <button
              css={styles.returnToLabels}
              onClick={() => setShowViewShipment(false)}
            >
              Return to Labels
            </button>
          </div>
          <ViewShipment.Element shipmentId={label || ""} />
        </>
      ) : (
        <section css={{ width: "100%" }}>
          {labels?.map((label) => (
            <Label
              handleClick={updateLabel}
              key={label.labelId}
              label={label}
            />
          ))}
        </section>
      )}
    </div>
  );
};