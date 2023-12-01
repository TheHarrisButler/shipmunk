import { SE, useListLabels } from "@shipengine/alchemy";
import { Label } from "../label/label";
import { useCallback, useEffect, useState } from "react";
import { ViewShipment } from "@shipengine/elements";
import { styles } from "./labels-grid.styles";

export type LabelsGridProps = {
  purchasedLabel: null | SE.Label;
};

export const LabelsGrid = ({ purchasedLabel }: LabelsGridProps) => {
  const { data: labels, isLoading: labelsLoading } = useListLabels();

  const [shipmentId, setShipmentId] = useState<null | string>(null);
  const [showViewShipment, setShowViewShipment] = useState(false);

  const updateSelectedLabel = useCallback(
    (shipmentId: string) => {
      setShipmentId(shipmentId);
      setShowViewShipment(true);
    },
    [shipmentId]
  );

  useEffect(() => {
    if (purchasedLabel) {
      updateSelectedLabel(purchasedLabel.shipmentId);
    }
  }, [purchasedLabel]);

  if (labelsLoading) return <div>Loading...</div>;
  if (!labels?.length)
    return (
      <div>No labels found, open up the Wizard to start making labels!</div>
    );

  return (
    <div css={{ flexBasis: '100%', height: '100%', width: '100%', position: 'relative' }}>
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
          <ViewShipment.Element
            features={{
              presentation: { poweredByShipEngine: true },
            }}
            shipmentId={shipmentId || ""}
          />
        </>
      ) : (
        <section css={{ width: "100%" }}>
          {labels?.map((label) => (
            <Label
              handleClick={updateSelectedLabel}
              key={label.labelId}
              label={label}
            />
          ))}
        </section>
      )}
    </div>
  );
};
