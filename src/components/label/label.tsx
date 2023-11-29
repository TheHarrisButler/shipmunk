import { SE } from "@shipengine/alchemy";
import { styles } from "./label.styles";

export type LabelProps = {
  label: SE.Label;
  handleClick: (shipmentId: string) => void;
  //   carrier: string;
  //   shippingAmount: string;
  //   shipDate: string;
  //   trackingNumber: string;
};

// TODO: Style each label to look like Rate Card
// TODO: Get data in correct shape / format
// TODO: Total Cost
// TODO: Hover State
// TODO: Selected State?
// TODO: OnClick: open ViewShipment
// TODO: Make tracking number copyable

export const Label = ({
  label,
  handleClick,
}: //   carrier,
//   shippingAmount,
//   shipDate,
//   trackingNumber,
LabelProps) => {
  const carrierCodeOverrides = {
    stamps_com: "stamps_com_wl",
    usps: "stamps_com_wl",
  };

  const overrideCarrierCodes = (carrierCode: string) => {
    return (
      carrierCodeOverrides[carrierCode as keyof typeof carrierCodeOverrides] ||
      carrierCode
    );
  };
  return (
    <article
      css={styles.article}
      role="option"
      onClick={() => {
        handleClick(label.shipmentId);
      }}
    >
      <section css={styles.section}>
        <img
          alt={label.carrierCode}
          css={styles.image}
          src={`https://logos.shipstation.com/ipaas/carriers/${overrideCarrierCodes(
            label.carrierCode
          )}/icon.svg`}
        />
        <div>{label.carrierCode}</div>
        <div>{label.shipmentCost.amount}</div>
        <div>{label.shipDate}</div>
      </section>
    </article>
  );
};
