import {
  Onboarding,
  PurchaseLabel,
  ViewShipment,
  VoidLabel,
} from "@shipengine/elements";
import { useCallback } from "react";
import { keyframes } from "@emotion/react";
import { createStyles } from "../../utils";

export const ElementList = {
  ONBOARDING_ELEMENT: "onboarding",
  PURCHASE_LABEL_ELEMENT: "purchase-label",
  VIEW_SHIPMENT_ELEMENT: "view-shipment",
  VOID_LABEL_ELEMENT: "void-label",
} as const;

export type ElementListValue = (typeof ElementList)[keyof typeof ElementList];

export type ElementSidePanelProps = {
  elementName: ElementListValue;
  isOpen: boolean;
  labelId?: string;
  onClose: () => void;
  onElementComplete: (
    nextElement: ElementListValue,
    currentElement: ElementListValue
  ) => void;
  shipmentId?: string;
};

export const ElementSidePanel = ({
  elementName,
  isOpen,
  onClose,
  onElementComplete,
  labelId,
  shipmentId,
}: ElementSidePanelProps) => {
  const getShipEngineElement = useCallback(
    (name: string) => {
      switch (name) {
        case ElementList.ONBOARDING_ELEMENT:
          return (
            <Onboarding.Element
              features={{
                presentation: { poweredByShipEngine: true },
              }}
              onCompleteOnboarding={() => {
                onElementComplete(
                  ElementList.PURCHASE_LABEL_ELEMENT,
                  ElementList.ONBOARDING_ELEMENT
                );
              }}
            />
          );
        case ElementList.PURCHASE_LABEL_ELEMENT:
          return (
            <PurchaseLabel.Element
              features={{
                presentation: { poweredByShipEngine: true },
                rateForm: { enableFunding: true },
              }}
              onLabelCreateSuccess={() => {
                onElementComplete(
                  ElementList.VIEW_SHIPMENT_ELEMENT,
                  ElementList.PURCHASE_LABEL_ELEMENT
                );
              }}
              printLabelLayout={
                "letter" // : '4x6'
              }
            />
          );
        case ElementList.VIEW_SHIPMENT_ELEMENT:
          return (
            <ViewShipment.Element
              features={{
                presentation: { poweredByShipEngine: true },
              }}
              shipmentId={shipmentId}
            />
          );
        case ElementList.VOID_LABEL_ELEMENT:
          return (
            <VoidLabel.Element
              features={{
                presentation: { poweredByShipEngine: true },
              }}
              labelId={labelId ?? ""}
              onComplete={() => {
                onClose();
              }}
              onViewShipment={() => {
                onElementComplete(
                  ElementList.VIEW_SHIPMENT_ELEMENT,
                  ElementList.VOID_LABEL_ELEMENT
                );
              }}
            />
          );
      }
    },
    [onElementComplete, shipmentId, labelId, onClose]
  );

  const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
  `;

  const slideOut = keyframes`
  from {
    transform: translateX(0);
    }
  to {
    transform: translateX(100%);
    }
  `;

  const styles = createStyles({
    sidePanel: {
      top: 0,
      right: 0,
      width: "90%",
      height: "100%",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      padding: "20px",
      transform: `translateX(${isOpen ? "0" : "100%"})`,
      animation: `${
        isOpen
          ? `${slideIn} 0.3s ease-out forwards`
          : `${slideOut} 0.3s ease-out forwards`
      }`,
    },
    header: {
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid rgb(222, 222, 222)",
      padding: "4px 0px 4px 16px",
      justifyContent: "space-between",
    },
  });

  return isOpen ? (
    <div css={styles.sidePanel}>
      <div css={styles.header}>
        <h3>ShipEngine Elements</h3>
        <button onClick={onClose}>X</button>
      </div>
      {getShipEngineElement(elementName)}
    </div>
  ) : (
    <></>
  );
};
